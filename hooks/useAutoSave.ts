import { useEffect, useRef, useCallback } from 'react'
import { toast } from 'sonner'

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
  const isSavingRef = useRef(false)

  const save = useCallback(async () => {
    if (isSavingRef.current) return

    const currentDataString = JSON.stringify(data)
    
    // Don't save if data hasn't changed
    if (lastSavedDataRef.current === currentDataString) return

    try {
      isSavingRef.current = true
      await onSave(data)
      lastSavedDataRef.current = currentDataString
      onSuccess?.()
    } catch (error) {
      console.error('Auto-save failed:', error)
      onError?.(error as Error)
    } finally {
      isSavingRef.current = false
    }
  }, [data, onSave, onSuccess, onError])

  const debouncedSave = useCallback(() => {
    if (!enabled) return

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
    isSaving: isSavingRef.current
  }
}