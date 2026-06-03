'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'



interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  //this had bg-white/40 dark:bg-black/40 backdrop-blur-sm
  //{...(theme ? { 'data-theme': theme } : {})} this was cut from the header classname bellow
  return (
    <>
      {/* Top banner with big logo */}
      <div className="w-full flex justify-left py-6 px-5">
        <Link href="/">
          <img
            src="/media/logo-img/cvethublogo.png"
            alt="fmv logo"
            className="h-50 w-auto"
          />
        </Link>
      </div>

      <header className="top-0 z-50 w-full bg-blue-500 backdrop-blur-sm justify-center" > 
        <div className=" px-5 flex items-center justify-around gap-8 container">
          <Link href="/incio" className="px-4 py-2 bg-white">
            <Logo loading="eager" priority="high" className="dark:invert-1" />
          </Link>
          <HeaderNav data={data} />
        </div>
      </header>
    </>
  )
}

// Adding social media icons with links to the header (uncomment the code below and replace YOUR_HANDLE with actual handles)
 //        <div className="flex items-center gap-1">
 //           <a href="https://instagram.com/YOUR_HANDLE" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-background hover:bg-blue-500 transition-colors">
 //              <FaInstagram className="w-5 h-5" />
 //            </a>
 //            <a href="https://facebook.com/YOUR_HANDLE" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-background hover:bg-blue-500 transition-colors">
 //              <FaFacebook className="w-5 h-5" />
 //            </a>
 //            <a href="https://linkedin.com/in/YOUR_HANDLE" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-background hover:bg-blue-500 transition-colors">
 //             <FaLinkedin className="w-5 h-5" />
 //           </a>
  //        </div>