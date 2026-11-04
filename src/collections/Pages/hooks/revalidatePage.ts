import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const slugPath = doc.slug === 'home' ? '' : `/${doc.slug}`

      for (const locale of ['pt', 'en']) {
        const path = `/${locale}${slugPath}`
        payload.logger.info(`Revalidating page at path: ${path}`)
        revalidatePath(path)
      }

      revalidateTag('pages-sitemap', 'max')
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldSlugPath = previousDoc.slug === 'home' ? '' : `/${previousDoc.slug}`

      for (const locale of ['pt', 'en']) {
        const oldPath = `/${locale}${oldSlugPath}`
        payload.logger.info(`Revalidating old page at path: ${oldPath}`)
        revalidatePath(oldPath)
      }

      revalidateTag('pages-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const slugPath = doc?.slug === 'home' ? '' : `/${doc?.slug}`

    for (const locale of ['pt', 'en']) {
      revalidatePath(`/${locale}${slugPath}`)
    }

    revalidateTag('pages-sitemap', 'max')
  }

  return doc
}