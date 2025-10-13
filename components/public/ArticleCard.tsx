"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
    const date = new Date(dateString);
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
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

  const heightClasses = {
    small: 'h-64',
    medium: 'h-80',
    large: 'h-96'
  };

  const titleSizes = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl lg:text-3xl'
  };

  const featuredImage = media && media.length > 0 ? media[0] : null;
  const defaultImage = '/assets/SITE_WEB_AMBASSADE_DE_CIV.jpg'; // fallback image

  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${heightClasses[size]} ${className}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={featuredImage?.url || defaultImage}
          alt={featuredImage?.alt || title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>
      
      {/* Additional color overlay for branding */}
      <div className="absolute inset-0 bg-gradient-to-br from-ci-orange/20 to-ci-green/20 opacity-50"></div>

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        {/* Top: Date */}
        <div className="text-white/90 text-sm font-medium">
          {formatDate(publishedAt)}
        </div>

        {/* Bottom: Title and CTA */}
        <div className="space-y-4">
          <h3 className={`font-bold text-white leading-tight ${titleSizes[size]}`}>
            {title.toUpperCase()}
          </h3>
          
          <Link 
            href={`/actualites/${slug}`}
            className="inline-flex items-center gap-2 bg-ci-orange hover:bg-ci-orange-dark text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span>Voir plus</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 right-4">
          <span className="bg-ci-orange text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
            À la une
          </span>
        </div>
      )}
    </motion.article>
  );
}