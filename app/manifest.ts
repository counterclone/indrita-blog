import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FirstHand by Akhil Handa',
    short_name: 'FirstHand',
    description: 'Digital banking insights and fintech innovation chronicles by Akhil Handa, former President & CDO of Bank of Baroda',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    orientation: 'portrait',
    icons: [
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/favicon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/favicon-64x64.png',
        sizes: '64x64',
        type: 'image/png',
      },
      {
        src: '/favicon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: '/favicon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    categories: ['business', 'finance', 'education'],
    lang: 'en',
    dir: 'ltr',
  }
} 