'use client'
import { cn } from '@/utilities/ui'
import React from 'react'
import Link from 'next/link'

import type { Product, Media as _MediaType } from '@/payload-types'

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
    <div className={cn("relative", className)}>
      <Link href={`/products/${slug}`} className="block">
        <article className="bg-card rounded-lg shadow-sm border border-border overflow-hidden h-[520px] flex flex-col transition-shadow duration-200 hover:shadow-md">
          {/* Image Container */}
          <div className="relative w-full h-[320px] overflow-hidden">
            {!image && (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-muted-foreground/20 rounded-full flex items-center justify-center">
                    <span className="text-muted-foreground text-2xl">📦</span>
                  </div>
                  <p className="text-muted-foreground text-sm">No image available</p>
                </div>
              </div>
            )}
            {image && typeof image !== 'string' && (
              <Media 
                resource={image} 
                size="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" 
                className="w-full h-full object-cover"
              />
            )}
            
            {/* Price Badge */}
            <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-border">
              <span className="text-lg font-semibold text-foreground">
                {formatCurrency(price)}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 flex flex-col flex-1">
            {/* Title */}
            {title && (
              <div className="mb-3">
                <h3 className="text-xl font-semibold text-foreground line-clamp-2">
                  {title}
                </h3>
              </div>
            )}

            {/* Description */}
            {description && (
              <div className="mb-4 flex-1">
                <p className="text-muted-foreground line-clamp-3 text-sm">
                  {description}
                </p>
              </div>
            )}

            {/* Action Button */}
            <div className="mt-auto">
              <button
                className="w-full bg-primary text-primary-foreground font-medium py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors duration-200"
                onClick={handleOrderClick}
              >
                Order Now
              </button>
            </div>
          </div>
        </article>
      </Link>
    </div>
  )
} 