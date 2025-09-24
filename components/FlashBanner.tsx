"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

export default function FlashBanner() {
    const [isVisible, setIsVisible] = useState(true);

    const newsItems = [
        "📢 Nouvelle procédure de demande de visa en ligne - Consultez express54.org pour plus d'informations",
        "⚠️ Horaires d'ouverture modifiés: Lundi-Vendredi 9h-17h - Merci de votre compréhension",
        "🎉 Événement culturel ivoirien le 15 février 2025 - Inscription ouverte",
        "📄 Nouveau système de rendez-vous en ligne disponible pour tous les services consulaires",
        "🔔 Formation consulaire gratuite pour les membres de la diaspora - Places limitées",
    ];

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-orange-800 to-orange-800 text-white shadow-lg border-t-2 border-orange-400">
            {/* Close button */}
            <button hidden
                onClick={() => setIsVisible(false)}
                className="absolute top-2 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Fermer la bannière"
            >
                <X className="h-4 w-4" />
            </button>

            {/* Flash Info Content */}
            <div className="overflow-hidden py-3">
                <div className="flex items-center">
                    <div className="flex-shrink-0 px-4">
                        <span className="font-bold  text-sm uppercase tracking-wider">
                            🚨 Flash Info
                        </span>
                    </div>
                    
                    {/* Scrolling news ticker */}
                    <div className="flex-1 relative overflow-hidden">
                        <motion.div
                            className="flex space-x-12 whitespace-nowrap"
                            animate={{
                                x: [0, -100 * newsItems.length + "%"],
                            }}
                            transition={{
                                duration: 35, // Slower speed for readability
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        >
                            {[...newsItems, ...newsItems].map((item, index) => (
                                <span
                                    key={index}
                                    className="text-sm font-medium flex-shrink-0"
                                >
                                    {item}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}