import { useEffect } from 'react'

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

const AddToCartReact = ({ productId, accessToken }: { productId: string; accessToken: string }) => {
  const loader = makeOnLoad({ productId, accessToken })

  useEffect(() => {
    loader()
  }, [])

  return <div id="buy-button" />
}

export default AddToCartReact

const makeOnLoad =
  ({ productId, accessToken }: { productId: string; accessToken: string }) =>
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
            afterRender: () => {
              // TODO:
            },
            addVariantToCart: () => {
              // TODO:
            },
          },
          styles: {
            button: {
              'font-size': '17px',
              'padding-top': '16.5px',
              'padding-bottom': '16.5px',
              ':hover': {
                'background-color': '#a4514e',
              },
              'background-color': '#b65a57',
              ':focus': {
                'background-color': '#a4514e',
              },
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
              ':hover': {
                'background-color': '#a4514e',
              },
              'background-color': '#b65a57',
              ':focus': {
                'background-color': '#a4514e',
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
              'background-color': '#b65a57',
              ':hover': {
                'background-color': '#a4514e',
              },
              ':focus': {
                'background-color': '#a4514e',
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
