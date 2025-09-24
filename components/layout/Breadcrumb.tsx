"use client";

import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbProps {
    items?: BreadcrumbItem[];
}

const pathLabels: Record<string, string> = {
    actualites: "Actualités",
    consulat: "Actualités du Consulat",
    "conseil-ministres": "Conseil des Ministres",
    demarches: "Démarches",
    faq: "FAQ",
    guide: "Guide",
    diaspora: "Diaspora",
    inscription: "Inscription",
    associations: "Associations",
    "bi-nationaux": "Bi-nationaux",
    entreprises: "Entreprises",
    ivoiriens: "Ivoiriens",
    gouvernance: "Gouvernance",
    institutions: "Institutions",
    ministres: "Ministres",
    services: "Services",
    "etat-civil": "État Civil",
    legalisation: "Légalisation",
    passeport: "Passeport",
    visa: "Visa",
    investissements: "Investissements",
    cepici: "CEPICI",
    "chambre-commerce": "Chambre de Commerce",
    organismes: "Autres Organismes",
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
    const pathname = usePathname();

    // Don't show breadcrumbs on home page
    if (pathname === "/") {
        return null;
    }

    let breadcrumbItems = items;

    // Auto-generate breadcrumbs if not provided
    if (!breadcrumbItems) {
        const pathSegments = pathname.split("/").filter(segment => segment !== "");
        breadcrumbItems = [];

        let currentPath = "";
        for (const segment of pathSegments) {
            currentPath += `/${segment}`;
            const label = pathLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
            breadcrumbItems.push({
                label,
                href: currentPath,
            });
        }
    }

    return (
        <nav className="bg-gray-50 border-b border-gray-200 py-3">
            <div className="container mx-auto px-4 sm:px-6">
                <ol className="flex items-center space-x-2 text-sm">
                    {/* Home link */}
                    <li>
                        <a
                            href="/"
                            className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
                        >
                            <Home className="h-4 w-4 mr-1" />
                            Accueil
                        </a>
                    </li>

                    {/* Breadcrumb items */}
                    {breadcrumbItems.map((item, index) => (
                        <li key={index} className="flex items-center">
                            <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                            {index === breadcrumbItems.length - 1 ? (
                                // Last item (current page) - not clickable
                                <span className="font-medium text-orange-600">
                                    {item.label}
                                </span>
                            ) : (
                                // Intermediate items - clickable
                                <a
                                    href={item.href}
                                    className="text-gray-600 hover:text-orange-600 transition-colors"
                                >
                                    {item.label}
                                </a>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </nav>
    );
}