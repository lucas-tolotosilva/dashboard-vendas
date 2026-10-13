// Gera pedidos fictícios para a demo do dashboard. Executar com: node scripts/gerar-dados.mjs
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// PRNG determinístico para o dataset ser reprodutível entre builds
function mulberry32(seed) {
  let a = seed
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const rand = mulberry32(20261013)
const randInt = (min, max) => Math.floor(rand() * (max - min + 1)) + min
const pick = (arr) => arr[randInt(0, arr.length - 1)]

const REGIOES = ['Sudeste', 'Sul', 'Nordeste', 'Centro-Oeste']

const CATEGORIAS = {
  Eletrônicos: ['Fone Bluetooth X1', 'Carregador Turbo 30W', 'Caixa de Som Portátil', 'Mouse sem Fio Pro', 'Smartwatch Fit 2'],
  Moda: ['Camiseta Básica Premium', 'Calça Jeans Reta', 'Jaqueta Corta-Vento', 'Vestido Verão Floral', 'Tênis Casual Urbano'],
  'Casa & Decoração': ['Jogo de Panelas 5pç', 'Luminária de Mesa LED', 'Kit Organizadores Closet', 'Tapete Sala 2x3m', 'Jogo de Cama Queen'],
  Beleza: ['Kit Skincare Facial', 'Perfume Contratipo 100ml', 'Secador Profissional', 'Paleta de Sombras 12 Cores', 'Creme Hidratante Corporal'],
  'Esporte & Lazer': ['Tênis de Corrida Air', 'Garrafa Térmica 1L', 'Kit Faixas Elásticas', 'Mochila Esportiva 30L', 'Bola de Futebol Oficial'],
}
const NOMES_CATEGORIAS = Object.keys(CATEGORIAS)

const PRECO_BASE = {
  Eletrônicos: [80, 450],
  Moda: [60, 280],
  'Casa & Decoração': [50, 320],
  Beleza: [40, 180],
  'Esporte & Lazer': [55, 260],
}

const MESES_PT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

// 12 meses terminando no mês atual (referência fixa: out/2026, mesma data do briefing)
const ANO_REF = 2026
const MES_REF = 9 // índice 0 = Jan -> Out = 9
const meses = []
for (let i = 11; i >= 0; i--) {
  let m = MES_REF - i
  let y = ANO_REF
  while (m < 0) {
    m += 12
    y -= 1
  }
  meses.push({ ano: y, mes: m, label: `${MESES_PT[m]}/${String(y).slice(2)}` })
}

// pesos de volume por mês para simular crescimento com sazonalidade leve
const pesosMes = meses.map((_, i) => 0.75 + i * 0.045 + (i % 3 === 2 ? 0.08 : 0))
const pesoTotal = pesosMes.reduce((a, b) => a + b, 0)
const TOTAL_PEDIDOS = 2000

const pedidos = []
let idSeq = 1

meses.forEach((m, i) => {
  const qtdPedidosMes = Math.round((pesosMes[i] / pesoTotal) * TOTAL_PEDIDOS)
  const diasNoMes = new Date(m.ano, m.mes + 1, 0).getDate()

  for (let p = 0; p < qtdPedidosMes; p++) {
    const categoria = pick(NOMES_CATEGORIAS)
    const produto = pick(CATEGORIAS[categoria])
    const [minPreco, maxPreco] = PRECO_BASE[categoria]
    const unitPrice = Math.round((minPreco + rand() * (maxPreco - minPreco)) * 100) / 100
    const quantidade = randInt(1, 4)
    const dia = randInt(1, diasNoMes)
    const data = `${m.ano}-${String(m.mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`

    pedidos.push({
      id: `PED-${String(idSeq).padStart(5, '0')}`,
      data,
      mesLabel: m.label,
      categoria,
      produto,
      regiao: pick(REGIOES),
      quantidade,
      valorUnitario: unitPrice,
      total: Math.round(unitPrice * quantidade * 100) / 100,
      cliente: `Cliente ${String(idSeq).padStart(4, '0')}`,
    })
    idSeq++
  }
})

pedidos.sort((a, b) => (a.data < b.data ? -1 : 1))

const outPath = path.join(__dirname, '..', 'src', 'data', 'pedidos.json')
writeFileSync(outPath, JSON.stringify(pedidos, null, 2))
console.log(`Gerados ${pedidos.length} pedidos fictícios em ${outPath}`)
