"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Tag, User, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PostPreviewModalProps {
    open: boolean;
    onClose: () => void;
    post: {
        title: { fr: string; en?: string };
        content: { fr: string; en?: string };
        excerpt?: { fr?: string; en?: string };
        status: string;
        type: string;
        featured: boolean;
        publishedAt?: string;
        category?: {
            name: { fr: string };
            color?: string;
        };
        author?: {
            name: string;
        };
        tags?: Array<{
            name: string;
        }>;
    };
    language: 'fr' | 'en';
}

export function PostPreviewModal({ open, onClose, post, language }: PostPreviewModalProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PUBLISHED':
                return 'bg-green-100 text-green-800';
            case 'DRAFT':
                return 'bg-gray-100 text-gray-800';
            case 'REVIEW':
                return 'bg-yellow-100 text-yellow-800';
            case 'ARCHIVED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'NEWS':
                return language === 'fr' ? 'Actualité' : 'News';
            case 'EVENT':
                return language === 'fr' ? 'Événement' : 'Event';
            case 'SERVICE':
                return 'Service';
            case 'ANNOUNCEMENT':
                return language === 'fr' ? 'Annonce' : 'Announcement';
            case 'DOCUMENTATION':
                return 'Documentation';
            default:
                return type;
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return language === 'fr' ? 'Non défini' : 'Not set';
        const date = new Date(dateString);
        return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-bold">
                            {language === 'fr' ? 'Aperçu de l\'article' : 'Post Preview'}
                        </DialogTitle>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline">
                                {language === 'fr' ? 'FR' : 'EN'}
                            </Badge>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </DialogHeader>

                <ScrollArea className="flex-1 px-6 py-6">
                    <article className="prose prose-lg max-w-none">
                        {/* Header */}
                        <header className="mb-8">
                            {/* Featured Badge */}
                            {post.featured && (
                                <Badge className="mb-4 bg-orange-100 text-orange-800">
                                    {language === 'fr' ? 'À la une' : 'Featured'}
                                </Badge>
                            )}

                            {/* Title */}
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {language === 'fr' ? post.title.fr : (post.title.en || post.title.fr)}
                            </h1>

                            {/* Meta information */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                                {/* Author */}
                                {post.author && (
                                    <div className="flex items-center gap-1">
                                        <User className="h-4 w-4" />
                                        <span>{post.author.name}</span>
                                    </div>
                                )}

                                {/* Date */}
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formatDate(post.publishedAt)}</span>
                                </div>

                                {/* Reading time estimate */}
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>
                                        {language === 'fr' ? '5 min de lecture' : '5 min read'}
                                    </span>
                                </div>
                            </div>

                            {/* Category and Type */}
                            <div className="flex items-center gap-2 mb-4">
                                {post.category && (
                                    <Badge 
                                        style={{
                                            backgroundColor: post.category.color ? `${post.category.color}20` : undefined,
                                            color: post.category.color || undefined,
                                            borderColor: post.category.color || undefined
                                        }}
                                        variant="outline"
                                    >
                                        {post.category.name.fr}
                                    </Badge>
                                )}
                                <Badge variant="secondary">
                                    {getTypeLabel(post.type)}
                                </Badge>
                                <Badge className={getStatusColor(post.status)}>
                                    {post.status}
                                </Badge>
                            </div>

                            {/* Tags */}
                            {post.tags && post.tags.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <Tag className="h-4 w-4 text-gray-500" />
                                    <div className="flex flex-wrap gap-1">
                                        {post.tags.map((tag, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {tag.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </header>

                        {/* Excerpt */}
                        {post.excerpt && (
                            <div className="text-lg text-gray-600 italic mb-8 p-4 bg-gray-50 rounded-lg border-l-4 border-orange-500">
                                {language === 'fr' ? post.excerpt.fr : (post.excerpt.en || post.excerpt.fr)}
                            </div>
                        )}

                        {/* Content */}
                        <div 
                            className="prose-headings:font-bold prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline"
                            dangerouslySetInnerHTML={{ 
                                __html: language === 'fr' ? post.content.fr : (post.content.en || post.content.fr) 
                            }} 
                        />
                    </article>
                </ScrollArea>

                {/* Footer */}
                <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
                    <Button onClick={onClose} variant="outline">
                        {language === 'fr' ? 'Fermer' : 'Close'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}