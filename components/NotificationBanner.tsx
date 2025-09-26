"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { useEffect, useState } from "react";

interface NotificationBannerProps {
    type?: "info" | "warning" | "success" | "error";
    message: string;
    action?: {
        text: string;
        onClick: () => void;
    };
    dismissible?: boolean;
    autoClose?: number; // in milliseconds
    persistent?: boolean;
}

export default function NotificationBanner({
    type = "info",
    message,
    action,
    dismissible = true,
    autoClose,
    persistent = false,
}: NotificationBannerProps) {
    const [isVisible, setIsVisible] = useState(true);

    const icons = {
        info: Info,
        warning: AlertTriangle,
        success: CheckCircle,
        error: AlertCircle,
    };

    const colors = {
        info: "bg-ci-orange",
        warning: "bg-yellow-500",
        success: "bg-ci-green",
        error: "bg-red-500",
    };

    const Icon = icons[type];

    useEffect(() => {
        if (autoClose && !persistent) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, autoClose);
            return () => clearTimeout(timer);
        }
    }, [autoClose, persistent]);

    const handleDismiss = () => {
        if (dismissible) {
            setIsVisible(false);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`${colors[type]} relative overflow-hidden px-4 py-3 text-white`}
                >
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative mx-auto flex max-w-7xl items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Icon className="h-5 w-5 animate-pulse" />
                            <span className="text-sm font-medium md:text-base">
                                {message}
                            </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            {action && (
                                <button
                                    onClick={action.onClick}
                                    className="rounded-full bg-white/20 px-4 py-1 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white/30"
                                >
                                    {action.text}
                                </button>
                            )}
                            {dismissible && (
                                <button
                                    onClick={handleDismiss}
                                    className="rounded-full p-1 text-white/80 transition-all duration-300 hover:bg-white/20 hover:text-white"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
