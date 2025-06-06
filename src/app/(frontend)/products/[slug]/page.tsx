import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import type { Product } from '@/payload-types'
import { formatCurrency } from '@/utilities/formatCurrency'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return products.docs
    .filter((doc) => doc.slug)
    .map(({ slug }) => ({
      slug,
    }))
}

type Args = {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await paramsPromise
  const url = `/products/${slug}`

  const product = await queryProductBySlug({ slug })

  if (!product) {
    notFound()
  }

  return (
    <article className="pt-16 pb-24">
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/products" className="hover:text-foreground">
                  Products
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground">{product.slug}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="relative">
              <div className="relative overflow-hidden rounded-lg bg-muted">
                {product.image && typeof product.image !== 'string' ? (
                  <Media
                    resource={product.image}
                    size="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-auto max-h-[600px] object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-[400px] flex items-center justify-center text-muted-foreground">
                    <span>No image available</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-3xl font-bold">{product.title}</h1>
                </div>
              </div>

              <div className="text-3xl font-bold text-primary">
                {formatCurrency(product.price)}
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Description</h2>
                <div className="text-lg leading-relaxed text-muted-foreground">
                  {product.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button size="lg" className="flex-1">
                  Order Now
                </Button>
              </div>
            </div>
          </div>

          {/* Back to Products */}
          <div className="mt-16 text-center">
            <Button variant="outline" asChild>
              <Link href="/products">← Back to All Products</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const product = await queryProductBySlug({ slug })

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.title} - Roy's 3D Print Shop`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.image && typeof product.image !== 'string' 
        ? [{ 
            url: product.image.url || '', 
            width: product.image.width || 1200,
            height: product.image.height || 1200,
            alt: product.image.alt || product.title,
          }]
        : undefined,
    },
  }
}

const queryProductBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
  })

  return result.docs?.[0] || null
}) 