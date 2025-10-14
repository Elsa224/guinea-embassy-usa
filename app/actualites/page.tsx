"use client";

import React, { useState } from 'react';
import { Layout } from '@/components/layout';
import { ArticleCard } from '@/components/public/ArticleCard';
import { usePosts, useCategories } from '@/hooks/usePublicContent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Calendar, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockActualites } from '@/lib/mockData/actualites';

export default function ActualitesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  
  const { data, loading, error } = usePosts({
    page,
    limit: 12,
    category: selectedCategory || undefined,
    type: selectedType || undefined,
    lang: 'fr'
  });

  const { categories } = useCategories();

  const postTypes = [
    { value: 'NEWS', label: 'Actualités' },
    { value: 'EVENT', label: 'Événements' },
    { value: 'SERVICE', label: 'Services' },
    { value: 'ANNOUNCEMENT', label: 'Annonces' },
    { value: 'DOCUMENTATION', label: 'Documentation' }
  ];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1); // Reset to first page when searching
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === 'all' ? '' : value);
    setPage(1);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value === 'all' ? '' : value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedType('');
    setPage(1);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-ci-orange to-ci-orange-dark py-16 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
                Actualités
              </h1>
              <p className="mx-auto max-w-2xl text-xl opacity-90">
                Découvrez les dernières nouvelles, événements et annonces du Consulat Général de Côte d&apos;Ivoire
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="border-b bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher dans les actualités..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 bg-white"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Filtres:</span>
                </div>

                <Select value={selectedCategory || 'all'} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-48 bg-white">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      <SelectValue placeholder="Catégorie" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.slug}>
                        <div className="flex items-center gap-2">
                          <div 
                            className="h-3 w-3 rounded-full" 
                            style={{ backgroundColor: category.color }}
                          />
                          {category.name} ({category.postCount})
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedType || 'all'} onValueChange={handleTypeChange}>
                  <SelectTrigger className="w-48 bg-white">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <SelectValue placeholder="Type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    {postTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {(selectedCategory || selectedType || search) && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="text-sm"
                  >
                    Effacer les filtres
                  </Button>
                )}
              </div>

              {/* Results Count */}
              {(data || mockActualites) && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    {((error || !data) ? mockActualites.pagination.totalCount : data.pagination.totalCount)} article{((error || !data) ? mockActualites.pagination.totalCount : data.pagination.totalCount) > 1 ? 's' : ''} trouvé{((error || !data) ? mockActualites.pagination.totalCount : data.pagination.totalCount) > 1 ? 's' : ''}
                  </p>
                  {(selectedCategory || selectedType || search) && (
                    <div className="flex flex-wrap gap-2">
                      {search && (
                        <span className="rounded-full bg-ci-orange bg-opacity-10 px-3 py-1 text-sm text-ci-orange">
                          Recherche: &quot;{search}&quot;
                        </span>
                      )}
                      {selectedCategory && (
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                          {categories.find(c => c.slug === selectedCategory)?.name}
                        </span>
                      )}
                      {selectedType && (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                          {postTypes.find(t => t.value === selectedType)?.label}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Articles Grid */}
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {((error || !data) ? mockActualites.posts : (data?.posts || [])).map((post) => (
                  <ArticleCard
                    key={post.id}
                    {...post}
                    size="medium"
                  />
                ))}
              </div>

              {/* Pagination */}
              {((error || !data) ? mockActualites.pagination : data?.pagination) && ((error || !data) ? mockActualites.pagination.totalPages : data?.pagination?.totalPages) > 1 && (
                <div className="mt-12 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Affichage de {((((error || !data) ? mockActualites.pagination : data?.pagination).currentPage - 1) * ((error || !data) ? mockActualites.pagination : data?.pagination).limit) + 1} à{' '}
                    {Math.min(((error || !data) ? mockActualites.pagination : data?.pagination).currentPage * ((error || !data) ? mockActualites.pagination : data?.pagination).limit, ((error || !data) ? mockActualites.pagination : data?.pagination).totalCount)} sur{' '}
                    {((error || !data) ? mockActualites.pagination : data?.pagination).totalCount} articles
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(((error || !data) ? mockActualites.pagination : data?.pagination).currentPage - 1)}
                      disabled={!((error || !data) ? mockActualites.pagination : data?.pagination).hasPrevPage}
                      className="flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Précédent
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, ((error || !data) ? mockActualites.pagination : data?.pagination).totalPages) }, (_, i) => {
                        const pagination = (error || !data) ? mockActualites.pagination : data?.pagination;
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
                      onClick={() => handlePageChange(((error || !data) ? mockActualites.pagination : data?.pagination).currentPage + 1)}
                      disabled={!((error || !data) ? mockActualites.pagination : data?.pagination).hasNextPage}
                      className="flex items-center gap-1"
                    >
                      Suivant
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}