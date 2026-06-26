'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import Link from 'next/link'

import type { Page, Post } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText, featuredPosts }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  const posts = (featuredPosts as Post[])?.filter((p) => typeof p === 'object') || []

  return (
    <div
      className="relative -mt-32 flex items-center justify-center text-white"
      data-theme="dark"
    >
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="w-full md:text-center p-6 md:p-6 rounded">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Featured posts in bottom-right corner */}
      {posts.length > 0 && (
        <div className="absolute bottom-8 right-8 z-20 flex flex-col gap-3 w-80 md:w-96">
          {posts.map((post, i) => {
            const metaImage = post.meta?.image
            const publishedAt = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : null
            const authors = post.populatedAuthors?.map((a) => a.name).filter(Boolean).join(', ')

            return (
              <Link
                key={i}
                href={`/posts/${post.slug}`}
                className="relative rounded-lg overflow-hidden block aspect-video hover:scale-105 transition-transform"
              >
                {metaImage && typeof metaImage === 'object' && (
                  <Media fill imgClassName="object-cover" resource={metaImage} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-4">
                  <h4 className="text-lg font-bold text-white leading-tight mb-1">{post.title}</h4>
                  <div className="flex gap-2 text-xs text-gray-200">
                    {publishedAt && <span>{publishedAt}</span>}
                    {authors && <span>· {authors}</span>}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      <div className="min-h-[80vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
      </div>
    </div>
  )
}