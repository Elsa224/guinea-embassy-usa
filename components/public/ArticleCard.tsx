"use client";

import React from 'react';
import Link from 'next/link';
import { Clock, User, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ArticleCardProps {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  type: string;
  featured: boolean;
  publishedAt: string;
  author: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
    color: string;
  };
  media?: Array<{
    id: string;
    url: string;
    alt: string;
    caption: string;
  }>;
  readingTime: number;
  showExcerpt?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function ArticleCard({
  slug,
  title,
  excerpt,
  type,
  featured,
  publishedAt,
  author,
  category,
  media,
  readingTime,
  showExcerpt = true,
  size = 'medium',
  className = ''
}: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'NEWS': 'Actualité',
      'EVENT': 'Événement',
      'SERVICE': 'Service',
      'ANNOUNCEMENT': 'Annonce',
      'DOCUMENTATION': 'Documentation'
    };
    return labels[type] || type;
  };

  const sizeClasses = {
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  };

  const titleSizes = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl'
  };

  const featuredImage = media && media.length > 0 ? media[0] : null;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`
        bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 
        overflow-hidden border border-gray-100 group
        ${featured ? 'ring-2 ring-ci-orange ring-opacity-50' : ''}
        ${className}
      `}
    >
      {/* Featured Image */}
      {featuredImage && (
        <div className="relative overflow-hidden">
          <img
            src={featuredImage.url}
            alt={featuredImage.alt || title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {featured && (
            <div className="absolute top-3 left-3">
              <span className="bg-ci-orange text-white px-2 py-1 rounded-full text-xs font-medium">
                À la une
              </span>
            </div>
          )}
        </div>
      )}

      <div className={sizeClasses[size]}>
        {/* Meta information */}
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
          <span 
            className="px-2 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: category.color }}
          >
            {category.name}
          </span>
          <span className="text-xs text-gray-500">
            {getTypeLabel(type)}
          </span>
        </div>

        {/* Title */}
        <h3 className={`font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-ci-orange transition-colors ${titleSizes[size]}`}>
          <Link href={`/actualites/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>

        {/* Excerpt */}
        {showExcerpt && excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min</span>
            </div>
          </div>
          
          <Link 
            href={`/actualites/${slug}`}
            className="flex items-center gap-1 text-ci-orange hover:text-ci-orange-dark transition-colors font-medium"
          >
            Voir Plus
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}