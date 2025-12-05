"use client";

import React from "react";
import Link from "next/link";
import { ArticleCard } from "./ArticleCard";
import { usePosts } from "@/hooks/usePublicContent";
import { ArrowRight, Newspaper, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockActualites } from "@/lib/mockData/actualites";

interface NewsSectionProps {
    title?: string;
    subtitle?: string;
    limit?: number;
    showFeatured?: boolean;
    showViewAll?: boolean;
    className?: string;
}

export function NewsSection({
    title = "Actualités",
    subtitle = "Découvrez les dernières nouvelles du Consulat",
    limit = 4,
    showFeatured = true,
    showViewAll = true,
    className = "",
}: NewsSectionProps) {
    const { data, loading, error } = usePosts({
        limit,
        featured: showFeatured ? undefined : false,
        showAll: true,
    });

    if (loading) {
        return (
            <section className={`py-16 bg-gray-50 ${className}`}>
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            {title}
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    </div>

                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <Loader2 className="w-8 h-8 animate-spin text-ci-orange mx-auto mb-4" />
                            <p className="text-gray-600">
                                Chargement des actualités...
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Use mockup data if there's an error or no data from database
    const finalData = error || !data ? mockActualites : data;
    const { posts } = finalData;

    if (!posts || posts.length === 0) {
        return (
            <section className={`py-16 bg-gray-50 ${className}`}>
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            {title}
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    </div>

                    <div className="text-center py-12">
                        <div className="bg-gray-100 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                            <Newspaper className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 font-medium mb-2">
                                Aucune actualité
                            </p>
                            <p className="text-gray-500 text-sm">
                                Il n&apos;y a actuellement aucune actualité
                                publiée.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={`py-16 bg-gray-50 ${className}`}>
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        {title}
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {posts.map((post, index) => (
                        <ArticleCard key={post.id} {...post} size={"medium"} />
                    ))}
                </div>

                {/* View All Button */}
                {showViewAll && (
                    <div className="text-center mt-12">
                        <Button
                            asChild
                            size="lg"
                            className="bg-ci-orange hover:bg-ci-orange-dark"
                        >
                            <Link
                                href="/actualites"
                                className="flex items-center gap-2"
                            >
                                Voir toutes les actualités
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
