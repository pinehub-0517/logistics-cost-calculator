import { useMemo, useState } from 'react'
import { InputForm, type FormValues } from './components/InputForm'
import { KpiCard } from './components/KpiCard'
import { ResultPanel } from './components/ResultPanel'
import { calculate, formatKrw, formatNumber, formatPercent, parseNumber } from './lib/calc'

const DEFAULT_VALUES: FormValues = {
  distanceKm: '350',
  vehicleCount: '10',
  ratePerKm: '1200',
  baseRatePerKm: '1500',
}

function validate(values: FormValues): Partial<Record<keyof FormValues, string>> {
  const errors: Partial<Record<keyof FormValues, string>> = {}
  ;(Object.keys(values) as (keyof FormValues)[]).forEach((key) => {
    const n = parseNumber(values[key])
    if (Number.isNaN(n)) errors[key] = '숫자만 입력해 주세요.'
    else if (n < 0) errors[key] = '0 이상의 값을 입력해 주세요.'
    else if (key === 'vehicleCount' && !Number.isInteger(n)) errors[key] = '차량 수는 정수로 입력해 주세요.'
  })
  return errors
}

export default function App() {
  const [values, setValues] = useState<FormValues>(DEFAULT_VALUES)

  const errors = useMemo(() => validate(values), [values])

  const numbers = useMemo(
    () => ({
      distanceKm: parseNumber(values.distanceKm),
      vehicleCount: parseNumber(values.vehicleCount),
      ratePerKm: parseNumber(values.ratePerKm),
      baseRatePerKm: parseNumber(values.baseRatePerKm),
    }),
    [values],
  )

  const result = useMemo(() => calculate(numbers), [numbers])
  const hasError = Object.keys(errors).length > 0

  const handleChange = (field: keyof FormValues, value: string) =>
    setValues((prev) => ({ ...prev, [field]: value }))

  const handleReset = () => setValues(DEFAULT_VALUES)

  const savingsTone = result.savings > 0 ? 'positive' : result.savings < 0 ? 'negative' : 'neutral'

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-icon" aria-hidden="true">
            🚚
          </span>
          <div>
            <h1>물류 운송비 계산기</h1>
            <p className="subtitle">운행거리 · 차량 수 · km당 운임으로 총 운송비와 절감 효과를 바로 확인하세요</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        <section className="kpi-grid" aria-label="핵심 지표">
          <KpiCard
            icon="₩"
            label="총 운송비"
            value={hasError ? '—' : formatKrw(result.totalCost)}
            hint={hasError ? '입력값을 확인해 주세요' : `차량 1대당 ${formatKrw(result.costPerVehicle)}`}
            tone="accent"
          />
          <KpiCard
            icon="↓"
            label="운송비 절감액"
            value={hasError ? '—' : formatKrw(result.savings)}
            hint={hasError ? '' : `기존 운송비 ${formatKrw(result.baseTotalCost)} 대비`}
            tone={hasError ? 'neutral' : savingsTone}
          />
          <KpiCard
            icon="%"
            label="절감률"
            value={hasError ? '—' : formatPercent(result.savingsRate)}
            hint={hasError ? '' : '기존 운송비 기준'}
            tone={hasError ? 'neutral' : savingsTone}
          />
          <KpiCard
            icon="⇄"
            label="총 운행거리"
            value={hasError ? '—' : `${formatNumber(result.totalDistanceKm)} km`}
            hint={hasError ? '' : `${formatNumber(numbers.vehicleCount)}대 × ${formatNumber(numbers.distanceKm)} km`}
          />
        </section>

        <div className="two-col">
          <InputForm values={values} errors={errors} onChange={handleChange} onReset={handleReset} />
          <ResultPanel result={result} ratePerKm={numbers.ratePerKm} baseRatePerKm={numbers.baseRatePerKm} />
        </div>
      </main>

      <footer className="app-footer">
        <p>모든 계산은 브라우저에서만 수행됩니다. 외부 서버나 데이터베이스를 사용하지 않습니다.</p>
      </footer>
    </div>
  )
}
