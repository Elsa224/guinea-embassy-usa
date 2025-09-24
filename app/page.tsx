"use client";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, MessageSquareQuote, Play, Quote } from "lucide-react";
import { useState } from "react";

export default function Home() {
    const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const images = [
        { imgSrc: "/assets/images-for-the-new-website/video-cover-1.jpeg" },
        { imgSrc: "/assets/images-for-the-new-website/video-cover-2.jpeg" },
        { imgSrc: "/assets/images-for-the-new-website/gallery-1.jpeg" },
        { imgSrc: "/assets/images-for-the-new-website/video-cover-3.jpeg" },
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
            image: "/assets/images-for-the-new-website/gallery-2.jpeg",
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
            link: "https://express54.org",
        },
        {
            icon: "/assets/images-for-the-new-website/services/PICTO-06.png",
            title: "PASSEPORT",
            description:
                "Plateforme en ligne dédiée à la demande de passport.",
            link: "https://express54.org",
        },
        {
            icon: "/assets/images-for-the-new-website/services/PICTO-06.png",
            title: "CARTE CONSULAIRE",
            description:
                "Plateforme en ligne dédiée à la demande de carte consulaire.",
            link: "https://express54.org",
        },
        {
            icon: "/assets/images-for-the-new-website/services/PICTO-03.png",
            title: "DELIVERY EXPRESS",
            description:
                "Plateforme en ligne dédiée à la demande de livraison express.",
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
        <Layout currentPath="/">
            {/* Page Content */}

            {/* Hero Section */}
            <section
                id="accueil"
                className="relative h-full overflow-hidden py-12"
            >
                {/* Background image with opacity */}
                <div className="relative z-10 container mx-auto px-4 sm:px-6">
                    {/* Logo centered at top */}
                    <motion.div
                        className="mb-8 text-center"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src="/assets/images-for-the-new-website/logo_updated.png"
                            alt="Logo Consulat"
                            className="mx-auto h-32 pb-8 sm:h-40 sm:pb-12 md:h-48 md:pb-16 lg:h-114 lg:pb-35"
                        />
                    </motion.div>
                </div>
                <div className="absolute inset-0 bottom-20 z-0" aria-hidden="true">
                    <img
                        src="/assets/images-for-the-new-website/first-hero-background.png"
                        alt=""
                        className="mb-5 h-full w-full object-cover object-center"
                        style={{ opacity: 1 }}
                    />
                </div>
                <div className="absolute inset-0 top-20 z-0" aria-hidden="true">
                    <img
                        src="/assets/images-for-the-new-website/civ_usa_flag_no_bg.png"
                        alt=""
                        className="mb-5 h-full w-full object-cover object-center"
                        style={{ opacity: 1 }}
                    />
                </div>
            </section>

            {/* Consul Message Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-orange-50/30 py-8">
                {/* Decorative background elements */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-10 right-10 h-32 w-32 rounded-full bg-orange-400 blur-3xl"></div>
                    <div className="absolute bottom-10 left-10 h-24 w-24 rounded-full bg-green-400 blur-2xl"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6">
                    <div className="relative mx-auto max-w-6xl">
                        {/* Section Title */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-8 text-center"
                        >
                            <h2 className="mb-2 text-2xl font-bold text-gray-800 sm:text-3xl lg:text-4xl">
                                Message du Consul Général
                            </h2>
                            {/* <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-green-600"></div> */}
                        </motion.div>

                        <div className="relative overflow-hidden rounded-2xl border border-orange-100/50 bg-white shadow-2xl">
                            {/* Decorative top border */}
                            <div className="h-2 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>

                            <div className="p-6 sm:p-8 lg:p-10">
                                <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
                                    {/* Consul Image on left */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8 }}
                                        className="relative w-full lg:w-2/5"
                                    >
                                        <div className="relative">
                                            <div className="absolute inset-0 scale-105 rounded-2xl bg-gradient-to-r from-orange-400/20 to-green-400/20 blur-lg"></div>
                                            <img
                                                src="/assets/images-for-the-new-website/consul-picture.jpeg"
                                                alt="S.E.M Inza CAMARA - Consul Général de Côte d'Ivoire à New York"
                                                className="relative h-auto w-full rounded-2xl border-4 border-white object-none shadow-xl sm:max-h-80 lg:max-h-96 xl:max-h-[28rem]"
                                            />
                                            {/* Decorative frame corners */}
                                            <div className="absolute top-2 left-2 h-8 w-8 rounded-tl-lg border-t-4 border-l-4 border-orange-500"></div>
                                            <div className="absolute top-2 right-2 h-8 w-8 rounded-tr-lg border-t-4 border-r-4 border-green-600"></div>
                                            <div className="absolute bottom-2 left-2 h-8 w-8 rounded-bl-lg border-b-4 border-l-4 border-green-600"></div>
                                            <div className="absolute right-2 bottom-2 h-8 w-8 rounded-br-lg border-r-4 border-b-4 border-orange-500"></div>
                                        </div>
                                    </motion.div>

                                    {/* Consul Message on right */}
                                    <div className="w-full lg:w-3/5">
                                        <motion.div
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                duration: 0.8,
                                                delay: 0.2,
                                            }}
                                            className="space-y-6"
                                        >
                                            {/* Quote icon */}
                                            <div  className="mb-4 flex items-center">
                                                <div className="flex h-12 w-12 items-center justify-center">
                                                    <MessageSquareQuote className="h-44 w-44 text-orange-600" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-xs font-semibold tracking-wider text-orange-600 uppercase">
                                                        
                                                    </div>
                                                </div>
                                            </div>

                                            <blockquote className="relative">
                                                <div className="absolute top-0 -left-4 h-full w-1 rounded-full bg-gradient-to-b from-orange-500 to-green-600"></div>
                                                <div className="space-y-4 pl-8 text-sm leading-relaxed text-gray-700 sm:text-base lg:text-lg">
                                                    <p>
                                                        <span className="font-semibold text-gray-800">
                                                            Chères et Chers Compatriotes,
                                                        </span>{" "}
                                                        Au sortir d'une crise
                                                        socio-politique en 2011,
                                                        La Côte d'Ivoire a su
                                                        effacer les stigmates de
                                                        son instabilité à
                                                        l'époque grâce au plan
                                                        ambitieux de son
                                                        Excellence Monsieur
                                                        Alassane Ouattara,
                                                        Président de la
                                                        République. En plus
                                                        d'insuffler un nouveau
                                                        dynamisme économique
                                                        ivoirien, Il a su
                                                        élaborer une nouvelle
                                                        stratégie en termes de
                                                        diplomatie en
                                                        réalisant ce qu'un bon
                                                        nombre appelle un{" "}
                                                        <span className="font-semibold text-orange-600">
                                                            "Deuxième Miracle
                                                            Ivoirien"
                                                        </span>
                                                        .
                                                    </p>
                                                    <p>
                                                        C'est avec un immense
                                                        plaisir que je m'adresse
                                                        à vous, forts de la
                                                        solidarité qui nous unit
                                                        en tant que membres de la
                                                        grande famille ivoirienne
                                                        aux Etats Unis d'Amerique.
                                                    </p>
                                                    <p>
                                                        Bienvenue au Consulat
                                                        Général de la Côte
                                                        d'Ivoire à New York, <br /> ce{" "}
                                                        <span className="font-semibold text-green-600">
                                                            havre de paix
                                                        </span>{" "}
                                                        qui caractérise notre
                                                        culture et notre peuple.
                                                    </p>
                                                </div>
                                            </blockquote>

                                            {/* Signature */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    duration: 0.6,
                                                    delay: 0.6,
                                                }}
                                                className="mt-8 border-t border-gray-200 pt-6"
                                            >
                                                <div className="text-right">
                                                    <p className="mb-1 text-xl font-bold text-gray-900">
                                                        S.E.M Inza CAMARA
                                                    </p>
                                                    <p className="mb-1 text-sm font-semibold text-orange-600">
                                                        Consul Général de Côte
                                                        d'Ivoire à New York
                                                    </p>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
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
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="mb-8 text-center sm:mb-12">
                        <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:mb-4 sm:text-3xl lg:text-4xl">
                            Actualités
                        </h2>
                        <p className="text-base text-gray-600 sm:text-lg lg:text-xl">
                            Restez informés des dernières nouvelles du consulat
                        </p>
                    </div>

                    <div className="relative">
                        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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
                <div className="relative z-10 container mx-auto px-4 py-8 sm:px-6 sm:py-16">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-12 text-center"
                    >
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                            Services Consulaires
                        </h2>
                        {/* <div className="mx-auto mb-6 h-1 w-32 rounded-full bg-gradient-to-r from-orange-500 to-green-600"></div> */}
                        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 sm:text-xl">
                            Découvrez nos services consulaires complets, conçus
                            pour faciliter vos démarches administratives avec
                            efficacité et professionnalisme.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8 }}
                                className="group"
                            >
                                <Card className="relative h-full overflow-hidden rounded-2xl border-0 bg-white shadow-lg transition-all duration-300 group-hover:shadow-orange-100/50 hover:shadow-2xl">
                                    {/* Gradient top border */}
                                    <div className="h-1 bg-gradient-to-r from-orange-500 to-green-600"></div>

                                    <CardContent className="p-6">
                                        {/* Icon section */}
                                        <div className="mb-4 flex items-start justify-between">
                                            <div className="flex-1 pr-4">
                                                <div className="mb-3 flex items-center">
                                                    <div className="mr-2 h-3 w-3 rounded-full bg-orange-500"></div>
                                                    <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-orange-600">
                                                        {service.title}
                                                    </h3>
                                                </div>
                                                <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-600">
                                                    {service.description}
                                                </p>
                                            </div>

                                            {/* Icon with enhanced styling */}
                                            <div className="relative flex-shrink-0">
                                                <div className="absolute inset-0 scale-110 rounded-full bg-gradient-to-r from-orange-400/20 to-green-400/20 blur-lg transition-transform duration-300 group-hover:scale-125"></div>
                                                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-orange-100 bg-gradient-to-br from-orange-50 to-green-50 transition-colors duration-300 group-hover:border-orange-200">
                                                    <img
                                                        src={service.icon}
                                                        alt={service.title}
                                                        className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action button */}
                                        <div className="mt-auto">
                                            <Button
                                                className="w-full rounded-xl border-0 bg-gradient-to-r from-orange-600 to-orange-700 py-2.5 font-medium text-white shadow-lg transition-all duration-300 group-hover:scale-105 hover:from-orange-700 hover:to-orange-800 hover:shadow-xl"
                                                onClick={() =>
                                                    window.open(
                                                        service.link,
                                                        "_blank"
                                                    )
                                                }
                                            >
                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                Accéder au service
                                            </Button>
                                        </div>
                                    </CardContent>

                                    {/* Decorative corner accents */}
                                    <div className="absolute top-2 right-2 h-6 w-6 rounded-tr-lg border-t-2 border-r-2 border-orange-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                    <div className="absolute bottom-2 left-2 h-6 w-6 rounded-bl-lg border-b-2 border-l-2 border-green-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Help & Assistance section - Updated per boss requirements */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="mt-16"
                    >
                        <div className="mb-12 text-center">
                            <h3 className="mb-4 text-3xl font-bold text-gray-900">
                                Aide & Démarches
                            </h3>
                            <p className="mx-auto max-w-2xl text-lg text-gray-600">
                                Besoin d'aide avec vos démarches consulaires ? Découvrez nos guides pratiques 
                                pour les situations les plus fréquentes.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {/* Card 1 - Emergency Services */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                viewport={{ once: true }}
                                className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                            >
                                <div className="mb-6">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                                        <span className="text-2xl">🚨</span>
                                    </div>
                                    <h4 className="mb-4 text-xl font-bold text-gray-900">
                                        Situations d'Urgence et d'Évacuation
                                    </h4>
                                    <p className="mb-6 text-gray-600 leading-relaxed">
                                        Découvrez comment le consulat aide les ressortissants 
                                        ivoiriens en cas de crise ou de situation d'urgence.
                                    </p>
                                </div>
                                <Button className="w-full rounded-xl bg-red-600 font-medium text-white shadow-lg transition-all duration-300 hover:bg-red-700 hover:shadow-xl group-hover:scale-105">
                                    Guide d'urgence
                                </Button>
                            </motion.div>

                            {/* Card 2 - Lost/Stolen Documents */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                            >
                                <div className="mb-6">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                                        <span className="text-2xl">📄</span>
                                    </div>
                                    <h4 className="mb-4 text-xl font-bold text-gray-900">
                                        Passeport Perdu ou Volé à l'Étranger
                                    </h4>
                                    <p className="mb-6 text-gray-600 leading-relaxed">
                                        Apprenez comment remplacer votre passeport 
                                        lorsque vous êtes à l'étranger.
                                    </p>
                                </div>
                                <Button className="w-full rounded-xl bg-orange-600 font-medium text-white shadow-lg transition-all duration-300 hover:bg-orange-700 hover:shadow-xl group-hover:scale-105">
                                    Remplacer passeport
                                </Button>
                            </motion.div>

                            {/* Card 3 - Victim Support */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                            >
                                <div className="mb-6">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                        <span className="text-2xl">🤝</span>
                                    </div>
                                    <h4 className="mb-4 text-xl font-bold text-gray-900">
                                        Victimes de Crimes
                                    </h4>
                                    <p className="mb-6 text-gray-600 leading-relaxed">
                                        Découvrez comment accéder au soutien et aux ressources 
                                        si vous êtes victime d'un crime en voyage.
                                    </p>
                                </div>
                                <Button className="w-full rounded-xl bg-green-600 font-medium text-white shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl group-hover:scale-105">
                                    Obtenir du soutien
                                </Button>
                            </motion.div>
                        </div>

                        {/* Additional help section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="mt-12 rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 to-green-50 p-8 text-center"
                        >
                            <h4 className="mb-4 text-xl font-bold text-gray-900">
                                Vous ne trouvez pas ce que vous cherchez ?
                            </h4>
                            <p className="mx-auto mb-6 max-w-2xl text-gray-600">
                                Notre équipe consulaire est à votre disposition pour vous accompagner 
                                dans toutes vos démarches administratives spécifiques.
                            </p>
                            <Button className="rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:from-green-700 hover:to-green-800 hover:shadow-xl">
                                Nous contacter
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Médiathèque Section - Merged Photo/Video Gallery */}
            <section
                id="mediatheque"
                className="bg-gradient-to-br from-gray-50 to-orange-50 py-12"
            >
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="mb-8 text-center sm:mb-12">
                        <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:mb-4 sm:text-4xl">
                            Médiathèque
                        </h2>
                        <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
                            Découvrez nos événements, cérémonies et moments marquants 
                            du Consulat Général de Côte d'Ivoire à New York.
                        </p>
                    </div>

                    <div className="mx-auto max-w-7xl">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
                            {/* Left side - Photo grid */}
                            <div className="lg:col-span-2">
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Photo thumbnails */}
                                    {images.map((img, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: index * 0.1,
                                            }}
                                            viewport={{ once: true }}
                                            className="group relative cursor-pointer overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                        >
                                            <img
                                                src={img.imgSrc}
                                                alt={`Galerie ${index + 1}`}
                                                className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                <div className="absolute bottom-4 left-4">
                                                    <span className="text-xs font-medium text-white">
                                                        Image {index + 1}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Right side - Featured media */}
                            <div className="lg:col-span-3">
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl"
                                >
                                    {/* Featured image */}
                                    <div className="relative aspect-video w-full h-full">
                                        <img
                                            src="/assets/images-for-the-new-website/gallery-4.jpeg"
                                            alt="Image mise en avant"
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                                            <div className="absolute bottom-8 left-8 right-8">
                                                <h3 className="mb-3 text-2xl font-bold text-white">
                                                    Événement Diplomatique Majeur
                                                </h3>
                                                <p className="text-sm leading-relaxed text-white/90">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Play button overlay for videos */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                            <div className="rounded-full bg-white/90 p-4 shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-110">
                                                <Play className="h-8 w-8 text-orange-600" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Video thumbnails row */}
                        <div hidden className="mt-12">
                            <h3 className="mb-6 text-xl font-bold text-gray-900">
                                Vidéos Récentes
                            </h3>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                                        className="group relative cursor-pointer overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                    >
                                        <img
                                            src={video.cover}
                                            alt={video.title}
                                            className="aspect-video w-full object-cover"
                                        />
                                        
                                        {/* Video overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <h4 className="text-sm font-semibold text-white">
                                                    {video.title}
                                                </h4>
                                                <p className="text-xs text-white/80">
                                                    {video.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Play button */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                            <div className="rounded-full bg-white/90 p-3 shadow-lg">
                                                <Play className="h-6 w-6 text-orange-600" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* See more button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="mt-12 text-center"
                        >
                            <Button className="rounded-full bg-gradient-to-r from-orange-600 to-orange-700 px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:from-orange-700 hover:to-orange-800 hover:shadow-xl">
                                Voir plus
                            </Button>
                        </motion.div>
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
        </Layout>
    );
}
