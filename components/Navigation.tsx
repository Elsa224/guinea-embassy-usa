"use client";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import * as React from "react";

const navigationItems = [
    {
        title: "Accueil",
        href: "/",
    },
    {
        title: "Actualités",
        href: "/actualites",
    },
    {
        title: "Démarche consulaire",
        items: [
            { title: "INFORMATIONS UTILES", href: "/demarches/informations" },
            { title: "Documents", href: "/demarches/documents" },
        ],
    },
    {
        title: "Services",
        items: [
            { title: "LE SERVICE ETAT CIVIL", href: "/services/etat-civil" },
            { title: "LE SERVICE VISA", href: "/services/visa" },
            { title: "LE SERVICE PASSEPORT", href: "/services/passeport" },
            {
                title: "LE SERVICE LEGALISATION , CERTIFICATION ET AUTRES DOCUMENTS ADMINISTRATIFS",
                href: "/services/legalisation",
            },
        ],
    },
    {
        title: "Diaspora",
        items: [
            { title: "Carte consulaire", href: "/diaspora/carte-consulaire" },
            { title: "Inscription en ligne", href: "/diaspora/inscription" },
            { title: "FAQ", href: "/diaspora/faq" },
        ],
    },
    {
        title: "Gouvernance",
        items: [
            {
                title: "Le Président de la république",
                href: "/gouvernance/president",
            },
            {
                title: "Le Premier ministre",
                href: "/gouvernance/premier-ministre",
            },
            { title: "Le gouvernement", href: "/gouvernance/gouvernement" },
            {
                title: "Les institutions de l'Etat",
                href: "/gouvernance/institutions",
            },
            { title: "La primature", href: "/gouvernance/primature" },
            {
                title: "L'assemblée nationale",
                href: "/gouvernance/assemblee-nationale",
            },
            { title: "Le sénat", href: "/gouvernance/senat" },
            {
                title: "Le conseil constitutionnel",
                href: "/gouvernance/conseil-constitutionnel",
            },
            {
                title: "La cour de cassation",
                href: "/gouvernance/cour-cassation",
            },
            { title: "Le conseil d'état", href: "/gouvernance/conseil-etat" },
            { title: "La cour suprême", href: "/gouvernance/cour-supreme" },
            { title: "La cour des comptes", href: "/gouvernance/cour-comptes" },
            {
                title: "Le médiateur de la république",
                href: "/gouvernance/mediateur",
            },
            {
                title: "La grande chancellerie de l'ordre national",
                href: "/gouvernance/chancellerie",
            },
            {
                title: "Le conseil économique social environnemental et culturel (cesec)",
                href: "/gouvernance/cesec",
            },
            {
                title: "Commission électorale indépendante",
                href: "/gouvernance/commission-electorale",
            },
            {
                title: "Haute autorité de la bonne gouvernance",
                href: "/gouvernance/haute-autorite",
            },
            {
                title: "L'inspection générale de l'état",
                href: "/gouvernance/inspection",
            },
            {
                title: "Chambre des rois et chefs traditionnels",
                href: "/gouvernance/chambre-rois",
            },
            {
                title: "Conseils des ministres",
                href: "/gouvernance/conseils-ministres",
            },
            { title: "Communiqués", href: "/gouvernance/communiques" },
            {
                title: "Textes officiels",
                href: "/gouvernance/textes-officiels",
            },
            { title: "Jour férié", href: "/gouvernance/jours-feries" },
        ],
    },
    {
        title: "Investissements",
        href: "/investissements",
    },
];

export default function Navigation() {
    return (
        <div className="flex w-full items-center justify-center">
            <NavigationMenu>
                <NavigationMenuList className="flex-wrap gap-1 text-white">
                    {navigationItems.map(item => (
                        <NavigationMenuItem key={item.title}>
                            {item.items ? (
                                <>
                                    <NavigationMenuTrigger className="text-white hover:text-white hover:bg-white/20 data-[state=open]:bg-white/20 data-[state=open]:text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 bg-transparent border-none shadow-none">
                                        {item.title}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white rounded-lg shadow-xl border border-gray-200">
                                            {item.items.map(subItem => (
                                                <ListItem
                                                    key={subItem.title}
                                                    title={subItem.title}
                                                    href={subItem.href}
                                                />
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </>
                            ) : (
                                <Link
                                    href={item.href || "/"}
                                    legacyBehavior
                                    passHref
                                >
                                    <NavigationMenuLink
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            "text-white hover:text-white hover:bg-white/20 font-medium px-4 py-2 rounded-lg transition-all duration-200 bg-transparent border-none shadow-none"
                                        )}
                                    >
                                        {item.title}
                                    </NavigationMenuLink>
                                </Link>
                            )}
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "hover:bg-ci-orange/10 hover:text-ci-orange focus:bg-ci-orange/10 focus:text-ci-orange block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm leading-none font-medium">
                        {title}
                    </div>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
