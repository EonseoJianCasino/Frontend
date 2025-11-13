import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest(() => {
  const hp = process.env.VITE_HOST_PERMISSIONS!

  return {
    manifest_version: 3,
    name: 'Chrome Extension Performance Test',
    version: '1.0.0',
    action: {
      default_popup: 'index.html#/popup',
    },
    permissions: ['tabs'],
    host_permissions: [hp],
  }
})
