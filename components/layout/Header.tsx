"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Keep old navigation for potential rollback per boss requirements
const oldNavigationItems = [
    {
        label: "Accueil",
        href: "/",
        isActive: true,
    },
    {
        label: "Actualités",
        href: "/actualites",
        hasDropdown: true,
        dropdownItems: [
            { label: "Toutes les Actualités", href: "/actualites" },
            { label: "Actualités du Consulat", href: "/actualites/consulat" },
            { label: "Actualités Diplomatiques", href: "/actualites/diplomatiques" },
            { label: "Actualités Gouvernementales", href: "/actualites/gouvernementales" },
            { label: "Conseil des Ministres", href: "/actualites/conseil-ministres" },
            { label: "Liens Utiles", href: "/actualites/liens-utiles" },
        ],
    },
    {
        label: "Démarches",
        href: "/demarches",
        hasDropdown: true,
        dropdownItems: [
            { label: "Toutes les Démarches", href: "/demarches" },
            { label: "Guide des Démarches", href: "/demarches/guide" },
            { label: "FAQ Démarches", href: "/demarches/faq" },
            { label: "Informations Utiles", href: "/demarches/informations" },
            { label: "Documents Requis", href: "/demarches/documents" },
        ],
    },
    {
        label: "Services Consulaires",
        href: "/services",
        hasDropdown: true,
        dropdownItems: [
            { label: "Tous les Services", href: "/services" },
            { label: "État Civil", href: "/services/etat-civil" },
            { label: "Visa", href: "/services/visa" },
            { label: "Passeport", href: "/services/passeport" },
            { label: "Légalisation", href: "/services/legalisation" },
        ],
    },
    {
        label: "Diaspora",
        href: "/diaspora",
        hasDropdown: true,
        dropdownItems: [
            { label: "Diaspora Générale", href: "/diaspora" },
            { label: "Carte Consulaire", href: "/diaspora/carte-consulaire" },
            { label: "Inscription Ivoiriens", href: "/diaspora/inscription/ivoiriens" },
            { label: "Inscription Bi-nationaux", href: "/diaspora/inscription/bi-nationaux" },
            { label: "Inscription Entreprises", href: "/diaspora/inscription/entreprises" },
            { label: "Inscription Associations", href: "/diaspora/inscription/associations" },
        ],
    },
    {
        label: "FAQ",
        href: "/faq",
    },
    {
        label: "Gouvernance",
        href: "/gouvernance",
        hasDropdown: true,
        dropdownItems: [
            { label: "Gouvernance Générale", href: "/gouvernance" },
            { label: "Le Président", href: "/gouvernance/president" },
            { label: "Le Premier Ministre", href: "/gouvernance/premier-ministre" },
            { label: "Le Gouvernement", href: "/gouvernance/gouvernement" },
            { label: "Les Ministres", href: "/gouvernance/ministres" },
            { label: "Institutions de l'État", href: "/gouvernance/institutions" },
            { label: "Communications", href: "/gouvernance/communications" },
            { label: "Jours Fériés", href: "/gouvernance/jours-feries" },
        ],
    },
    {
        label: "Investissements",
        href: "/investissements",
        hasDropdown: true,
        dropdownItems: [
            { label: "CEPICI", href: "/investissements/cepici" },
            { label: "Chambre Commerce", href: "/investissements/chambre-commerce" },
            { label: "Autres Organismes", href: "/investissements/organismes" },
        ],
    },
];

// New navigation structure per boss requirements
const navigationItems = [
    {
        label: "Accueil",
        href: "/",
    },
    {
        label: "Services aux citoyens",
        href: "#",
        hasDropdown: true,
        dropdownItems: [
            { label: "Le Consulat", href: "/consulat" },
            { label: "Prise de rendez-vous", href: "/carte/consulaire" },
            {
                label: "Vos démarches en ligne",
                href: "#",
                hasDropdown: true,
                dropdownItems: [
                    { label: "Carte consulaire", href: "/carte/consulaire" },
                    { label: "Titres de voyage", href: "#" },
                    { label: "Passport", href: "#" },
                    { label: "État-civil et nationalité   Guinéenne", href: "#" },
                    { label: "Notariat et législations", href: "#" },
                ],
            },
        ],
    },
    {
        label: "Actualités",
        href: "/actualites",
        hasDropdown: true,
        dropdownItems: [
            { label: "Actualités de l'Ambassade", href: "/category/actualites-de-lambassade" },
            { label: "Actualités diplomatiques", href: "/category/actualites-diplomatiques" },
            { label: "Actualités gouvernementales", href: "/category/actualites-gouvernementales" },
        ],
    },
    {
        label: "La Guinée",
        href: "#",
        hasDropdown: true,
        dropdownItems: [
            { label: "Présentation de la Guinée", href: "#" },
            { label: "Le Président de la République", href: "#" },
            { label: "Le Gouvernement (présentation, compte-rendu du conseil des ministres)", href: "#" },
            {
                label: "Les institutions de l'Etat",
                href: "#",
                hasDropdown: true,
                dropdownItems: [
                    { label: "La primature", href: "#" },
                    { label: "L’assemblee nationale", href: "#" },
                    { label: "Le senat", href: "#" },
                    { label: "Le conseil constitutionnel", href: "#" },
                    { label: "La cour supreme", href: "#" },
                    { label: "La cour des comptes", href: "#" },
                    { label: "Mediateur de la republique", href: "#" },
                    { label: "La grande chancellerie de l’ordre national", href: "#" },
                    { label: "Le conseil economique social environnemental et culturel (cesec)", href: "#" },
                    { label: "Commission electorale independante", href: "#" },
                    { label: "Haute autorite de la bonne gouvernance", href: "#" },
                    { label: "L’inspection generale de l’etat", href: "#" },
                    { label: "Chambre des rois et chefs traditionnels", href: "#" },
                ],
            },
            { label: "Les anciens Ambassadeurs", href: "#" },
        ],
    },
    {
        label: "Ambassade",
        href: "#",
        hasDropdown: true,
        dropdownItems: [
            { label: "Présentation", href: "/ambassade" },
            { label: "L’Ambassadeur", href: "/ambassadeur" },
            { label: "La chancellerie diplomatique", href: "/chancellerie/diplomatique" },
            { label: "Les Services", href: "/services" },
            { label: "Coordonnées", href: "#" },
            { label: "Les Consuls Honoraires", href: "/consuls/honoraires" },
            { label: "Les représentants élus", href: "#" },
            { label: "Associations de Guinéens au États-Unis d’Amérique", href: "#" },
            { label: "Calendrier des fêtes légales et jours feries", href: "/jours/feries" },
        ],
    },
    {
        label: "Relations bi et multilatérales",
        href: "#",
        hasDropdown: true,
        dropdownItems: [
            { label: "Les États-Unis d'Amérique", href: "/les/etats/unisd/amerique" },
            { label: "La République du Costa Rica", href: "/republique/costa/rica" },
            { label: "La République d'Haiti", href: "/republique/haiti" },
            { label: "Le Commonwealth des Bahamas", href: "/commonwealth/bahamas" },
            { label: "Le Fonds monétaire international et la Banque mondiale", href: "/fonds/monetaire/international/banque/mondiale" },
        ],
    },


    {
        label: "Venir en Guinée",
        href: "#",
        hasDropdown: true,
        dropdownItems: [
            { label: "Visas", href: "/venir/en/guinee" },
            { label: "Visiter la Guinée", href: "" },
            { label: "Investir en Guinée", href: "#" },
        ],
    },
    {
        label: "Contacts",
        href: "/contacts",
    },
];

interface HeaderProps {
    currentPath?: string;
    isScrolled?: boolean;
}

export default function Header({ currentPath = "/", isScrolled = false }: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const isActivePage = (href: string) => {
        if (href === "/" && currentPath === "/") return true;
        if (href === "/services" && currentPath.startsWith("/services")) return true;
        if (href === "/actualites" && currentPath.startsWith("/actualites")) return true;
        if (href === "/cote-divoire" && currentPath.startsWith("/cote-divoire")) return true;
        if (href === "/mediatheque" && currentPath.startsWith("/mediatheque")) return true;
        if (href === "/contacts" && currentPath.startsWith("/contacts")) return true;
        return false;
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLinkClick = (href: string, hasDropdown?: boolean) => {
        if (!hasDropdown) {
            setIsMobileMenuOpen(false);
            setActiveDropdown(null);
        }
        window.location.href = href;
    };

    const handleDropdownClick = (href: string) => {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
        window.location.href = href;
    };

    return (
        <header
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-white/95 shadow-lg backdrop-blur-md"
                    : "bg-white shadow-sm"
            }`}
        >
            {/* Contact Information Banner - Removed per boss requirements */}

            {/* Main Navigation */}
            <nav className="bg-white border-b">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex justify-center items-center py-4">
                        {/* Desktop Navigation - Centered */}
                        <div className="hidden lg:flex xl:space-x-8 lg:space-x-4 items-center" ref={dropdownRef}>
                            {navigationItems.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="group relative"
                                    onMouseEnter={() => {
                                        if (item.hasDropdown) {
                                            setActiveDropdown(item.label);
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        // Longer delay to allow moving to dropdown
                                        setTimeout(() => {
                                            if (item.hasDropdown) {
                                                setActiveDropdown(null);
                                            }
                                        }, 300);
                                    }}
                                >
                                    <div className="flex items-center">
                                        <a
                                            href={item.href}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (item.hasDropdown) {
                                                    // Toggle dropdown on click
                                                    setActiveDropdown(activeDropdown === item.label ? null : item.label);
                                                } else {
                                                    // Navigate for non-dropdown items
                                                    handleLinkClick(item.href);
                                                }
                                            }}
                                            className={`block px-3 py-2 font-medium transition-colors duration-300 text-sm xl:text-base cursor-pointer ${
                                                isActivePage(item.href)
                                                    ? "ci-orange"
                                                    : "text-gray-800 hover:ci-orange"
                                            }`}
                                        >
                                            {item.label}
                                        </a>
                                        {item.hasDropdown && (
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setActiveDropdown(activeDropdown === item.label ? null : item.label);
                                                }}
                                                className="p-1 ml-1 hover:bg-gray-100 rounded"
                                            >
                                                <ChevronDown 
                                                    className={`h-3 w-3 xl:h-4 xl:w-4 text-gray-600 transition-transform duration-200 ${
                                                        activeDropdown === item.label ? 'rotate-180' : ''
                                                    }`} 
                                                />
                                            </button>
                                        )}
                                    </div>
                                    
                                    {/* Desktop Dropdown */}
                                    {item.hasDropdown && activeDropdown === item.label && (
                                        <div
                                            className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50"
                                            onMouseEnter={() => setActiveDropdown(item.label)}
                                            onMouseLeave={() => {
                                                // Even longer delay for dropdown itself
                                                setTimeout(() => {
                                                    setActiveDropdown(null);
                                                }, 500);
                                            }}
                                        >
                                            <div className="py-2">
                                                {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                                                    <a
                                                        key={dropdownIndex}
                                                        href={dropdownItem.href}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleDropdownClick(dropdownItem.href);
                                                        }}
                                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:ci-orange transition-colors cursor-pointer"
                                                    >
                                                        {dropdownItem.label}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <span
                                        className={`absolute bottom-0 left-3 h-0.5 bg-ci-orange transition-all duration-300 ${
                                            isActivePage(item.href)
                                                ? "w-[calc(100%-1.5rem)]"
                                                : "w-0 group-hover:w-[calc(100%-1.5rem)]"
                                        }`}
                                    ></span>
                                </div>
                            ))}
                            
                            {/* Language Toggle - Moved here per boss requirements */}
                            <div hidden className="flex items-center space-x-2 ml-6 pl-6 border-l border-gray-300">
                                <button className="px-3 py-2 text-sm font-medium text-gray-800 hover:ci-orange transition-colors">
                                    FR
                                </button>
                                <span className="text-gray-400">|</span>
                                <button className="px-3 py-2 text-sm font-medium text-gray-800 hover:ci-orange transition-colors">
                                    EN
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu Button - Positioned absolutely on small screens */}
                        <div className="lg:hidden absolute right-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="h-10 w-10 p-0"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden border-t bg-white shadow-lg"
                        >
                            <div className="container mx-auto px-4 sm:px-6 py-6 max-h-[70vh] overflow-y-auto">
                                <div className="space-y-1">
                                    {navigationItems.map((item, index) => (
                                        <div key={index} className="border-b border-gray-100 last:border-b-0">
                                            <div className="flex items-center justify-between py-3">
                                                <a
                                                    href={item.href}
                                                    onClick={(e) => {
                                                        if (item.hasDropdown) {
                                                            e.preventDefault();
                                                        } else {
                                                            handleLinkClick(item.href);
                                                        }
                                                    }}
                                                    className={`block font-medium transition-colors text-base ${
                                                        isActivePage(item.href)
                                                            ? "ci-orange font-semibold"
                                                            : "text-gray-800 hover:ci-orange"
                                                    }`}
                                                >
                                                    {item.label}
                                                </a>
                                                {item.hasDropdown && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setActiveDropdown(
                                                            activeDropdown === item.label ? null : item.label
                                                        )}
                                                        className="h-10 w-10 p-0 rounded-full hover:bg-orange-50"
                                                    >
                                                        <ChevronDown
                                                            className={`h-5 w-5 transition-transform duration-200 text-gray-500 ${
                                                                activeDropdown === item.label ? "rotate-180 ci-orange" : ""
                                                            }`}
                                                        />
                                                    </Button>
                                                )}
                                            </div>
                                            
                                            {/* Mobile Dropdown */}
                                            {item.hasDropdown && activeDropdown === item.label && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="pb-3 ml-4 space-y-2 bg-orange-50/30 rounded-lg p-3 mb-2"
                                                >
                                                    {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                                                        <a
                                                            key={dropdownIndex}
                                                            href={dropdownItem.href}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleDropdownClick(dropdownItem.href);
                                                            }}
                                                            className="flex items-center py-2 px-3 text-sm text-gray-600 hover:ci-orange hover:bg-white rounded-md transition-all duration-200 cursor-pointer"
                                                        >
                                                            <span className="w-2 h-2 bg-ci-orange rounded-full mr-3 opacity-60"></span>
                                                            {dropdownItem.label}
                                                        </a>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Mobile menu footer */}
                                <div className="mt-6 pt-4 border-t border-gray-200">
                                    <div className="text-center text-sm text-gray-500">
                                        <p>Consulat Général de Côte d'Ivoire</p>
                                        <p className="text-xs">New York, NY</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
}