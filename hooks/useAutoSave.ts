import { useEffect, useRef, useCallback, useState } from 'react'
import { toast } from 'sonner'

type AutoSaveStatus = 'idle' | 'pending' | 'saving' | 'saved' | 'error';

interface UseAutoSaveOptions {
  data: any
  onSave: (data: any) => Promise<void>
  delay?: number
  enabled?: boolean
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function useAutoSave({
  data,
  onSave,
  delay = 3000, // 3 seconds
  enabled = true,
  onSuccess,
  onError
}: UseAutoSaveOptions) {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const lastSavedDataRef = useRef<string | undefined>(undefined)
  const [isSaving, setIsSaving] = useState(false)
  const [status, setStatus] = useState<AutoSaveStatus>('idle')
  const [lastSaved, setLastSaved] = useState<Date | undefined>()

  const save = useCallback(async () => {
    if (isSaving) return

    const currentDataString = JSON.stringify(data)
    
    // Don't save if data hasn't changed
    if (lastSavedDataRef.current === currentDataString) {
      setStatus('saved')
      return
    }

    try {
      setIsSaving(true)
      setStatus('saving')
      await onSave(data)
      lastSavedDataRef.current = currentDataString
      const now = new Date()
      setLastSaved(now)
      setStatus('saved')
      onSuccess?.()
      
      // Auto-hide the saved status after 3 seconds
      setTimeout(() => {
        setStatus('idle')
      }, 3000)
    } catch (error) {
      console.error('Auto-save failed:', error)
      setStatus('error')
      onError?.(error as Error)
      toast.error('Erreur lors de la sauvegarde automatique')
      
      // Auto-hide the error status after 5 seconds
      setTimeout(() => {
        setStatus('idle')
      }, 5000)
    } finally {
      setIsSaving(false)
    }
  }, [data, onSave, onSuccess, onError, isSaving])

  const debouncedSave = useCallback(() => {
    if (!enabled) return

    // Set status to pending when changes are detected
    setStatus('pending')

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout
    timeoutRef.current = setTimeout(save, delay)
  }, [save, delay, enabled])

  // Trigger save when data changes
  useEffect(() => {
    debouncedSave()

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [debouncedSave])

  // Save before page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        // Try to save synchronously (may not always work)
        save()
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [save])

  // Manual save function
  const saveNow = useCallback(async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    await save()
  }, [save])

  return {
    saveNow,
    isSaving,
    status,
    lastSaved
  }
}