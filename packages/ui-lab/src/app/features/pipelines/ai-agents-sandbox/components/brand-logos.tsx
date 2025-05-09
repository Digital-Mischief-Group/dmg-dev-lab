'use client'

import {useState} from 'react'

interface BrandLogoProps {
  name: string
  logo: string
  website?: string
}

export const BrandLogo = ({name, logo, website}: BrandLogoProps) => {
  return (
    <div className='flex items-center space-x-2 p-2 border rounded-md hover:bg-gray-50'>
      <div className='h-10 w-10 flex items-center justify-center'>
        <img
          src={logo}
          alt={`${name} logo`}
          className='max-h-full max-w-full'
        />
      </div>
      <div>
        <p className='font-medium'>{name}</p>
        {website && (
          <a
            href={website}
            target='_blank'
            rel='noopener noreferrer'
            className='text-sm text-blue-500 hover:underline'
          >
            Visit Website
          </a>
        )}
      </div>
    </div>
  )
}

export default function BrandLogos() {
  const [logos] = useState<BrandLogoProps[]>([
    {
      name: 'GitHub',
      logo: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
      website: 'https://github.com',
    },
    {
      name: 'Vercel',
      logo: 'https://assets.vercel.com/image/upload/v1662130559/front/favicon/vercel/favicon.svg',
      website: 'https://vercel.com',
    },
    {
      name: 'Trigger.dev',
      logo: 'https://trigger.dev/favicon.png',
      website: 'https://trigger.dev',
    },
  ])

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {logos.map((logo) => (
        <BrandLogo key={logo.name} {...logo} />
      ))}
    </div>
  )
}
