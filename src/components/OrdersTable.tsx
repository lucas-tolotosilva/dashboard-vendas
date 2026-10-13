import { useMemo, useState } from 'react'
import type { Pedido } from '../lib/types'
import { formatarMoeda, paraCsv } from '../lib/metrics'

interface OrdersTableProps {
  pedidos: Pedido[]
}

const PAGINA = 20

export function OrdersTable({ pedidos }: OrdersTableProps) {
  const [pagina, setPagina] = useState(1)
  const totalPaginas = Math.max(1, Math.ceil(pedidos.length / PAGINA))
  const paginaAtual = Math.min(pagina, totalPaginas)

  const visiveis = useMemo(
    () => pedidos.slice((paginaAtual - 1) * PAGINA, paginaAtual * PAGINA),
    [pedidos, paginaAtual],
  )

  function baixarCsv() {
    const csv = paraCsv(pedidos)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'pedidos-filtrados.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Pedidos ({pedidos.length.toLocaleString('pt-BR')})
        </h3>
        <button
          type="button"
          onClick={baixarCsv}
          className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
        >
          Exportar CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-700 dark:text-slate-400">
              <th className="py-2 pr-3">Pedido</th>
              <th className="py-2 pr-3">Data</th>
              <th className="py-2 pr-3">Categoria</th>
              <th className="py-2 pr-3">Produto</th>
              <th className="py-2 pr-3">Região</th>
              <th className="py-2 pr-3 text-right">Qtd.</th>
              <th className="py-2 pr-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {visiveis.map((p) => (
              <tr key={p.id} className="border-b border-slate-100 dark:border-slate-700/60">
                <td className="py-2 pr-3 font-mono text-xs text-slate-500 dark:text-slate-400">{p.id}</td>
                <td className="py-2 pr-3">{new Date(p.data + 'T00:00:00').toLocaleDateString('pt-BR')}</td>
                <td className="py-2 pr-3">{p.categoria}</td>
                <td className="py-2 pr-3">{p.produto}</td>
                <td className="py-2 pr-3">{p.regiao}</td>
                <td className="py-2 pr-3 text-right">{p.quantidade}</td>
                <td className="py-2 pr-3 text-right font-medium">{formatarMoeda(p.total)}</td>
              </tr>
            ))}
            {visiveis.length === 0 && (
              <tr>
                <td colSpan={7} className="py-6 text-center text-slate-400">
                  Nenhum pedido encontrado com os filtros atuais.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPaginas > 1 && (
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            Página {paginaAtual} de {totalPaginas}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={paginaAtual <= 1}
              onClick={() => setPagina((p) => p - 1)}
              className="rounded-md border border-slate-300 px-2 py-1 disabled:opacity-40 dark:border-slate-600"
            >
              Anterior
            </button>
            <button
              type="button"
              disabled={paginaAtual >= totalPaginas}
              onClick={() => setPagina((p) => p + 1)}
              className="rounded-md border border-slate-300 px-2 py-1 disabled:opacity-40 dark:border-slate-600"
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
