'use client'

import { useState, useMemo } from 'react'
import { Tool, Category } from '@/lib/data'
import ToolCard from '@/components/ToolCard'

interface ToolCatalogProps {
  tools: Tool[]
  categories: Category[]
}

export default function ToolCatalog({ tools, categories }: ToolCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [pricingFilter, setPricingFilter] = useState<string>('all')

  const filtered = useMemo(() => {
    return tools.filter((t) => {
      const matchCat = activeCategory === 'all' || t.category === activeCategory
      const matchSearch =
        !search ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase())
      const matchPricing = pricingFilter === 'all' || t.pricing === pricingFilter
      return matchCat && matchSearch && matchPricing
    })
  }, [tools, activeCategory, search, pricingFilter])

  return (
    <>
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400/40 transition-colors"
        />
        <select
          value={pricingFilter}
          onChange={(e) => setPricingFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white/70 focus:outline-none focus:border-cyan-400/40 transition-colors"
        >
          <option value="all">All Pricing</option>
          <option value="free">Free</option>
          <option value="freemium">Freemium</option>
          <option value="paid">Paid</option>
          <option value="enterprise">Enterprise</option>
        </select>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            activeCategory === 'all'
              ? 'bg-cyan-400 text-black'
              : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10'
          }`}
        >
          All ({tools.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeCategory === cat.slug
                ? 'bg-cyan-400 text-black'
                : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat.icon && <span className="mr-1">{cat.icon}</span>}
            {cat.name}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-white/30 mb-4">
        Showing {filtered.length} tools
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔭</p>
          <p className="text-white/40">No tools found matching your filters.</p>
          <button
            onClick={() => { setActiveCategory('all'); setSearch(''); setPricingFilter('all') }}
            className="mt-4 text-cyan-400 text-sm hover:underline"
          >
            Reset filters
          </button>
        </div>
      )}
    </>
  )
}
