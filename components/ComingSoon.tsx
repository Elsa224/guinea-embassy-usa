"use client";

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Mail } from "lucide-react";

interface ComingSoonProps {
    title?: string;
    message?: string;
    showBackButton?: boolean;
    currentPath?: string;
}

export default function ComingSoon({ 
    title = "Page en Construction",
    message = "Cette page est actuellement en cours de développement. Revenez bientôt pour découvrir du contenu exclusif !",
    showBackButton = true,
    currentPath = "/"
}: ComingSoonProps) {
    return (
        <Layout currentPath={currentPath}>
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 flex items-center justify-center">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="mx-auto max-w-4xl text-center">
                        {/* Animated logo/icon */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="mb-8"
                        >
                            <div className="mx-auto mb-6 mt-0 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-green-600 shadow-2xl">
                                <Clock className="h-16 w-16 text-white" />
                            </div>
                            <motion.div hidden
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                className="mx-auto h-20 w-20"
                            >
                                <img
                                    src="/assets/images-for-the-new-website/logo_updated.png"
                                    alt="Logo Consulat"
                                    className="h-full w-full object-contain"
                                />
                            </motion.div>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl"
                        >
                            {title}
                        </motion.h1>

                        {/* Message */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="mb-8 text-lg leading-relaxed text-gray-600 sm:text-xl lg:text-2xl"
                        >
                            {message}
                        </motion.p>

                        {/* Features coming soon */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="mb-12"
                        >
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                <div className="rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-sm">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                                        <span className="text-2xl">🔄</span>
                                    </div>
                                    <h3 className="mb-2 font-semibold text-gray-900">
                                        Contenu Enrichi
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Informations détaillées et guides pratiques
                                    </p>
                                </div>
                                
                                <div className="rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-sm">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                        <span className="text-2xl">🎨</span>
                                    </div>
                                    <h3 className="mb-2 font-semibold text-gray-900">
                                        Design Moderne
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Interface utilisateur améliorée
                                    </p>
                                </div>
                                
                                <div className="rounded-2xl bg-white/70 p-6 shadow-lg backdrop-blur-sm sm:col-span-2 lg:col-span-1">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                                        <span className="text-2xl">⚡</span>
                                    </div>
                                    <h3 className="mb-2 font-semibold text-gray-900">
                                        Fonctionnalités Avancées
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Outils interactifs pour vos démarches
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Action buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                        >
                            {showBackButton && (
                                <Button
                                    onClick={() => window.history.back()}
                                    variant="outline"
                                    className="flex items-center rounded-xl border-2 border-orange-300 px-8 py-3 font-medium text-orange-600 transition-all duration-300 hover:bg-orange-50 hover:border-orange-400"
                                >
                                    <ArrowLeft className="mr-2 h-5 w-5" />
                                    Retour
                                </Button>
                            )}
                            
                            <Button
                                onClick={() => window.location.href = '/'}
                                className="rounded-xl bg-gradient-to-r from-orange-600 to-green-600 px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:from-orange-700 hover:to-green-700 hover:shadow-xl"
                            >
                                Retour à l'accueil
                            </Button>
                        </motion.div>

                        {/* Newsletter signup */}
                        <motion.div hidden
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="mt-16 rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-sm"
                        >
                            <div className="mb-4 flex items-center justify-center">
                                <Mail className="mr-3 h-6 w-6 text-orange-600" />
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Restez informé
                                </h3>
                            </div>
                            <p className="mb-6 text-gray-600">
                                Soyez le premier à savoir quand cette page sera disponible
                            </p>
                            <div className="mx-auto flex max-w-md gap-3">
                                <input
                                    type="email"
                                    placeholder="Votre adresse email"
                                    className="flex-1 rounded-xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                                />
                                <Button className="rounded-xl bg-orange-600 px-6 py-3 text-white hover:bg-orange-700">
                                    Notifier
                                </Button>
                            </div>
                        </motion.div>

                        {/* Estimated completion */}
                        <motion.p hidden
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="mt-8 text-sm text-gray-500"
                        >
                            Mise à jour prévue : Prochainement • 
                            Consulat Général de Côte d'Ivoire - New York
                        </motion.p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}