'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, Info, CheckCircle, AlertCircle } from 'lucide-react'

interface NotificationBannerProps {
  type?: 'info' | 'warning' | 'success' | 'error'
  message: string
  action?: {
    text: string
    onClick: () => void
  }
  dismissible?: boolean
  autoClose?: number // in milliseconds
  persistent?: boolean
}

export default function NotificationBanner({
  type = 'info',
  message,
  action,
  dismissible = true,
  autoClose,
  persistent = false
}: NotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  const icons = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle,
    error: AlertCircle
  }

  const colors = {
    info: 'bg-ci-orange',
    warning: 'bg-yellow-500',
    success: 'bg-ci-green',
    error: 'bg-red-500'
  }

  const Icon = icons[type]

  useEffect(() => {
    if (autoClose && !persistent) {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, autoClose)
      return () => clearTimeout(timer)
    }
  }, [autoClose, persistent])

  const handleDismiss = () => {
    if (dismissible) {
      setIsVisible(false)
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`${colors[type]} text-white py-3 px-4 relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
          <div className="relative max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon className="w-5 h-5 animate-pulse" />
              <span className="font-medium text-sm md:text-base">{message}</span>
            </div>
            <div className="flex items-center space-x-4">
              {action && (
                <button
                  onClick={action.onClick}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-1 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                >
                  {action.text}
                </button>
              )}
              {dismissible && (
                <button
                  onClick={handleDismiss}
                  className="text-white/80 hover:text-white p-1 hover:bg-white/20 rounded-full transition-all duration-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}