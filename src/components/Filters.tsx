import type { Filtros } from '../lib/types'

interface FiltersProps {
  filtros: Filtros
  onChange: (f: Filtros) => void
  mesesDisponiveis: string[]
  categoriasDisponiveis: string[]
  regioesDisponiveis: string[]
}

export function Filters({ filtros, onChange, mesesDisponiveis, categoriasDisponiveis, regioesDisponiveis }: FiltersProps) {
  return (
    <div className="flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">De</label>
        <select
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
          value={filtros.mesInicio ?? ''}
          onChange={(e) => onChange({ ...filtros, mesInicio: e.target.value || null })}
        >
          <option value="">Início</option>
          {mesesDisponiveis.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Até</label>
        <select
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
          value={filtros.mesFim ?? ''}
          onChange={(e) => onChange({ ...filtros, mesFim: e.target.value || null })}
        >
          <option value="">Fim</option>
          {mesesDisponiveis.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Categoria</label>
        <select
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
          value={filtros.categoria ?? ''}
          onChange={(e) => onChange({ ...filtros, categoria: e.target.value || null })}
        >
          <option value="">Todas</option>
          {categoriasDisponiveis.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Região</label>
        <select
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
          value={filtros.regiao ?? ''}
          onChange={(e) => onChange({ ...filtros, regiao: e.target.value || null })}
        >
          <option value="">Todas</option>
          {regioesDisponiveis.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-1 min-w-[180px] flex-col gap-1">
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Buscar</label>
        <input
          type="text"
          placeholder="Pedido, produto, cliente..."
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
          value={filtros.busca}
          onChange={(e) => onChange({ ...filtros, busca: e.target.value })}
        />
      </div>

      <button
        type="button"
        className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
        onClick={() => onChange({ mesInicio: null, mesFim: null, categoria: null, regiao: null, busca: '' })}
      >
        Limpar filtros
      </button>
    </div>
  )
}
