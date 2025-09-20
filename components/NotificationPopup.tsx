"use client";

import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Bell, CheckCircle, Info, X } from "lucide-react";

interface NotificationPopupProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    type?: "info" | "warning" | "success" | "announcement";
    actionButton?: {
        text: string;
        onClick: () => void;
    };
    secondaryButton?: {
        text: string;
        onClick: () => void;
    };
}

export default function NotificationPopup({
    isOpen,
    onClose,
    title,
    message,
    type = "info",
    actionButton,
    secondaryButton,
}: NotificationPopupProps) {
    const icons = {
        info: Info,
        warning: AlertTriangle,
        success: CheckCircle,
        announcement: Bell,
    };

    const colors = {
        info: "text-ci-orange",
        warning: "text-yellow-500",
        success: "text-ci-green",
        announcement: "text-ci-orange",
    };

    const bgColors = {
        info: "bg-ci-orange/10",
        warning: "bg-yellow-500/10",
        success: "bg-ci-green/10",
        announcement: "bg-gradient-to-br from-ci-orange/10 to-ci-green/10",
    };

    const Icon = icons[type];

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog
                    as={motion.div}
                    open={isOpen}
                    onClose={onClose}
                    className="relative z-50"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel
                            as={motion.div}
                            initial={{ scale: 0.95, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
                        >
                            <div className={`${bgColors[type]} p-6`}>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className={`h-12 w-12 ${bgColors[type]} flex items-center justify-center rounded-full`}
                                        >
                                            <Icon
                                                className={`h-6 w-6 ${colors[type]}`}
                                            />
                                        </div>
                                        <div>
                                            <Dialog.Title className="text-xl font-bold text-gray-900">
                                                {title}
                                            </Dialog.Title>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="rounded-full p-1 text-gray-400 transition-all duration-300 hover:bg-white/50 hover:text-gray-600"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                <p className="mb-6 leading-relaxed text-gray-600">
                                    {message}
                                </p>

                                <div className="flex flex-col gap-3 sm:flex-row">
                                    {actionButton && (
                                        <button
                                            onClick={actionButton.onClick}
                                            className="bg-ci-orange hover:bg-ci-orange hover-lift flex-1 rounded-xl px-6 py-3 font-semibold text-white transition-all duration-300"
                                        >
                                            {actionButton.text}
                                        </button>
                                    )}
                                    {secondaryButton && (
                                        <button
                                            onClick={secondaryButton.onClick}
                                            className="hover:border-ci-orange hover:text-ci-orange flex-1 rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all duration-300"
                                        >
                                            {secondaryButton.text}
                                        </button>
                                    )}
                                    {!actionButton && !secondaryButton && (
                                        <button
                                            onClick={onClose}
                                            className="bg-ci-orange hover:bg-ci-orange hover-lift rounded-xl px-6 py-3 font-semibold text-white transition-all duration-300"
                                        >
                                            Compris
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    );
}
