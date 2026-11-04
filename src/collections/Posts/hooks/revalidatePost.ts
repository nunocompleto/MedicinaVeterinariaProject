import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      for (const locale of ['pt', 'en']) {
        const path = `/${locale}/posts/${doc.slug}`
        payload.logger.info(`Revalidating post at path: ${path}`)
        revalidatePath(path)
      }
      revalidateTag('posts-sitemap', 'max')
    }

    if (previousDoc._status === 'published' && doc._status !== 'published') {
      for (const locale of ['pt', 'en']) {
        const oldPath = `/${locale}/posts/${previousDoc.slug}`
        payload.logger.info(`Revalidating old post at path: ${oldPath}`)
        revalidatePath(oldPath)
      }
      revalidateTag('posts-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    for (const locale of ['pt', 'en']) {
      revalidatePath(`/${locale}/posts/${doc?.slug}`)
    }
    revalidateTag('posts-sitemap', 'max')
  }

  return doc
}