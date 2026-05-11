'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon, Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue)}`)
      setSearchOpen(false)
      setSearchValue('')
    }
  }

  return (
    <div className="flex items-center relative">
      {/* Desktop nav */}
      <nav className="hidden md:flex gap-3 items-center">
        {navItems.map(({ link }, i) => (
          <CMSLink key={i} {...link} appearance="link" />
        ))}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          aria-label="Toggle search"
        >
          <SearchIcon className="w-5 text-foreground" />
        </button>
      </nav>

      {/* Search dropdown */}
      {searchOpen && (
        <div className="absolute top-full right-0 mt-4 w-80 bg-white/95 dark:bg-black/95 backdrop-blur-sm rounded-2xl p-4 z-50 shadow-lg">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              autoFocus
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </form>
        </div>
      )}

      {/* Mobile button */}
      <button
        className="md:hidden text-foreground p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-x-0 top-20 mx-auto w-[90%] bg-white/95 dark:bg-black/95 backdrop-blur-sm rounded-2xl p-6 md:hidden flex flex-col items-start gap-4 z-40">
          {navItems.map(({ link }, i) => (
            <CMSLink key={i} {...link} appearance="link" />
          ))}
          <form onSubmit={handleSearch} className="w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none"
            />
          </form>
        </div>
      )}
    </div>
  )
}