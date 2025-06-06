import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { ProductCard } from '@/components/ProductCard'
import type { Product, Category } from '@/payload-types'

export default async function ProductsPage() {
  const payload = await getPayload({ config: configPromise })
  
  const products = await payload.find({
    collection: 'products',
    limit: 100,
    depth: 2,
  })

  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
  })

  const productsByCategory = categories.docs.map((category) => ({
    category,
    products: products.docs.filter((product) => {
      if (typeof product.category === 'object' && product.category !== null) {
        return product.category.id === category.id
      }
      return false
    }),
  }))

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">3D Print Shop</h1>
          <p className="text-xl text-gray-600">
            Discover our collection of high-quality 3D printed products
          </p>
        </div>

        {productsByCategory.map(({ category, products: categoryProducts }) => (
          <section key={category.id} className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-2">{category.title}</h2>
            </div>
            
            {categoryProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} doc={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>No products available in this category yet.</p>
              </div>
            )}
          </section>
        ))}

        {/* No categories message */}
        {categories.docs.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">No Categories Available</h2>
            <p className="text-gray-600">
              Categories and products will appear here once they are added to the CMS.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: '3D Print Shop - Products',
  description: 'Browse our collection of high-quality 3D printed products',
} 