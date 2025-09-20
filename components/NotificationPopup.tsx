'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog } from '@headlessui/react'
import { X, AlertTriangle, Info, CheckCircle, Bell } from 'lucide-react'

interface NotificationPopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  type?: 'info' | 'warning' | 'success' | 'announcement'
  actionButton?: {
    text: string
    onClick: () => void
  }
  secondaryButton?: {
    text: string
    onClick: () => void
  }
}

export default function NotificationPopup({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  actionButton,
  secondaryButton
}: NotificationPopupProps) {
  const icons = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle,
    announcement: Bell
  }

  const colors = {
    info: 'text-ci-orange',
    warning: 'text-yellow-500',
    success: 'text-ci-green',
    announcement: 'text-ci-orange'
  }

  const bgColors = {
    info: 'bg-ci-orange/10',
    warning: 'bg-yellow-500/10',
    success: 'bg-ci-green/10',
    announcement: 'bg-gradient-to-br from-ci-orange/10 to-ci-green/10'
  }

  const Icon = icons[type]

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
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className={`${bgColors[type]} p-6`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${bgColors[type]} rounded-full flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${colors[type]}`} />
                    </div>
                    <div>
                      <Dialog.Title className="text-xl font-bold text-gray-900">
                        {title}
                      </Dialog.Title>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 p-1 hover:bg-white/50 rounded-full transition-all duration-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 leading-relaxed mb-6">
                  {message}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  {actionButton && (
                    <button
                      onClick={actionButton.onClick}
                      className="bg-ci-orange text-white px-6 py-3 rounded-xl font-semibold hover:bg-ci-orange transition-all duration-300 hover-lift flex-1"
                    >
                      {actionButton.text}
                    </button>
                  )}
                  {secondaryButton && (
                    <button
                      onClick={secondaryButton.onClick}
                      className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-ci-orange hover:text-ci-orange transition-all duration-300 flex-1"
                    >
                      {secondaryButton.text}
                    </button>
                  )}
                  {!actionButton && !secondaryButton && (
                    <button
                      onClick={onClose}
                      className="bg-ci-orange text-white px-6 py-3 rounded-xl font-semibold hover:bg-ci-orange transition-all duration-300 hover-lift"
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
  )
}