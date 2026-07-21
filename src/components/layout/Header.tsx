"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { siteConfig } from "@/config/site";
import { defaultTransition } from "@/lib/motion";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(true);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white shadow-sm"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...defaultTransition, duration: 0.5 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:py-4">
        <motion.div className="min-w-0" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Logo variant="header" />
        </motion.div>

        <nav className="hidden xl:flex items-center gap-5">
          {siteConfig.nav.map((item, i) =>
            "children" in item ? (
              <div key={item.href} className="relative group">
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary transition-colors whitespace-nowrap"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  {item.label}
                  <motion.span animate={{ rotate: productsOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {productsOpen && (
                    <motion.div
                      className="absolute left-0 top-full pt-2 w-56"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={() => setProductsOpen(true)}
                      onMouseLeave={() => setProductsOpen(false)}
                    >
                      <div className="rounded-lg bg-white shadow-lg border py-2">
                        {item.children.map((child, j) => (
                          <motion.div
                            key={child.href}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.04 }}
                          >
                            <Link
                              href={child.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-cream hover:text-primary transition-colors"
                            >
                              {child.label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-primary transition-colors relative group whitespace-nowrap"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            )
          )}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/contact"
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors shadow-sm"
            >
              Get a Quote
            </Link>
          </motion.div>
        </nav>

        <button
          type="button"
          className="xl:hidden relative z-50 -mr-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-gray-700 hover:bg-cream"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="xl:hidden border-t bg-white"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="max-h-[min(70vh,calc(100dvh-4.5rem))] overflow-y-auto overscroll-contain px-4 py-3">
              <div className="space-y-1 pb-2">
                {siteConfig.nav.map((item) =>
                  "children" in item ? (
                    <div key={item.href} className="border-b border-gray-100 pb-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Link
                          href={item.href}
                          className="flex-1 py-3 font-semibold text-primary-dark"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-gray-600 hover:bg-cream"
                          aria-label={
                            mobileProductsOpen
                              ? "Collapse product categories"
                              : "Expand product categories"
                          }
                          aria-expanded={mobileProductsOpen}
                          onClick={() => setMobileProductsOpen((open) => !open)}
                        >
                          <ChevronDown
                            className={`h-5 w-5 transition-transform ${
                              mobileProductsOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>
                      <AnimatePresence initial={false}>
                        {mobileProductsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-1 pl-2">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="block rounded-lg py-2.5 pl-3 text-gray-600 hover:bg-cream hover:text-primary"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-lg py-3 font-medium text-gray-700 hover:bg-cream hover:text-primary"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </div>

              <Link
                href="/contact"
                className="mb-2 mt-3 flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark"
                onClick={() => setMobileOpen(false)}
              >
                Get a Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
