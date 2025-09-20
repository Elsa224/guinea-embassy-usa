"use client";

import Navigation from "@/components/Navigation";
import NotificationBanner from "@/components/NotificationBanner";
import NotificationPopup from "@/components/NotificationPopup";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function HomeVariant2() {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // Show important announcement popup after 3 seconds
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className="min-h-screen bg-white">
            {/* Important Notice Banner */}
            <NotificationBanner
                type="warning"
                message="⚠️ Important: Nouveaux horaires de service - Le consulat sera fermé le 15 septembre 2025 pour maintenance technique. Prévoyez vos démarches en conséquence."
                action={{
                    text: "Plus d'infos",
                    onClick: () =>
                        alert("Plus d'informations sur les horaires"),
                }}
                dismissible={true}
            />

            {/* Success Notification Popup */}
            <NotificationPopup
                isOpen={showPopup}
                onClose={() => setShowPopup(false)}
                title="🎉 Services Améliorés"
                message="Nous avons récemment amélioré notre système de traitement des demandes de visa. Les délais ont été réduits de 40% et vous pouvez maintenant suivre votre demande en temps réel."
                type="success"
                actionButton={{
                    text: "Découvrir les améliorations",
                    onClick: () => {
                        setShowPopup(false);
                        // Navigate to improvements page
                    },
                }}
                secondaryButton={{
                    text: "Fermer",
                    onClick: () => setShowPopup(false),
                }}
            />

            {/* Top Bar */}
            <div className="bg-ci-green relative overflow-hidden py-3 text-white">
                <div className="from-ci-green to-ci-green absolute inset-0 bg-gradient-to-r opacity-90"></div>
                <div className="animate-slide-in relative mx-auto flex max-w-7xl items-center justify-between px-4 text-sm sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-8">
                        <div className="flex items-center space-x-2">
                            <span className="animate-pulse">📧</span>
                            <span>consulat.newyork@diplomatie.gouv.ci</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="animate-pulse">📞</span>
                            <span>+1 (212) 697-0900</span>
                        </div>
                        <div className="hidden items-center space-x-2 md:flex">
                            <span>⏰</span>
                            <span>Urgence 24h/7j disponible</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="hover:text-ci-orange font-medium transition-colors"
                            >
                                Français
                            </a>
                            <span className="text-white/60">|</span>
                            <a
                                href="#"
                                className="hover:text-ci-orange transition-colors"
                            >
                                English
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header - Centered Layout */}
            <header className="border-ci-orange sticky top-0 z-50 border-b-4 bg-white shadow-xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        {/* Centered Main Title */}
                        <div className="animate-fade-in mb-4 flex items-center justify-center">
                            <div className="flex items-center space-x-6">
                                <div className="gradient-ci animate-subtle-float flex h-24 w-24 items-center justify-center rounded-full shadow-xl">
                                    <span className="text-4xl font-bold text-white">
                                        🇨🇮
                                    </span>
                                </div>
                                <div className="text-center">
                                    <h1 className="mb-1 text-3xl font-bold text-gray-900">
                                        Consulat Général de Côte d'Ivoire à New
                                        York(USA)
                                    </h1>
                                    <p className="ci-orange text-lg font-bold">
                                        République de Côte d'Ivoire
                                    </p>
                                    <p className="text-sm font-medium text-gray-600 italic">
                                        « Union - Discipline - Travail »
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Bar */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-2">
                                    <span className="ci-green">⏰</span>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Heures d'ouverture
                                        </p>
                                        <p className="font-bold text-gray-800">
                                            Lun-Ven: 9h00-17h00
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="ci-orange">📞</span>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Contact direct
                                        </p>
                                        <p className="font-bold text-gray-800">
                                            +1 (212) 697-0900
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <Button
                                className="bg-ci-orange hover:bg-ci-orange hover-lift rounded-xl px-8 py-3 font-bold text-white shadow-lg transition-all duration-300"
                                size="lg"
                            >
                                🚨 Urgence Consulaire
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <Navigation />

            {/* Hero Banner - Enhanced Layout */}
            <section className="relative overflow-hidden py-16">
                <div className="gradient-ci-soft absolute inset-0"></div>
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-5">
                        <div className="animate-slide-in lg:col-span-3">
                            <div className="max-w-3xl">
                                <div className="mb-8 inline-flex items-center rounded-full bg-white/90 px-6 py-3 shadow-lg backdrop-blur-sm">
                                    <span className="bg-ci-green mr-3 h-3 w-3 animate-pulse rounded-full"></span>
                                    <span className="text-sm font-bold text-gray-800">
                                        🏛️ SERVICE CONSULAIRE OFFICIEL
                                    </span>
                                </div>
                                <h2 className="mb-6 text-4xl leading-tight font-bold text-gray-900 lg:text-5xl">
                                    Excellence au Service de la
                                    <span className="ci-orange block">
                                        {" "}
                                        Diaspora Ivoirienne
                                    </span>
                                </h2>
                                <p className="mb-8 text-lg leading-relaxed font-medium text-gray-700">
                                    Le Consulat Général de Côte d'Ivoire à New
                                    York vous accompagne avec professionnalisme
                                    dans toutes vos démarches administratives.
                                    Nous incarnons l'excellence du service
                                    public ivoirien à l'international.
                                </p>
                                <div className="mb-10 flex flex-wrap gap-6">
                                    <button className="bg-ci-orange hover:bg-ci-orange hover-lift flex items-center space-x-3 rounded-2xl px-10 py-5 font-bold text-white shadow-xl transition-all duration-300">
                                        <span className="text-2xl">📅</span>
                                        <span>Réserver un Rendez-vous</span>
                                    </button>
                                    <button className="border-ci-green ci-green hover:bg-ci-green hover-lift rounded-2xl border-3 px-10 py-5 font-bold shadow-lg transition-all duration-300 hover:text-white">
                                        Découvrir nos Services
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-6 text-sm md:grid-cols-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-ci-green/20 flex h-10 w-10 items-center justify-center rounded-full">
                                            <span className="ci-green text-lg">
                                                ✓
                                            </span>
                                        </div>
                                        <span className="font-medium text-gray-700">
                                            Service en ligne 24h/7j
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-ci-orange/20 flex h-10 w-10 items-center justify-center rounded-full">
                                            <span className="ci-orange text-lg">
                                                🌍
                                            </span>
                                        </div>
                                        <span className="font-medium text-gray-700">
                                            Assistance multilingue
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                                            <span className="text-lg text-gray-600">
                                                ⚡
                                            </span>
                                        </div>
                                        <span className="font-medium text-gray-700">
                                            Traitement rapide
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="animate-fade-in lg:col-span-2">
                            <div className="relative">
                                <div className="gradient-ci absolute inset-0 rounded-3xl opacity-20 blur-3xl"></div>
                                <div className="hover-lift relative rounded-3xl border border-white/30 bg-white/95 p-10 shadow-2xl backdrop-blur-lg">
                                    <div className="text-center">
                                        <div className="gradient-ci animate-subtle-float mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full shadow-xl">
                                            <span className="text-5xl text-white">
                                                🏛️
                                            </span>
                                        </div>
                                        <h3 className="mb-6 text-2xl font-bold text-gray-900">
                                            Consulat Général
                                        </h3>
                                        <div className="from-ci-orange/10 to-ci-green/10 mb-8 rounded-xl bg-gradient-to-r p-6">
                                            <div className="mb-3 flex items-center space-x-2">
                                                <span className="ci-orange text-lg">
                                                    📍
                                                </span>
                                                <p className="font-semibold text-gray-800">
                                                    Adresse Officielle
                                                </p>
                                            </div>
                                            <p className="mb-1 font-medium text-gray-700">
                                                801 Second Avenue, 5th Floor
                                            </p>
                                            <p className="mb-6 text-gray-700">
                                                New York, NY 10017
                                            </p>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="rounded-lg bg-white/60 p-3 text-center">
                                                    <p className="ci-orange text-3xl font-bold">
                                                        24/7
                                                    </p>
                                                    <p className="text-xs font-medium text-gray-600">
                                                        Service d'urgence
                                                    </p>
                                                </div>
                                                <div className="rounded-lg bg-white/60 p-3 text-center">
                                                    <p className="ci-green text-3xl font-bold">
                                                        98%
                                                    </p>
                                                    <p className="text-xs font-medium text-gray-600">
                                                        Satisfaction client
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="glass rounded-xl bg-white/80 p-4 backdrop-blur-sm">
                                            <div className="mb-2 flex items-center space-x-2">
                                                <span className="animate-pulse">
                                                    ⏰
                                                </span>
                                                <p className="text-sm font-medium text-gray-600">
                                                    Prochaine disponibilité:
                                                </p>
                                            </div>
                                            <p className="ci-orange text-lg font-bold">
                                                Aujourd'hui à 14h30
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="bg-white py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="animate-fade-in mb-20 text-center">
                        <div className="bg-ci-orange/10 mb-8 inline-flex items-center rounded-full px-8 py-3">
                            <span className="ci-orange text-lg font-bold">
                                🛂 SERVICES CONSULAIRES
                            </span>
                        </div>
                        <h3 className="mb-8 text-5xl font-bold text-gray-900">
                            Notre Expertise à Votre Service
                        </h3>
                        <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600">
                            Découvrez notre gamme complète de services
                            consulaires conçus pour faciliter vos démarches et
                            vous accompagner avec excellence.
                        </p>
                    </div>

                    <div className="mb-16 grid gap-12 lg:grid-cols-2">
                        {/* Featured Service */}
                        <Card className="group border-ci-orange hover-lift border-l-8 p-10 shadow-xl transition-all duration-300 hover:shadow-2xl">
                            <div className="flex items-start space-x-6">
                                <div className="gradient-ci flex h-20 w-20 items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110">
                                    <span className="text-3xl text-white">
                                        🛂
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <CardTitle className="mb-4 text-3xl font-bold text-gray-900">
                                        Visa & Passeport
                                    </CardTitle>
                                    <Badge className="bg-ci-orange/10 text-ci-orange border-ci-orange/20 mb-4 w-fit">
                                        Service Express
                                    </Badge>
                                    <p className="mb-6 text-lg leading-relaxed text-gray-600">
                                        Service prioritaire et sécurisé pour
                                        toutes vos demandes de visa d'entrée en
                                        Côte d'Ivoire et renouvellement de
                                        passeports. Expertise reconnue depuis
                                        plus de 60 ans.
                                    </p>
                                    <ul className="mb-8 space-y-3 text-gray-700">
                                        <li className="flex items-center space-x-3">
                                            <span className="bg-ci-orange h-2 w-2 rounded-full"></span>
                                            <span className="font-medium">
                                                Visa tourisme, affaires, transit
                                                et long séjour
                                            </span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <span className="bg-ci-orange h-2 w-2 rounded-full"></span>
                                            <span className="font-medium">
                                                Passeport biométrique ordinaire
                                                et diplomatique
                                            </span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <span className="bg-ci-orange h-2 w-2 rounded-full"></span>
                                            <span className="font-medium">
                                                Service express et traitement
                                                prioritaire
                                            </span>
                                        </li>
                                    </ul>
                                    <Button
                                        variant="link"
                                        className="ci-orange group p-0 text-lg font-bold hover:underline"
                                    >
                                        Faire une demande maintenant
                                        <span className="ml-3 transition-transform duration-300 group-hover:translate-x-2">
                                            →
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Featured Service 2 */}
                        <Card className="group border-ci-green hover-lift border-l-8 p-10 shadow-xl transition-all duration-300 hover:shadow-2xl">
                            <div className="flex items-start space-x-6">
                                <div className="bg-ci-green flex h-20 w-20 items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110">
                                    <span className="text-3xl text-white">
                                        👥
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <CardTitle className="mb-4 text-3xl font-bold text-gray-900">
                                        Services Diaspora
                                    </CardTitle>
                                    <Badge className="bg-ci-green/10 text-ci-green border-ci-green/20 mb-4 w-fit">
                                        Communauté Active
                                    </Badge>
                                    <p className="mb-6 text-lg leading-relaxed text-gray-600">
                                        Accompagnement personnalisé et soutien
                                        complet de la communauté ivoirienne aux
                                        États-Unis. Un pont solide entre votre
                                        nouvelle patrie et la Côte d'Ivoire.
                                    </p>
                                    <ul className="mb-8 space-y-3 text-gray-700">
                                        <li className="flex items-center space-x-3">
                                            <span className="bg-ci-green h-2 w-2 rounded-full"></span>
                                            <span className="font-medium">
                                                Assistance sociale, juridique et
                                                administrative
                                            </span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <span className="bg-ci-green h-2 w-2 rounded-full"></span>
                                            <span className="font-medium">
                                                Événements culturels et
                                                communautaires
                                            </span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <span className="bg-ci-green h-2 w-2 rounded-full"></span>
                                            <span className="font-medium">
                                                Opportunités d'investissement et
                                                de partenariat
                                            </span>
                                        </li>
                                    </ul>
                                    <Button
                                        variant="link"
                                        className="ci-green group p-0 text-lg font-bold hover:underline"
                                    >
                                        Rejoindre notre communauté
                                        <span className="ml-3 transition-transform duration-300 group-hover:translate-x-2">
                                            →
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Other Services Grid */}
                    <div className="grid gap-8 md:grid-cols-3">
                        <Card className="hover-lift group p-8 transition-all duration-300 hover:shadow-xl">
                            <CardHeader>
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-800 transition-transform duration-300 group-hover:scale-110">
                                    <span className="text-2xl text-white">
                                        ⚖️
                                    </span>
                                </div>
                                <CardTitle className="text-xl font-bold text-gray-900">
                                    Services Juridiques
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="leading-relaxed text-gray-600">
                                    Légalisation et authentification de
                                    documents officiels, assistance procédures
                                    administratives
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="hover-lift group p-8 transition-all duration-300 hover:shadow-xl">
                            <CardHeader>
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-800 transition-transform duration-300 group-hover:scale-110">
                                    <span className="text-2xl text-white">
                                        📋
                                    </span>
                                </div>
                                <CardTitle className="text-xl font-bold text-gray-900">
                                    État Civil
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="leading-relaxed text-gray-600">
                                    Certificats de naissance, mariage, décès et
                                    autres actes d'état civil authentifiés
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="hover-lift group p-8 transition-all duration-300 hover:shadow-xl">
                            <CardHeader>
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-800 transition-transform duration-300 group-hover:scale-110">
                                    <span className="text-2xl text-white">
                                        💼
                                    </span>
                                </div>
                                <CardTitle className="text-xl font-bold text-gray-900">
                                    Commerce & Affaires
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="leading-relaxed text-gray-600">
                                    Promotion des échanges commerciaux et
                                    accompagnement des investisseurs
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* News & Updates */}
            <section className="gradient-ci-soft py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="animate-fade-in mb-16 flex items-center justify-between">
                        <div>
                            <h3 className="mb-4 text-4xl font-bold text-gray-900">
                                Actualités & Communiqués Officiels
                            </h3>
                            <p className="text-lg text-gray-600">
                                Restez informés des dernières nouvelles et
                                annonces importantes
                            </p>
                        </div>
                        <a
                            href="#"
                            className="ci-orange hover-lift flex items-center space-x-2 text-lg font-bold hover:underline"
                        >
                            <span>Voir toutes les actualités</span>
                            <span>→</span>
                        </a>
                    </div>
                    <div className="grid gap-10 md:grid-cols-3">
                        <article className="hover-lift group overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
                            <div className="from-ci-orange/30 to-ci-green/30 flex h-56 items-center justify-center bg-gradient-to-br transition-transform duration-300 group-hover:scale-105">
                                <span className="animate-subtle-float text-6xl">
                                    📢
                                </span>
                            </div>
                            <div className="p-8">
                                <span className="ci-orange bg-ci-orange/10 mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold">
                                    COMMUNIQUÉ OFFICIEL
                                </span>
                                <h4 className="mb-4 text-xl leading-tight font-bold text-gray-900">
                                    Nouvelles procédures pour les demandes de
                                    visa
                                </h4>
                                <p className="mb-6 leading-relaxed text-gray-600">
                                    Mise à jour importante des procédures et
                                    documents requis pour toutes les demandes de
                                    visa...
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-500">
                                        15 Mars 2025
                                    </span>
                                    <a
                                        href="#"
                                        className="ci-orange font-semibold hover:underline"
                                    >
                                        Lire plus →
                                    </a>
                                </div>
                            </div>
                        </article>
                        <article className="hover-lift group overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
                            <div className="from-ci-green/30 flex h-56 items-center justify-center bg-gradient-to-br to-gray-300 transition-transform duration-300 group-hover:scale-105">
                                <span className="animate-subtle-float text-6xl">
                                    🎉
                                </span>
                            </div>
                            <div className="p-8">
                                <span className="ci-green bg-ci-green/10 mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold">
                                    ÉVÉNEMENT SPÉCIAL
                                </span>
                                <h4 className="mb-4 text-xl leading-tight font-bold text-gray-900">
                                    Célébration de la Fête de l'Indépendance
                                </h4>
                                <p className="mb-6 leading-relaxed text-gray-600">
                                    Rejoignez-nous pour célébrer le 64ème
                                    anniversaire de l'indépendance de la Côte
                                    d'Ivoire...
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-500">
                                        7 Août 2025
                                    </span>
                                    <a
                                        href="#"
                                        className="ci-green font-semibold hover:underline"
                                    >
                                        Participer →
                                    </a>
                                </div>
                            </div>
                        </article>
                        <article className="hover-lift group overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
                            <div className="to-ci-orange/30 flex h-56 items-center justify-center bg-gradient-to-br from-gray-400 transition-transform duration-300 group-hover:scale-105">
                                <span className="animate-subtle-float text-6xl">
                                    💼
                                </span>
                            </div>
                            <div className="p-8">
                                <span className="mb-4 inline-block rounded-full bg-gray-200 px-3 py-1 text-xs font-bold text-gray-700">
                                    ÉCONOMIE & INVESTISSEMENT
                                </span>
                                <h4 className="mb-4 text-xl leading-tight font-bold text-gray-900">
                                    Forum d'investissement USA-Côte d'Ivoire
                                </h4>
                                <p className="mb-6 leading-relaxed text-gray-600">
                                    Découvrez les opportunités d'investissement
                                    exceptionnelles en Côte d'Ivoire...
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-500">
                                        12 Mars 2025
                                    </span>
                                    <a
                                        href="#"
                                        className="font-semibold text-gray-800 hover:underline"
                                    >
                                        En savoir plus →
                                    </a>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white">
                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-4">
                        <div className="lg:col-span-2">
                            <div className="mb-8 flex items-center space-x-4">
                                <div className="bg-ci-orange flex h-16 w-16 items-center justify-center rounded-full shadow-lg">
                                    <span className="text-xl font-bold text-white">
                                        🇨🇮
                                    </span>
                                </div>
                                <div>
                                    <h5 className="text-xl font-bold">
                                        Consulat Général de Côte d'Ivoire
                                    </h5>
                                    <p className="text-lg text-gray-400">
                                        New York, États-Unis
                                    </p>
                                </div>
                            </div>
                            <p className="mb-8 max-w-lg text-lg leading-relaxed text-gray-400">
                                Au service de la diaspora ivoirienne et des
                                visiteurs aux États-Unis depuis plus de 60 ans.
                                Votre partenaire de confiance pour toutes vos
                                démarches consulaires.
                            </p>
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="bg-ci-orange hover:bg-ci-orange hover-lift flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300"
                                >
                                    <span className="font-bold text-white">
                                        f
                                    </span>
                                </a>
                                <a
                                    href="#"
                                    className="bg-ci-orange hover:bg-ci-orange hover-lift flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300"
                                >
                                    <span className="font-bold text-white">
                                        t
                                    </span>
                                </a>
                                <a
                                    href="#"
                                    className="bg-ci-orange hover:bg-ci-orange hover-lift flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300"
                                >
                                    <span className="font-bold text-white">
                                        in
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h5 className="mb-6 text-lg font-bold">
                                Services Essentiels
                            </h5>
                            <ul className="space-y-4">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:ci-orange text-lg text-gray-400 transition-colors duration-300 hover:translate-x-1"
                                    >
                                        🛂 Demande de visa
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:ci-orange text-lg text-gray-400 transition-colors duration-300 hover:translate-x-1"
                                    >
                                        📘 Renouvellement passeport
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:ci-orange text-lg text-gray-400 transition-colors duration-300 hover:translate-x-1"
                                    >
                                        ⚖️ Légalisation documents
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:ci-orange text-lg text-gray-400 transition-colors duration-300 hover:translate-x-1"
                                    >
                                        📋 Certificats officiels
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:ci-orange text-lg text-gray-400 transition-colors duration-300 hover:translate-x-1"
                                    >
                                        🚨 Assistance d'urgence
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="mb-6 text-lg font-bold">
                                Contact & Localisation
                            </h5>
                            <div className="space-y-4 text-gray-400">
                                <div className="flex items-start space-x-3">
                                    <span className="ci-orange text-xl">
                                        📍
                                    </span>
                                    <div>
                                        <p className="font-medium">
                                            801 Second Avenue, 5th Floor
                                        </p>
                                        <p>New York, NY 10017, États-Unis</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="ci-orange text-xl">
                                        📞
                                    </span>
                                    <p className="font-medium">
                                        +1 (212) 697-0900
                                    </p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="ci-orange text-xl">
                                        📧
                                    </span>
                                    <p>consulat.newyork@diplomatie.gouv.ci</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="ci-orange text-xl">
                                        ⏰
                                    </span>
                                    <p>Lun-Ven: 9h00-17h00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16 border-t border-gray-800 pt-8 text-center">
                        <p className="text-lg text-gray-400">
                            © 2025 Consulat Général de Côte d'Ivoire - New
                            York. Tous droits réservés.
                            <span className="mx-3">•</span>
                            <a
                                href="#"
                                className="hover:ci-orange transition-colors"
                            >
                                Politique de confidentialité
                            </a>
                            <span className="mx-3">•</span>
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
