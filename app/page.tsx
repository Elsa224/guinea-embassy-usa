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
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, ExternalLink } from "lucide-react";

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [showMorePhotos, setShowMorePhotos] = useState(false);

    // Auto-rotate slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 3);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const slides = [
        {
            title: "Bienvenue au Consulat Général",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
        },
        {
            title: "Services Consulaires d'Excellence", 
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
        },
        {
            title: "Au Service de la Diaspora",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
        }
    ];

    const newsItems = [
        {
            image: "/assets/images-for-the-new-website/actualite-pic-1.jpeg",
            title: "Nouvelle procédure de demande de visa",
            excerpt: "Le consulat annonce une nouvelle procédure simplifiée pour les demandes de visa...",
            date: "15 Janvier 2025"
        },
        {
            image: "/assets/images-for-the-new-website/actualite-pic-2.jpeg", 
            title: "Horaires d'ouverture modifiés",
            excerpt: "Veuillez noter les nouveaux horaires d'ouverture du consulat général...",
            date: "12 Janvier 2025"
        },
        {
            image: "/assets/images-for-the-new-website/actualite-pic-3.jpeg",
            title: "Événement culturel ivoirien",
            excerpt: "Le consulat organise un événement culturel pour célébrer...",
            date: "10 Janvier 2025"
        },
        {
            image: "/assets/images-for-the-new-website/actualite-pic-1.jpeg",
            title: "Formation consulaire",
            excerpt: "Sessions de formation pour les membres de la diaspora...",
            date: "8 Janvier 2025"
        }
    ];

    const services = [
        {
            icon: "/assets/images-for-the-new-website/services/PICTO-02.png",
            title: "VISA",
            description: "Pour obtenir un visa, le demandeur doit fournir un dossier électronique comprenant les pièces ci-après.",
            link: "https://www.paf.gov.gn/visa"
        },
        {
            icon: "/assets/images-for-the-new-website/services/PICTO-06.png",
            title: "CARTE CONSULAIRE", 
            description: "Plateforme en ligne dédiée à la demande de carte consulaire.",
            link: "https://express54.org"
        },
        {
            icon: "/assets/images-for-the-new-website/services/PICTO-04.png",
            title: "AUTRES DOCUMENTS",
            description: "Plateforme en ligne dédiée à la demande d'autres documents administratifs.",
            link: "https://express54.org"
        },
        {
            icon: "/assets/images-for-the-new-website/services/PICTO-01.png",
            title: "DOCUMENTS CIVILS",
            description: "Plateforme en ligne dédiée à la demande de documents civils.",
            link: "https://express54.org"
        },
        {
            icon: "/assets/images-for-the-new-website/services/PICTO-02.png",
            title: "TITRE DE VOYAGE",
            description: "Plateforme en ligne dédiée à la demande de titre de voyage.",
            link: "https://express54.org"
        },
        {
            icon: "/assets/images-for-the-new-website/services/PICTO-03.png",
            title: "DELIVERY EXPRESS",
            description: "Plateforme en ligne dédiée à la demande de livraison express.",
            link: "https://express54.org"
        }
    ];

    const videos = [
        {
            cover: "/assets/images-for-the-new-website/video-cover-1.jpeg",
            title: "Présentation du Consulat",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            youtubeId: "dQw4w9WgXcQ"
        },
        {
            cover: "/assets/images-for-the-new-website/video-cover-2.jpeg",
            title: "Procédures Administratives",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            youtubeId: "dQw4w9WgXcQ"
        },
        {
            cover: "/assets/images-for-the-new-website/video-cover-3.jpeg",
            title: "Événements Culturels",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            youtubeId: "dQw4w9WgXcQ"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <nav className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-6">
                    <NavigationMenu className="w-full">
                        <NavigationMenuList className="flex justify-center space-x-8 py-4">
                            <NavigationMenuItem>
                                <NavigationMenuLink 
                                    href="#" 
                                    className="text-gray-800 font-medium hover:text-orange-600 relative group transition-colors duration-300"
                                >
                                    Accueil
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink 
                                    href="#" 
                                    className="text-gray-800 font-medium hover:text-orange-600 relative group transition-colors duration-300"
                                >
                                    Actualités
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink 
                                    href="#" 
                                    className="text-gray-800 font-medium hover:text-orange-600 relative group transition-colors duration-300"
                                >
                                    Services Consulaires
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink 
                                    href="#" 
                                    className="text-gray-800 font-medium hover:text-orange-600 relative group transition-colors duration-300"
                                >
                                    Côte d'Ivoire
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink 
                                    href="#" 
                                    className="text-gray-800 font-medium hover:text-orange-600 relative group transition-colors duration-300"
                                >
                                    Multimedia
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink 
                                    href="#" 
                                    className="text-gray-800 font-medium hover:text-orange-600 relative group transition-colors duration-300"
                                >
                                    Contacts
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-300"></span>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-[#EBEBEB] py-12">
                <div className="container mx-auto px-6">
                    {/* Logo centered at top */}
                    <motion.div 
                        className="text-center mb-8"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img 
                            src="/assets/images-for-the-new-website/logo_without_text_and_bg.png" 
                            alt="Logo Consulat" 
                            className="h-94 mx-auto mb-1"
                        />
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                            CONSULAT GÉNÉRAL DE CÔTE D'IVOIRE
                        </h1>
                        <p className="text-lg text-gray-600 mt-2">
                            NEW YORK - ÉTATS-UNIS
                        </p>
                    </motion.div>

                    {/* Main content with president photo and text */}
                    <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto">
                        {/* <motion.div 
                            className="lg:w-1/3 mb-8 lg:mb-0"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face" 
                                alt="Président" 
                                className="w-48 h-64 object-cover rounded-lg shadow-lg mx-auto"
                            />
                        </motion.div>
                        
                        <motion.div 
                            className="lg:w-1/3 text-center px-4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <p className="text-gray-700 leading-relaxed mb-6">
                                "Au nom de Son Excellence Monsieur Alassane OUATTARA, Président de la République de Côte d'Ivoire, 
                                nous vous accueillons avec honneur. Notre mission : servir la diaspora ivoirienne et renforcer 
                                les liens entre nos deux nations."
                            </p>
                            <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2">
                                Nos Services
                            </Button>
                        </motion.div> */}
                        
                        <motion.div 
                            className="lg:w-1/3 mt-8 lg:mt-0"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <img 
                                src="/assets/images-for-the-new-website/civ_usa_flag_no_bg.png" 
                                alt="Côte d'Ivoire and USA flags" 
                                className="w-full max-w-xs mx-auto"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Slider Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-6">
                    <div className="relative max-w-6xl mx-auto">
                        <div className="overflow-hidden rounded-xl shadow-2xl">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, x: 300 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -300 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative"
                                >
                                    <img 
                                        src="/assets/images-for-the-new-website/slider-pic-after-hero.jpeg"
                                        alt={slides[currentSlide].title}
                                        className="w-full h-96 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center">
                                        <div className="container mx-auto px-8">
                                            <motion.h2 
                                                className="text-4xl font-bold text-white mb-4"
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                {slides[currentSlide].title}
                                            </motion.h2>
                                            <motion.p 
                                                className="text-xl text-white/90 max-w-2xl"
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                            >
                                                {slides[currentSlide].content}
                                            </motion.p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        
                        {/* Slider indicators */}
                        <div className="flex justify-center mt-6 space-x-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        currentSlide === index ? 'bg-orange-600 scale-125' : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* News Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Actualités</h2>
                        <p className="text-xl text-gray-600">Restez informés des dernières nouvelles du consulat</p>
                    </div>
                    
                    <div className="relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {newsItems.slice(currentNewsIndex, currentNewsIndex + 3).map((item, index) => (
                                <motion.div
                                    key={index + currentNewsIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                        <CardContent className="p-0">
                                            <img 
                                                src={item.image} 
                                                alt={item.title}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="p-6">
                                                <p className="text-sm text-orange-600 font-medium mb-2">{item.date}</p>
                                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                                                <Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white">
                                                    Lire plus
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                        
                        {/* Navigation buttons */}
                        <div className="flex justify-between items-center mt-8">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentNewsIndex(Math.max(0, currentNewsIndex - 3))}
                                disabled={currentNewsIndex === 0}
                                className="flex items-center"
                            >
                                <ChevronLeft className="w-4 h-4 mr-2" />
                                Précédent
                            </Button>
                            
                            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                                Voir Plus
                            </Button>
                            
                            <Button
                                variant="outline"
                                onClick={() => setCurrentNewsIndex(Math.min(newsItems.length - 3, currentNewsIndex + 3))}
                                disabled={currentNewsIndex >= newsItems.length - 3}
                                className="flex items-center"
                            >
                                Suivant
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">SERVICES CONSULAIRES</h2>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                    <CardContent className="p-6 text-center">
                                        <img 
                                            src={service.icon} 
                                            alt={service.title}
                                            className="w-16 h-16 mx-auto mb-4"
                                        />
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                                        <p className="text-gray-600 mb-6">{service.description}</p>
                                        <Button 
                                            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                                            onClick={() => window.open(service.link, '_blank')}
                                        >
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            Accéder
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Photo Gallery */}
            <section className="py-12 bg-gradient-to-br from-orange-200 to-orange-300">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Galerie Photos</h2>
                        <p className="text-xl text-gray-700">Découvrez nos événements et installations</p>
                    </div>
                    
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        layout
                    >
                        {/* Initial 6 photos */}
                        {Array.from({ length: showMorePhotos ? 18 : 6 }, (_, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <img 
                                    src={`https://picsum.photos/400/300?random=${index + 1}`}
                                    alt={`Photo ${index + 1}`}
                                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300"></div>
                            </motion.div>
                        ))}
                    </motion.div>
                    
                    <div className="text-center mt-8">
                        <Button 
                            onClick={() => setShowMorePhotos(!showMorePhotos)}
                            className="bg-white text-orange-600 hover:bg-gray-100 border border-orange-600"
                        >
                            {showMorePhotos ? 'Voir moins' : 'Voir plus'}
                        </Button>
                    </div>
                </div>
            </section>

            {/* Video Gallery */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Galerie Vidéos</h2>
                        <p className="text-xl text-gray-600">Lorem ipsum dolor sit amet consectetur</p>
                    </div>
                    
                    <div className="relative max-w-4xl mx-auto">
                        <div className="overflow-hidden rounded-xl">
                            <motion.div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${currentVideoIndex * 100}%)` }}
                            >
                                {videos.map((video, index) => (
                                    <div key={index} className="w-full flex-shrink-0">
                                        <Card className="overflow-hidden">
                                            <CardContent className="p-0">
                                                <div className="relative group cursor-pointer">
                                                    <img 
                                                        src={video.cover} 
                                                        alt={video.title}
                                                        className="w-full h-80 object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <div className="bg-white rounded-full p-4">
                                                            <Play className="w-8 h-8 text-orange-600" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-6">
                                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{video.title}</h3>
                                                    <p className="text-gray-600">{video.description}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                        
                        {/* Video navigation */}
                        <div className="flex justify-center items-center mt-6 space-x-4">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentVideoIndex(Math.max(0, currentVideoIndex - 1))}
                                disabled={currentVideoIndex === 0}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            
                            <div className="flex space-x-2">
                                {videos.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentVideoIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            currentVideoIndex === index ? 'bg-orange-600 scale-125' : 'bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                            
                            <Button
                                variant="outline"
                                onClick={() => setCurrentVideoIndex(Math.min(videos.length - 1, currentVideoIndex + 1))}
                                disabled={currentVideoIndex === videos.length - 1}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gradient-to-br from-green-700 to-green-900 text-white py-12">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Section 1: Navigation */}
                        <div>
                            <h3 className="text-xl font-bold mb-6">COTE D'IVOIRE & USA</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Collaborateurs</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Services Consulaires</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Activités</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Service aux Étudiants</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Vidéo</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Photo</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        {/* Section 2: Contact */}
                        <div>
                            <h3 className="text-xl font-bold mb-6">AMBASSADE</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold mb-2">Email :</h4>
                                    <p className="text-white/80">Support : info@ambacidc.org</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Téléphone :</h4>
                                    <ul className="space-y-1 text-sm text-white/80">
                                        <li>Bureau de l'Ambassadeur : (202) 938-0343</li>
                                        <li>Service Consulaire : 202-938-0310 ext.1720/1724</li>
                                        <li>Passeport Biométrique : 202-938-0310 ext. 1725/1727</li>
                                        <li>Secrétariat : 202-204-3980</li>
                                        <li>Étudiant : 240 355 89 48</li>
                                        <li>Tourisme : 202-756-8332</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Liens Institutionnels */}
                        <div>
                            <h3 className="text-xl font-bold mb-6">Liens Institutionnels</h3>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Direction du Tourisme aux USA</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Direction Économique USA</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">U.S. Department of State</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">La Présidence</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">La Primature</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">L'Assemblée Nationale</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Conseil Économique et Social</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Le Ministère des Affaires Étrangères</a></li>
                                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Le Médiateur de la République</a></li>
                            </ul>
                        </div>

                        {/* Section 4: Localisation */}
                        <div>
                            <h3 className="text-xl font-bold mb-6">Localisation</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold mb-2">Adresse :</h4>
                                    <p className="text-white/80">
                                        2424 Massachusetts Avenue,<br />
                                        N.W., Washington D.C. 20008 (USA)
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Recevoir par Whatsapp :</h4>
                                    <p className="text-white/80">(+1 202 658 3602)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="border-t border-green-600 mt-12 pt-8">
                        <div className="flex justify-center space-x-6">
                            <a href="#" className="text-white/80 hover:text-white transition-colors">
                                <span className="sr-only">Facebook</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a href="#" className="text-white/80 hover:text-white transition-colors">
                                <span className="sr-only">Instagram</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C23.988 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.611-3.185-1.559-.737-.948-1.017-2.162-.769-3.342.248-1.18 1.02-2.216 2.123-2.849 1.103-.633 2.448-.775 3.702-.39 1.254.385 2.318 1.275 2.928 2.448.61 1.173.7 2.536.247 3.751-.453 1.215-1.353 2.216-2.477 2.758-.788.381-1.682.591-2.569.183zM17.789 5.337a1.25 1.25 0 01-1.25 1.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25z"/>
                                </svg>
                            </a>
                            <a href="#" className="text-white/80 hover:text-white transition-colors">
                                <span className="sr-only">X (Twitter)</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </a>
                        </div>
                        <p className="text-center text-white/60 mt-4">
                            © 2025 Consulat Général de Côte d'Ivoire. Tous droits réservés.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}