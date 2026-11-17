/// <reference types="vite/client" />

declare module '*?url' {
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_INDEXABLE?: string;
  readonly VITE_CONSULTATION_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
