import { useEffect, useMemo, useState } from 'react'
import spa05 from '../assets/spa/spa-05.jpg'
import { getPublicProducts } from '../services/publicApi'
import { AddToCartButton } from '../components/cart/AddToCartButton'
import { PageHero } from '../components/site/PageHero'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A to Z' },
]

export function ProductsPage() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')

  useEffect(() => {
    let active = true

    ;(async () => {
      try {
        const data = await getPublicProducts()
        if (active) setProducts(Array.isArray(data) ? data : [])
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Failed to load products')
          console.error('Products fetch error:', err)
        }
      } finally {
        if (active) setLoading(false)
      }
    })()

    return () => {
      active = false
    }
  }, [])

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(
        products
          .map((product) => product.category)
          .filter((category) => typeof category === 'string' && category.trim())
      )
    )
    return ['All', ...unique.sort((a, b) => a.localeCompare(b))]
  }, [products])

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    let list = products.filter((product) => {
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false
      }

      if (!normalizedSearch) return true

      const searchable = [product.name, product.category, product.sku]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return searchable.includes(normalizedSearch)
    })

    list = [...list]

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.unitPrice - b.unitPrice)
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.unitPrice - a.unitPrice)
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name))
    } else {
      list.sort((a, b) => b.quantity - a.quantity)
    }

    return list
  }, [products, searchTerm, selectedCategory, sortBy])

  // const inStockCount = filteredProducts.filter((product) => product.quantity > 0).length
  // const totalUnits = filteredProducts.reduce((sum, product) => sum + product.quantity, 0)

  const hero = {
    label: 'Products',
    title: 'Shop Essentials',
    description: 'Premium self-care products curated for your beauty and wellness rituals.',
    image: spa05,
    primaryCta: {
      to: '/cart',
      label: 'View Cart',
    },
    secondaryCta: {
      to: '/bookings',
      label: 'Book Appointment',
    },
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(120%_120%_at_10%_0%,#f4edf9_0%,#faf7fd_45%,#ffffff_100%)] text-[#1f1827]">
      <div className="sm:px-5 sm:py-5 lg:px-8 lg:py-7">
        <PageHero hero={hero} heightClass="h-[44vh]" />
      </div>

      <main className="relative mx-auto w-full max-w-7xl px-4 pb-14">


        <section className="relative rounded-3xl mt-4 border border-[#dacdea] bg-white/95 p-6 shadow-[0_24px_48px_-34px_rgba(37,20,53,0.35)] backdrop-blur md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6e4d87]/90">Products</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#241a2f] md:text-4xl">
                Discover wellness favorites
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#5f4f70] md:text-base">
                Find high-quality items available right now and add them to cart in one tap.
              </p>
            </div>

          </div>

          <div className="mt-6 grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px]">
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#7b6b8b]">Search</span>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, category, or SKU"
                className="w-full rounded-xl border border-[#d9cee6] bg-white px-4 py-2.5 text-sm text-[#241a2f] shadow-sm outline-none transition focus:border-[#5c3f73] focus:ring-4 focus:ring-[#9a80b0]/20"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#7b6b8b]">Sort</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-xl border border-[#d9cee6] bg-white px-4 py-2.5 text-sm text-[#241a2f] shadow-sm outline-none transition focus:border-[#5c3f73] focus:ring-4 focus:ring-[#9a80b0]/20"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {categories.length > 1 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => {
                const isActive = selectedCategory === category
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                      isActive
                        ? 'border-[#5c3f73] bg-[#5c3f73] text-white'
                        : 'border-[#dacdea] bg-white text-[#6f5e7f] hover:border-[#b9a3cd] hover:bg-[#faf7fd]'
                    }`}
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          )}
        </section>

        {error && (
          <section className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3">
            <p className="text-sm text-rose-800">Error loading products: {error}</p>
          </section>
        )}

        {loading && !error && (
          <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-3xl border border-[#e3d7ef] bg-white shadow-[0_14px_30px_-24px_rgba(37,20,53,0.35)]"
              >
                <div className="aspect-square animate-pulse bg-[#f2ecf8]" />
                <div className="space-y-3 p-5">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-[#f2ecf8]" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-[#f2ecf8]" />
                  <div className="h-9 animate-pulse rounded-xl bg-[#f2ecf8]" />
                </div>
              </div>
            ))}
          </section>
        )}

        {!error && !loading && filteredProducts.length === 0 && (
          <section className="mt-6 rounded-3xl border border-[#dacdea] bg-white/95 p-8 text-center shadow-[0_24px_48px_-34px_rgba(37,20,53,0.35)]">
            <h2 className="text-lg font-semibold text-[#241a2f]">No products match your filters</h2>
            <p className="mt-2 text-sm text-[#6f5e7f]">Try a different search term or choose another category.</p>
          </section>
        )}

        {!error && !loading && filteredProducts.length > 0 && (
          <section className="mt-6 grid gap-5 grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-[#e3d7ef] bg-white shadow-[0_14px_30px_-24px_rgba(37,20,53,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_40px_-26px_rgba(37,20,53,0.45)]"
              >
                {product.imageUrl ? (
                  <div className="relative aspect-square overflow-hidden bg-[#f2ecf8]">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#5c3f73]">
                      {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </div>
                  </div>
                ) : (
                  <div className="flex aspect-square items-center justify-center bg-[#f2ecf8]">
                    <span className="text-sm font-medium text-[#8e78a2]">No image</span>
                  </div>
                )}

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-semibold text-[#241a2f]">{product.name}</h3>
                      {/* <span className="rounded-full bg-[#f5effa] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#6e4d87]">
                        {product.quantity > 0 ? `${product.quantity} left` : 'Sold out'}
                      </span> */}
                    </div>

                    {product.category && (
                      <p className="mt-2 inline-flex rounded-full border border-[#e2d4ef] bg-[#faf7fd] px-2.5 py-1 text-[11px] font-medium text-[#6f5e7f]">
                        {product.category}
                      </p>
                    )}

                    {/* {product.sku && (
                      <p className="mt-2 text-[11px] uppercase tracking-wide text-[#8e78a2]">SKU: {product.sku}</p>
                    )} */}

                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="md:text-2xl font-semibold text-[#241a2f]">₦{product.unitPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <AddToCartButton
                    product={{
                      id: product.id,
                      name: product.name,
                      price: product.unitPrice,
                      sku: product.sku || undefined,
                      category: product.category || undefined,
                    }}
                    disabled={product.quantity === 0}
                  />
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}
