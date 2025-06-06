'use client'
import { cn } from '@/utilities/ui'
import React from 'react'
import Link from 'next/link'

import type { Product, Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatCurrency } from '@/utilities/formatCurrency'

export type CardProductData = Pick<Product, 'slug' | 'title' | 'description' | 'price' | 'image'>

export const ProductCard: React.FC<{
  className?: string
  doc?: CardProductData
}> = (props) => {
  const { className, doc } = props

  const { slug, title, description, price, image } = doc || {}

  const handleOrderClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Non-functional for now as requested
    alert('Order functionality coming soon!')
  }

  return (
    <Link href={`/products/${slug}`} className="block">
      <article
        className={cn(
          'border border-border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-shadow cursor-pointer',
          className,
        )}
      >
        <div className="relative w-full aspect-square">
          {!image && (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              No image
            </div>
          )}
          {image && typeof image !== 'string' && <Media resource={image} size="33vw" />}
        </div>
        <div className="p-4">
          {title && (
            <div className="prose">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
            </div>
          )}
          {description && (
            <div className="mb-4">
              <p className="text-gray-600 line-clamp-3">{description}</p>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(price)}
            </div>
            <button
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              onClick={handleOrderClick}
            >
              Order Now
            </button>
          </div>
        </div>
      </article>
    </Link>
  )
} 