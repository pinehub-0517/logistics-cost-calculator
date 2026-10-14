import type { CalcResult } from '../lib/calc'
import { formatKrw, formatNumber, formatPercent } from '../lib/calc'

interface ResultPanelProps {
  result: CalcResult
  ratePerKm: number
  baseRatePerKm: number
}

export function ResultPanel({ result, ratePerKm, baseRatePerKm }: ResultPanelProps) {
  const { totalCost, baseTotalCost, savings, savingsRate, totalDistanceKm, costPerVehicle } =
    result

  const maxCost = Math.max(totalCost, baseTotalCost, 1)
  const baseWidth = (baseTotalCost / maxCost) * 100
  const appliedWidth = (totalCost / maxCost) * 100

  const isSaving = savings > 0
  const isIncrease = savings < 0

  return (
    <section className="panel" aria-labelledby="result-title">
      <div className="panel-head">
        <h2 id="result-title">계산 결과</h2>
        <span className={`badge ${isSaving ? 'badge-positive' : isIncrease ? 'badge-negative' : ''}`}>
          {isSaving ? '절감' : isIncrease ? '비용 증가' : '변동 없음'}
        </span>
      </div>

      {/* 기존 vs 적용 비교 막대 */}
      <div className="compare">
        <div className="compare-row">
          <span className="compare-label">기존 운임</span>
          <div className="bar-track">
            <div className="bar bar-base" style={{ width: `${baseWidth}%` }} />
          </div>
          <span className="compare-value">{formatKrw(baseTotalCost)}</span>
        </div>
        <div className="compare-row">
          <span className="compare-label">적용 운임</span>
          <div className="bar-track">
            <div className="bar bar-applied" style={{ width: `${appliedWidth}%` }} />
          </div>
          <span className="compare-value">{formatKrw(totalCost)}</span>
        </div>
      </div>

      {/* 상세 내역 */}
      <table className="detail-table">
        <tbody>
          <tr>
            <th scope="row">총 운행거리</th>
            <td>{formatNumber(totalDistanceKm)} km</td>
          </tr>
          <tr>
            <th scope="row">기존 운송비 (기존 운임 × 총 거리)</th>
            <td>{formatKrw(baseTotalCost)}</td>
          </tr>
          <tr>
            <th scope="row">적용 운송비 (적용 운임 × 총 거리)</th>
            <td>{formatKrw(totalCost)}</td>
          </tr>
          <tr>
            <th scope="row">차량 1대당 운송비</th>
            <td>{formatKrw(costPerVehicle)}</td>
          </tr>
          <tr>
            <th scope="row">km당 운임 차이</th>
            <td>
              {formatKrw(baseRatePerKm - ratePerKm)}
              <span className="muted"> / km</span>
            </td>
          </tr>
          <tr className={isSaving ? 'row-positive' : isIncrease ? 'row-negative' : ''}>
            <th scope="row">운송비 절감액</th>
            <td>
              {formatKrw(savings)} ({formatPercent(savingsRate)})
            </td>
          </tr>
        </tbody>
      </table>

      <p className="formula">
        총 운송비 = 운행거리 × 차량 수 × km당 운임
        <br />
        절감률 = (기존 운송비 − 적용 운송비) ÷ 기존 운송비
      </p>
    </section>
  )
}
