import qwik from '@qwikdev/astro'
import { defineConfig } from 'astro/config';
import { qwikReact } from '@builder.io/qwik-react/vite';

// https://astro.build/config
export default defineConfig({
    integrations: [
        qwik(),
    ],
    // base: 'demo-template/',
    // site: "https://localhost:4321",
    vite: {
      plugins: [
        qwikReact(),
      ]
    //   server: {
    //     fs: {
    //       strict: false
    //     }
    //   }
    }
});
