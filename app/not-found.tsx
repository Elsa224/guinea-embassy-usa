"use client";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
    const quickLinks = [
        { label: "Accueil", href: "/", icon: <Home className="h-5 w-5" /> },
        { label: "Services Consulaires", href: "/services", icon: <Search className="h-5 w-5" /> },
        { label: "Actualités", href: "/actualites", icon: <Search className="h-5 w-5" /> },
        { label: "Médiathèque", href: "/mediatheque", icon: <Search className="h-5 w-5" /> },
    ];

    return (
        <Layout>
            <div className="min-h-screen bg-orange-50 flex items-center justify-center py-12">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="mx-auto max-w-4xl text-center">
                        {/* 404 Animation */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="mb-8"
                        >
                            <div className="relative">
                                {/* Large 404 */}
                                <motion.h1
                                    className="text-8xl sm:text-9xl lg:text-[12rem] font-black text-orange-400 opacity-20"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    404
                                </motion.h1>
                                
                                {/* Logo overlay */}
                                {/* <motion.div
                                    className="absolute inset-0 flex items-center justify-center"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                >
                                    <div className="rounded-full bg-white/90 p-8 shadow-2xl backdrop-blur-sm">
                                        <img
                                            src="/assets/images-for-the-new-website/logo_updated.png"
                                            alt="Logo Consulat"
                                            className="h-20 w-20 object-contain"
                                        />
                                    </div>
                                </motion.div> */}
                            </div>
                        </motion.div>

                        {/* Error Message */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mb-8"
                        >
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                                Page Non Trouvée
                            </h2>
                            <p className="mb-2 text-lg text-gray-600 sm:text-xl">
                                La page que vous recherchez n'existe pas ou a été déplacée.
                            </p>
                            <p className="text-base text-gray-500">
                                Consulat Général de Côte d'Ivoire - New York
                            </p>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
                        >
                            <Button
                                onClick={() => window.history.back()}
                                variant="outline"
                                className="flex items-center rounded-xl border-2 border-orange-300 px-8 py-3 font-medium text-orange-600 transition-all duration-300 hover:bg-orange-50 hover:border-orange-400"
                            >
                                <ArrowLeft className="mr-2 h-5 w-5" />
                                Page précédente
                            </Button>
                            
                            <Button
                                onClick={() => window.location.href = '/'}
                                className="rounded-xl bg-orange-600 px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:bg-orange-700 hover:shadow-xl"
                            >
                                <Home className="mr-2 h-5 w-5" />
                                Retour à l'accueil
                            </Button>
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <Card className="border-0 bg-white/80 shadow-2xl backdrop-blur-sm">
                                <CardContent className="p-8">
                                    <h3 className="mb-6 text-xl font-bold text-gray-900">
                                        Liens Utiles
                                    </h3>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                        {quickLinks.map((link, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                                            >
                                                <Button
                                                    onClick={() => window.location.href = link.href}
                                                    variant="ghost"
                                                    className="group h-auto w-full flex-col rounded-xl p-6 transition-all duration-300 hover:bg-orange-50 hover:shadow-lg"
                                                >
                                                    <div className="mb-3 rounded-full bg-orange-100 p-3 transition-transform duration-300 group-hover:scale-110">
                                                        {link.icon}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                                        {link.label}
                                                    </span>
                                                </Button>
                                            </motion.div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="mt-8"
                        >
                            <div className="rounded-2xl bg-orange-100/50 p-6">
                                <h4 className="mb-3 text-lg font-bold text-gray-900">
                                    Besoin d'aide ?
                                </h4>
                                <p className="mb-4 text-gray-600">
                                    Si vous ne trouvez pas ce que vous cherchez, n'hésitez pas à nous contacter.
                                </p>
                                <div className="flex flex-col gap-2 text-sm text-gray-700 sm:flex-row sm:justify-center sm:gap-6">
                                    <span className="font-medium">📞 (646) 476-7614</span>
                                    <a
                                        href="https://express54.org"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 font-medium hover:underline"
                                    >
                                        <img
                                            src="/assets/images-for-the-new-website/express54-blue-icon.png"
                                            alt="Express54"
                                            className="h-5 w-5"
                                        />
                                        express54.org
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Footer Note */}
                    </div>
                </div>
            </div>
        </Layout>
    );
}