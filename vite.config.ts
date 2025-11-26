import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.config'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // manifest.config.ts에서 환경 변수를 사용하기 위해 process.env에 주입
  Object.assign(process.env, env)

  const isBuild = command === 'build'

  return {
    plugins: [react(), crx({ manifest })],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      cors: {
        origin: [/chrome-extension:\/\//],
      },
    },
    build: isBuild
      ? {
          rollupOptions: {
            input: {
              main: 'index.html',
              background: 'src/background.ts',
              webVitalsInject: 'src/content/webVitalsInject.ts',
            },
          },
        }
      : undefined,
  }
})
