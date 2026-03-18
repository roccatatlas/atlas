import { getTools, getCategories } from '@/lib/data'
import ToolCatalog from './ToolCatalog'

export const revalidate = 3600

export default async function ToolsPage() {
  const [tools, categories] = await Promise.all([getTools(), getCategories()])

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white mb-2">AI Tool Catalog</h1>
        <p className="text-white/50">
          {tools.length} tools ranked by ATLAS Score
        </p>
      </div>

      <ToolCatalog tools={tools} categories={categories} />
    </div>
  )
}
