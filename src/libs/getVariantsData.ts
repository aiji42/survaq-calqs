export type Schedule = {
  year: number
  month: number
  term: 'early' | 'middle' | 'late'
  termIndex: number
  text: string
  texts: string[]
  subText: string
}

export type Variant = {
  variantId: string
  variantName: string
  skuLabel: string | null
  skus: {
    code: string
    name: string
    subName: string
    schedule: Omit<Schedule, 'texts'> | null
  }[]
  skuSelectable: number
  schedule: Omit<Schedule, 'texts'> | null
}

export type ProductData = {
  variants: Array<Variant>
  schedule: Schedule
}

export const getVariantsData = async (productId: string | number) => {
  // FIXME: use env
  const res = await fetch(`https://api.survaq.com/products/${productId}/supabase`)
  const json: ProductData = await res.json()

  return json
}
