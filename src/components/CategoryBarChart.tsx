import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts'
import type { PontoCategoria } from '../lib/metrics'
import { formatarMoeda } from '../lib/metrics'
import { corCategoria } from '../lib/palette'
import { useDarkMode } from '../hooks/useDarkMode'

interface CategoryBarChartProps {
  dados: PontoCategoria[]
}

export function CategoryBarChart({ dados }: CategoryBarChartProps) {
  const dark = useDarkMode()
  const grid = dark ? '#2c2c2a' : '#e1e0d9'
  const ink = dark ? '#c3c2b7' : '#52514e'

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">Faturamento por categoria</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={dados} margin={{ top: 16, right: 16, left: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
          <XAxis dataKey="categoria" tick={{ fontSize: 11, fill: ink }} axisLine={{ stroke: grid }} tickLine={false} />
          <YAxis
            tick={{ fontSize: 12, fill: ink }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${Math.round(v / 1000)}k`}
          />
          <Tooltip formatter={(value) => formatarMoeda(Number(value))} contentStyle={{ fontSize: 13, borderRadius: 8 }} />
          <Bar dataKey="faturamento" radius={[4, 4, 0, 0]} maxBarSize={56}>
            {dados.map((d) => (
              <Cell key={d.categoria} fill={corCategoria(d.categoria, dark)} />
            ))}
            <LabelList
              dataKey="faturamento"
              position="top"
              formatter={(v: unknown) => `${Math.round(Number(v) / 1000)}k`}
              style={{ fontSize: 11, fill: ink }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
