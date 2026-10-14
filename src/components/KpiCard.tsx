export type KpiTone = 'neutral' | 'positive' | 'negative' | 'accent'

interface KpiCardProps {
  label: string
  value: string
  hint?: string
  tone?: KpiTone
  icon: string
}

export function KpiCard({ label, value, hint, tone = 'neutral', icon }: KpiCardProps) {
  return (
    <article className={`kpi-card kpi-${tone}`} aria-label={label}>
      <div className="kpi-head">
        <span className="kpi-icon" aria-hidden="true">
          {icon}
        </span>
        <span className="kpi-label">{label}</span>
      </div>
      <strong className="kpi-value">{value}</strong>
      {hint && <span className="kpi-hint">{hint}</span>}
    </article>
  )
}
