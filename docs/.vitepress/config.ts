import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'OSRacer Docs',
  description:
    'Customer guide for OSRacer racing, SLAM mapping, Nav2 navigation, bringup, and troubleshooting.',
  base: '/osracer_docs/',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: 'https://osrbot.github.io/osracer_docs/'
  },
  head: [
    ['meta', { name: 'theme-color', content: '#0f766e' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, viewport-fit=cover'
      }
    ],
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
            {
              text: 'Core Capabilities',
              items: [
                { text: 'Navigation', link: '/guide/navigation' },
                { text: 'SLAM', link: '/guide/slam' },
                {
                  text: 'Nav2 Speed Optimization',
                  link: '/guide/nav2-speed-optimization'
                },
                { text: 'Nav2 Tuning', link: '/guide/nav2-tuning' },
                {
                  text: 'Ackermann Navigation',
                  link: '/guide/ackermann-navigation'
                },
                { text: 'Vehicle Profile', link: '/guide/vehicle-profile' }
              ]
            },
            {
              text: 'Robot Setup',
              items: [
                { text: 'Getting Started', link: '/guide/getting-started' },
                {
                  text: 'Jetson Orin Nano Setup',
                  link: '/guide/jetson-orin-nano-setup'
                },
                { text: 'Architecture', link: '/guide/architecture' },
                { text: 'Bringup', link: '/guide/bringup' },
                { text: 'Sensors', link: '/guide/sensors' }
              ]
            },
            {
              text: 'Maintenance and Checks',
              items: [
                {
                  text: 'Camera Calibration',
                  link: '/guide/camera-calibration'
                },
                { text: 'Debugging', link: '/guide/debugging' }
              ]
            },
            {
              text: 'Troubleshooting',
              items: [
                { text: 'UDEV', link: '/troubleshooting/udev' },
                { text: 'Serial', link: '/troubleshooting/serial' },
                { text: 'TF', link: '/troubleshooting/tf' },
                { text: 'Nav2', link: '/troubleshooting/nav2' },
                { text: 'SLAM', link: '/troubleshooting/slam' },
                { text: 'Camera', link: '/troubleshooting/camera' }
              ]
            }
          ],
          '/troubleshooting/': [
            {
              text: 'Troubleshooting',
              items: [
                { text: 'UDEV', link: '/troubleshooting/udev' },
                { text: 'Serial', link: '/troubleshooting/serial' },
                { text: 'TF', link: '/troubleshooting/tf' },
                { text: 'Nav2', link: '/troubleshooting/nav2' },
                { text: 'SLAM', link: '/troubleshooting/slam' },
                { text: 'Camera', link: '/troubleshooting/camera' }
              ]
            }
          ],
          '/development/': [
            {
              text: 'Development',
              items: [
                { text: 'Overview', link: '/development/overview' },
                { text: 'Roadmap', link: '/development/roadmap' },
                { text: 'Contributing', link: '/development/contributing' },
                { text: 'Quality Checks', link: '/development/quality-checks' }
              ]
            },
            {
              text: 'Extension Guides',
              items: [
                {
                  text: 'Add a New Sensor',
                  link: '/development/add-new-sensor'
                },
                {
                  text: 'Add a New Navigation Profile',
                  link: '/development/add-new-nav-profile'
                },
                {
                  text: 'Topic and Frame Naming',
                  link: '/development/topic-and-frame-naming'
                },
                {
                  text: 'Parameter Style',
                  link: '/development/parameter-style'
                }
              ]
            }
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
            {
              text: '核心能力',
              items: [
                { text: '导航', link: '/zh/guide/navigation' },
                { text: 'SLAM 建图', link: '/zh/guide/slam' },
                {
                  text: 'Nav2 导航提速优化',
                  link: '/zh/guide/nav2-speed-optimization'
                },
                { text: 'Nav2 调参', link: '/zh/guide/nav2-tuning' },
                {
                  text: 'Ackermann 导航',
                  link: '/zh/guide/ackermann-navigation'
                },
                { text: '车型 Profile', link: '/zh/guide/vehicle-profile' }
              ]
            },
            {
              text: '车端部署',
              items: [
                { text: '快速开始', link: '/zh/guide/getting-started' },
                {
                  text: 'Jetson Orin Nano 安装',
                  link: '/zh/guide/jetson-orin-nano-setup'
                },
                { text: '系统架构', link: '/zh/guide/architecture' },
                { text: '整车启动', link: '/zh/guide/bringup' },
                { text: '传感器', link: '/zh/guide/sensors' }
              ]
            },
            {
              text: '维护与检查',
              items: [
                { text: '相机标定', link: '/zh/guide/camera-calibration' },
                { text: '调试', link: '/zh/guide/debugging' }
              ]
            },
            {
              text: '故障排查',
              items: [
                { text: 'UDEV', link: '/zh/troubleshooting/udev' },
                { text: '串口', link: '/zh/troubleshooting/serial' },
                { text: 'TF', link: '/zh/troubleshooting/tf' },
                { text: 'Nav2', link: '/zh/troubleshooting/nav2' },
                { text: 'SLAM', link: '/zh/troubleshooting/slam' },
                { text: '相机', link: '/zh/troubleshooting/camera' }
              ]
            }
          ],
          '/zh/troubleshooting/': [
            {
              text: '故障排查',
              items: [
                { text: 'UDEV', link: '/zh/troubleshooting/udev' },
                { text: '串口', link: '/zh/troubleshooting/serial' },
                { text: 'TF', link: '/zh/troubleshooting/tf' },
                { text: 'Nav2', link: '/zh/troubleshooting/nav2' },
                { text: 'SLAM', link: '/zh/troubleshooting/slam' },
                { text: '相机', link: '/zh/troubleshooting/camera' }
              ]
            }
          ],
          '/zh/development/': [
            {
              text: '二次开发',
              items: [
                { text: '总览', link: '/zh/development/overview' },
                { text: 'Roadmap', link: '/zh/development/roadmap' },
                { text: '贡献指南', link: '/zh/development/contributing' },
                { text: '静态检查', link: '/zh/development/quality-checks' }
              ]
            },
            {
              text: '扩展指南',
              items: [
                { text: '新增传感器', link: '/zh/development/add-new-sensor' },
                {
                  text: '新增导航 Profile',
                  link: '/zh/development/add-new-nav-profile'
                },
                {
                  text: 'Topic 和 Frame 命名',
                  link: '/zh/development/topic-and-frame-naming'
                },
                { text: '参数风格', link: '/zh/development/parameter-style' }
              ]
            }
          ]
        }
      }
    }
  },
  themeConfig: {
    logo: '/osracer-mark.svg',
    siteTitle: 'OSRacer',
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/osrbot/osracer' }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 OSRBot community'
    }
  }
})
