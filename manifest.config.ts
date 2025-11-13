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
    permissions: ['tabs'],
    host_permissions: [hostPermission],
  }
})
