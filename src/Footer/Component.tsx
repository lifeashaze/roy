import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

export async function Footer() {
  const _footerData: Footer = await getCachedGlobal('footer', 1)()

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">R</span>
              </div>
              <span className="font-bold text-xl">Roy3D</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Premium 3D printing services, custom designs, and rapid prototyping solutions.
            </p>
          </div>

          {/* Contact & Theme */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Contact</h3>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">
                Ready to start your project?
              </p>
              <Link 
                href="/contact" 
                className="inline-block text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              >
                Get in touch →
              </Link>
            </div>
            <div className="pt-2">
              <ThemeSelector />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Roy3D. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
