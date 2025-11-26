import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest(() => {
  const hostPermission = process.env.VITE_HOST_PERMISSIONS
  if (!hostPermission) {
    throw new Error('VITE_HOST_PERMISSIONS is required.')
  }

  return {
    manifest_version: 3,
    name: 'Chrome Extension Performance Test',
    version: '1.0.0',
    action: {
      default_popup: 'index.html#/popup',
    },
    permissions: ['tabs', 'storage', 'scripting'],
    host_permissions: [hostPermission],
    background: {
      service_worker: 'src/background.ts',
      type: 'module',
    },
    // 주입은 버튼 클릭 시 배경 스크립트가 executeScript로 처리 (자동 주입 없음)
    web_accessible_resources: [
      {
        matches: ['http://*/*', 'https://*/*'],
        resources: [
          'assets/webVitalsInject*.js', // 빌드 산출물
          'src/content/webVitalsInject.ts',
        ],
        use_dynamic_url: false,
      },
    ],
  }
})
