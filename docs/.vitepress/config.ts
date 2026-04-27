import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'OSRacer Docs',
  description: 'Developer documentation for OSRacer',
  base: '/osracer_docs/',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: 'https://osrbot.github.io/osracer_docs/'
  },
  head: [
    ['meta', { name: 'theme-color', content: '#0f766e' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
    ['meta', { name: 'robots', content: 'index,follow' }]
  ],
  themeConfig: {
    siteTitle: 'OSRacer',
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/osrbot/osracer' }
    ]
  }
})
