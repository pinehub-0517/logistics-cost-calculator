/**
 * 운송비 계산 로직 (순수 함수, 외부 의존성 없음)
 */

export interface CalcInput {
  /** 차량 1대당 운행거리 (km) */
  distanceKm: number
  /** 투입 차량 수 (대) */
  vehicleCount: number
  /** 적용 km당 운임 (원) */
  ratePerKm: number
  /** 비교 기준 km당 운임 (원) - 기존 운임 */
  baseRatePerKm: number
}

export interface CalcResult {
  /** 총 운행거리 = 거리 × 차량 수 (km) */
  totalDistanceKm: number
  /** 적용 운임 기준 총 운송비 (원) */
  totalCost: number
  /** 기존 운임 기준 총 운송비 (원) */
  baseTotalCost: number
  /** 절감액 = 기존 운송비 − 적용 운송비 (원, 음수면 비용 증가) */
  savings: number
  /** 절감률 = 절감액 ÷ 기존 운송비 (0~1 비율, 기존 운송비가 0이면 0) */
  savingsRate: number
  /** 차량 1대당 운송비 (원) */
  costPerVehicle: number
  /** 입력값이 유효한지 (모든 값이 0 이상인 유한수) */
  isValid: boolean
}

const isFiniteNonNegative = (n: number) => Number.isFinite(n) && n >= 0

export function calculate(input: CalcInput): CalcResult {
  const { distanceKm, vehicleCount, ratePerKm, baseRatePerKm } = input

  const isValid =
    isFiniteNonNegative(distanceKm) &&
    isFiniteNonNegative(vehicleCount) &&
    isFiniteNonNegative(ratePerKm) &&
    isFiniteNonNegative(baseRatePerKm)

  if (!isValid) {
    return {
      totalDistanceKm: 0,
      totalCost: 0,
      baseTotalCost: 0,
      savings: 0,
      savingsRate: 0,
      costPerVehicle: 0,
      isValid: false,
    }
  }

  const totalDistanceKm = distanceKm * vehicleCount
  const totalCost = totalDistanceKm * ratePerKm
  const baseTotalCost = totalDistanceKm * baseRatePerKm
  const savings = baseTotalCost - totalCost
  const savingsRate = baseTotalCost > 0 ? savings / baseTotalCost : 0
  const costPerVehicle = vehicleCount > 0 ? totalCost / vehicleCount : 0

  return {
    totalDistanceKm,
    totalCost,
    baseTotalCost,
    savings,
    savingsRate,
    costPerVehicle,
    isValid: true,
  }
}

/** 문자열 입력을 숫자로 변환. 빈 문자열은 0, 변환 불가는 NaN */
export function parseNumber(value: string): number {
  const trimmed = value.replace(/,/g, '').trim()
  if (trimmed === '') return 0
  return Number(trimmed)
}

const krwFormatter = new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',
  maximumFractionDigits: 0,
})

const numberFormatter = new Intl.NumberFormat('ko-KR', {
  maximumFractionDigits: 1,
})

const percentFormatter = new Intl.NumberFormat('ko-KR', {
  style: 'percent',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

export const formatKrw = (n: number) => krwFormatter.format(Math.round(n))
export const formatNumber = (n: number) => numberFormatter.format(n)
export const formatPercent = (ratio: number) => percentFormatter.format(ratio)
