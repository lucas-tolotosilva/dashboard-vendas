import { useMemo, useState } from 'react'
import pedidosRaw from './data/pedidos.json'
import type { Pedido, Filtros } from './lib/types'
import {
  MESES_ORDEM,
  categorias,
  regioes,
  filtrarPedidos,
  calcularKpis,
  faturamentoPorMes,
  faturamentoPorCategoria,
  topProdutos,
  formatarMoeda,
} from './lib/metrics'
import { KpiCard } from './components/KpiCard'
import { Filters } from './components/Filters'
import { RevenueLineChart } from './components/RevenueLineChart'
import { CategoryBarChart } from './components/CategoryBarChart'
import { TopProductsChart } from './components/TopProductsChart'
import { CategoryLegend } from './components/CategoryLegend'
import { OrdersTable } from './components/OrdersTable'

const pedidos = pedidosRaw as Pedido[]

const FILTROS_VAZIOS: Filtros = { mesInicio: null, mesFim: null, categoria: null, regiao: null, busca: '' }

function App() {
  const [filtros, setFiltros] = useState<Filtros>(FILTROS_VAZIOS)

  const mesesDisponiveis = useMemo(() => MESES_ORDEM(pedidos), [])
  const categoriasDisponiveis = useMemo(() => categorias(pedidos), [])
  const regioesDisponiveis = useMemo(() => regioes(pedidos), [])

  const pedidosFiltrados = useMemo(() => filtrarPedidos(pedidos, filtros), [filtros])
  const kpis = useMemo(() => calcularKpis(pedidosFiltrados), [pedidosFiltrados])
  const porMes = useMemo(() => faturamentoPorMes(pedidosFiltrados), [pedidosFiltrados])
  const porCategoria = useMemo(() => faturamentoPorCategoria(pedidosFiltrados), [pedidosFiltrados])
  const top10 = useMemo(() => topProdutos(pedidosFiltrados, 10), [pedidosFiltrados])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-5">
          <h1 className="text-xl font-semibold">Dashboard de Vendas e Faturamento</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Loja fictícia · 12 meses de histórico · {pedidos.length.toLocaleString('pt-BR')} pedidos
          </p>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6">
        <Filters
          filtros={filtros}
          onChange={setFiltros}
          mesesDisponiveis={mesesDisponiveis}
          categoriasDisponiveis={categoriasDisponiveis}
          regioesDisponiveis={regioesDisponiveis}
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <KpiCard titulo="Faturamento" valor={formatarMoeda(kpis.faturamento)} />
          <KpiCard titulo="Ticket médio" valor={formatarMoeda(kpis.ticketMedio)} />
          <KpiCard titulo="Pedidos" valor={kpis.numPedidos.toLocaleString('pt-BR')} />
          <KpiCard
            titulo="Cresc. vs mês anterior"
            valor={kpis.crescimento === null ? '—' : `${kpis.crescimento >= 0 ? '+' : ''}${(kpis.crescimento * 100).toFixed(1)}%`}
            destaque={kpis.crescimento === null ? 'neutro' : kpis.crescimento >= 0 ? 'positivo' : 'negativo'}
          />
        </div>

        <RevenueLineChart dados={porMes} />

        <div>
          <CategoryBarChart dados={porCategoria} />
          <div className="mt-2 px-1">
            <CategoryLegend />
          </div>
        </div>

        <TopProductsChart dados={top10} />

        <OrdersTable pedidos={pedidosFiltrados} />
      </main>

      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400 dark:border-slate-700 dark:bg-slate-800">
        Projeto de demonstração, dados fictícios
      </footer>
    </div>
  )
}

export default App
