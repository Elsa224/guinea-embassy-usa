"use client";

import React from 'react';
import { ArticleCard } from './ArticleCard';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Article {
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
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
}

interface ArticleListProps {
  articles: Article[];
  pagination?: Pagination;
  loading?: boolean;
  error?: string | null;
  onPageChange?: (page: number) => void;
  showPagination?: boolean;
  gridCols?: 1 | 2 | 3 | 4;
  className?: string;
}

export function ArticleList({
  articles,
  pagination,
  loading = false,
  error = null,
  onPageChange,
  showPagination = true,
  gridCols = 3,
  className = ''
}: ArticleListProps) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-ci-orange mx-auto mb-4" />
          <p className="text-gray-600">Chargement des articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-600 font-medium mb-2">Erreur de chargement</p>
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
          <p className="text-gray-600 font-medium mb-2">Aucun article trouvé</p>
          <p className="text-gray-500 text-sm">
            Il n&apos;y a actuellement aucun article publié dans cette section.
          </p>
        </div>
      </div>
    );
  }

  const handlePageChange = (newPage: number) => {
    if (onPageChange && pagination) {
      if (newPage >= 1 && newPage <= pagination.totalPages) {
        onPageChange(newPage);
      }
    }
  };

  return (
    <div className={className}>
      {/* Articles Grid */}
      <div className={`grid gap-6 ${gridClasses[gridCols]}`}>
        {articles.map((article, index) => (
          <ArticleCard
            key={article.id}
            {...article}
            size={index === 0 && article.featured ? 'large' : 'medium'}
          />
        ))}
      </div>

      {/* Pagination */}
      {showPagination && pagination && pagination.totalPages > 1 && (
        <div className="mt-12 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Affichage de {((pagination.currentPage - 1) * pagination.limit) + 1} à{' '}
            {Math.min(pagination.currentPage * pagination.limit, pagination.totalCount)} sur{' '}
            {pagination.totalCount} articles
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Précédent
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                let pageNum;
                if (pagination.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (pagination.currentPage <= 3) {
                  pageNum = i + 1;
                } else if (pagination.currentPage >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i;
                } else {
                  pageNum = pagination.currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={pagination.currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 p-0 ${
                      pagination.currentPage === pageNum 
                        ? 'bg-ci-orange hover:bg-ci-orange-dark text-white' 
                        : ''
                    }`}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className="flex items-center gap-1"
            >
              Suivant
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}