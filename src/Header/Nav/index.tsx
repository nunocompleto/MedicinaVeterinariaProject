'use client'

import React, { useState, useEffect, useRef } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon, Menu, X, ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const router = useRouter()
  const navRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue)}`)
      setSearchOpen(false)
      setSearchValue('')
    }
  }

  return (
    <div ref={navRef} className="flex items-center relative">
      {/* Desktop nav */}
      <nav className="hidden md:flex flex-wrap gap-3 items-center">
        {navItems.map((item, i) => {
          const hasSubItems = item.subItems && item.subItems.length > 0
          const linkClass = "hover:text-background transition-colors"
          if (!hasSubItems) {
            return <CMSLink key={i} {...item.link} appearance="link" className={linkClass}/>
          }

          return (
            <div key={i} className="relative">
              <button
                  className="flex items-center gap-1 px-4 py-2 hover:text-background transition-colors"
                  onClick={() => setOpenDropdown(openDropdown === i ? null : i)}
                >
                  <CMSLink {...item.link} appearance="link" />
                  <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === i ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === i && (
                <div className="absolute top-full left-0 mt-2 min-w-[200px] bg-white dark:bg-black rounded-2xl p-3 z-50 shadow-lg flex flex-col gap-2 ">
                  {item.subItems?.map((sub, j) => (
                    <CMSLink
                      key={j}
                      {...sub.link}
                      appearance="link"
                      className="px-3 py-1.5 rounded-full bg-background hover:text-blue-500 transition-colors"
                     />
                  ))}
                </div>
              )}
            </div>
          )
        })}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          aria-label="Toggle search"
        >
          <SearchIcon className="w-10 h-8 text-foreground p-1 hover:text-background transition-colors" />
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
          {navItems.map((item, i) => (
            <div key={i} className="w-full">
              <CMSLink {...item.link} appearance="link" />
              {item.subItems && item.subItems.length > 0 && (
                <div className="flex flex-col gap-2 pl-4 mt-2">
                  {item.subItems.map((sub, j) => (
                    <CMSLink key={j} {...sub.link} appearance="link" />
                  ))}
                </div>
              )}
            </div>
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