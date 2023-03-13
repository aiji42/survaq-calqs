import { useReducer } from 'react'
import type { Schedule, Variant } from '../libs/getVariantsData'

type Selects = {
  label: string
  selected: Variant['skus'][number]
}[]

const times = (n: number) =>
  Array(n)
    .fill(0)
    .map((_, index) => index)

export const useSkuSelectors = () => {
  const [value, handleSku] = useReducer(
    (
      status: { selects: Selects; variant: Variant | undefined },
      action: { type: 'reset'; variant: Variant | undefined } | { type: 'select'; index: number; value: string }
    ) => {
      if (action.type === 'reset') {
        const { variant } = action
        if (!variant) return { selects: [], variant }
        if (variant.variantId === status.variant?.variantId) return { selects: [...status.selects], variant }
        return {
          selects: times(variant.skuSelectable).map((index) => ({
            label: variant.skuLabel ? variant.skuLabel.replace(/#/g, String(index + 1)) : '',
            variant,
            selected: variant.skus[0]!,
          })),
          variant,
        }
      }

      const sku = status.variant?.skus.find(({ code }) => code === action.value)
      if (!sku) throw new Error()
      status.selects[action.index]!.selected = sku

      return status
    },
    { selects: [], variant: undefined }
  )

  return { ...value, handleSku }
}

type DeliverySchedule = Omit<Schedule, 'texts'>

export const latest = (schedules: Array<Schedule | DeliverySchedule | null>): DeliverySchedule => {
  return schedules
    .filter((schedule): schedule is DeliverySchedule => !!schedule)
    .sort((a, b) => {
      const l = Number(`${a.year}${String(a.month).padStart(2, '0')}${a.termIndex}`)
      const r = Number(`${b.year}${String(b.month).padStart(2, '0')}${b.termIndex}`)
      return l > r ? -1 : l < r ? 1 : 0
    })[0]!
}
