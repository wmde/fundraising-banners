// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ComponentCustomProperties } from 'vue';

// This shim allows TypeScript to process .vue files as modules
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// allow custom properties from our plugins
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $translate: ( key: string ) => string;
  }
}
