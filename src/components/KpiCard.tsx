interface KpiCardProps {
  titulo: string
  valor: string
  destaque?: 'positivo' | 'negativo' | 'neutro'
}

export function KpiCard({ titulo, valor, destaque = 'neutro' }: KpiCardProps) {
  const cor =
    destaque === 'positivo'
      ? 'text-emerald-600 dark:text-emerald-400'
      : destaque === 'negativo'
        ? 'text-red-600 dark:text-red-400'
        : 'text-slate-900 dark:text-slate-100'

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{titulo}</p>
      <p className={`mt-2 text-2xl font-semibold ${cor}`}>{valor}</p>
    </div>
  )
}
