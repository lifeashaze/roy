import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'

import { ProductCard } from '@/components/ProductCard'
import type { Product } from '@/payload-types'
import { Button } from '@/components/ui/button'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  
  // Fetch only 3 featured products for a clean look
  const featuredProducts = await payload.find({
    collection: 'products',
    where: {
      featured: { equals: true }
    },
    limit: 3,
    depth: 2,
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section - Clean and minimal */}
      <section className="relative py-32 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Roy's Premium 3D Printing Services
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Transform your ideas into reality with precision 3D printing and custom design services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Get Custom Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section - Clean grid */}
      {featuredProducts.docs.length > 0 && (
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Discover our most popular 3D printed items, crafted with precision and attention to detail.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {featuredProducts.docs.map((product) => (
                  <ProductCard key={product.id} doc={product} />
                ))}
              </div>
              
              <div className="text-center">
                <Button variant="outline" size="lg" asChild>
                  <Link href="/products">View All Products</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Simple CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to bring your ideas to life?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Whether you need prototypes, custom parts, or artistic pieces, we're here to help.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Start Your Project</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export const metadata: Metadata = {
  title: "Roy's 3D Print Shop",
  description: 'Premium 3D printed products, custom designs, and rapid prototyping services.',
}
