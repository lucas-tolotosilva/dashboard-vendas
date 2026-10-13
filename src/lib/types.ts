export interface Pedido {
  id: string
  data: string
  mesLabel: string
  categoria: string
  produto: string
  regiao: string
  quantidade: number
  valorUnitario: number
  total: number
  cliente: string
}

export interface Filtros {
  mesInicio: string | null
  mesFim: string | null
  categoria: string | null
  regiao: string | null
  busca: string
}
