import React from 'react'

import type { YouTubeVideoBlock as YouTubeVideoBlockProps } from '@/payload-types'

const getYouTubeId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}

export const YouTubeVideoBlock: React.FC<YouTubeVideoBlockProps> = ({ videoUrl, title }) => {
  const videoId = getYouTubeId(videoUrl)

  if (!videoId) return null

  return (
    <div className="container my-16">
      {title && <h3 className="text-2xl font-semibold mb-4">{title}</h3>}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title || 'YouTube video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  )
}