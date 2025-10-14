"use client";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArticleCard } from "@/components/public/ArticleCard";
import { motion } from "framer-motion";
import { Calendar, User, Clock, ArrowRight, Share2, ChevronLeft, Loader2 } from "lucide-react";
import { usePost } from "@/hooks/usePublicContent";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useParams, useRouter } from "next/navigation";
import { mockActualites } from "@/lib/mockData/actualites";

export default function PostDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    
    const { data, loading, error } = usePost({ slug, lang: 'fr' });

    const handleShare = () => {
        if (navigator.share && data?.post) {
            navigator.share({
                title: data.post.title,
                text: data.post.excerpt || '',
                url: window.location.href,
            });
        }
    };

    if (loading) {
        return (
            <Layout currentPath="/actualites">
                <div className="flex min-h-screen items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
                </div>
            </Layout>
        );
    }

    // Use mockup data if there's an error or no data from database
    let post = data?.post;
    let relatedPosts = data?.relatedPosts || [];

    if (error || !data?.post) {
        // Try to find the post in our mockup data
        const mockPost = mockActualites.posts.find(p => p.slug === slug);
        if (mockPost) {
            post = mockPost;
            // Get related posts from mockup (exclude current post)
            relatedPosts = mockActualites.posts.filter(p => p.slug !== slug).slice(0, 4);
        } else {
            return (
                <Layout currentPath="/actualites">
                    <div className="flex min-h-screen items-center justify-center">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
                            <p className="text-gray-600 mb-6">L'article demandé n'existe pas.</p>
                            <Button asChild>
                                <Link href="/actualites">Retour aux actualités</Link>
                            </Button>
                        </div>
                    </div>
                </Layout>
            );
        }
    }

    if (!post) {
        return null;
    }

    return (
        <Layout currentPath="/actualites">
            <article className="bg-white py-8">
                <div className="container mx-auto px-4 sm:px-6">
                    {/* Back button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mb-6"
                    >
                        <Link
                            href="/actualites"
                            className="inline-flex items-center gap-2 text-orange-600 transition-colors hover:text-orange-700"
                        >
                            <ChevronLeft className="h-5 w-5" />
                            Retour aux actualités
                        </Link>
                    </motion.div>

                    <div className="mx-auto max-w-4xl">
                        {/* Header */}
                        <motion.header
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-8"
                        >
                            {post.category && (
                                <span 
                                    className="mb-4 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium"
                                    style={{
                                        backgroundColor: post.category.color ? `${post.category.color}20` : '#ff7f0020',
                                        color: post.category.color || '#ff7f00'
                                    }}
                                >
                                    {post.category.name}
                                </span>
                            )}
                            <h1 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                                {post.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <time>
                                        {format(new Date(post.publishedAt), 'd MMMM yyyy', { locale: fr })}
                                    </time>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>{post.author.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>{post.readingTime} min read</span>
                                </div>
                                <button
                                    onClick={handleShare}
                                    className="ml-auto flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm transition-colors hover:bg-gray-50"
                                >
                                    <Share2 className="h-4 w-4" />
                                    Partager
                                </button>
                            </div>
                        </motion.header>

                        {/* Featured Image */}
                        {post.media && post.media.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="mb-8 overflow-hidden rounded-lg shadow-lg"
                            >
                                <img
                                    src={post.media[0].url}
                                    alt={post.media[0].alt || post.title}
                                    className="h-auto w-full object-cover"
                                />
                                {post.media[0].caption && (
                                    <p className="bg-gray-50 px-4 py-2 text-sm text-gray-600">
                                        {post.media[0].caption}
                                    </p>
                                )}
                            </motion.div>
                        )}

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="prose prose-lg mx-auto mb-12"
                        >
                            {/* Check if content is HTML or plain text */}
                            {post.content.includes('<') ? (
                                <div 
                                    className="post-content"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                />
                            ) : (
                                <div className="post-content">
                                    {post.content.split('\n').map((paragraph, index) => {
                                        if (paragraph.trim() === '') return null;
                                        
                                        // Check if paragraph contains a URL
                                        const urlRegex = /(https?:\/\/[^\s]+)/g;
                                        const hasUrl = urlRegex.test(paragraph);
                                        
                                        if (hasUrl) {
                                            const parts = paragraph.split(urlRegex);
                                            return (
                                                <p key={index} className="mb-4">
                                                    {parts.map((part, partIndex) => {
                                                        if (urlRegex.test(part)) {
                                                            return (
                                                                <a
                                                                    key={partIndex}
                                                                    href={part}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-orange-600 hover:text-orange-700 underline"
                                                                >
                                                                    {part}
                                                                </a>
                                                            );
                                                        }
                                                        return part;
                                                    })}
                                                </p>
                                            );
                                        }
                                        
                                        return (
                                            <p key={index} className="mb-4">
                                                {paragraph}
                                            </p>
                                        );
                                    })}
                                </div>
                            )}
                        </motion.div>

                        {/* Media Gallery */}
                        {post.media && post.media.length > 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="mb-12"
                            >
                                <h2 className="mb-6 text-2xl font-bold text-gray-900">Galerie</h2>
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                    {post.media.slice(1).map((media) => (
                                        <div key={media.id} className="overflow-hidden rounded-lg shadow-md">
                                            <img
                                                src={media.url}
                                                alt={media.alt || ''}
                                                className="h-full w-full object-cover"
                                            />
                                            {media.caption && (
                                                <p className="p-2 text-sm text-gray-600">{media.caption}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="mb-12 flex flex-wrap gap-2"
                            >
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag.id}
                                        className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700"
                                    >
                                        #{tag.name}
                                    </span>
                                ))}
                            </motion.div>
                        )}
                    </div>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mx-auto max-w-7xl py-12"
                        >
                            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
                                Articles similaires
                            </h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {relatedPosts.map((relatedPost) => (
                                    <ArticleCard
                                        key={relatedPost.id}
                                        id={relatedPost.id}
                                        slug={relatedPost.slug}
                                        title={relatedPost.title}
                                        excerpt={relatedPost.excerpt}
                                        type={relatedPost.type}
                                        featured={relatedPost.featured}
                                        publishedAt={relatedPost.publishedAt}
                                        author={relatedPost.author}
                                        category={relatedPost.category}
                                        media={relatedPost.media}
                                        readingTime={relatedPost.readingTime}
                                        size="small"
                                        showExcerpt={false}
                                    />
                                ))}
                            </div>
                        </motion.section>
                    )}
                </div>
            </article>
        </Layout>
    );
}