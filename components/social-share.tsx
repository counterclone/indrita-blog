"use client"

import { useState } from "react"
import { Share2, Twitter, Linkedin, Facebook, Link2, MessageCircle, Check } from "lucide-react"

interface SocialShareProps {
  title: string
  url: string
  excerpt?: string
}

export function SocialShare({ title, url, excerpt }: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const shareData = {
    twitter: {
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `${title} - A perspective on digital banking and fintech innovation by @akhilhanda12`
      )}&url=${encodeURIComponent(url)}`,
      message: `${title} - A perspective by @akhilhanda12`,
    },
    linkedin: {
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      message: `An insightful article: "${title}" - ${excerpt ? excerpt.slice(0, 100) + '...' : ''}`,
    },
    facebook: {
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      message: `an insightful article: "${title}"`,
    },
    whatsapp: {
      url: `https://wa.me/?text=${encodeURIComponent(
        `${title}\n\nRead this insightful article on digital banking:\n${url}`
      )}`,
      message: `${title}\n\nRead this insightful article on digital banking:\n${url}`,
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const shareButtons = [
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'hover:bg-black hover:text-white',
      url: shareData.twitter.url,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'hover:bg-blue-600 hover:text-white',
      url: shareData.linkedin.url,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'hover:bg-blue-700 hover:text-white',
      url: shareData.facebook.url,
    },
    {
      name: 'WhatsApp',
      icon: () => (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.488" />
        </svg>
      ),
      color: 'hover:bg-green-500 hover:text-white',
      url: shareData.whatsapp.url,
    },
  ]

  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">Share this article:</span>
        
        {/* Desktop version - show all buttons */}
        <div className="hidden md:flex items-center gap-2">
          {shareButtons.map((button) => (
            <a
              key={button.name}
              href={button.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-600 transition-all duration-200 ${button.color} group`}
              title={`Share on ${button.name}`}
            >
              <button.icon className="h-4 w-4" />
            </a>
          ))}
          
          <button
            onClick={copyToClipboard}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all duration-200"
            title="Copy link"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Link2 className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Mobile version - dropdown */}
        <div className="md:hidden relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all duration-200"
          >
            <Share2 className="h-4 w-4" />
          </button>

          {isOpen && (
            <div className="absolute top-12 right-0 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[200px]">
              <div className="space-y-3">
                {shareButtons.map((button) => (
                  <a
                    key={button.name}
                    href={button.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <button.icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{button.name}</span>
                  </a>
                ))}
                
                <button
                  onClick={() => {
                    copyToClipboard()
                    setIsOpen(false)
                  }}
                  className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors w-full text-left"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Link2 className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">
                    {copied ? 'Copied!' : 'Copy link'}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
} 