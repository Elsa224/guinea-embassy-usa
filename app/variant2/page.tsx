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

export default function Variant2() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [videoCardSlider, setVideoCardSlider] = useState(0);
    const [photoCardSlider, setPhotoCardSlider] = useState(0);

    useEffect(() => {
        setIsLoaded(true);
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % 3);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Video gallery auto-rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveVideoIndex(prev => (prev + 1) % 4);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    // Video card slider auto-rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setVideoCardSlider(prev => (prev + 1) % 5);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Photo card slider auto-rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setPhotoCardSlider(prev => (prev + 1) % 6);
        }, 4500);
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

    const heroSlides = [
        {
            title: "Services Consulaires d'Excellence",
            subtitle: "Votre consulat moderne à New York",
            cta: "Découvrir nos services",
            bgColor: "from-orange-500 to-orange-600"
        },
        {
            title: "Processus Simplifié",
            subtitle: "Démarches 100% digitalisées",
            cta: "Commencer maintenant",
            bgColor: "from-green-500 to-green-600"
        },
        {
            title: "Support 24/7",
            subtitle: "Assistance d'urgence disponible",
            cta: "Nous contacter",
            bgColor: "from-blue-500 to-blue-600"
        }
    ];

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

            {/* Interactive Hero Slider */}
            <section className="relative h-screen overflow-hidden">
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor} transition-opacity duration-1000 ${
                            currentSlide === index ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative z-10 flex items-center justify-center h-full text-white text-center">
                            <div className="max-w-4xl mx-auto px-6">
                                <div className={`transform transition-all duration-1000 delay-300 ${
                                    currentSlide === index && isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}>
                                    <div className="inline-flex items-center mb-6 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full">
                                        <span className="text-2xl mr-3">🇨🇮</span>
                                        <span className="font-semibold">Consulat Général de Côte d'Ivoire</span>
                                    </div>
                                    
                                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                                        {slide.title}
                                    </h1>
                                    
                                    <p className="text-xl md:text-2xl mb-8 text-white/90">
                                        {slide.subtitle}
                                    </p>
                                    
                                    <Button className="bg-white text-gray-900 hover:bg-white/90 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                        {slide.cta}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Slide Indicators */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                currentSlide === index ? 'bg-white scale-125' : 'bg-white/50'
                            }`}
                        />
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={() => setCurrentSlide(prev => prev === 0 ? 2 : prev - 1)}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-20"
                >
                    ←
                </button>
                <button
                    onClick={() => setCurrentSlide(prev => (prev + 1) % 3)}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-20"
                >
                    →
                </button>
            </section>

            {/* Quick Access Services */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Accès <span className="text-orange-600">Rapide</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Les services les plus demandés à portée de clic
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Quick Service 1 */}
                        <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
                            <CardContent className="p-8 text-center">
                                <div className="w-20 h-20 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <span className="text-3xl text-white">🛂</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Visa Express</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Obtenez votre visa d'entrée en Côte d'Ivoire en 48h seulement
                                </p>
                                <div className="flex items-center justify-center mb-6 space-x-4">
                                    <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">48h</span>
                                    <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">✓ Garanti</span>
                                </div>
                                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3">
                                    Démarrer ma demande
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Quick Service 2 */}
                        <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
                            <CardContent className="p-8 text-center">
                                <div className="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <span className="text-3xl text-white">📘</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Passeport Digital</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Renouvellement 100% en ligne avec suivi en temps réel
                                </p>
                                <div className="flex items-center justify-center mb-6 space-x-4">
                                    <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">En ligne</span>
                                    <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">Suivi SMS</span>
                                </div>
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3">
                                    Renouveler maintenant
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Quick Service 3 */}
                        <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                            <CardContent className="p-8 text-center">
                                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <span className="text-3xl text-white">🚨</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Urgence 24/7</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Assistance d'urgence disponible à tout moment
                                </p>
                                <div className="flex items-center justify-center mb-6 space-x-4">
                                    <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">24/7</span>
                                    <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">Prioritaire</span>
                                </div>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                                    Assistance immédiate
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Video & Media Gallery */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Médiathèque <span className="text-green-600">Consulaire</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Vidéos, documentaires et événements marquants de notre consulat
                        </p>
                    </div>

                    {/* Featured Video Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        {/* Main Video Player */}
                        <div className="lg:col-span-2">
                            <Card className="overflow-hidden shadow-2xl border-0">
                                <CardContent className="p-0">
                                    <div className="relative h-80 bg-gray-900 flex items-center justify-center">
                                        <img 
                                            src={`https://placehold.co/800x400/${["FF7F00", "00AA4F", "0066CC", "9933FF"][activeVideoIndex]}/FFFFFF?text=Video+${activeVideoIndex + 1}`}
                                            alt={`Vidéo ${activeVideoIndex + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                            <Button className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm">
                                                <span className="text-2xl ml-1">▶</span>
                                            </Button>
                                        </div>
                                        <div className="absolute bottom-4 left-4 right-4 text-white">
                                            <h3 className="text-xl font-bold mb-2">
                                                {["Présentation du Consulat", "Procédures Visa", "Événements Culturels", "Services en Ligne"][activeVideoIndex]}
                                            </h3>
                                            <p className="text-white/80 text-sm">
                                                {["Tour virtuel de nos installations", "Guide complet des démarches", "Célébrations de la diaspora", "Tutoriel services digitaux"][activeVideoIndex]}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Video Playlist */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Playlist Consulaire</h3>
                            {[
                                { title: "Présentation du Consulat", duration: "3:45", color: "FF7F00" },
                                { title: "Procédures Visa", duration: "5:20", color: "00AA4F" },
                                { title: "Événements Culturels", duration: "4:15", color: "0066CC" },
                                { title: "Services en Ligne", duration: "2:30", color: "9933FF" }
                            ].map((video, index) => (
                                <Card 
                                    key={index}
                                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg border ${
                                        activeVideoIndex === index ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                                    }`}
                                    onClick={() => setActiveVideoIndex(index)}
                                >
                                    <CardContent className="p-4 flex items-center space-x-4">
                                        <div className="relative">
                                            <img 
                                                src={`https://placehold.co/80x60/${video.color}/FFFFFF?text=${index + 1}`}
                                                alt={video.title}
                                                className="w-20 h-15 object-cover rounded"
                                            />
                                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded">
                                                <span className="text-white text-xs">▶</span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900 text-sm">{video.title}</h4>
                                            <p className="text-xs text-gray-500">{video.duration}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Image Gallery Grid */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Photothèque</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {[
                                { src: "https://placehold.co/250x200/FF7F00/FFFFFF?text=Extérieur", title: "Façade du Consulat" },
                                { src: "https://placehold.co/250x200/00AA4F/FFFFFF?text=Accueil", title: "Hall d'Accueil" },
                                { src: "https://placehold.co/250x200/0066CC/FFFFFF?text=Bureau", title: "Bureaux Services" },
                                { src: "https://placehold.co/250x200/9933FF/FFFFFF?text=Salle", title: "Salle de Réunion" },
                                { src: "https://placehold.co/250x200/FF3366/FFFFFF?text=Event", title: "Événement" },
                                { src: "https://placehold.co/250x200/FF9900/FFFFFF?text=Ceremonie", title: "Cérémonie" },
                                { src: "https://placehold.co/250x200/33CC66/FFFFFF?text=Archive", title: "Archives" },
                                { src: "https://placehold.co/250x200/6633FF/FFFFFF?text=Meeting", title: "Réunion" },
                                { src: "https://placehold.co/250x200/FF6633/FFFFFF?text=Reception", title: "Réception" },
                                { src: "https://placehold.co/250x200/3366FF/FFFFFF?text=Conference", title: "Conférence" },
                                { src: "https://placehold.co/250x200/CC3366/FFFFFF?text=Visite", title: "Visite Officielle" },
                                { src: "https://placehold.co/250x200/66CC33/FFFFFF?text=Fete", title: "Fête Nationale" }
                            ].map((image, index) => (
                                <Card key={index} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <CardContent className="p-0">
                                        <div className="relative overflow-hidden">
                                            <img 
                                                src={image.src} 
                                                alt={image.title}
                                                className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                                <Button className="opacity-0 group-hover:opacity-100 bg-white/20 backdrop-blur-sm text-white border border-white/50 text-xs px-3 py-1 rounded transition-all duration-300">
                                                    Voir
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <p className="text-xs font-medium text-gray-700 text-center">{image.title}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Card Sliders for Vidéothèque & Photothèque */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                        
                        {/* Vidéothèque Card Slider */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                🎬 Vidéothèque Spécialisée
                            </h3>
                            
                            <div className="relative overflow-hidden rounded-xl shadow-lg mb-4">
                                <div className="flex transition-transform duration-500 ease-in-out"
                                     style={{ transform: `translateX(-${videoCardSlider * 100}%)` }}>
                                    {[
                                        { emoji: "🎯", title: "Tutoriels", desc: "Guides pratiques", duration: "3:45" },
                                        { emoji: "🎪", title: "Événements", desc: "Moments forts", duration: "5:20" },
                                        { emoji: "🎓", title: "Formations", desc: "Sessions éducatives", duration: "8:15" },
                                        { emoji: "🎭", title: "Culture", desc: "Arts ivoiriens", duration: "4:30" },
                                        { emoji: "🎤", title: "Interviews", desc: "Témoignages", duration: "6:10" }
                                    ].map((video, index) => (
                                        <Card key={index} className="flex-shrink-0 w-full border-0 bg-gradient-to-br from-blue-50 to-purple-50">
                                            <CardContent className="p-6 text-center h-56 flex flex-col justify-center">
                                                <div className="text-5xl mb-3">{video.emoji}</div>
                                                <h4 className="text-lg font-bold text-gray-900 mb-2">{video.title}</h4>
                                                <p className="text-gray-600 mb-3 text-sm">{video.desc}</p>
                                                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 mb-3">
                                                    <span>🕒</span>
                                                    <span>{video.duration}</span>
                                                </div>
                                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                                    <span className="mr-1">▶️</span>
                                                    Play
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* Video card slider indicators */}
                            <div className="flex justify-center space-x-1 mb-4">
                                {[...Array(5)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setVideoCardSlider(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                            videoCardSlider === index ? 'bg-blue-600 scale-125' : 'bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Photothèque Card Slider */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                📷 Photothèque Premium
                            </h3>
                            
                            <div className="relative overflow-hidden rounded-xl shadow-lg mb-4">
                                <div className="flex transition-transform duration-500 ease-in-out"
                                     style={{ transform: `translateX(-${photoCardSlider * 100}%)` }}>
                                    {[
                                        { emoji: "🌟", title: "Moments", desc: "Instants précieux", count: "24" },
                                        { emoji: "🏆", title: "Succès", desc: "Accomplissements", count: "18" },
                                        { emoji: "🌍", title: "Mondial", desc: "Portée internationale", count: "32" },
                                        { emoji: "💎", title: "Excellence", desc: "Qualité supérieure", count: "15" },
                                        { emoji: "🎨", title: "Artistique", desc: "Créations visuelles", count: "27" },
                                        { emoji: "🚀", title: "Innovation", desc: "Projets avant-gardistes", count: "12" }
                                    ].map((photo, index) => (
                                        <Card key={index} className="flex-shrink-0 w-full border-0 bg-gradient-to-br from-emerald-50 to-teal-50">
                                            <CardContent className="p-6 text-center h-56 flex flex-col justify-center">
                                                <div className="text-5xl mb-3">{photo.emoji}</div>
                                                <h4 className="text-lg font-bold text-gray-900 mb-2">{photo.title}</h4>
                                                <p className="text-gray-600 mb-3 text-sm">{photo.desc}</p>
                                                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 mb-3">
                                                    <span>📊</span>
                                                    <span>{photo.count} images</span>
                                                </div>
                                                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                                    <span className="mr-1">👁️</span>
                                                    Voir
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* Photo card slider indicators */}
                            <div className="flex justify-center space-x-1 mb-4">
                                {[...Array(6)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setPhotoCardSlider(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                            photoCardSlider === index ? 'bg-emerald-600 scale-125' : 'bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* View More Section */}
                    <div className="text-center space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                <span className="mr-2">🎥</span>
                                Voir Plus de Vidéos
                            </Button>
                            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                <span className="mr-2">📸</span>
                                Toutes les Photos
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left Content */}
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                                Pourquoi nous <span className="text-green-600">choisir</span> ?
                            </h2>
                            
                            <div className="space-y-8">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-orange-600 text-xl font-bold">1</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Processus Simplifié</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Démarches 100% digitalisées avec interface intuitive et suivi en temps réel
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-green-600 text-xl font-bold">2</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Délais Express</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Traitement accéléré avec délais réduits de 50% par rapport aux procédures standard
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-blue-600 text-xl font-bold">3</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Sécurité Maximale</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Protection complète de vos données avec certification ISO 27001
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12">
                                <Button className="bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                    Commencer mes démarches
                                </Button>
                            </div>
                        </div>

                        {/* Right Content - Stats */}
                        <div className="grid grid-cols-2 gap-8">
                            <Card className="text-center p-8 border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
                                <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
                                <p className="text-gray-600 font-semibold">Taux de satisfaction</p>
                                <p className="text-sm text-gray-500 mt-2">+15,000 clients satisfaits</p>
                            </Card>

                            <Card className="text-center p-8 border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
                                <div className="text-4xl font-bold text-green-600 mb-2">48h</div>
                                <p className="text-gray-600 font-semibold">Délai moyen</p>
                                <p className="text-sm text-gray-500 mt-2">Traitement express</p>
                            </Card>

                            <Card className="text-center p-8 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                                <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                                <p className="text-gray-600 font-semibold">Support disponible</p>
                                <p className="text-sm text-gray-500 mt-2">Assistance continue</p>
                            </Card>

                            <Card className="text-center p-8 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
                                <div className="text-4xl font-bold text-purple-600 mb-2">60+</div>
                                <p className="text-gray-600 font-semibold">Années d'expérience</p>
                                <p className="text-sm text-gray-500 mt-2">Expertise reconnue</p>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-gradient-to-r from-orange-600 to-green-600">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Prêt à commencer vos démarches ?
                        </h2>
                        <p className="text-xl text-white/90 mb-12 leading-relaxed">
                            Rejoignez les milliers de clients qui font confiance à notre expertise. 
                            Processus simplifié, délais réduits, satisfaction garantie.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Button className="bg-white text-gray-900 hover:bg-white/90 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                <span className="mr-3">📅</span>
                                Prendre un rendez-vous
                            </Button>
                            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                <span className="mr-3">💬</span>
                                Parler à un conseiller
                            </Button>
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