import type { Block } from 'payload'

export const YouTubeVideo: Block = {
  slug: 'youTubeVideo',
  interfaceName: 'YouTubeVideoBlock',
  fields: [
    {
      name: 'videoUrl',
      type: 'text',
      required: true,
      admin: {
        description: 'Paste the YouTube video URL (e.g., https://www.youtube.com/watch?v=XXXXX)',
      },
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Optional title shown above the video',
      },
    },
  ],
}