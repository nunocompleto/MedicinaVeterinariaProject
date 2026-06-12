import { NextRequest, NextResponse } from 'next/server'

const locales = ['pt', 'en']
const defaultLocale = 'pt'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Find locale from pathname
  const pathLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!pathLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url),
    )
  }

  // Set locale in request header
  const response = NextResponse.next()
  response.headers.set('x-locale', pathLocale)
  return response
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)']
}