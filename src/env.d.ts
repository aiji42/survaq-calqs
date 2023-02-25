/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly STORE_FRONT_ACCESS_TOKEN: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
