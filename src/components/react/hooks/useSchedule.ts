import { useState } from 'react'
import type { Schedule, Variant } from '../../../libs/getVariantsData'

export const useSchedule = (baseSchedule: Schedule) => {
  const [variant, handleVariant] = useState<Variant | undefined>(undefined)

  const schedule = latest([baseSchedule, variant?.defaultSchedule ?? null])

  return { variant, schedule, handleVariant }
}

type DeliverySchedule = Exclude<Variant['defaultSchedule'], null>

const latest = (schedules: Array<Schedule | DeliverySchedule | null>): DeliverySchedule => {
  return schedules
    .flatMap((schedule) => schedule ?? [])
    .sort((a, b) => {
      const l = Number(`${a.year}${String(a.month).padStart(2, '0')}${a.termIndex}`)
      const r = Number(`${b.year}${String(b.month).padStart(2, '0')}${b.termIndex}`)
      return l > r ? -1 : l < r ? 1 : 0
    })[0]!
}
