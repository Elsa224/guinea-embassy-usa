"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import Breadcrumb from "./Breadcrumb";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
    children: React.ReactNode;
    currentPath?: string;
}

export default function Layout({ children, currentPath = "/" }: LayoutProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

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

    return (
        <div className="min-h-screen bg-white">
            {/* Header with Contact Information & Navigation */}
            <Header currentPath={currentPath} isScrolled={isScrolled} />

            {/* Spacer for fixed header */}
            <div className="h-24 sm:h-28"></div>

            {/* Breadcrumb */}
            <Breadcrumb />

            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <Footer />

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