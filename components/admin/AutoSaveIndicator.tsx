"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clock, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AutoSaveIndicatorProps {
  status: "idle" | "saving" | "saved" | "error";
  lastSaved?: Date;
  className?: string;
  position?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
}

export function AutoSaveIndicator({ 
  status, 
  lastSaved, 
  className,
  position = "bottom-right" 
}: AutoSaveIndicatorProps) {
  const positionClasses = {
    "top-right": "top-4 right-4",
    "bottom-right": "bottom-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-left": "bottom-4 left-4",
  };

  const getStatusContent = () => {
    switch (status) {
      case "saving":
        return (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Sauvegarde automatique...</span>
          </>
        );
      case "saved":
        return (
          <>
            <Check className="h-4 w-4" />
            <span>
              Sauvegardé {lastSaved && `à ${lastSaved.toLocaleTimeString('fr-FR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}`}
            </span>
          </>
        );
      case "error":
        return (
          <>
            <AlertCircle className="h-4 w-4" />
            <span>Erreur de sauvegarde</span>
          </>
        );
      default:
        return (
          <>
            <Clock className="h-4 w-4" />
            <span>Non sauvegardé</span>
          </>
        );
    }
  };

  const getStatusColors = () => {
    switch (status) {
      case "saving":
        return "bg-ci-orange text-white";
      case "saved":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <AnimatePresence>
      {status !== "idle" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed z-50 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-lg",
            getStatusColors(),
            positionClasses[position],
            className
          )}
        >
          {getStatusContent()}
        </motion.div>
      )}
    </AnimatePresence>
  );
}