import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="fmv logo"
      width={140}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('min-w-[140px] max-w-[200px] md:min-w-[160px] md:max-w-[320px] w-auto', className)}
      src="/media/logo-img/logo-fmv-2026.png"
    />
  )
}
