"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useState, useEffect } from "react";

export default function Home() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [videoSliderIndex, setVideoSliderIndex] = useState(0);
    const [photoSliderIndex, setPhotoSliderIndex] = useState(0);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Gallery auto-rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prev => (prev + 1) % 6);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Video slider auto-rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setVideoSliderIndex(prev => (prev + 1) % 4);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Photo slider auto-rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setPhotoSliderIndex(prev => (prev + 1) % 6);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    // Add CSS for banner animation
    //@ts-ignore
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes scroll {
                0% { transform: translateX(100%); }
                100% { transform: translateX(-100%); }
            }
            .animate-scroll {
                animation: scroll 30s linear infinite;
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Info Banner */}
            <div className="bg-orange-600 text-white py-3 relative overflow-hidden">
                <div className="animate-scroll whitespace-nowrap">
                    <div className="inline-block px-4 text-sm font-medium">
                        🚨 <strong>Flash Info:</strong> Nouveau système de prise de rendez-vous en ligne maintenant disponible • 
                        📞 Urgences: +1 (212) 697-0900 • ⏰ Horaires: Lun-Ven 9h00-17h00 • 
                        📧 Email: consulat.newyork@diplomatie.gouv.ci • 
                        🌐 Services consulaires modernisés pour vous servir mieux
                    </div>
                </div>
            </div>

            {/* Sticky Header */}
            <header className="sticky top-0 z-50 bg-white shadow-lg border-b-2 border-orange-600">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between py-4">
                        {/* Logo and Title */}
                        <div className="flex items-center space-x-4">
                            <img 
                                src="https://placehold.co/60x60/000000/FFF?text=CI" 
                                alt="Logo Consulat" 
                                className="h-12 w-12 rounded-full"
                            />
                            <div>
                                <h1 className="text-lg font-bold text-gray-900">Consulat Général de Côte d'Ivoire</h1>
                                <p className="text-sm text-gray-600">New York, États-Unis</p>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="hidden lg:flex items-center space-x-8 text-sm">
                            <div className="flex items-center space-x-2">
                                <span className="text-orange-600">📍</span>
                                <span className="font-medium text-gray-700">801 Second Avenue, 5th Floor, NY 10017</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-green-600">📞</span>
                                <span className="font-medium text-gray-700">+1 (212) 697-0900</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-blue-600">⏰</span>
                                <span className="font-medium text-gray-700">Lun-Ven: 9h-17h</span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Menu - shadcn/ui */}
                    <div className="border-t border-gray-200 py-3 bg-gray-50">
                        <NavigationMenu className="mx-auto">
                            <NavigationMenuList className="space-x-2">
                                <NavigationMenuItem>
                                    <NavigationMenuLink href="#" className="text-gray-900 hover:text-orange-600 font-semibold px-4 py-2 rounded-md transition-colors">
                                        Accueil
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="text-gray-900 hover:text-orange-600 font-semibold">
                                        Actualités
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="w-64 p-2">
                                            <NavigationMenuLink href="#" className="w-full text-gray-700 hover:text-orange-600 hover:bg-orange-50">
                                                Actualités du Consulat
                                            </NavigationMenuLink>
                                            <NavigationMenuLink href="#" className="w-full text-gray-700 hover:text-orange-600 hover:bg-orange-50">
                                                Actualités diplomatiques
                                            </NavigationMenuLink>
                                            <NavigationMenuLink href="#" className="w-full text-gray-700 hover:text-orange-600 hover:bg-orange-50">
                                                Actualités gouvernementales
                                            </NavigationMenuLink>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="text-gray-900 hover:text-orange-600 font-semibold">
                                        Démarche consulaire
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="w-64 p-2">
                                            <NavigationMenuLink href="#" className="w-full text-gray-700 hover:text-orange-600 hover:bg-orange-50">
                                                Informations utiles
                                            </NavigationMenuLink>
                                            <NavigationMenuLink href="#" className="w-full text-gray-700 hover:text-orange-600 hover:bg-orange-50">
                                                Documents
                                            </NavigationMenuLink>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="text-gray-900 hover:text-orange-600 font-semibold">
                                        Services
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="w-72 p-2">
                                            <NavigationMenuLink href="#" className="w-full text-gray-700 hover:text-orange-600 hover:bg-orange-50">
                                                Service État Civil
                                            </NavigationMenuLink>
                                            <NavigationMenuLink href="#" className="w-full text-gray-700 hover:text-orange-600 hover:bg-orange-50">
                                                Service Visa
                                            </NavigationMenuLink>
                                            <NavigationMenuLink href="#" className="w-full text-gray-700 hover:text-orange-600 hover:bg-orange-50">
                                                Service Passeport
                                            </NavigationMenuLink>
                                            <NavigationMenuLink href="#" className="w-full text-gray-700 hover:text-orange-600 hover:bg-orange-50">
                                                Légalisation & Certification
                                            </NavigationMenuLink>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="text-gray-900 hover:text-orange-600 font-semibold">
                                        Diaspora
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="w-64 p-2">
                                            <NavigationMenuLink href="#" className="w-full text-gray-700 hover:text-orange-600 hover:bg-orange-50">
                                                Carte consulaire
                                            </NavigationMenuLink>
                                            <NavigationMenuLink href="#" className="w-full text-gray-700 hover:text-orange-600 hover:bg-orange-50">
                                                Inscription en ligne
                                            </NavigationMenuLink>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuLink href="#" className="text-gray-900 hover:text-orange-600 font-semibold px-4 py-2 rounded-md transition-colors">
                                        FAQ
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="text-gray-900 hover:text-orange-600 font-semibold">
                                        Gouvernance
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="w-80 p-2">
                                            <NavigationMenuLink href="#" className="w-full text-gray-700 hover:text-orange-600 hover:bg-orange-50">
                                                Le Président de la république
                                            </NavigationMenuLink>
                                            <NavigationMenuLink href="#" className="w-full text-gray-700 hover:text-orange-600 hover:bg-orange-50">
                                                Le Premier ministre
                                            </NavigationMenuLink>
                                            <NavigationMenuLink href="#" className="w-full text-gray-700 hover:text-orange-600 hover:bg-orange-50">
                                                Le gouvernement
                                            </NavigationMenuLink>
                                            <NavigationMenuLink href="#" className="w-full text-gray-700 hover:text-orange-600 hover:bg-orange-50">
                                                Les institutions de l'État
                                            </NavigationMenuLink>
                                            <NavigationMenuLink href="#" className="w-full text-gray-700 hover:text-orange-600 hover:bg-orange-50">
                                                Conseils des ministres
                                            </NavigationMenuLink>
                                            <NavigationMenuLink href="#" className="w-full text-gray-700 hover:text-orange-600 hover:bg-orange-50">
                                                Communiqués
                                            </NavigationMenuLink>
                                            <NavigationMenuLink href="#" className="w-full text-gray-700 hover:text-orange-600 hover:bg-orange-50">
                                                Textes officiels
                                            </NavigationMenuLink>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="text-gray-900 hover:text-orange-600 font-semibold">
                                        Investissements
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="w-64 p-2">
                                            <NavigationMenuLink href="#" className="w-full text-gray-700 hover:text-orange-600 hover:bg-orange-50">
                                                CEPICI
                                            </NavigationMenuLink>
                                            <NavigationMenuLink href="#" className="w-full text-gray-700 hover:text-orange-600 hover:bg-orange-50">
                                                Chambre du commerce
                                            </NavigationMenuLink>
                                            <NavigationMenuLink href="#" className="w-full text-gray-700 hover:text-orange-600 hover:bg-orange-50">
                                                Chambre de l'agriculture
                                            </NavigationMenuLink>
                                            <NavigationMenuLink href="#" className="w-full text-gray-700 hover:text-orange-600 hover:bg-orange-50">
                                                Bourse du café et cacao
                                            </NavigationMenuLink>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>
            </header>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-green-50 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 right-20 w-72 h-72 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
                </div>

                <div className="container mx-auto px-6 text-center relative z-10">
                    {/* Flag Badge */}
                    <div className={`inline-flex items-center mb-8 px-6 py-3 bg-white rounded-full shadow-lg transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <span className="text-2xl mr-3">🇨🇮</span>
                        <span className="text-gray-700 font-semibold">Service Consulaire Officiel</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className={`text-5xl md:text-7xl font-bold mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <span className="text-gray-900">Votre</span>{' '}
                        <span className="text-orange-600">Consulat</span>{' '}
                        <span className="text-gray-900">à</span>{' '}
                        <span className="text-green-600">New York</span>
                    </h1>

                    {/* Subtitle */}
                    <p className={`text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        Services consulaires d'excellence pour la diaspora ivoirienne et nos visiteurs. 
                        Processus simplifié, délais réduits, sécurité maximale.
                    </p>

                    {/* CTA Buttons */}
                    <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                            <span className="mr-3">📅</span>
                            Réserver un rendez-vous
                        </Button>
                        <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                            <span className="mr-3">🔍</span>
                            Explorer nos services
                        </Button>
                    </div>

                    {/* Trust Indicators */}
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                            <div className="text-3xl mb-3">⚡</div>
                            <h3 className="font-bold text-gray-900 mb-2">Traitement Express</h3>
                            <p className="text-gray-600">Délais réduits de 50%</p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                            <div className="text-3xl mb-3">🔒</div>
                            <h3 className="font-bold text-gray-900 mb-2">100% Sécurisé</h3>
                            <p className="text-gray-600">Protection totale des données</p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                            <div className="text-3xl mb-3">🌍</div>
                            <h3 className="font-bold text-gray-900 mb-2">Reconnu Officiellement</h3>
                            <p className="text-gray-600">Service consulaire agréé</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Nos <span className="text-orange-600">Services</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Une gamme complète de services pour accompagner toutes vos démarches consulaires
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Visa Service */}
                        <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-600 transition-colors duration-300">
                                    <span className="text-2xl group-hover:text-white">🛂</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Visa</h3>
                                <p className="text-gray-600 mb-6">Demande de visa d'entrée en Côte d'Ivoire</p>
                                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                                    Commencer
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Passport Service */}
                        <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 transition-colors duration-300">
                                    <span className="text-2xl group-hover:text-white">📘</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Passeport</h3>
                                <p className="text-gray-600 mb-6">Renouvellement et nouvelles demandes</p>
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                                    Commencer
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Legal Service */}
                        <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                                    <span className="text-2xl group-hover:text-white">⚖️</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Légalisation</h3>
                                <p className="text-gray-600 mb-6">Légalisation de documents officiels</p>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                    Commencer
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Emergency Service */}
                        <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600 transition-colors duration-300">
                                    <span className="text-2xl group-hover:text-white">🚨</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Urgences</h3>
                                <p className="text-gray-600 mb-6">Assistance d'urgence 24h/24</p>
                                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                                    Contacter
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Gallery Section - CAPEC Style */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Le Consulat <span className="text-orange-600">en images</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Découvrez nos installations modernes et nos événements consulaires à travers cette galerie photos
                        </p>
                    </div>

                    {/* CAPEC-Style Image Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                        {/* Large Featured Image */}
                        <div className="md:col-span-2 md:row-span-2">
                            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <CardContent className="p-0">
                                    <div className="relative">
                                        <img 
                                            src="https://placehold.co/600x400/FF7F00/FFFFFF?text=Facade+Consulat"
                                            alt="Façade du Consulat"
                                            className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end">
                                            <div className="p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <h3 className="text-xl font-bold mb-2">Façade du Consulat</h3>
                                                <p className="text-white/90">Bâtiment moderne au cœur de Manhattan</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Medium Images */}
                        <div className="md:col-span-2 grid grid-cols-2 gap-6">
                            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <CardContent className="p-0">
                                    <div className="relative">
                                        <img 
                                            src="https://placehold.co/300x200/00AA4F/FFFFFF?text=Hall+Accueil"
                                            alt="Hall d'Accueil"
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end">
                                            <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <h4 className="font-bold">Hall d'Accueil</h4>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <CardContent className="p-0">
                                    <div className="relative">
                                        <img 
                                            src="https://placehold.co/300x200/0066CC/FFFFFF?text=Service+Visa"
                                            alt="Service Visa"
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end">
                                            <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <h4 className="font-bold">Service Visa</h4>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Additional Medium Images */}
                        <div className="md:col-span-2 grid grid-cols-2 gap-6">
                            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <CardContent className="p-0">
                                    <div className="relative">
                                        <img 
                                            src="https://placehold.co/300x200/9933FF/FFFFFF?text=Bureau+Services"
                                            alt="Bureau Services"
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end">
                                            <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <h4 className="font-bold">Bureau Services</h4>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <CardContent className="p-0">
                                    <div className="relative">
                                        <img 
                                            src="https://placehold.co/300x200/FF3366/FFFFFF?text=Salle+Reunion"
                                            alt="Salle de Réunion"
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end">
                                            <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <h4 className="font-bold">Salle de Réunion</h4>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Tall Image */}
                        <div className="md:row-span-2">
                            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <CardContent className="p-0">
                                    <div className="relative">
                                        <img 
                                            src="https://placehold.co/300x400/FF9900/FFFFFF?text=Ceremonie"
                                            alt="Cérémonie Officielle"
                                            className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end">
                                            <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <h4 className="font-bold">Cérémonie Officielle</h4>
                                                <p className="text-white/90 text-sm">Événements protocolaires</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Small Images */}
                        <div className="grid grid-cols-2 gap-6">
                            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <CardContent className="p-0">
                                    <div className="relative">
                                        <img 
                                            src="https://placehold.co/200x150/33CC66/FFFFFF?text=Archive"
                                            alt="Archives"
                                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                            <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <h5 className="font-bold text-sm">Archives</h5>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <CardContent className="p-0">
                                    <div className="relative">
                                        <img 
                                            src="https://placehold.co/200x150/6633FF/FFFFFF?text=Reception"
                                            alt="Réception"
                                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                            <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <h5 className="font-bold text-sm">Réception</h5>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* View All Photos Button */}
                    <div className="text-center">
                        <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                            <span className="mr-2">📸</span>
                            Voir toutes les photos
                        </Button>
                    </div>
                </div>
            </section>

            {/* Vidéothèque & Photothèque Sections */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        
                        {/* Vidéothèque Card Slider */}
                        <div>
                            <div className="text-center mb-8">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    🎥 <span className="text-orange-600">Vidéothèque</span>
                                </h2>
                                <p className="text-lg text-gray-600">
                                    Découvrez nos vidéos consulaires
                                </p>
                            </div>

                            <div className="relative overflow-hidden rounded-2xl shadow-lg mb-6">
                                <div className="flex transition-transform duration-500 ease-in-out"
                                     style={{ transform: `translateX(-${videoSliderIndex * 100}%)` }}>
                                    {[
                                        { emoji: "🏢", title: "Visite Consulat", desc: "Tour des installations" },
                                        { emoji: "📝", title: "Démarches Visa", desc: "Guide étape par étape" },
                                        { emoji: "🎉", title: "Événements", desc: "Célébrations culturelles" },
                                        { emoji: "💼", title: "Services", desc: "Présentation complète" }
                                    ].map((video, index) => (
                                        <Card key={index} className="flex-shrink-0 w-full border-0 bg-gradient-to-br from-orange-50 to-orange-100">
                                            <CardContent className="p-8 text-center h-64 flex flex-col justify-center">
                                                <div className="text-6xl mb-4">{video.emoji}</div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">{video.title}</h3>
                                                <p className="text-gray-600 mb-4">{video.desc}</p>
                                                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-4">
                                                    <span>▶️</span>
                                                    <span>{Math.floor(Math.random() * 3) + 2}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}</span>
                                                </div>
                                                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                                                    <span className="mr-2">▶️</span>
                                                    Regarder
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* Video slider indicators */}
                            <div className="flex justify-center space-x-2 mb-4">
                                {[...Array(4)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setVideoSliderIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                            videoSliderIndex === index ? 'bg-orange-600 scale-125' : 'bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>

                            <div className="text-center">
                                <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
                                    🎬 Voir Plus de Vidéos
                                </Button>
                            </div>
                        </div>

                        {/* Photothèque Card Slider */}
                        <div>
                            <div className="text-center mb-8">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    📸 <span className="text-green-600">Photothèque</span>
                                </h2>
                                <p className="text-lg text-gray-600">
                                    Nos plus belles images
                                </p>
                            </div>

                            <div className="relative overflow-hidden rounded-2xl shadow-lg mb-6">
                                <div className="flex transition-transform duration-500 ease-in-out"
                                     style={{ transform: `translateX(-${photoSliderIndex * 100}%)` }}>
                                    {[
                                        { emoji: "🏛️", title: "Architecture", desc: "Bâtiment consulaire" },
                                        { emoji: "👥", title: "Équipe", desc: "Personnel consulaire" },
                                        { emoji: "🎊", title: "Cérémonies", desc: "Événements officiels" },
                                        { emoji: "🤝", title: "Réceptions", desc: "Rencontres diplomatiques" },
                                        { emoji: "📚", title: "Archives", desc: "Documents historiques" },
                                        { emoji: "🇨🇮", title: "Symboles", desc: "Identité nationale" }
                                    ].map((photo, index) => (
                                        <Card key={index} className="flex-shrink-0 w-full border-0 bg-gradient-to-br from-green-50 to-green-100">
                                            <CardContent className="p-8 text-center h-64 flex flex-col justify-center">
                                                <div className="text-6xl mb-4">{photo.emoji}</div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">{photo.title}</h3>
                                                <p className="text-gray-600 mb-4">{photo.desc}</p>
                                                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-4">
                                                    <span>📷</span>
                                                    <span>{Math.floor(Math.random() * 20) + 5} photos</span>
                                                </div>
                                                <Button className="bg-green-600 hover:bg-green-700 text-white">
                                                    <span className="mr-2">🔍</span>
                                                    Découvrir
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* Photo slider indicators */}
                            <div className="flex justify-center space-x-2 mb-4">
                                {[...Array(6)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setPhotoSliderIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                            photoSliderIndex === index ? 'bg-green-600 scale-125' : 'bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>

                            <div className="text-center">
                                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                                    📱 Voir Plus de Photos
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Témoignages de nos <span className="text-green-600">clients</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Découvrez ce que disent ceux qui ont fait confiance à nos services
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {/* Testimonial 1 */}
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-8">
                                <div className="flex items-center mb-6">
                                    <img 
                                        src="https://placehold.co/60x60/FF7F00/FFFFFF?text=AM" 
                                        alt="Aminata Mensah" 
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-900">Aminata Mensah</h4>
                                        <p className="text-gray-600">Entrepreneur</p>
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="text-yellow-400">⭐</span>
                                    ))}
                                </div>
                                <p className="text-gray-700 italic">
                                    "Service exceptionnel ! J'ai obtenu mon visa en 48h. L'équipe était très professionnelle."
                                </p>
                            </CardContent>
                        </Card>

                        {/* Testimonial 2 */}
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-8">
                                <div className="flex items-center mb-6">
                                    <img 
                                        src="https://placehold.co/60x60/00AA4F/FFFFFF?text=JB" 
                                        alt="Jacques Bamba" 
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-900">Jacques Bamba</h4>
                                        <p className="text-gray-600">Étudiant</p>
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="text-yellow-400">⭐</span>
                                    ))}
                                </div>
                                <p className="text-gray-700 italic">
                                    "Renouvellement de passeport ultra-rapide ! Interface en ligne intuitive."
                                </p>
                            </CardContent>
                        </Card>

                        {/* Testimonial 3 */}
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-8">
                                <div className="flex items-center mb-6">
                                    <img 
                                        src="https://placehold.co/60x60/6366F1/FFFFFF?text=FK" 
                                        alt="Fatou Koné" 
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-900">Fatou Koné</h4>
                                        <p className="text-gray-600">Médecin</p>
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="text-yellow-400">⭐</span>
                                    ))}
                                </div>
                                <p className="text-gray-700 italic">
                                    "Excellente prise en charge pour la légalisation de mes diplômes."
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
                            <p className="text-gray-600">Satisfaction</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-green-600 mb-2">15k+</div>
                            <p className="text-gray-600">Services rendus</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-blue-600 mb-2">48h</div>
                            <p className="text-gray-600">Délai moyen</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-purple-600 mb-2">60+</div>
                            <p className="text-gray-600">Années d'expérience</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-green-800 text-white py-16">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Consulate Info */}
                        <div className="md:col-span-2">
                            <div className="flex items-center mb-6">
                                <span className="text-3xl mr-4">🇨🇮</span>
                                <div>
                                    <h3 className="text-2xl font-bold">Consulat Général de Côte d'Ivoire</h3>
                                    <p className="text-white/80">New York, États-Unis</p>
                                </div>
                            </div>
                            <p className="text-white/80 mb-6 leading-relaxed">
                                Au service de la diaspora ivoirienne et des visiteurs aux États-Unis depuis plus de 60 ans.
                            </p>
                            <div className="bg-white/10 rounded-lg p-4 mb-6">
                                <p className="font-semibold mb-2">📍 801 Second Avenue, 5th Floor</p>
                                <p className="text-white/80">New York, NY 10017</p>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <p className="font-semibold">📞 +1 (212) 697-0900</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">⏰ Lun-Ven: 9h-17h</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-xl font-bold mb-6">Liens Utiles</h4>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Demande de visa</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Renouvellement passeport</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Légalisation documents</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">État civil</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Assistance urgence</a></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="text-xl font-bold mb-6">Informations</h4>
                            <div className="space-y-4">
                                <div className="bg-white/10 rounded-lg p-4">
                                    <h5 className="font-semibold mb-2">⏰ Heures d'ouverture</h5>
                                    <p className="text-white/80">Lundi - Vendredi</p>
                                    <p className="font-semibold">9h00 - 17h00</p>
                                </div>
                                <div className="bg-white/10 rounded-lg p-4">
                                    <h5 className="font-semibold mb-2">🚨 Urgences</h5>
                                    <p className="text-white/80">Service 24h/24</p>
                                    <p className="font-semibold">+1 (212) 697-0900</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="border-t border-white/20 mt-12 pt-8 text-center">
                        <p className="text-white/80">
                            © 2025 Consulat Général de Côte d'Ivoire - New York. Tous droits réservés.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}