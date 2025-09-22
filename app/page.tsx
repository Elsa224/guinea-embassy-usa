"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiFacebook, SiInstagram, SiX } from "@icons-pack/react-simple-icons";

import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowUp,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    Play,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
    const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    // Auto-rotate slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % 3);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Handle scroll effects
    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 100;
            setIsScrolled(scrolled);

            // Show back to top button when near bottom of page
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = document.documentElement.scrollTop;
            const clientHeight = document.documentElement.clientHeight;
            const isNearBottom = scrollTop + clientHeight >= scrollHeight * 0.8;
            setShowBackToTop(isNearBottom);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const slides = [
        {
            image: "/assets/images-for-the-new-website/slider-pic-after-hero.jpeg",
            title: "Excellence Diplomatique",
            content:
                "Le Consulat Général de Côte d'Ivoire à New York est fier de servir la communauté ivoirienne avec excellence et professionnalisme. Notre équipe diplomatique s'engage à faciliter vos démarches administratives.",
        },
        {
            image: "/assets/images-for-the-new-website/actualite-pic-1.jpeg",
            title: "Services Consulaires",
            content:
                "Nous offrons une gamme complète de services consulaires incluant les visas, les documents civils, les cartes consulaires et bien plus encore. Notre mission est de vous accompagner dans toutes vos démarches.",
        },
        {
            image: "/assets/images-for-the-new-website/actualite-pic-2.jpeg",
            title: "Lien Culturel",
            content:
                "Le consulat organise régulièrement des événements culturels pour renforcer les liens entre la diaspora ivoirienne et la Côte d'Ivoire. Découvrez nos activités et participez à la promotion de notre riche culture.",
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
            excerpt:
                "Le consulat annonce une nouvelle procédure simplifiée pour les demandes de visa...",
            date: "15 Janvier 2025",
        },
        {
            image: "/assets/images-for-the-new-website/actualite-pic-2.jpeg",
            title: "Horaires d'ouverture modifiés",
            excerpt:
                "Veuillez noter les nouveaux horaires d'ouverture du consulat général...",
            date: "12 Janvier 2025",
        },
        {
            image: "/assets/images-for-the-new-website/actualite-pic-3.jpeg",
            title: "Événement culturel ivoirien",
            excerpt:
                "Le consulat organise un événement culturel pour célébrer...",
            date: "10 Janvier 2025",
        },
        {
            image: "/assets/images-for-the-new-website/actualite-pic-1.jpeg",
            title: "Formation consulaire",
            excerpt: "Sessions de formation pour les membres de la diaspora...",
            date: "8 Janvier 2025",
        },
    ];

    const services = [
        {
            icon: "/assets/images-for-the-new-website/services/PICTO-02.png",
            title: "VISA",
            description:
                "Pour obtenir un visa, le demandeur doit fournir un dossier électronique comprenant les pièces ci-après.",
            link: "https://www.paf.gov.gn/visa",
        },
        {
            icon: "/assets/images-for-the-new-website/services/PICTO-06.png",
            title: "CARTE CONSULAIRE",
            description:
                "Plateforme en ligne dédiée à la demande de carte consulaire.",
            link: "https://express54.org",
        },
        {
            icon: "/assets/images-for-the-new-website/services/PICTO-04.png",
            title: "AUTRES DOCUMENTS",
            description:
                "Plateforme en ligne dédiée à la demande d'autres documents administratifs.",
            link: "https://express54.org",
        },
        {
            icon: "/assets/images-for-the-new-website/services/PICTO-01.png",
            title: "DOCUMENTS CIVILS",
            description:
                "Plateforme en ligne dédiée à la demande de documents civils.",
            link: "https://express54.org",
        },
        {
            icon: "/assets/images-for-the-new-website/services/PICTO-02.png",
            title: "TITRE DE VOYAGE",
            description:
                "Plateforme en ligne dédiée à la demande de titre de voyage.",
            link: "https://express54.org",
        },
        {
            icon: "/assets/images-for-the-new-website/services/PICTO-03.png",
            title: "DELIVERY EXPRESS",
            description:
                "Plateforme en ligne dédiée à la demande de livraison express.",
            link: "https://express54.org",
        },
    ];

    const videos = [
        {
            cover: "/assets/images-for-the-new-website/video-cover-1.jpeg",
            title: "Présentation du Consulat",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            youtubeId: "dQw4w9WgXcQ",
        },
        {
            cover: "/assets/images-for-the-new-website/video-cover-2.jpeg",
            title: "Procédures Administratives",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            youtubeId: "dQw4w9WgXcQ",
        },
        {
            cover: "/assets/images-for-the-new-website/video-cover-3.jpeg",
            title: "Événements Culturels",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            youtubeId: "dQw4w9WgXcQ",
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <nav
                className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? "border-b bg-white/95 shadow-lg backdrop-blur-md"
                        : "border-b bg-white shadow-sm"
                }`}
            >
                <div className="container mx-auto px-6">
                    <div className="flex justify-center py-4">
                        <div className="flex space-x-8">
                            {[
                                {
                                    label: "Accueil",
                                    href: "#accueil",
                                    isActive: true,
                                },
                                {
                                    label: "Actualités",
                                    href: "#actualites",
                                    isActive: false,
                                },
                                {
                                    label: "Services Consulaires",
                                    href: "#services-consulaires",
                                    isActive: false,
                                },
                                {
                                    label: "Côte d'Ivoire",
                                    href: "",
                                    isActive: false,
                                },
                                {
                                    label: "Multimedia",
                                    href: "#multimedia",
                                    isActive: false,
                                },
                                {
                                    label: "Contacts",
                                    href: "#contacts",
                                    isActive: false,
                                },
                            ].map((item, index) => (
                                <div key={index} className="group relative">
                                    <a
                                        href={item.href}
                                        className={`block px-2 py-1 font-medium transition-colors duration-300 ${
                                            item.isActive
                                                ? "text-orange-600"
                                                : "text-gray-800 hover:text-orange-600"
                                        }`}
                                    >
                                        {item.label}
                                    </a>
                                    <span
                                        className={`absolute bottom-0 left-2 h-0.5 bg-orange-600 transition-all duration-300 ${
                                            item.isActive
                                                ? "w-[calc(100%-1rem)]"
                                                : "w-0 group-hover:w-[calc(100%-1rem)]"
                                        }`}
                                    ></span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Spacer for fixed navbar */}
            <div className="h-16"></div>

            {/* Hero Section */}
            <section
                id="accueil"
                className="relative overflow-hidden bg-[#EBEBEB] py-12"
            >
                {/* Background image with opacity */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <img
                        src="/assets/images-for-the-new-website/civ_usa_flag_no_bg.png"
                        alt=""
                        className="mb-5 h-full w-full object-cover object-center"
                        style={{ opacity: 0.8 }}
                    />
                </div>
                <div className="relative z-10 container mx-auto px-6">
                    {/* Logo centered at top */}
                    <motion.div
                        className="mb-8 text-center"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src="/assets/images-for-the-new-website/logo-removebg-preview.png"
                            alt="Logo Consulat"
                            className="mx-auto h-94"
                        />
                        {/* <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                            CONSULAT GÉNÉRAL DE CÔTE D'IVOIRE
                        </h1>
                        <p className="text-lg text-gray-600 mt-2">
                            NEW YORK - ÉTATS-UNIS
                        </p> */}
                    </motion.div>
                </div>
            </section>

            {/* Slider Section */}
            <section className="bg-gray-100 py-0">
                <div className="container mx-auto px-6">
                    <div className="relative mx-auto max-w-6xl">
                        <div className="relative m-[-15px] rounded-none rounded-tr-[35] rounded-br-[35] rounded-bl-[35] bg-white p-8 shadow-lg">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col items-center gap-8 lg:flex-row"
                                >
                                    {/* Image on left */}
                                    <div className="lg:w-1/2">
                                        <img
                                            src={slides[currentSlide].image}
                                            alt={slides[currentSlide].title}
                                            className="h-80 w-full rounded-lg object-cover shadow-md"
                                        />
                                    </div>

                                    {/* Text on right */}
                                    <div className="px-4 lg:w-1/2">
                                        <motion.h2
                                            className="mb-4 text-3xl font-bold text-gray-900"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {slides[currentSlide].title}
                                        </motion.h2>
                                        <motion.p
                                            className="mb-6 text-lg leading-relaxed text-gray-600"
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
                                            <Button className="bg-orange-600 px-6 py-2 text-white hover:bg-orange-700">
                                                En savoir plus
                                            </Button>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation Arrows */}
                            <button
                                onClick={() =>
                                    setCurrentSlide(
                                        prev =>
                                            (prev - 1 + slides.length) %
                                            slides.length
                                    )
                                }
                                className="absolute top-1/2 left-4 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md transition-all duration-200 hover:scale-110 hover:bg-gray-50"
                            >
                                <ChevronLeft className="h-6 w-6 text-gray-600" />
                            </button>

                            <button
                                onClick={() =>
                                    setCurrentSlide(
                                        prev => (prev + 1) % slides.length
                                    )
                                }
                                className="absolute top-1/2 right-4 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md transition-all duration-200 hover:scale-110 hover:bg-gray-50"
                            >
                                <ChevronRight className="h-6 w-6 text-gray-600" />
                            </button>
                        </div>

                        {/* Slider indicators */}
                        <div className="mt-8 flex justify-center space-x-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-3 w-3 rounded-full transition-all duration-300 ${
                                        currentSlide === index
                                            ? "scale-125 bg-orange-600"
                                            : "bg-gray-400"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* News Section */}
            <section id="actualites" className="bg-gray-50/20 py-12">
                {/* Africa CIV background image, aligned to left */}
                <img
                    src="/assets/images-for-the-new-website/africa-civ-green.png"
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute top-390 right-0 z-0 h-full w-auto max-w-[40vw] min-w-[200px] opacity-100 select-none"
                    style={{
                        objectFit: "contain",
                        objectPosition: "left top",
                    }}
                />
                <div className="container mx-auto px-6">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-4xl font-bold text-gray-900">
                            Actualités
                        </h2>
                        <p className="text-xl text-gray-600">
                            Restez informés des dernières nouvelles du consulat
                        </p>
                    </div>

                    <div className="relative">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {newsItems
                                .slice(currentNewsIndex, currentNewsIndex + 3)
                                .map((item, index) => (
                                    <motion.div
                                        key={index + currentNewsIndex}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.1,
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        <Card className="h-full overflow-hidden rounded-none rounded-tr-3xl rounded-bl-[35] py-0 transition-shadow duration-300 hover:shadow-xl">
                                            <CardContent className="flex h-full flex-col p-0">
                                                <div className="h-full overflow-hidden p-0">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="h-full rounded-none rounded-bl-[75] object-cover"
                                                    />
                                                </div>
                                                <div className="flex flex-1 flex-col p-6">
                                                    <p className="mb-2 text-sm font-medium text-orange-600">
                                                        {item.date}
                                                    </p>
                                                    <h3 className="mb-3 text-xl font-bold text-gray-900">
                                                        {item.title}
                                                    </h3>
                                                    <p className="mb-4 flex-1 text-gray-600">
                                                        {item.excerpt}
                                                    </p>
                                                    <Button
                                                        variant="outline"
                                                        className="self-start rounded-none rounded-tr-xl rounded-br-xl rounded-bl-xl border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
                                                    >
                                                        Lire plus
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                        </div>

                        {/* Navigation buttons */}
                        <div className="mt-8 flex items-center justify-between">
                            <Button
                                variant="outline"
                                onClick={() =>
                                    setCurrentNewsIndex(
                                        Math.max(0, currentNewsIndex - 3)
                                    )
                                }
                                disabled={currentNewsIndex === 0}
                                className="flex items-center"
                            >
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Précédent
                            </Button>

                            <Button className="bg-orange-600 text-white hover:bg-orange-700">
                                Voir Plus
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() =>
                                    setCurrentNewsIndex(
                                        Math.min(
                                            newsItems.length - 3,
                                            currentNewsIndex + 3
                                        )
                                    )
                                }
                                disabled={
                                    currentNewsIndex >= newsItems.length - 3
                                }
                                className="flex items-center"
                            >
                                Suivant
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
                {/* </section> */}

                {/* Services Section */}
                {/* <section
                id="services-consulaires"
                className="py-12 bg-gray-50/20 relative overflow-hidden"
                style={{
                    // fallback for non-tailwind users, but tailwind is used here
                }}
            > */}
                {/* Africa CIV background image, aligned to left */}
                {/* <img
                    src="/assets/images-for-the-new-website/africa-civ-green.png"
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none select-none absolute right-[-60] top-0 h-full w-auto max-w-[40vw] min-w-[200px] z-0"
                    style={{
                        objectFit: "contain",
                        objectPosition: "left top",
                    }} */}
                {/*/> */}
                <div className="relative z-10 container mx-auto px-6 py-12">
                    <div className="mb-8 text-center">
                        <h2 className="mb-4 text-4xl font-bold text-gray-900">
                            Services consulaires
                        </h2>
                        <p className="text-xl text-gray-600">
                            Eiusmod exercitation eiusmod cupidatat ipsum dolore
                            ipsum ex. <br /> Irure commodo Lorem sint cupidatat.
                        </p>
                    </div>

                    {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto"> */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                viewport={{ once: true }}
                            >
                                <Card className="h-full border-orange-100 bg-gradient-to-b from-white to-orange-100 transition-all duration-300 hover:shadow-lg">
                                    <CardContent className="flex items-center gap-4 px-6 py-[10px]">
                                        {/* Text content on left */}
                                        <div className="flex-1">
                                            <h3 className="mb-2 text-lg font-bold text-gray-900">
                                                {service.title}
                                            </h3>
                                            <p className="mb-4 text-sm text-gray-600">
                                                {service.description}
                                            </p>
                                            <Button
                                                className="bg-orange-600 px-4 py-2 text-sm text-white hover:bg-orange-700"
                                                onClick={() =>
                                                    window.open(
                                                        service.link,
                                                        "_blank"
                                                    )
                                                }
                                            >
                                                <ExternalLink className="mr-2 h-3 w-3" />
                                                Accéder
                                            </Button>
                                        </div>

                                        {/* Icon on right */}
                                        <div className="flex-shrink-0">
                                            <img
                                                src={service.icon}
                                                alt={service.title}
                                                className="h-16 w-16"
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
            <section
                id="multimedia"
                className="bg-gradient-to-br from-orange-200 to-orange-300 py-12"
            >
                <div className="container mx-auto px-6">
                    <div className="mb-8 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-800">
                            PHOTOS
                        </h2>
                    </div>

                    <div className="relative mx-auto max-w-6xl">
                        <div className="overflow-hidden">
                            <motion.div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{
                                    transform: `translateX(-${currentPhotoIndex * 100}%)`,
                                }}
                            >
                                {/* Create multiple photo sets */}
                                {Array.from({ length: 3 }, (_, setIndex) => (
                                    <div
                                        key={setIndex}
                                        className="w-full flex-shrink-0"
                                    >
                                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                                            {Array.from(
                                                { length: 6 },
                                                (_, photoIndex) => (
                                                    <motion.div
                                                        key={`${setIndex}-${photoIndex}`}
                                                        initial={{
                                                            opacity: 0,
                                                            scale: 0.8,
                                                        }}
                                                        whileInView={{
                                                            opacity: 1,
                                                            scale: 1,
                                                        }}
                                                        transition={{
                                                            duration: 0.5,
                                                            delay:
                                                                photoIndex *
                                                                0.1,
                                                        }}
                                                        viewport={{
                                                            once: true,
                                                        }}
                                                        className="relative overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg"
                                                    >
                                                        <img
                                                            src={`https://picsum.photos/300/200?random=${setIndex * 6 + photoIndex + 1}`}
                                                            alt={`Photo ${setIndex * 6 + photoIndex + 1}`}
                                                            className="h-40 w-full rounded-lg object-cover"
                                                        />
                                                    </motion.div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={() =>
                                setCurrentPhotoIndex(prev => (prev - 1 + 3) % 3)
                            }
                            className="absolute top-1/2 left-4 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md transition-all duration-200 hover:scale-110 hover:bg-gray-50"
                        >
                            <ChevronLeft className="h-6 w-6 text-gray-600" />
                        </button>

                        <button
                            onClick={() =>
                                setCurrentPhotoIndex(prev => (prev + 1) % 3)
                            }
                            className="absolute top-1/2 right-4 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md transition-all duration-200 hover:scale-110 hover:bg-gray-50"
                        >
                            <ChevronRight className="h-6 w-6 text-gray-600" />
                        </button>

                        {/* Photo indicators */}
                        <div className="mt-8 flex justify-center space-x-2">
                            {Array.from({ length: 3 }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPhotoIndex(index)}
                                    className={`h-3 w-3 rounded-full transition-all duration-300 ${
                                        currentPhotoIndex === index
                                            ? "scale-125 bg-orange-600"
                                            : "bg-gray-400"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Gallery */}
            <section className="bg-white py-12">
                <div className="container mx-auto px-6">
                    <div className="mb-8 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900">
                            VIDÉO
                        </h2>
                        <p className="text-lg text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
                        {videos.map((video, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                viewport={{ once: true }}
                            >
                                <div className="group relative cursor-pointer overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg">
                                    <img
                                        src={video.cover}
                                        alt={`Video ${index + 1}`}
                                        className="h-56 w-full object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <div className="rounded-full bg-white p-3">
                                            <Play className="h-6 w-6 text-orange-600" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Côte d'Ivoire Section */}
            {/* 
            <section id="cote-divoire" className="py-12 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">CÔTE D'IVOIRE</h2>
                        <p className="text-lg text-gray-600">Découvrez la richesse culturelle et économique de la Côte d'Ivoire</p>
                    </div>
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-gray-700 leading-relaxed mb-6">
                            La République de Côte d'Ivoire, située en Afrique de l'Ouest, est un pays dynamique 
                            reconnu pour sa diversité culturelle, son économie florissante et son hospitalité légendaire. 
                            Premier producteur mondial de cacao et important acteur dans l'industrie du café, 
                            la Côte d'Ivoire joue un rôle majeur dans l'économie régionale et internationale.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Culture</h3>
                                <p className="text-gray-600">Plus de 60 ethnies et une richesse culturelle exceptionnelle</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Économie</h3>
                                <p className="text-gray-600">Leader africain dans l'agriculture et l'industrie</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
                                <p className="text-gray-600">Hub technologique et financier de l'Afrique de l'Ouest</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* Footer */}
            <footer
                id="contacts"
                className="bg-gradient-to-br from-green-700 to-green-900 py-12 text-white"
            >
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {/* Section 1: Navigation */}
                        <div>
                            <h3 className="mb-6 text-xl font-bold">
                                COTE D'IVOIRE & USA
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <a
                                        href="#"
                                        className="text-white/80 transition-colors hover:text-white"
                                    >
                                        Collaborateurs
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-white/80 transition-colors hover:text-white"
                                    >
                                        Services Consulaires
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-white/80 transition-colors hover:text-white"
                                    >
                                        Activités
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-white/80 transition-colors hover:text-white"
                                    >
                                        Service aux Étudiants
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-white/80 transition-colors hover:text-white"
                                    >
                                        Vidéo
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-white/80 transition-colors hover:text-white"
                                    >
                                        Photo
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-white/80 transition-colors hover:text-white"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Section 2: Contact */}
                        <div>
                            <h3 className="mb-6 text-xl font-bold">
                                AMBASSADE
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="mb-2 font-semibold">
                                        Email :
                                    </h4>
                                    <p className="text-white/80">
                                        Support : info@ambacidc.org
                                    </p>
                                </div>
                                <div>
                                    <h4 className="mb-2 font-semibold">
                                        Téléphone :
                                    </h4>
                                    <ul className="space-y-1 text-sm text-white/80">
                                        <li>
                                            Bureau de l'Ambassadeur : (202)
                                            938-0343
                                        </li>
                                        <li>
                                            Service Consulaire : 202-938-0310
                                            ext.1720/1724
                                        </li>
                                        <li>
                                            Passeport Biométrique : 202-938-0310
                                            ext. 1725/1727
                                        </li>
                                        <li>Secrétariat : 202-204-3980</li>
                                        <li>Étudiant : 240 355 89 48</li>
                                        <li>Tourisme : 202-756-8332</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Liens Institutionnels */}
                        <div>
                            <h3 className="mb-6 text-xl font-bold">
                                Liens Institutionnels
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <a
                                        href="#"
                                        className="text-white/80 transition-colors hover:text-white"
                                    >
                                        Direction du Tourisme aux USA
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-white/80 transition-colors hover:text-white"
                                    >
                                        Direction Économique USA
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-white/80 transition-colors hover:text-white"
                                    >
                                        U.S. Department of State
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-white/80 transition-colors hover:text-white"
                                    >
                                        La Présidence
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-white/80 transition-colors hover:text-white"
                                    >
                                        La Primature
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-white/80 transition-colors hover:text-white"
                                    >
                                        L'Assemblée Nationale
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-white/80 transition-colors hover:text-white"
                                    >
                                        Conseil Économique et Social
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-white/80 transition-colors hover:text-white"
                                    >
                                        Le Ministère des Affaires Étrangères
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-white/80 transition-colors hover:text-white"
                                    >
                                        Le Médiateur de la République
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Section 4: Localisation */}
                        <div>
                            <h3 className="mb-6 text-xl font-bold">
                                Localisation
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="mb-2 font-semibold">
                                        Adresse :
                                    </h4>
                                    <p className="text-white/80">
                                        2424 Massachusetts Avenue,
                                        <br />
                                        N.W., Washington D.C. 20008 (USA)
                                    </p>
                                </div>
                                <div>
                                    <h4 className="mb-2 font-semibold">
                                        Recevoir par Whatsapp :
                                    </h4>
                                    <p className="text-white/80">
                                        (+1 202 658 3602)
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row pt-6 space-x-6">
                            <a
                                href="#"
                                className="text-white/80 transition-colors hover:text-white"
                            >
                                <span className="sr-only">Facebook</span>
                                <SiFacebook className="h-6 w-6" />
                            </a>
                            <a
                                href="#"
                                className="text-white/80 transition-colors hover:text-white"
                            >
                                <span className="sr-only">Instagram</span>
                                <SiInstagram className="h-6 w-6" />
                            </a>
                            <a
                                href="#"
                                className="text-white/80 transition-colors hover:text-white"
                            >
                                <span className="sr-only">X (Twitter)</span>
                                <SiX className="h-6 w-6" />
                            </a>
                        </div>
                            
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="mt-12 border-t border-green-600 pt-8">
                        <p className="mt-4 text-center text-white/60">
                            © 2025 Consulat Général de Côte d'Ivoire. Tous
                            droits réservés.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Back to Top Button */}
            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={scrollToTop}
                        className="fixed right-8 bottom-8 z-50 rounded-full bg-orange-600 p-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-orange-700 hover:shadow-xl"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ArrowUp className="h-6 w-6" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
