"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
    name: string;
    href?: string;
}

export function Breadcrumb() {
    const pathname = usePathname();
    
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
            let name = segment
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            
            // Handle special cases
            switch (segment) {
                case 'posts':
                    name = 'Articles';
                    break;
                case 'users':
                    name = 'Utilisateurs';
                    break;
                case 'media':
                    name = 'Médias';
                    break;
                case 'settings':
                    name = 'Paramètres';
                    break;
                case 'analytics':
                    name = 'Analytique';
                    break;
                case 'new':
                    name = 'Nouveau';
                    break;
                case 'edit':
                    name = 'Modifier';
                    break;
                default:
                    // Check if it's an ID (UUID pattern)
                    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment)) {
                        name = 'Détail';
                    }
            }
            
            // Last item shouldn't have href (current page)
            if (i === paths.length - 1) {
                items.push({ name });
            } else {
                items.push({ name, href: currentPath });
            }
        }
        
        return items;
    };
    
    const breadcrumbItems = generateBreadcrumbItems();
    
    // Don't show breadcrumb on admin home
    if (pathname === '/admin') {
        return null;
    }
    
    return (
        <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm">
                {breadcrumbItems.map((item, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && (
                            <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        )}
                        <li>
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {index === 0 && <Home className="h-4 w-4" />}
                                    <span>{item.name}</span>
                                </Link>
                            ) : (
                                <span className="flex items-center gap-1 text-gray-900 font-medium">
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