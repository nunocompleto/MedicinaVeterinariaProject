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


  //{...(theme ? { 'data-theme': theme } : {})} this was cut from the header classname bellow
  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-black/80 backdrop-blur-sm w-full justify-center" >
      <div className="py-1 px-5 flex items-center justify-between container">
        <Link href="/">
          <Logo loading="eager" priority="high" className="dark:invert-1" />
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
