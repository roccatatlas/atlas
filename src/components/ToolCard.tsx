'use client'

import Link from 'next/link'
import { Tool } from '@/lib/data'

interface ToolCardProps {
  tool: Tool
}

const PRICING_COLORS: Record<string, string> = {
  free: 'text-green-400 bg-green-400/10 border-green-400/20',
  freemium: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  paid: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  enterprise: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
}

export default function ToolCard({ tool }: ToolCardProps) {
  const pricingClass = PRICING_COLORS[tool.pricing] ?? 'text-white/50 bg-white/5 border-white/10'

  return (
    <Link href={`/tools/${tool.slug}`} className="group block">
      <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]">
        {/* Sponsored badge */}
        {tool.sponsored_tier && (
          <div className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400">
            ✦ Featured
          </div>
        )}

        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-lg shrink-0">
            {tool.logo ? (
              <img src={tool.logo} alt={tool.name} className="w-7 h-7 object-contain rounded-lg" />
            ) : (
              <span>{tool.name.charAt(0)}</span>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">
              {tool.name}
            </h3>
            <p className="text-xs text-white/40 truncate">{tool.company}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-white/60 line-clamp-2 mb-4 leading-relaxed">
          {tool.description}
        </p>

        {/* Tags */}
        {tool.tags && tool.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tool.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <span className={`text-xs px-2 py-0.5 rounded-full border capitalize ${pricingClass}`}>
            {tool.pricing}
            {tool.pricing_num ? ` · $${tool.pricing_num}/mo` : ''}
          </span>
          <div className="flex items-center gap-3">
            {tool.atlas_score !== null && (
              <div className="flex items-center gap-1">
                <span className="text-xs text-white/30">Score</span>
                <span className="text-xs font-bold text-cyan-400">{tool.atlas_score}</span>
              </div>
            )}
            {tool.rating !== null && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-xs">★</span>
                <span className="text-xs text-white/60">{tool.rating}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
