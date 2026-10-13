import { CATEGORIAS_ORDEM, corCategoria } from '../lib/palette'
import { useDarkMode } from '../hooks/useDarkMode'

export function CategoryLegend() {
  const dark = useDarkMode()
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-300">
      {CATEGORIAS_ORDEM.map((cat) => (
        <span key={cat} className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: corCategoria(cat, dark) }} />
          {cat}
        </span>
      ))}
    </div>
  )
}
