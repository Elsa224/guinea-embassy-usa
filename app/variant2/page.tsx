'use client'

import Image from "next/image";
import { useState, useEffect } from 'react';
import NotificationBanner from "@/components/NotificationBanner";
import NotificationPopup from "@/components/NotificationPopup";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
                    onClick: () => alert("Plus d'informations sur les horaires")
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
                    }
                }}
                secondaryButton={{
                    text: "Fermer",
                    onClick: () => setShowPopup(false)
                }}
            />

            {/* Top Bar */}
            <div className="bg-ci-green text-white py-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-ci-green to-ci-green opacity-90"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm animate-slide-in">
                    <div className="flex items-center space-x-8">
                        <div className="flex items-center space-x-2">
                            <span className="animate-pulse">📧</span>
                            <span>consulat.newyork@diplomatie.gouv.ci</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="animate-pulse">📞</span>
                            <span>+1 (212) 697-0900</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-2">
                            <span>⏰</span>
                            <span>Urgence 24h/7j disponible</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-ci-orange transition-colors font-medium">Français</a>
                            <span className="text-white/60">|</span>
                            <a href="#" className="hover:text-ci-orange transition-colors">English</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header - Centered Layout */}
            <header className="bg-white shadow-xl border-b-4 border-ci-orange sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        {/* Centered Main Title */}
                        <div className="flex items-center justify-center mb-4 animate-fade-in">
                            <div className="flex items-center space-x-6">
                                <div className="w-24 h-24 gradient-ci rounded-full flex items-center justify-center animate-subtle-float shadow-xl">
                                    <span className="text-white font-bold text-4xl">🇨🇮</span>
                                </div>
                                <div className="text-center">
                                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Consulat Général de Côte d'Ivoire à New York(USA)</h1>
                                    <p className="text-lg ci-orange font-bold">République de Côte d'Ivoire</p>
                                    <p className="text-sm text-gray-600 font-medium italic">« Union - Discipline - Travail »</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Action Bar */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-2">
                                    <span className="ci-green">⏰</span>
                                    <div>
                                        <p className="text-sm text-gray-600">Heures d'ouverture</p>
                                        <p className="font-bold text-gray-800">Lun-Ven: 9h00-17h00</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="ci-orange">📞</span>
                                    <div>
                                        <p className="text-sm text-gray-600">Contact direct</p>
                                        <p className="font-bold text-gray-800">+1 (212) 697-0900</p>
                                    </div>
                                </div>
                            </div>
                            <Button className="bg-ci-orange text-white px-8 py-3 rounded-xl font-bold hover:bg-ci-orange transition-all duration-300 hover-lift shadow-lg" size="lg">
                                🚨 Urgence Consulaire
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <Navigation />

            {/* Hero Banner - Enhanced Layout */}
            <section className="relative py-16 overflow-hidden">
                <div className="absolute inset-0 gradient-ci-soft"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-5 gap-12 items-center">
                        <div className="lg:col-span-3 animate-slide-in">
                            <div className="max-w-3xl">
                                <div className="inline-flex items-center bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 mb-8 shadow-lg">
                                    <span className="w-3 h-3 bg-ci-green rounded-full animate-pulse mr-3"></span>
                                    <span className="text-sm font-bold text-gray-800">🏛️ SERVICE CONSULAIRE OFFICIEL</span>
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    Excellence au Service de la 
                                    <span className="ci-orange block"> Diaspora Ivoirienne</span>
                                </h2>
                                <p className="text-lg text-gray-700 mb-8 leading-relaxed font-medium">
                                    Le Consulat Général de Côte d'Ivoire à New York vous accompagne avec professionnalisme dans toutes vos démarches administratives. 
                                    Nous incarnons l'excellence du service public ivoirien à l'international.
                                </p>
                                <div className="flex flex-wrap gap-6 mb-10">
                                    <button className="bg-ci-orange text-white px-10 py-5 rounded-2xl font-bold hover:bg-ci-orange transition-all duration-300 hover-lift flex items-center space-x-3 shadow-xl">
                                        <span className="text-2xl">📅</span>
                                        <span>Réserver un Rendez-vous</span>
                                    </button>
                                    <button className="border-3 border-ci-green ci-green px-10 py-5 rounded-2xl font-bold hover:bg-ci-green hover:text-white transition-all duration-300 hover-lift shadow-lg">
                                        Découvrir nos Services
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-ci-green/20 rounded-full flex items-center justify-center">
                                            <span className="ci-green text-lg">✓</span>
                                        </div>
                                        <span className="font-medium text-gray-700">Service en ligne 24h/7j</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-ci-orange/20 rounded-full flex items-center justify-center">
                                            <span className="ci-orange text-lg">🌍</span>
                                        </div>
                                        <span className="font-medium text-gray-700">Assistance multilingue</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                            <span className="text-gray-600 text-lg">⚡</span>
                                        </div>
                                        <span className="font-medium text-gray-700">Traitement rapide</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-2 animate-fade-in">
                            <div className="relative">
                                <div className="absolute inset-0 gradient-ci rounded-3xl opacity-20 blur-3xl"></div>
                                <div className="relative bg-white/95 backdrop-blur-lg rounded-3xl p-10 border border-white/30 shadow-2xl hover-lift">
                                    <div className="text-center">
                                        <div className="w-28 h-28 gradient-ci rounded-full mx-auto mb-8 flex items-center justify-center animate-subtle-float shadow-xl">
                                            <span className="text-white text-5xl">🏛️</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Consulat Général</h3>
                                        <div className="bg-gradient-to-r from-ci-orange/10 to-ci-green/10 rounded-xl p-6 mb-8">
                                            <div className="flex items-center space-x-2 mb-3">
                                                <span className="ci-orange text-lg">📍</span>
                                                <p className="text-gray-800 font-semibold">Adresse Officielle</p>
                                            </div>
                                            <p className="text-gray-700 font-medium mb-1">801 Second Avenue, 5th Floor</p>
                                            <p className="text-gray-700 mb-6">New York, NY 10017</p>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="text-center bg-white/60 rounded-lg p-3">
                                                    <p className="text-3xl font-bold ci-orange">24/7</p>
                                                    <p className="text-xs text-gray-600 font-medium">Service d'urgence</p>
                                                </div>
                                                <div className="text-center bg-white/60 rounded-lg p-3">
                                                    <p className="text-3xl font-bold ci-green">98%</p>
                                                    <p className="text-xs text-gray-600 font-medium">Satisfaction client</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 glass">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <span className="animate-pulse">⏰</span>
                                                <p className="text-sm text-gray-600 font-medium">Prochaine disponibilité:</p>
                                            </div>
                                            <p className="font-bold ci-orange text-lg">Aujourd'hui à 14h30</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20 animate-fade-in">
                        <div className="inline-flex items-center bg-ci-orange/10 rounded-full px-8 py-3 mb-8">
                            <span className="ci-orange font-bold text-lg">🛂 SERVICES CONSULAIRES</span>
                        </div>
                        <h3 className="text-5xl font-bold text-gray-900 mb-8">Notre Expertise à Votre Service</h3>
                        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                            Découvrez notre gamme complète de services consulaires conçus pour faciliter vos démarches et vous accompagner avec excellence.
                        </p>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-12 mb-16">
                        {/* Featured Service */}
                        <Card className="group shadow-xl p-10 border-l-8 border-ci-orange hover-lift transition-all duration-300 hover:shadow-2xl">
                            <div className="flex items-start space-x-6">
                                <div className="w-20 h-20 gradient-ci rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <span className="text-white text-3xl">🛂</span>
                                </div>
                                <div className="flex-1">
                                    <CardTitle className="text-3xl font-bold text-gray-900 mb-4">Visa & Passeport</CardTitle>
                                    <Badge className="w-fit bg-ci-orange/10 text-ci-orange border-ci-orange/20 mb-4">
                                        Service Express
                                    </Badge>
                                    <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                                        Service prioritaire et sécurisé pour toutes vos demandes de visa d'entrée en Côte d'Ivoire 
                                        et renouvellement de passeports. Expertise reconnue depuis plus de 60 ans.
                                    </p>
                                    <ul className="text-gray-700 space-y-3 mb-8">
                                        <li className="flex items-center space-x-3">
                                            <span className="w-2 h-2 bg-ci-orange rounded-full"></span>
                                            <span className="font-medium">Visa tourisme, affaires, transit et long séjour</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <span className="w-2 h-2 bg-ci-orange rounded-full"></span>
                                            <span className="font-medium">Passeport biométrique ordinaire et diplomatique</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <span className="w-2 h-2 bg-ci-orange rounded-full"></span>
                                            <span className="font-medium">Service express et traitement prioritaire</span>
                                        </li>
                                    </ul>
                                    <Button variant="link" className="p-0 ci-orange font-bold text-lg hover:underline group">
                                        Faire une demande maintenant
                                        <span className="ml-3 group-hover:translate-x-2 transition-transform duration-300">→</span>
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Featured Service 2 */}
                        <Card className="group shadow-xl p-10 border-l-8 border-ci-green hover-lift transition-all duration-300 hover:shadow-2xl">
                            <div className="flex items-start space-x-6">
                                <div className="w-20 h-20 bg-ci-green rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <span className="text-white text-3xl">👥</span>
                                </div>
                                <div className="flex-1">
                                    <CardTitle className="text-3xl font-bold text-gray-900 mb-4">Services Diaspora</CardTitle>
                                    <Badge className="w-fit bg-ci-green/10 text-ci-green border-ci-green/20 mb-4">
                                        Communauté Active
                                    </Badge>
                                    <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                                        Accompagnement personnalisé et soutien complet de la communauté ivoirienne aux États-Unis. 
                                        Un pont solide entre votre nouvelle patrie et la Côte d'Ivoire.
                                    </p>
                                    <ul className="text-gray-700 space-y-3 mb-8">
                                        <li className="flex items-center space-x-3">
                                            <span className="w-2 h-2 bg-ci-green rounded-full"></span>
                                            <span className="font-medium">Assistance sociale, juridique et administrative</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <span className="w-2 h-2 bg-ci-green rounded-full"></span>
                                            <span className="font-medium">Événements culturels et communautaires</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <span className="w-2 h-2 bg-ci-green rounded-full"></span>
                                            <span className="font-medium">Opportunités d'investissement et de partenariat</span>
                                        </li>
                                    </ul>
                                    <Button variant="link" className="p-0 ci-green font-bold text-lg hover:underline group">
                                        Rejoindre notre communauté
                                        <span className="ml-3 group-hover:translate-x-2 transition-transform duration-300">→</span>
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Other Services Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="p-8 hover-lift hover:shadow-xl transition-all duration-300 group">
                            <CardHeader>
                                <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-white text-2xl">⚖️</span>
                                </div>
                                <CardTitle className="font-bold text-gray-900 text-xl">Services Juridiques</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 leading-relaxed">Légalisation et authentification de documents officiels, assistance procédures administratives</p>
                            </CardContent>
                        </Card>
                        <Card className="p-8 hover-lift hover:shadow-xl transition-all duration-300 group">
                            <CardHeader>
                                <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-white text-2xl">📋</span>
                                </div>
                                <CardTitle className="font-bold text-gray-900 text-xl">État Civil</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 leading-relaxed">Certificats de naissance, mariage, décès et autres actes d'état civil authentifiés</p>
                            </CardContent>
                        </Card>
                        <Card className="p-8 hover-lift hover:shadow-xl transition-all duration-300 group">
                            <CardHeader>
                                <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-white text-2xl">💼</span>
                                </div>
                                <CardTitle className="font-bold text-gray-900 text-xl">Commerce & Affaires</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 leading-relaxed">Promotion des échanges commerciaux et accompagnement des investisseurs</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* News & Updates */}
            <section className="py-20 gradient-ci-soft">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-16 animate-fade-in">
                        <div>
                            <h3 className="text-4xl font-bold text-gray-900 mb-4">Actualités & Communiqués Officiels</h3>
                            <p className="text-gray-600 text-lg">Restez informés des dernières nouvelles et annonces importantes</p>
                        </div>
                        <a href="#" className="ci-orange font-bold text-lg hover:underline flex items-center space-x-2 hover-lift">
                            <span>Voir toutes les actualités</span>
                            <span>→</span>
                        </a>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10">
                        <article className="bg-white rounded-2xl shadow-xl overflow-hidden hover-lift transition-all duration-300 hover:shadow-2xl group">
                            <div className="h-56 bg-gradient-to-br from-ci-orange/30 to-ci-green/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                <span className="text-6xl animate-subtle-float">📢</span>
                            </div>
                            <div className="p-8">
                                <span className="inline-block text-xs ci-orange font-bold bg-ci-orange/10 px-3 py-1 rounded-full mb-4">COMMUNIQUÉ OFFICIEL</span>
                                <h4 className="font-bold text-gray-900 text-xl mb-4 leading-tight">Nouvelles procédures pour les demandes de visa</h4>
                                <p className="text-gray-600 mb-6 leading-relaxed">Mise à jour importante des procédures et documents requis pour toutes les demandes de visa...</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500 font-medium">15 Mars 2025</span>
                                    <a href="#" className="ci-orange font-semibold hover:underline">Lire plus →</a>
                                </div>
                            </div>
                        </article>
                        <article className="bg-white rounded-2xl shadow-xl overflow-hidden hover-lift transition-all duration-300 hover:shadow-2xl group">
                            <div className="h-56 bg-gradient-to-br from-ci-green/30 to-gray-300 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                <span className="text-6xl animate-subtle-float">🎉</span>
                            </div>
                            <div className="p-8">
                                <span className="inline-block text-xs ci-green font-bold bg-ci-green/10 px-3 py-1 rounded-full mb-4">ÉVÉNEMENT SPÉCIAL</span>
                                <h4 className="font-bold text-gray-900 text-xl mb-4 leading-tight">Célébration de la Fête de l'Indépendance</h4>
                                <p className="text-gray-600 mb-6 leading-relaxed">Rejoignez-nous pour célébrer le 64ème anniversaire de l'indépendance de la Côte d'Ivoire...</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500 font-medium">7 Août 2025</span>
                                    <a href="#" className="ci-green font-semibold hover:underline">Participer →</a>
                                </div>
                            </div>
                        </article>
                        <article className="bg-white rounded-2xl shadow-xl overflow-hidden hover-lift transition-all duration-300 hover:shadow-2xl group">
                            <div className="h-56 bg-gradient-to-br from-gray-400 to-ci-orange/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                <span className="text-6xl animate-subtle-float">💼</span>
                            </div>
                            <div className="p-8">
                                <span className="inline-block text-xs text-gray-700 font-bold bg-gray-200 px-3 py-1 rounded-full mb-4">ÉCONOMIE & INVESTISSEMENT</span>
                                <h4 className="font-bold text-gray-900 text-xl mb-4 leading-tight">Forum d'investissement USA-Côte d'Ivoire</h4>
                                <p className="text-gray-600 mb-6 leading-relaxed">Découvrez les opportunités d'investissement exceptionnelles en Côte d'Ivoire...</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500 font-medium">12 Mars 2025</span>
                                    <a href="#" className="text-gray-800 font-semibold hover:underline">En savoir plus →</a>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid lg:grid-cols-4 gap-12">
                        <div className="lg:col-span-2">
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="w-16 h-16 bg-ci-orange rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-xl">🇨🇮</span>
                                </div>
                                <div>
                                    <h5 className="font-bold text-xl">Consulat Général de Côte d'Ivoire</h5>
                                    <p className="text-gray-400 text-lg">New York, États-Unis</p>
                                </div>
                            </div>
                            <p className="text-gray-400 mb-8 max-w-lg leading-relaxed text-lg">
                                Au service de la diaspora ivoirienne et des visiteurs aux États-Unis depuis plus de 60 ans. 
                                Votre partenaire de confiance pour toutes vos démarches consulaires.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="w-12 h-12 bg-ci-orange rounded-full flex items-center justify-center hover:bg-ci-orange transition-all duration-300 hover-lift">
                                    <span className="text-white font-bold">f</span>
                                </a>
                                <a href="#" className="w-12 h-12 bg-ci-orange rounded-full flex items-center justify-center hover:bg-ci-orange transition-all duration-300 hover-lift">
                                    <span className="text-white font-bold">t</span>
                                </a>
                                <a href="#" className="w-12 h-12 bg-ci-orange rounded-full flex items-center justify-center hover:bg-ci-orange transition-all duration-300 hover-lift">
                                    <span className="text-white font-bold">in</span>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6 text-lg">Services Essentiels</h5>
                            <ul className="space-y-4">
                                <li><a href="#" className="text-gray-400 hover:ci-orange transition-colors text-lg hover:translate-x-1 duration-300">🛂 Demande de visa</a></li>
                                <li><a href="#" className="text-gray-400 hover:ci-orange transition-colors text-lg hover:translate-x-1 duration-300">📘 Renouvellement passeport</a></li>
                                <li><a href="#" className="text-gray-400 hover:ci-orange transition-colors text-lg hover:translate-x-1 duration-300">⚖️ Légalisation documents</a></li>
                                <li><a href="#" className="text-gray-400 hover:ci-orange transition-colors text-lg hover:translate-x-1 duration-300">📋 Certificats officiels</a></li>
                                <li><a href="#" className="text-gray-400 hover:ci-orange transition-colors text-lg hover:translate-x-1 duration-300">🚨 Assistance d'urgence</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6 text-lg">Contact & Localisation</h5>
                            <div className="space-y-4 text-gray-400">
                                <div className="flex items-start space-x-3">
                                    <span className="ci-orange text-xl">📍</span>
                                    <div>
                                        <p className="font-medium">801 Second Avenue, 5th Floor</p>
                                        <p>New York, NY 10017, États-Unis</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="ci-orange text-xl">📞</span>
                                    <p className="font-medium">+1 (212) 697-0900</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="ci-orange text-xl">📧</span>
                                    <p>consulat.newyork@diplomatie.gouv.ci</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="ci-orange text-xl">⏰</span>
                                    <p>Lun-Ven: 9h00-17h00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-16 pt-8 text-center">
                        <p className="text-gray-400 text-lg">
                            © 2025 Consulat Général de Côte d'Ivoire - New York. Tous droits réservés. 
                            <span className="mx-3">•</span>
                            <a href="#" className="hover:ci-orange transition-colors">Politique de confidentialité</a>
                            <span className="mx-3">•</span>
                            <a href="#" className="hover:ci-orange transition-colors">Mentions légales</a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}