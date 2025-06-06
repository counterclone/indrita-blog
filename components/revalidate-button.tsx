"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

interface RevalidateButtonProps {
  path?: string
  className?: string
}

export function RevalidateButton({ path = '/', className = '' }: RevalidateButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleRevalidate = async () => {
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(`✅ ${data.message}`)
      } else {
        setMessage(`❌ ${data.error}`)
      }
    } catch (error) {
      setMessage('❌ Failed to revalidate')
    } finally {
      setIsLoading(false)
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000)
    }
  }

  return (
    <div className={className}>
      <Button
        onClick={handleRevalidate}
        disabled={isLoading}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        {isLoading ? 'Revalidating...' : 'Refresh Cache'}
      </Button>
      {message && (
        <p className="text-xs mt-1 text-center whitespace-nowrap">{message}</p>
      )}
    </div>
  )
} 