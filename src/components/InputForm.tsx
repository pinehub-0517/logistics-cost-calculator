export interface FormValues {
  distanceKm: string
  vehicleCount: string
  ratePerKm: string
  baseRatePerKm: string
}

interface InputFormProps {
  values: FormValues
  errors: Partial<Record<keyof FormValues, string>>
  onChange: (field: keyof FormValues, value: string) => void
  onReset: () => void
}

interface FieldDef {
  key: keyof FormValues
  label: string
  unit: string
  placeholder: string
  step: string
  description: string
}

const FIELDS: FieldDef[] = [
  {
    key: 'distanceKm',
    label: '운행거리',
    unit: 'km',
    placeholder: '예: 350',
    step: '1',
    description: '차량 1대당 운행거리',
  },
  {
    key: 'vehicleCount',
    label: '차량 수',
    unit: '대',
    placeholder: '예: 10',
    step: '1',
    description: '투입 차량 대수',
  },
  {
    key: 'ratePerKm',
    label: 'km당 운임',
    unit: '원',
    placeholder: '예: 1,200',
    step: '10',
    description: '적용(제안) 운임',
  },
  {
    key: 'baseRatePerKm',
    label: '기존 km당 운임',
    unit: '원',
    placeholder: '예: 1,500',
    step: '10',
    description: '절감 효과 비교 기준',
  },
]

export function InputForm({ values, errors, onChange, onReset }: InputFormProps) {
  return (
    <section className="panel" aria-labelledby="input-title">
      <div className="panel-head">
        <h2 id="input-title">운송 조건 입력</h2>
        <button type="button" className="btn-ghost" onClick={onReset}>
          초기화
        </button>
      </div>

      <form className="form-grid" onSubmit={(e) => e.preventDefault()} noValidate>
        {FIELDS.map((f) => {
          const error = errors[f.key]
          const inputId = `field-${f.key}`
          return (
            <div className={`field ${error ? 'field-error' : ''}`} key={f.key}>
              <label htmlFor={inputId}>
                {f.label}
                <span className="field-desc">{f.description}</span>
              </label>
              <div className="input-wrap">
                <input
                  id={inputId}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step={f.step}
                  placeholder={f.placeholder}
                  value={values[f.key]}
                  onChange={(e) => onChange(f.key, e.target.value)}
                  aria-invalid={!!error}
                  aria-describedby={error ? `${inputId}-error` : undefined}
                />
                <span className="unit">{f.unit}</span>
              </div>
              {error && (
                <p className="error-msg" id={`${inputId}-error`} role="alert">
                  {error}
                </p>
              )}
            </div>
          )
        })}
      </form>

      <p className="form-note">
        입력값은 자동으로 계산되며, 브라우저 밖으로 전송되거나 저장되지 않습니다.
      </p>
    </section>
  )
}
