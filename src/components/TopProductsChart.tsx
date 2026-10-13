import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts'
import type { TopProduto } from '../lib/metrics'
import { formatarMoeda } from '../lib/metrics'
import { useDarkMode } from '../hooks/useDarkMode'

interface TopProductsChartProps {
  dados: TopProduto[]
}

export function TopProductsChart({ dados }: TopProductsChartProps) {
  const dark = useDarkMode()
  const barra = dark ? '#3987e5' : '#2a78d6'
  const grid = dark ? '#2c2c2a' : '#e1e0d9'
  const ink = dark ? '#c3c2b7' : '#52514e'

  const ordenado = [...dados].sort((a, b) => a.faturamento - b.faturamento)

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">Top 10 produtos</h3>
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={ordenado} layout="vertical" margin={{ top: 8, right: 48, left: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={grid} horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 12, fill: ink }} axisLine={false} tickLine={false} hide />
          <YAxis
            type="category"
            dataKey="produto"
            width={170}
            tick={{ fontSize: 11, fill: ink }}
            axisLine={{ stroke: grid }}
            tickLine={false}
          />
          <Tooltip formatter={(value) => formatarMoeda(Number(value))} contentStyle={{ fontSize: 13, borderRadius: 8 }} />
          <Bar dataKey="faturamento" fill={barra} radius={[0, 4, 4, 0]} maxBarSize={18}>
            <LabelList
              dataKey="faturamento"
              position="right"
              formatter={(v: unknown) => formatarMoeda(Number(v))}
              style={{ fontSize: 11, fill: ink }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
