"use client";

import Navigation from "@/components/Navigation";
import NotificationBanner from "@/components/NotificationBanner";
import NotificationPopup from "@/components/NotificationPopup";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // Show important announcement popup after 2 seconds
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Important Flash Info Banner */}
            <NotificationBanner
                type="error"
                message="🚨 Flash Info: Transition énergétique - À l'horizon 2040, l'Afrique pourrait avoir une production d'électricité 10 fois supérieure à ses besoins uniquement grâce au renouvelable (Antonio Gutierrez, SG de l'ONU)."
                persistent={true}
                dismissible={true}
            />

            {/* Important Announcement Popup */}
            <NotificationPopup
                isOpen={showPopup}
                onClose={() => setShowPopup(false)}
                title="🏛️ Nouveau Système de Rendez-vous"
                message="Le Consulat Général a mis en place un nouveau système de prise de rendez-vous en ligne pour améliorer nos services. Vous pouvez désormais réserver votre créneau directement depuis notre site web."
                type="announcement"
                actionButton={{
                    text: "Prendre Rendez-vous",
                    onClick: () => {
                        setShowPopup(false);
                        toast.success(
                            "🎉 Redirection vers le système de rendez-vous..."
                        );
                        // Navigate to appointment booking
                    },
                }}
                secondaryButton={{
                    text: "Plus tard",
                    onClick: () => setShowPopup(false),
                }}
            />

            {/* Top notification bar with auto-scrolling */}
            <div className="bg-ci-orange relative overflow-hidden py-2 text-white">
                <div className="animate-scroll whitespace-nowrap">
                    <div className="inline-block px-4 text-sm font-medium">
                        🏛️ <strong>Nouveau:</strong> Prise de rendez-vous en
                        ligne maintenant disponible • 📞 Urgences: +1 (212)
                        697-0900 • ⏰ Horaires: Lun-Ven 9h00-17h00 • 📧 Email:
                        consulat.newyork@diplomatie.gouv.ci • 🌐 Services
                        consulaires modernisés pour vous servir mieux
                    </div>
                </div>
            </div>

            {/* Main Header - Centered like original */}
            <header className="bg-white shadow-lg border-b-4 border-ci-orange">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center animate-fade-in">
                        <div className="flex items-center space-x-6">
                            <div className="gradient-ci animate-subtle-float flex h-24 w-24 items-center justify-center rounded-full shadow-xl">
                                <span className="text-white text-4xl">🇨🇮</span>
                            </div>
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">Consulat Général de Côte d'Ivoire à New York(USA)</h1>
                                <p className="text-lg ci-orange font-semibold">République de Côte d'Ivoire</p>
                                <p className="text-sm text-gray-600 italic">« Union - Discipline - Travail »</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <Navigation />

            {/* Hero Section - Improved Layout */}
            <section className="gradient-ci-soft relative py-20 overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div className="animate-slide-in">
                            <div className="mb-6 inline-flex items-center rounded-full bg-white/80 px-6 py-2 backdrop-blur-sm">
                                <span className="bg-ci-green animate-pulse-slow mr-3 h-2 w-2 rounded-full"></span>
                                <span className="text-sm font-medium text-gray-700">
                                    Service Consulaire Officiel
                                </span>
                            </div>
                            <h2 className="mb-6 text-4xl leading-tight font-bold text-gray-900 lg:text-5xl">
                                Votre{" "}
                                <span className="ci-orange">Consulat</span> à
                                <span className="ci-green"> New York</span>
                            </h2>
                            <p className="mb-8 text-lg leading-relaxed text-gray-700">
                                Services consulaires d'excellence pour la diaspora ivoirienne et nos visiteurs. 
                                Nous vous accompagnons dans toutes vos démarches officielles avec professionnalisme et efficacité.
                            </p>
                            <div className="mb-8 flex flex-col gap-4 sm:flex-row">
                                <Button
                                    className="bg-ci-orange hover:bg-ci-orange hover-lift flex items-center justify-center space-x-2 rounded-xl px-8 py-4 font-semibold text-white transition-all duration-300"
                                    size="lg"
                                >
                                    <span>📅</span>
                                    <span>Prendre Rendez-vous</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-ci-green ci-green hover:bg-ci-green hover-lift rounded-xl border-2 px-8 py-4 font-semibold transition-all duration-300 hover:text-white"
                                    size="lg"
                                >
                                    Découvrir nos Services
                                </Button>
                            </div>
                            <div className="flex items-center space-x-8 text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <div className="bg-ci-orange/20 flex h-8 w-8 items-center justify-center rounded-full">
                                        <span className="text-ci-orange">
                                            ⚡
                                        </span>
                                    </div>
                                    <span>Traitement rapide</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="bg-ci-green/20 flex h-8 w-8 items-center justify-center rounded-full">
                                        <span className="ci-green">🔒</span>
                                    </div>
                                    <span>100% sécurisé</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                                        <span className="text-gray-600">
                                            🌍
                                        </span>
                                    </div>
                                    <span>Reconnu officiellement</span>
                                </div>
                            </div>
                        </div>
                        <div className="animate-fade-in relative">
                            <div className="relative">
                                <div className="gradient-ci absolute inset-0 rounded-2xl opacity-20 blur-2xl"></div>
                                <div className="relative rounded-2xl border border-white/20 bg-white/95 p-6 shadow-xl backdrop-blur-sm">
                                    <div className="text-center">
                                        <div className="gradient-ci animate-subtle-float mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
                                            <span className="text-3xl text-white">
                                                🏛️
                                            </span>
                                        </div>
                                        <h3 className="mb-4 text-2xl font-bold text-gray-800">
                                            Consulat Général
                                        </h3>
                                        <div className="from-ci-orange/10 to-ci-green/10 mb-6 rounded-xl bg-gradient-to-r p-6">
                                            <p className="mb-2 font-medium text-gray-700">
                                                📍 801 Second Avenue, 5th Floor
                                            </p>
                                            <p className="mb-4 text-gray-700">
                                                New York, NY 10017
                                            </p>
                                            <div className="flex justify-center space-x-4">
                                                <div className="text-center">
                                                    <p className="ci-orange text-2xl font-bold">
                                                        24/7
                                                    </p>
                                                    <p className="text-xs text-gray-600">
                                                        Service d'urgence
                                                    </p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="ci-green text-2xl font-bold">
                                                        98%
                                                    </p>
                                                    <p className="text-xs text-gray-600">
                                                        Satisfaction
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="glass rounded-lg bg-white/60 p-4 backdrop-blur-sm">
                                            <p className="mb-2 text-sm text-gray-600">
                                                ⏰ Prochaine disponibilité:
                                            </p>
                                            <p className="ci-orange font-semibold">
                                                Aujourd'hui à 14h30
                                            </p>
                                        </div>

                                        {/* Consulate Image */}
                                        <div className="mt-6">
                                            <img
                                                src="https://placehold.co/300x200/FF7F00/FFFFFF?text=Consulat+General"
                                                alt="Consulat Général de Côte d'Ivoire"
                                                className="w-full rounded-lg shadow-md"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="bg-white py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="animate-fade-in mb-16 text-center">
                        <div className="bg-ci-orange/10 mb-6 inline-flex items-center rounded-full px-6 py-2">
                            <span className="ci-orange font-semibold">
                                🛂 Nos Services
                            </span>
                        </div>
                        <h3 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                            Excellence Consulaire
                        </h3>
                        <p className="mx-auto max-w-3xl text-xl text-gray-600">
                            Une gamme complète de services pour accompagner la
                            communauté ivoirienne et nos visiteurs dans leurs
                            démarches officielles.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        <Card className="group hover-lift hover:border-ci-orange/30 transition-all duration-300">
                            <CardHeader>
                                <div className="gradient-ci mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110">
                                    <span className="text-2xl text-white">
                                        🛂
                                    </span>
                                </div>
                                <CardTitle className="text-2xl font-bold text-gray-900">
                                    Visa & Passeport
                                </CardTitle>
                                <Badge
                                    variant="secondary"
                                    className="bg-ci-orange/10 text-ci-orange border-ci-orange/20 w-fit"
                                >
                                    Service Express
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-6 leading-relaxed text-gray-600">
                                    Traitement rapide et sécurisé de vos
                                    demandes de visa d'entrée en Côte d'Ivoire,
                                    renouvellement de passeports et documents de
                                    voyage officiels.
                                </p>
                                <ul className="mb-6 space-y-3">
                                    <li className="flex items-center space-x-3">
                                        <span className="bg-ci-orange h-2 w-2 rounded-full"></span>
                                        <span className="text-gray-700">
                                            Visa tourisme et affaires
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <span className="bg-ci-orange h-2 w-2 rounded-full"></span>
                                        <span className="text-gray-700">
                                            Passeport biométrique
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <span className="bg-ci-orange h-2 w-2 rounded-full"></span>
                                        <span className="text-gray-700">
                                            Service express disponible
                                        </span>
                                    </li>
                                </ul>
                                <Button
                                    variant="link"
                                    className="ci-orange group p-0 font-semibold hover:underline"
                                >
                                    Faire une demande
                                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="group hover-lift hover:border-ci-green/30 transition-all duration-300">
                            <CardHeader>
                                <div className="bg-ci-green mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110">
                                    <span className="text-2xl text-white">
                                        👥
                                    </span>
                                </div>
                                <CardTitle className="text-2xl font-bold text-gray-900">
                                    Services Diaspora
                                </CardTitle>
                                <Badge
                                    variant="secondary"
                                    className="bg-ci-green/10 text-ci-green border-ci-green/20 w-fit"
                                >
                                    Communauté Active
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-6 leading-relaxed text-gray-600">
                                    Accompagnement personnalisé de la communauté
                                    ivoirienne aux États-Unis avec un focus sur
                                    l'intégration, l'entrepreneuriat et les
                                    liens avec la patrie.
                                </p>
                                <ul className="mb-6 space-y-3">
                                    <li className="flex items-center space-x-3">
                                        <span className="bg-ci-green h-2 w-2 rounded-full"></span>
                                        <span className="text-gray-700">
                                            Assistance juridique et sociale
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <span className="bg-ci-green h-2 w-2 rounded-full"></span>
                                        <span className="text-gray-700">
                                            Événements communautaires
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <span className="bg-ci-green h-2 w-2 rounded-full"></span>
                                        <span className="text-gray-700">
                                            Opportunités d'investissement
                                        </span>
                                    </li>
                                </ul>
                                <Button
                                    variant="link"
                                    className="ci-green group p-0 font-semibold hover:underline"
                                >
                                    Rejoindre la communauté
                                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="group hover-lift transition-all duration-300 hover:border-gray-300">
                            <CardHeader>
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-800 transition-transform duration-300 group-hover:scale-110">
                                    <span className="text-2xl text-white">
                                        ⚖️
                                    </span>
                                </div>
                                <CardTitle className="text-2xl font-bold text-gray-900">
                                    Services Juridiques
                                </CardTitle>
                                <Badge variant="outline" className="w-fit">
                                    Certification Officielle
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-6 leading-relaxed text-gray-600">
                                    Légalisation et authentification de
                                    documents officiels, assistance pour les
                                    procédures administratives et guidance
                                    juridique consulaire.
                                </p>
                                <ul className="mb-6 space-y-3">
                                    <li className="flex items-center space-x-3">
                                        <span className="h-2 w-2 rounded-full bg-gray-600"></span>
                                        <span className="text-gray-700">
                                            Légalisation de documents
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <span className="h-2 w-2 rounded-full bg-gray-600"></span>
                                        <span className="text-gray-700">
                                            Certificats d'état civil
                                        </span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <span className="h-2 w-2 rounded-full bg-gray-600"></span>
                                        <span className="text-gray-700">
                                            Assistance notariale
                                        </span>
                                    </li>
                                </ul>
                                <Button
                                    variant="link"
                                    className="group p-0 font-semibold text-gray-800 hover:underline"
                                >
                                    Nos procédures
                                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Quick Actions */}
            <section className="gradient-ci-soft py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="animate-fade-in mb-12 text-center">
                        <h3 className="mb-4 text-3xl font-bold text-gray-900">
                            Actions Rapides
                        </h3>
                        <p className="text-gray-600">
                            Accès direct à nos services les plus demandés
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-4">
                        <Button
                            onClick={() =>
                                toast.loading(
                                    "Chargement du système de rendez-vous...",
                                    { duration: 2000 }
                                )
                            }
                            className="bg-ci-orange hover-lift group flex h-auto flex-col rounded-2xl p-8 text-center text-white transition-all duration-300"
                            size="lg"
                        >
                            <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">
                                📅
                            </div>
                            <h4 className="text-lg font-bold">Prendre RDV</h4>
                            <p className="mt-2 text-sm text-white/80">
                                Réservation en ligne
                            </p>
                        </Button>
                        <Button
                            onClick={() =>
                                toast.success(
                                    "📋 Consultation des tarifs disponible"
                                )
                            }
                            className="bg-ci-green hover-lift group flex h-auto flex-col rounded-2xl p-8 text-center text-white transition-all duration-300"
                            size="lg"
                        >
                            <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">
                                💰
                            </div>
                            <h4 className="text-lg font-bold">Tarifs</h4>
                            <p className="mt-2 text-sm text-white/80">
                                Grille tarifaire officielle
                            </p>
                        </Button>
                        <Button
                            onClick={() =>
                                toast(
                                    "📍 801 Second Avenue, 5th Floor, New York, NY 10017",
                                    {
                                        icon: "🗺️",
                                        duration: 5000,
                                        style: { maxWidth: "400px" },
                                    }
                                )
                            }
                            className="hover-lift group flex h-auto flex-col rounded-2xl bg-gray-800 p-8 text-center text-white transition-all duration-300"
                            size="lg"
                        >
                            <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">
                                📍
                            </div>
                            <h4 className="text-lg font-bold">Nous Trouver</h4>
                            <p className="mt-2 text-sm text-white/80">
                                Adresse et itinéraire
                            </p>
                        </Button>
                        <Button
                            onClick={() =>
                                toast("📞 Appelez-nous au +1 (212) 697-0900", {
                                    icon: "☎️",
                                    duration: 4000,
                                })
                            }
                            className="hover-lift group flex h-auto flex-col rounded-2xl bg-gray-600 p-8 text-center text-white transition-all duration-300"
                            size="lg"
                        >
                            <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">
                                📞
                            </div>
                            <h4 className="text-lg font-bold">Contact</h4>
                            <p className="mt-2 text-sm text-white/80">
                                Support direct
                            </p>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Main Content Sections - matching real website */}
            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 grid gap-8 lg:grid-cols-3">
                        {/* Autres Actualités */}
                        <Card className="overflow-hidden">
                            <CardHeader className="bg-ci-green p-6 text-white">
                                <CardTitle className="text-xl font-bold text-white">
                                    Autres Actualités
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="mb-6 flex space-x-4">
                                    <Badge className="bg-ci-orange px-4 py-2 font-semibold text-white">
                                        Consulat
                                    </Badge>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="hover:bg-ci-orange bg-gray-200 text-gray-700 transition-colors hover:text-white"
                                    >
                                        Gouvernement
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="hover:bg-ci-orange bg-gray-200 text-gray-700 transition-colors hover:text-white"
                                    >
                                        Diplomatique
                                    </Button>
                                </div>
                                <Button
                                    variant="link"
                                    className="text-ci-green p-0 font-semibold hover:underline"
                                >
                                    En savoir plus
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Conseils des Ministres */}
                        <Card className="overflow-hidden">
                            <CardHeader className="bg-ci-green p-6 text-white">
                                <CardTitle className="text-xl font-bold text-white">
                                    Conseils des Ministres
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="bg-ci-orange/10 mb-4 rounded-lg p-4">
                                    <div className="mb-2 flex items-center space-x-3">
                                        <Badge className="bg-ci-orange flex h-8 w-8 items-center justify-center rounded-full p-0">
                                            <span className="text-xs text-white">
                                                📄
                                            </span>
                                        </Badge>
                                        <span className="text-ci-orange text-sm font-semibold">
                                            COMMUNIQUÉ DU CONSEIL DES MINISTRES
                                            DU 02-07-2025
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-600">
                                        📅 JUIL 02, 2025
                                    </p>
                                </div>
                                <Button
                                    variant="link"
                                    className="text-ci-green p-0 font-semibold hover:underline"
                                >
                                    Voir plus
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Liens utiles */}
                        <Card className="overflow-hidden">
                            <CardHeader className="bg-ci-green p-6 text-white">
                                <CardTitle className="text-xl font-bold text-white">
                                    Liens utiles
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 p-6">
                                <div>
                                    <Button
                                        variant="ghost"
                                        className="hover:bg-ci-orange/10 w-full justify-between rounded bg-gray-50 p-3 text-left transition-colors"
                                    >
                                        <span className="font-semibold text-gray-800">
                                            Ambassades
                                        </span>
                                        <span>▼</span>
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        variant="ghost"
                                        className="hover:bg-ci-orange/10 w-full justify-between rounded bg-gray-50 p-3 text-left transition-colors"
                                    >
                                        <span className="font-semibold text-gray-800">
                                            Ministères
                                        </span>
                                        <span>▼</span>
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        variant="ghost"
                                        className="hover:bg-ci-orange/10 w-full justify-between rounded bg-gray-50 p-3 text-left transition-colors"
                                    >
                                        <span className="font-semibold text-gray-800">
                                            Institutions
                                        </span>
                                        <span>▼</span>
                                    </Button>
                                </div>
                                <div>
                                    <button className="hover:bg-ci-orange/10 w-full rounded bg-gray-50 p-3 text-left transition-colors">
                                        <span className="font-semibold text-gray-800">
                                            Autres liens
                                        </span>
                                        <span className="float-right">▼</span>
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Videothèque & Photothèque */}
                    <div className="mb-16 grid gap-12 lg:grid-cols-2">
                        {/* Videothèque */}
                        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                            <div className="border-b border-gray-100 p-6">
                                <h3 className="text-2xl font-bold text-gray-900">
                                    Vidéothèque
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="mb-6 grid grid-cols-2 gap-4">
                                    <div className="group hover-lift relative cursor-pointer">
                                        <div className="relative aspect-video overflow-hidden rounded-lg">
                                            <img
                                                src="https://placehold.co/400x225/000000/FFFFFF?text=Ceremonie+Officielle"
                                                alt="Cérémonie officielle"
                                                className="h-full w-full object-cover"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                                    <span className="text-2xl text-white">
                                                        ▶
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-sm font-semibold text-gray-800">
                                            CÉRÉMONIE OFFICIELLE DE REMISE DU
                                            PRIX N
                                        </p>
                                    </div>
                                    <div className="group hover-lift relative cursor-pointer">
                                        <div className="relative aspect-video overflow-hidden rounded-lg">
                                            <img
                                                src="https://placehold.co/400x225/00AA4F/FFFFFF?text=Jeux+Abidjan+2017"
                                                alt="Jeux Abidjan 2017"
                                                className="h-full w-full object-cover"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                                    <span className="text-2xl text-white">
                                                        ▶
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-sm font-semibold text-gray-800">
                                            ABIDJAN 2017 : SPOTS DES VIIIES JEUX
                                            DE
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="text-ci-green font-semibold hover:underline"
                                >
                                    Voir plus
                                </a>
                            </div>
                        </div>

                        {/* Photothèque */}
                        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                            <div className="border-b border-gray-100 p-6">
                                <h3 className="text-2xl font-bold text-gray-900">
                                    Photothèque
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="mb-6 grid grid-cols-3 gap-3">
                                    <div className="hover-lift aspect-square cursor-pointer overflow-hidden rounded-lg">
                                        <img
                                            src="https://placehold.co/200x200/FF7F00/FFFFFF?text=Event+1"
                                            alt="Événement consulaire"
                                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                                        />
                                    </div>
                                    <div className="hover-lift aspect-square cursor-pointer overflow-hidden rounded-lg">
                                        <img
                                            src="https://placehold.co/200x200/00AA4F/FFFFFF?text=Event+2"
                                            alt="Cérémonie officielle"
                                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                                        />
                                    </div>
                                    <div className="hover-lift aspect-square cursor-pointer overflow-hidden rounded-lg">
                                        <img
                                            src="https://placehold.co/200x200/666666/FFFFFF?text=Event+3"
                                            alt="Rencontre diplomatique"
                                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                                        />
                                    </div>
                                    <div className="hover-lift aspect-square cursor-pointer overflow-hidden rounded-lg">
                                        <img
                                            src="https://placehold.co/200x200/FF7F00/FFFFFF?text=Event+4"
                                            alt="Communauté ivoirienne"
                                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                                        />
                                    </div>
                                    <div className="hover-lift aspect-square cursor-pointer overflow-hidden rounded-lg">
                                        <img
                                            src="https://placehold.co/200x200/00AA4F/FFFFFF?text=Event+5"
                                            alt="Visite officielle"
                                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                                        />
                                    </div>
                                    <div className="hover-lift aspect-square cursor-pointer overflow-hidden rounded-lg">
                                        <img
                                            src="https://placehold.co/200x200/666666/FFFFFF?text=Event+6"
                                            alt="Services consulaires"
                                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                                        />
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="text-ci-green font-semibold hover:underline"
                                >
                                    Voir plus
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Les Grands Dossiers du Gouvernement */}
                    <div className="grid gap-8 lg:grid-cols-5">
                        <div className="lg:col-span-1">
                            <div className="bg-ci-orange rounded-2xl p-8 text-white">
                                <h3 className="mb-4 text-2xl font-bold">
                                    LES GRANDS DOSSIERS DU GOUVERNEMENT
                                </h3>
                                <a
                                    href="#"
                                    className="font-semibold text-white/90 hover:text-white"
                                >
                                    En savoir plus
                                </a>
                                <div className="mt-6 flex space-x-2">
                                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30">
                                        <span className="text-white">‹</span>
                                    </button>
                                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30">
                                        <span className="text-white">›</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-3">
                            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                                <div className="hover-lift cursor-pointer rounded-lg bg-white p-6 shadow-md">
                                    <h4 className="mb-2 text-sm font-semibold text-gray-800">
                                        ASSEMBLÉES ANNUELLES DU GROUPE DE LA
                                        BAN...
                                    </h4>
                                </div>
                                <div className="hover-lift cursor-pointer rounded-lg bg-white p-6 shadow-md">
                                    <h4 className="mb-2 text-sm font-semibold text-gray-800">
                                        SARA 2025 : 7ÈME ÉDITION DU SALON
                                        INTERN...
                                    </h4>
                                </div>
                                <div className="hover-lift cursor-pointer rounded-lg bg-white p-6 shadow-md">
                                    <h4 className="mb-2 text-sm font-semibold text-gray-800">
                                        CÉRÉMONIE SOLENNELLE DE REMISE DU PRIX
                                        F...
                                    </h4>
                                </div>
                                <div className="hover-lift cursor-pointer rounded-lg bg-white p-6 shadow-md">
                                    <h4 className="mb-2 text-sm font-semibold text-gray-800">
                                        TABLE RONDE DE MOBILISATION DES
                                        RESSOURC...
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-1">
                            <div className="bg-ci-green rounded-2xl p-8 text-center text-white">
                                <h3 className="mb-4 text-xl font-bold">
                                    MÉDIAS PUBLICS IVOIRIENS
                                </h3>
                                <div className="space-y-3">
                                    <a
                                        href="#"
                                        className="block text-sm text-white/90 transition-colors hover:text-white"
                                    >
                                        RTI 1
                                    </a>
                                    <a
                                        href="#"
                                        className="block text-sm text-white/90 transition-colors hover:text-white"
                                    >
                                        RTI 2
                                    </a>
                                    <a
                                        href="#"
                                        className="block text-sm text-white/90 transition-colors hover:text-white"
                                    >
                                        Radio Côte d'Ivoire
                                    </a>
                                    <a
                                        href="#"
                                        className="block text-sm text-white/90 transition-colors hover:text-white"
                                    >
                                        Fraternité Matin
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-4">
                        <div className="lg:col-span-2">
                            <div className="mb-6 flex items-center space-x-4">
                                <div className="bg-ci-orange flex h-12 w-12 items-center justify-center rounded-full">
                                    <span className="font-bold text-white">
                                        🇨🇮
                                    </span>
                                </div>
                                <div>
                                    <h5 className="text-lg font-bold">
                                        Consulat Général de Côte d'Ivoire
                                    </h5>
                                    <p className="text-gray-400">
                                        New York, États-Unis
                                    </p>
                                </div>
                            </div>
                            <p className="mb-6 max-w-md leading-relaxed text-gray-400">
                                Votre partenaire officiel pour tous vos besoins
                                consulaires. Nous servons la diaspora ivoirienne
                                avec excellence et dévouement depuis plus de 60
                                ans.
                            </p>
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="bg-ci-orange hover:bg-ci-orange flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                                >
                                    <span className="text-white">f</span>
                                </a>
                                <a
                                    href="#"
                                    className="bg-ci-orange hover:bg-ci-orange flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                                >
                                    <span className="text-white">t</span>
                                </a>
                                <a
                                    href="#"
                                    className="bg-ci-orange hover:bg-ci-orange flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                                >
                                    <span className="text-white">in</span>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h5 className="mb-4 font-semibold">
                                Services Rapides
                            </h5>
                            <ul className="space-y-3">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:ci-orange text-gray-400 transition-colors"
                                    >
                                        Demande de visa
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:ci-orange text-gray-400 transition-colors"
                                    >
                                        Renouvellement passeport
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:ci-orange text-gray-400 transition-colors"
                                    >
                                        Légalisation documents
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:ci-orange text-gray-400 transition-colors"
                                    >
                                        Certificats
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:ci-orange text-gray-400 transition-colors"
                                    >
                                        Assistance d'urgence
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="mb-4 font-semibold">
                                Contact & Informations
                            </h5>
                            <div className="space-y-3 text-gray-400">
                                <div className="flex items-start space-x-3">
                                    <span className="ci-orange">📍</span>
                                    <div>
                                        <p>801 Second Avenue, 5th Floor</p>
                                        <p>New York, NY 10017</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="ci-orange">📞</span>
                                    <p>+1 (212) 697-0900</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="ci-orange">📧</span>
                                    <p>consulat.newyork@diplomatie.gouv.ci</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="ci-orange">⏰</span>
                                    <p>Lun-Ven: 9h00-17h00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 border-t border-gray-800 pt-8 text-center">
                        <p className="text-gray-400">
                            © 2025 Consulat Général de Côte d'Ivoire - New
                            York. Tous droits réservés.
                            <span className="mx-2">•</span>
                            <a
                                href="#"
                                className="hover:ci-orange transition-colors"
                            >
                                Politique de confidentialité
                            </a>
                            <span className="mx-2">•</span>
                            <a
                                href="#"
                                className="hover:ci-orange transition-colors"
                            >
                                Mentions légales
                            </a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
