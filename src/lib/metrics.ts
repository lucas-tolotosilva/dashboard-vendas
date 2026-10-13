import type { Pedido, Filtros } from './types'

export const MESES_ORDEM = (pedidos: Pedido[]): string[] => {
  const vistos = new Map<string, string>() // data (yyyy-mm) -> label
  pedidos.forEach((p) => vistos.set(p.data.slice(0, 7), p.mesLabel))
  return [...vistos.entries()].sort(([a], [b]) => (a < b ? -1 : 1)).map(([, label]) => label)
}

export function categorias(pedidos: Pedido[]): string[] {
  return [...new Set(pedidos.map((p) => p.categoria))].sort()
}

export function regioes(pedidos: Pedido[]): string[] {
  return [...new Set(pedidos.map((p) => p.regiao))].sort()
}

export function filtrarPedidos(pedidos: Pedido[], f: Filtros): Pedido[] {
  const mesesOrdenados = MESES_ORDEM(pedidos)
  const idxInicio = f.mesInicio ? mesesOrdenados.indexOf(f.mesInicio) : 0
  const idxFim = f.mesFim ? mesesOrdenados.indexOf(f.mesFim) : mesesOrdenados.length - 1

  const buscaLower = f.busca.trim().toLowerCase()

  return pedidos.filter((p) => {
    const idxMes = mesesOrdenados.indexOf(p.mesLabel)
    if (idxMes < idxInicio || idxMes > idxFim) return false
    if (f.categoria && p.categoria !== f.categoria) return false
    if (f.regiao && p.regiao !== f.regiao) return false
    if (buscaLower) {
      const alvo = `${p.id} ${p.produto} ${p.cliente} ${p.categoria} ${p.regiao}`.toLowerCase()
      if (!alvo.includes(buscaLower)) return false
    }
    return true
  })
}

export interface Kpis {
  faturamento: number
  ticketMedio: number
  numPedidos: number
  crescimento: number | null
}

export function calcularKpis(pedidosFiltrados: Pedido[]): Kpis {
  const faturamento = pedidosFiltrados.reduce((acc, p) => acc + p.total, 0)
  const numPedidos = pedidosFiltrados.length
  const ticketMedio = numPedidos ? faturamento / numPedidos : 0

  const porMes = new Map<string, number>()
  pedidosFiltrados.forEach((p) => porMes.set(p.data.slice(0, 7), (porMes.get(p.data.slice(0, 7)) ?? 0) + p.total))
  const mesesChave = [...porMes.keys()].sort()
  let crescimento: number | null = null
  if (mesesChave.length >= 2) {
    const atual = porMes.get(mesesChave[mesesChave.length - 1])!
    const anterior = porMes.get(mesesChave[mesesChave.length - 2])!
    crescimento = anterior > 0 ? (atual - anterior) / anterior : null
  }

  return { faturamento, ticketMedio, numPedidos, crescimento }
}

export interface PontoMes {
  mes: string
  faturamento: number
}

export function faturamentoPorMes(pedidosFiltrados: Pedido[]): PontoMes[] {
  const mapa = new Map<string, { chave: string; total: number }>()
  pedidosFiltrados.forEach((p) => {
    const chave = p.data.slice(0, 7)
    const atual = mapa.get(p.mesLabel)
    mapa.set(p.mesLabel, { chave, total: (atual?.total ?? 0) + p.total })
  })
  return [...mapa.entries()]
    .sort(([, a], [, b]) => (a.chave < b.chave ? -1 : 1))
    .map(([mes, v]) => ({ mes, faturamento: Math.round(v.total * 100) / 100 }))
}

export interface PontoCategoria {
  categoria: string
  faturamento: number
}

export function faturamentoPorCategoria(pedidosFiltrados: Pedido[]): PontoCategoria[] {
  const mapa = new Map<string, number>()
  pedidosFiltrados.forEach((p) => mapa.set(p.categoria, (mapa.get(p.categoria) ?? 0) + p.total))
  return [...mapa.entries()]
    .map(([categoria, faturamento]) => ({ categoria, faturamento: Math.round(faturamento * 100) / 100 }))
    .sort((a, b) => b.faturamento - a.faturamento)
}

export interface TopProduto {
  produto: string
  faturamento: number
  quantidade: number
}

export function topProdutos(pedidosFiltrados: Pedido[], limite = 10): TopProduto[] {
  const mapa = new Map<string, { faturamento: number; quantidade: number }>()
  pedidosFiltrados.forEach((p) => {
    const atual = mapa.get(p.produto) ?? { faturamento: 0, quantidade: 0 }
    mapa.set(p.produto, { faturamento: atual.faturamento + p.total, quantidade: atual.quantidade + p.quantidade })
  })
  return [...mapa.entries()]
    .map(([produto, v]) => ({ produto, faturamento: Math.round(v.faturamento * 100) / 100, quantidade: v.quantidade }))
    .sort((a, b) => b.faturamento - a.faturamento)
    .slice(0, limite)
}

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function paraCsv(pedidos: Pedido[]): string {
  const cabecalho = ['id', 'data', 'categoria', 'produto', 'regiao', 'quantidade', 'valorUnitario', 'total', 'cliente']
  const linhas = pedidos.map((p) =>
    cabecalho.map((campo) => String((p as unknown as Record<string, unknown>)[campo])).join(','),
  )
  return [cabecalho.join(','), ...linhas].join('\n')
}
