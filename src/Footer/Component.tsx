import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer({ locale = 'pt' }: { locale?: 'pt' | 'en' }) {
  const footerData = await getCachedGlobal('footer', 1, locale)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-#2a2a2a dark:bg-black text-black dark:text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href={`/${locale}`}>
          <Logo />
        </Link>
        <img src="/media/logo-img/prr-outroslogos.png" alt="FMV Studio Logo" className="w-auto h-16 max-w-[80%]" />
        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-black dark:text-white" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}