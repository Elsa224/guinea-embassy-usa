"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
    name: string;
    href?: string;
}

const segmentLabels: Record<string, string> = {
    // Main sections
    'admin': 'Tableau de bord',
    'posts': 'Articles',
    'users': 'Utilisateurs',
    'media': 'Médias',
    'settings': 'Paramètres',
    'analytics': 'Analytique',
    'categories': 'Catégories',
    'tags': 'Étiquettes',
    
    // Actions
    'new': 'Nouveau',
    'edit': 'Modifier',
    'create': 'Créer',
    'update': 'Mettre à jour',
    'delete': 'Supprimer',
    'view': 'Voir',
    
    // Status
    'draft': 'Brouillon',
    'published': 'Publié',
    'archived': 'Archivé',
    'review': 'En révision',
    
    // Types
    'news': 'Actualités',
    'event': 'Événements',
    'service': 'Services',
    'announcement': 'Annonces',
    'documentation': 'Documentation',
};

interface BreadcrumbProps {
    customTitle?: string;
}

export function Breadcrumb({ customTitle }: BreadcrumbProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    // Generate breadcrumb items from the current path
    const generateBreadcrumbItems = (): BreadcrumbItem[] => {
        const paths = pathname.split('/').filter(Boolean);
        const items: BreadcrumbItem[] = [];
        
        // Add home item
        items.push({ name: "Tableau de bord", href: "/admin" });
        
        // Build breadcrumb items
        let currentPath = '/admin';
        for (let i = 1; i < paths.length; i++) {
            const segment = paths[i];
            currentPath += `/${segment}`;
            
            // Create readable names from URL segments
            let name = segmentLabels[segment] || segment
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            
            // Check if it's an ID (UUID pattern)
            if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment)) {
                // Try to get a more descriptive name based on the previous segment
                const previousSegment = paths[i - 1];
                switch (previousSegment) {
                    case 'posts':
                        name = 'Article';
                        break;
                    case 'users':
                        name = 'Utilisateur';
                        break;
                    case 'media':
                        name = 'Média';
                        break;
                    default:
                        name = 'Détail';
                }
            }
            
            // Check for numeric IDs
            if (/^\d+$/.test(segment)) {
                const previousSegment = paths[i - 1];
                name = `#${segment}`;
            }
            
            // Last item shouldn't have href (current page)
            if (i === paths.length - 1) {
                // Use custom title if provided for the last item
                items.push({ name: customTitle || name });
            } else {
                items.push({ name, href: currentPath });
            }
        }
        
        // Add query parameters info if relevant
        const status = searchParams.get('status');
        const type = searchParams.get('type');
        
        if (status && segmentLabels[status.toLowerCase()]) {
            items[items.length - 1].name += ` - ${segmentLabels[status.toLowerCase()]}`;
        }
        
        if (type && segmentLabels[type.toLowerCase()]) {
            items[items.length - 1].name += ` - ${segmentLabels[type.toLowerCase()]}`;
        }
        
        return items;
    };
    
    const breadcrumbItems = generateBreadcrumbItems();
    
    // Don't show breadcrumb on admin home
    if (pathname === '/admin') {
        return null;
    }
    
    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm bg-white dark:bg-gray-900 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
                {breadcrumbItems.map((item, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && (
                            <ChevronRight className="h-3.5 w-3.5 text-gray-400 dark:text-gray-600 flex-shrink-0" />
                        )}
                        <li className="flex items-center">
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-ci-orange dark:hover:text-ci-orange transition-colors duration-200 group"
                                >
                                    {index === 0 && (
                                        <Home className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                                    )}
                                    <span className="hover:underline underline-offset-4">{item.name}</span>
                                </Link>
                            ) : (
                                <span className="flex items-center gap-1.5 text-gray-900 dark:text-gray-100 font-medium">
                                    {index === 0 && <Home className="h-4 w-4" />}
                                    {item.name}
                                </span>
                            )}
                        </li>
                    </React.Fragment>
                ))}
            </ol>
        </nav>
    );
}