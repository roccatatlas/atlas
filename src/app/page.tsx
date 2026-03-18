import { getTools, getCategories } from '@/lib/data'
import ToolCard from '@/components/ToolCard'
import Link from 'next/link'

export const revalidate = 3600

export default async function HomePage() {
  const [tools, categories] = await Promise.all([getTools(), getCategories()])
  const featuredTools = tools.slice(0, 6)

  return (
    <>
      {/* Film grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />

      {/* Ambient background gradients */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-purple-600/4 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10">
        {/* ── Hero ────────────────────────────────── */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-32">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {tools.length}+ AI Tools Indexed
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-none tracking-tight">
            Navigate the{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Universe
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover, compare, and deploy the world&apos;s best AI tools.
            Build powerful stacks. Ship faster.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/tools"
              className="px-6 py-3 bg-cyan-400 text-black font-semibold rounded-xl hover:bg-cyan-300 transition-all hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            >
              Explore All Tools →
            </Link>
            <Link
              href="/generate"
              className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all"
            >
              Generate My Stack
            </Link>
          </div>
        </section>

        {/* ── Categories Strip ─────────────────────── */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Browse Categories</h2>
            <Link href="/categories" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.slice(0, 8).map((cat) => (
              <Link
                key={cat.slug}
                href={`/tools?category=${cat.slug}`}
                className="group flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:border-cyan-400/30 hover:bg-white/8 transition-all"
              >
                <span className="text-2xl">{cat.icon ?? '🔧'}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate group-hover:text-cyan-400 transition-colors">
                    {cat.name}
                  </p>
                  <p className="text-xs text-white/30">{cat.tool_count} tools</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Featured Tools ───────────────────────── */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Top Rated Tools</h2>
              <p className="text-sm text-white/40 mt-1">Ranked by ATLAS Score</p>
            </div>
            <Link href="/tools" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
              See all {tools.length} tools →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────── */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-20 text-center">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-400/20 rounded-3xl p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Build your perfect AI stack
            </h2>
            <p className="text-white/50 mb-8 max-w-xl mx-auto">
              Tell us your goal and we&apos;ll recommend the best combination of AI tools to get you there.
            </p>
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-400 text-black font-bold rounded-xl hover:bg-cyan-300 transition-all hover:scale-105 shadow-[0_0_30px_rgba(34,211,238,0.3)]"
            >
              ✦ Generate Stack for Free
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
