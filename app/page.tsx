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
import { SiFacebook, SiX, SiInstagram } from "@icons-pack/react-simple-icons";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, ExternalLink } from "lucide-react";

export default function Home() {
    const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    // Auto-rotate slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 3);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const slides = [
        {
            image: "/assets/images-for-the-new-website/slider-pic-after-hero.jpeg",
            title: "Excellence Diplomatique",
            content: "Le Consulat Général de Côte d'Ivoire à New York est fier de servir la communauté ivoirienne avec excellence et professionnalisme. Notre équipe diplomatique s'engage à faciliter vos démarches administratives."
        },
        {
            image: "/assets/images-for-the-new-website/actualite-pic-1.jpeg",
            title: "Services Consulaires",
            content: "Nous offrons une gamme complète de services consulaires incluant les visas, les documents civils, les cartes consulaires et bien plus encore. Notre mission est de vous accompagner dans toutes vos démarches."
        },
        {
            image: "/assets/images-for-the-new-website/actualite-pic-2.jpeg",
            title: "Lien Culturel",
            content: "Le consulat organise régulièrement des événements culturels pour renforcer les liens entre la diaspora ivoirienne et la Côte d'Ivoire. Découvrez nos activités et participez à la promotion de notre riche culture."
        },
        // {
        //     image: "/assets/images-for-the-new-website/actualite-pic-4.png",
        //     title: "Lien Culturel",
        //     content: "Le consulat organise régulièrement des événements culturels pour renforcer les liens entre la diaspora ivoirienne et la Côte d'Ivoire. Découvrez nos activités et participez à la promotion de notre riche culture."
        // }
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
            <section className="relative bg-[#EBEBEB] py-12 overflow-hidden">
                {/* Background image with opacity */}
                <div
                    className="absolute inset-0 z-0"
                    aria-hidden="true"
                >
                    <img
                        src="/assets/images-for-the-new-website/civ_usa_flag_no_bg.png"
                        alt=""
                        className="w-full h-full object-cover object-center"
                        style={{ opacity: 0.18 }}
                    />
                </div>
                <div className="relative z-10 container mx-auto px-6">
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
                            className="h-54 mx-auto mb-1"
                        />
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                            CONSULAT GÉNÉRAL DE CÔTE D'IVOIRE
                        </h1>
                        <p className="text-lg text-gray-600 mt-2">
                            NEW YORK - ÉTATS-UNIS
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Slider Section */}
            <section className="py-12 bg-gray-100">
                <div className="container mx-auto px-6">
                    <div className="relative max-w-6xl mx-auto">
                        <div className="bg-white rounded-xl shadow-lg p-8 relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col lg:flex-row items-center gap-8"
                                >
                                    {/* Image on left */}
                                    <div className="lg:w-1/2">
                                        <img 
                                            src={slides[currentSlide].image}
                                            alt={slides[currentSlide].title}
                                            className="w-full h-80 object-cover rounded-lg shadow-md"
                                        />
                                    </div>
                                    
                                    {/* Text on right */}
                                    <div className="lg:w-1/2 px-4">
                                        <motion.h2 
                                            className="text-3xl font-bold text-gray-900 mb-4"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {slides[currentSlide].title}
                                        </motion.h2>
                                        <motion.p 
                                            className="text-lg text-gray-600 leading-relaxed mb-6"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            {slides[currentSlide].content}
                                        </motion.p>
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.6 }}
                                        >
                                            <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2">
                                                En savoir plus
                                            </Button>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                            
                            {/* Navigation Arrows */}
                            <button
                                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110"
                            >
                                <ChevronLeft className="w-6 h-6 text-gray-600" />
                            </button>
                            
                            <button
                                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110"
                            >
                                <ChevronRight className="w-6 h-6 text-gray-600" />
                            </button>
                        </div>
                        
                        {/* Slider indicators */}
                        <div className="flex justify-center mt-8 space-x-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        currentSlide === index ? 'bg-orange-600 scale-125' : 'bg-gray-400'
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
                                    <Card className="h-full py-0 overflow-hidden hover:shadow-xl transition-shadow duration-300 rounded-none rounded-tr-3xl rounded-bl-[35]">
                                        <CardContent className="p-0 h-full flex flex-col">
                                            <div className="h-full p-0 overflow-hidden">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.title}
                                                    className="h-full rounded-none rounded-bl-[75] object-cover"
                                                />
                                            </div>
                                            <div className="p-6 flex-1 flex flex-col">
                                                <p className="text-sm text-orange-600 font-medium mb-2">{item.date}</p>
                                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                                <p className="text-gray-600 mb-4 flex-1">{item.excerpt}</p>
                                                <Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white self-start rounded-none rounded-tr-xl rounded-bl-xl rounded-br-xl">
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
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Services consulaires</h2>
                        <p className="text-xl text-gray-600">Eiusmod exercitation eiusmod cupidatat ipsum dolore ipsum ex. <br /> Irure commodo Lorem sint cupidatat.</p>

                    </div>
                    
                    {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto"> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="h-full hover:shadow-lg transition-all duration-300 border-orange-100 bg-gradient-to-b from-white to-orange-100">
                                    <CardContent className="p-6 flex items-center gap-4">
                                        {/* Text content on left */}
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                                            <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                                            <Button 
                                                className="bg-orange-600 hover:bg-orange-700 text-white text-sm py-2 px-4"
                                                onClick={() => window.open(service.link, '_blank')}
                                            >
                                                <ExternalLink className="w-3 h-3 mr-2" />
                                                Accéder
                                            </Button>
                                        </div>
                                        
                                        {/* Icon on right */}
                                        <div className="flex-shrink-0">
                                            <img 
                                                src={service.icon} 
                                                alt={service.title}
                                                className="w-16 h-16"
                                            />
                                        </div>
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
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">PHOTOS</h2>
                    </div>
                    
                    <div className="relative max-w-6xl mx-auto">
                        <div className="overflow-hidden">
                            <motion.div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${currentPhotoIndex * 100}%)` }}
                            >
                                {/* Create multiple photo sets */}
                                {Array.from({ length: 3 }, (_, setIndex) => (
                                    <div key={setIndex} className="w-full flex-shrink-0">
                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                            {Array.from({ length: 6 }, (_, photoIndex) => (
                                                <motion.div
                                                    key={`${setIndex}-${photoIndex}`}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.5, delay: photoIndex * 0.1 }}
                                                    viewport={{ once: true }}
                                                    className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                                >
                                                    <img 
                                                        src={`https://picsum.photos/300/200?random=${setIndex * 6 + photoIndex + 1}`}
                                                        alt={`Photo ${setIndex * 6 + photoIndex + 1}`}
                                                        className="w-full h-40 object-cover rounded-lg"
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                        
                        {/* Navigation Arrows */}
                        <button
                            onClick={() => setCurrentPhotoIndex((prev) => (prev - 1 + 3) % 3)}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-600" />
                        </button>
                        
                        <button
                            onClick={() => setCurrentPhotoIndex((prev) => (prev + 1) % 3)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-600" />
                        </button>
                        
                        {/* Photo indicators */}
                        <div className="flex justify-center mt-8 space-x-2">
                            {Array.from({ length: 3 }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPhotoIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        currentPhotoIndex === index ? 'bg-orange-600 scale-125' : 'bg-gray-400'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Gallery */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">VIDÉO</h2>
                        <p className="text-lg text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {videos.map((video, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <img 
                                        src={video.cover} 
                                        alt={`Video ${index + 1}`}
                                        className="w-full h-56 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="bg-white rounded-full p-3">
                                            <Play className="w-6 h-6 text-orange-600" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
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
                                <SiFacebook className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-white/80 hover:text-white transition-colors">
                                <span className="sr-only">Instagram</span>
                                <SiInstagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-white/80 hover:text-white transition-colors">
                                <span className="sr-only">X (Twitter)</span>
                                <SiX className="w-6 h-6" />
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