import { useEffect, useRef } from 'react'
import { useSchedule } from './hooks/useSchedule'
import type { Schedule, Variant } from '../../libs/getVariantsData'

declare global {
  interface Window {
    ShopifyCustomAttribute?: { key: string; value: string }[]
    ShopifyBuy: {
      buildClient: (arg: { domain: string; storefrontAccessToken: string }) => unknown
      UI: {
        init: (arg: unknown) => {
          createComponent: (name: string, options: unknown) => void
        }
      }
    }
  }
}

type CartObject = {
  onCheckout: () => void
  checkout: {
    open: (s: string) => void
  }
  model: { webUrl: string }
}

type CustomAttributes = { key: string; value: string }[]

type ProductObject = {
  selectedVariantTrackingInfo: { id: string }
  setCustomAttributes: (arg: CustomAttributes) => void
}

const AddToCartReact = ({
  productId,
  accessToken,
  productSchedule,
  productVariants: variants,
}: {
  productId: string
  accessToken: string
  productSchedule: Schedule
  productVariants: Variant[]
}) => {
  const { schedule, handleVariant } = useSchedule(productSchedule)

  const buyButtonLoaded = useRef(false)
  useEffect(() => {
    if (!buyButtonLoaded.current) {
      const loader = makeOnLoad({ productId, accessToken, handleVariant, variants })
      loader()
      buyButtonLoaded.current = true
    }
  }, [productId, accessToken, handleVariant, variants])

  if (typeof window !== 'undefined')
    window.ShopifyCustomAttribute = [
      ...Array.from(new URL(location.href).searchParams).reduce<CustomAttributes>((res, [key, value]) => {
        return key.startsWith('utm_') ? [...res, { key: `_${key}`, value }] : res
      }, []),
      {
        key: '_source',
        value: `${location.origin}${location.pathname}`,
      },
      {
        key: '配送予定',
        value: `${schedule.text}(${schedule.subText})`,
      },
    ]

  return <div id="buy-button" />
}

export default AddToCartReact

const makeOnLoad =
  ({
    productId,
    accessToken,
    handleVariant,
    variants,
  }: {
    productId: string
    accessToken: string
    handleVariant: ReturnType<typeof useSchedule>['handleVariant']
    variants: Variant[]
  }) =>
  () => {
    const client = window.ShopifyBuy.buildClient({
      domain: 'survaq.myshopify.com',
      storefrontAccessToken: accessToken,
    })
    window.ShopifyBuy.UI.init(client).createComponent('product', {
      id: productId,
      node: document.getElementById('buy-button'),
      moneyFormat: '%C2%A5%7B%7Bamount_no_decimals%7D%7D',
      options: {
        product: {
          // iframe: false,
          contents: {
            img: false,
            title: false,
            price: true,
          },
          text: {
            button: 'カートに追加',
            unavailable: 'お取り扱いできません',
          },
          events: {
            afterRender: (product: ProductObject) => {
              handleVariant(
                variants.find(
                  ({ variantId }) =>
                    variantId === product.selectedVariantTrackingInfo.id.replace('gid://shopify/ProductVariant/', '')
                )
              )
            },
            addVariantToCart: (product: ProductObject) => {
              if (window.ShopifyCustomAttribute) product.setCustomAttributes(window.ShopifyCustomAttribute)
            },
          },
          styles: {
            prices: {
              'text-align': 'left',
            },
            price: {
              'font-size': '32px',
              'font-family': 'Avenir, san-serif',
              color: '#141414',
            },
            buttonWrapper: {
              'margin-top': '32px',
            },
            button: {
              'font-size': '16px',
              width: '100%',
              'max-width': '375px',
              'padding-top': '16.5px',
              'padding-bottom': '16.5px',
              transition: 'all ease-in-out 0.5s',
              'background-color': '#141414',
              ':hover': {
                opacity: '0.7',
                'background-color': '#141414',
              },
              ':focus': {
                'background-color': '#141414',
              },
              'border-radius': '40px',
            },
          },
        },
        cart: {
          // iframe: false,
          styles: {
            button: {
              'font-size': '17px',
              'padding-top': '16.5px',
              'padding-bottom': '16.5px',
              'border-radius': '40px',
              transition: 'all ease-in-out 0.5s',
              ':hover': {
                opacity: '0.7',
              },
              'background-color': '#141414',
              ':focus': {
                'background-color': '#141414',
              },
            },
          },
          text: {
            title: 'カートリスト',
            total: '小計',
            empty: 'カートに何も入っていません',
            notice: '送料無料 - 期間限定割引 適用済み',
            button: '購入手続きへ進む',
          },
          popup: false,
          events: {
            afterInit: (cart: CartObject) => {
              cart.onCheckout = () => {
                const url = new URL(cart.model.webUrl)
                Array.from(new URL(location.href).searchParams).forEach(([key, value]) => {
                  if (key.startsWith('utm_')) url.searchParams.append(key, value)
                })
                cart.checkout.open(url.toString())
              }
            },
          },
        },
        toggle: {
          styles: {
            toggle: {
              'background-color': '#141414',
              ':hover': {
                'background-color': '#141414',
              },
              ':focus': {
                'background-color': '#141414',
              },
            },
            count: {
              'font-size': '17px',
            },
          },
        },
      },
    })
  }
