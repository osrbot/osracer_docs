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
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      title: 'OSRacer Docs',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/guide/getting-started' },
          { text: 'Development', link: '/development/overview' },
          { text: 'Changelog', link: '/changelog/' }
        ],
        sidebar: {
          '/guide/': [
            { text: 'Guide', items: [
              { text: 'Getting Started', link: '/guide/getting-started' },
              { text: 'Architecture', link: '/guide/architecture' },
              { text: 'Bringup', link: '/guide/bringup' },
              { text: 'SLAM', link: '/guide/slam' },
              { text: 'Navigation', link: '/guide/navigation' }
            ] }
          ],
          '/development/': [
            { text: 'Development', items: [
              { text: 'Overview', link: '/development/overview' },
              { text: 'Contributing', link: '/development/contributing' },
              { text: 'Quality Checks', link: '/development/quality-checks' }
            ] }
          ]
        }
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'OSRacer 文档',
      themeConfig: {
        nav: [
          { text: '指南', link: '/zh/guide/getting-started' },
          { text: '二次开发', link: '/zh/development/overview' },
          { text: '更新日志', link: '/zh/changelog/' }
        ],
        sidebar: {
          '/zh/guide/': [
            { text: '指南', items: [
              { text: '快速开始', link: '/zh/guide/getting-started' },
              { text: '系统架构', link: '/zh/guide/architecture' },
              { text: '整车启动', link: '/zh/guide/bringup' },
              { text: 'SLAM 建图', link: '/zh/guide/slam' },
              { text: '导航', link: '/zh/guide/navigation' }
            ] }
          ],
          '/zh/development/': [
            { text: '二次开发', items: [
              { text: '总览', link: '/zh/development/overview' },
              { text: '贡献指南', link: '/zh/development/contributing' },
              { text: '静态检查', link: '/zh/development/quality-checks' }
            ] }
          ]
        }
      }
    }
  },
  themeConfig: {
    siteTitle: 'OSRacer',
    search: { provider: 'local' },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/osrbot/osracer' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 OSRBot community'
    }
  }
})
