'use client'

import { Toaster } from 'react-hot-toast'

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        // Default options for all toasts
        duration: 4000,
        style: {
          background: '#fff',
          color: '#374151',
          borderRadius: '12px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid #E5E7EB',
          padding: '16px',
          fontSize: '14px',
          fontWeight: '500',
        },
        // Success toast
        success: {
          duration: 5000,
          style: {
            background: '#00AA4F',
            color: '#fff',
            border: '1px solid #00AA4F',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#00AA4F',
          },
        },
        // Error toast
        error: {
          duration: 6000,
          style: {
            background: '#EF4444',
            color: '#fff',
            border: '1px solid #EF4444',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#EF4444',
          },
        },
        // Loading toast
        loading: {
          style: {
            background: '#FF7F00',
            color: '#fff',
            border: '1px solid #FF7F00',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#FF7F00',
          },
        },
      }}
    />
  )
}