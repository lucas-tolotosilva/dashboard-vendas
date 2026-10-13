import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { PontoMes } from '../lib/metrics'
import { formatarMoeda } from '../lib/metrics'
import { useDarkMode } from '../hooks/useDarkMode'

interface RevenueLineChartProps {
  dados: PontoMes[]
}

export function RevenueLineChart({ dados }: RevenueLineChartProps) {
  const dark = useDarkMode()
  const linha = dark ? '#3987e5' : '#2a78d6'
  const grid = dark ? '#2c2c2a' : '#e1e0d9'
  const ink = dark ? '#c3c2b7' : '#52514e'

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">Faturamento por mês</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={dados} margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
          <XAxis dataKey="mes" tick={{ fontSize: 12, fill: ink }} axisLine={{ stroke: grid }} tickLine={false} />
          <YAxis
            tick={{ fontSize: 12, fill: ink }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${Math.round(v / 1000)}k`}
          />
          <Tooltip
            formatter={(value) => formatarMoeda(Number(value))}
            contentStyle={{ fontSize: 13, borderRadius: 8 }}
          />
          <Line type="monotone" dataKey="faturamento" stroke={linha} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
