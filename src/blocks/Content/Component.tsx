import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps, Post } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { Media } from '@/components/Media'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, links, richText, size, featuredPosts } = col
            const posts = (featuredPosts as Post[])?.filter((p) => typeof p === 'object') || []

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                  'md:col-span-2': size !== 'full',
                })}
                key={index}
              >
                {richText && <RichText data={richText} enableGutter={false} />}

                {enableLink && links && links.length > 0 && (
                  <ul className="flex flex-col gap-4 mt-4">
                    {links.map(({ link }, i) => (
                      <li key={i}>
                        <CMSLink {...link} />
                      </li>
                    ))}
                  </ul>
                )}

                {posts.length > 0 && (
                  <div className="flex flex-col gap-3 mt-6">
                    {posts.map((post, i) => {
                      const metaImage = post.meta?.image
                      const publishedAt = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : null
                      const authors = post.populatedAuthors?.map((a) => a.name).filter(Boolean).join(', ')

                      return (
                        <Link
                          key={i}
                          href={`/posts/${post.slug}`}
                          className="relative rounded-lg overflow-hidden block aspect-video hover:scale-[1.02] transition-transform"
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
              </div>
            )
          })}
      </div>
    </div>
  )
}