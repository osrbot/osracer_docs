import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'OSRacer Docs',
  description: 'Developer documentation for OSRacer',
  base: '/osracer_docs/',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    siteTitle: 'OSRacer',
    search: {
      provider: 'local'
    }
  }
})
