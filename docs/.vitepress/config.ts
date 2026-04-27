import { defineConfig } from "vitepress";

export default defineConfig({
  title: "OSRacer Docs",
  description: "Developer documentation for OSRacer",
  base: "/osracer_docs/",
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: "https://osrbot.github.io/osracer_docs/",
  },
  head: [
    ["meta", { name: "theme-color", content: "#0f766e" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0, viewport-fit=cover",
      },
    ],
    ["meta", { name: "robots", content: "index,follow" }],
  ],
  locales: {
    root: {
      label: "English",
      lang: "en-US",
      title: "OSRacer Docs",
      themeConfig: {
        nav: [
          { text: "Guide", link: "/guide/getting-started" },
          { text: "Development", link: "/development/overview" },
          { text: "Changelog", link: "/changelog/" },
        ],
        sidebar: {
          "/guide/": [
            {
              text: "Start Here",
              items: [
                { text: "Getting Started", link: "/guide/getting-started" },
                {
                  text: "Jetson Orin Nano Setup",
                  link: "/guide/jetson-orin-nano-setup",
                },
                { text: "Architecture", link: "/guide/architecture" },
                { text: "Bringup", link: "/guide/bringup" },
                { text: "Debugging", link: "/guide/debugging" },
              ],
            },
            {
              text: "Hardware and Sensors",
              items: [
                { text: "Vehicle Profile", link: "/guide/vehicle-profile" },
                { text: "Sensors", link: "/guide/sensors" },
                {
                  text: "Camera Calibration",
                  link: "/guide/camera-calibration",
                },
              ],
            },
            {
              text: "SLAM and Navigation",
              items: [
                { text: "SLAM", link: "/guide/slam" },
                { text: "Navigation", link: "/guide/navigation" },
                {
                  text: "Nav2 Speed Optimization",
                  link: "/guide/nav2-speed-optimization",
                },
                { text: "Nav2 Tuning", link: "/guide/nav2-tuning" },
                {
                  text: "Ackermann Navigation",
                  link: "/guide/ackermann-navigation",
                },
              ],
            },
            {
              text: "Troubleshooting",
              items: [
                { text: "UDEV", link: "/troubleshooting/udev" },
                { text: "Serial", link: "/troubleshooting/serial" },
                { text: "TF", link: "/troubleshooting/tf" },
                { text: "Nav2", link: "/troubleshooting/nav2" },
                { text: "SLAM", link: "/troubleshooting/slam" },
                { text: "Camera", link: "/troubleshooting/camera" },
              ],
            },
          ],
          "/troubleshooting/": [
            {
              text: "Troubleshooting",
              items: [
                { text: "UDEV", link: "/troubleshooting/udev" },
                { text: "Serial", link: "/troubleshooting/serial" },
                { text: "TF", link: "/troubleshooting/tf" },
                { text: "Nav2", link: "/troubleshooting/nav2" },
                { text: "SLAM", link: "/troubleshooting/slam" },
                { text: "Camera", link: "/troubleshooting/camera" },
              ],
            },
          ],
          "/development/": [
            {
              text: "Development",
              items: [
                { text: "Overview", link: "/development/overview" },
                { text: "Roadmap", link: "/development/roadmap" },
                { text: "Contributing", link: "/development/contributing" },
                { text: "Quality Checks", link: "/development/quality-checks" },
              ],
            },
            {
              text: "Extension Guides",
              items: [
                {
                  text: "Add a New Sensor",
                  link: "/development/add-new-sensor",
                },
                {
                  text: "Add a New Navigation Profile",
                  link: "/development/add-new-nav-profile",
                },
                {
                  text: "Topic and Frame Naming",
                  link: "/development/topic-and-frame-naming",
                },
                {
                  text: "Parameter Style",
                  link: "/development/parameter-style",
                },
              ],
            },
          ],
        },
      },
    },
    zh: {
      label: "简体中文",
      lang: "zh-CN",
      title: "OSRacer 文档",
      themeConfig: {
        nav: [
          { text: "指南", link: "/zh/guide/getting-started" },
          { text: "二次开发", link: "/zh/development/overview" },
          { text: "更新日志", link: "/zh/changelog/" },
        ],
        sidebar: {
          "/zh/guide/": [
            {
              text: "入门",
              items: [
                { text: "快速开始", link: "/zh/guide/getting-started" },
                {
                  text: "Jetson Orin Nano 安装",
                  link: "/zh/guide/jetson-orin-nano-setup",
                },
                { text: "系统架构", link: "/zh/guide/architecture" },
                { text: "整车启动", link: "/zh/guide/bringup" },
                { text: "调试", link: "/zh/guide/debugging" },
              ],
            },
            {
              text: "硬件与传感器",
              items: [
                { text: "车型 Profile", link: "/zh/guide/vehicle-profile" },
                { text: "传感器", link: "/zh/guide/sensors" },
                { text: "相机标定", link: "/zh/guide/camera-calibration" },
              ],
            },
            {
              text: "SLAM 与导航",
              items: [
                { text: "SLAM 建图", link: "/zh/guide/slam" },
                { text: "导航", link: "/zh/guide/navigation" },
                {
                  text: "Nav2 导航提速优化",
                  link: "/zh/guide/nav2-speed-optimization",
                },
                { text: "Nav2 调参", link: "/zh/guide/nav2-tuning" },
                {
                  text: "Ackermann 导航",
                  link: "/zh/guide/ackermann-navigation",
                },
              ],
            },
            {
              text: "故障排查",
              items: [
                { text: "UDEV", link: "/zh/troubleshooting/udev" },
                { text: "串口", link: "/zh/troubleshooting/serial" },
                { text: "TF", link: "/zh/troubleshooting/tf" },
                { text: "Nav2", link: "/zh/troubleshooting/nav2" },
                { text: "SLAM", link: "/zh/troubleshooting/slam" },
                { text: "相机", link: "/zh/troubleshooting/camera" },
              ],
            },
          ],
          "/zh/troubleshooting/": [
            {
              text: "故障排查",
              items: [
                { text: "UDEV", link: "/zh/troubleshooting/udev" },
                { text: "串口", link: "/zh/troubleshooting/serial" },
                { text: "TF", link: "/zh/troubleshooting/tf" },
                { text: "Nav2", link: "/zh/troubleshooting/nav2" },
                { text: "SLAM", link: "/zh/troubleshooting/slam" },
                { text: "相机", link: "/zh/troubleshooting/camera" },
              ],
            },
          ],
          "/zh/development/": [
            {
              text: "二次开发",
              items: [
                { text: "总览", link: "/zh/development/overview" },
                { text: "Roadmap", link: "/zh/development/roadmap" },
                { text: "贡献指南", link: "/zh/development/contributing" },
                { text: "静态检查", link: "/zh/development/quality-checks" },
              ],
            },
            {
              text: "扩展指南",
              items: [
                { text: "新增传感器", link: "/zh/development/add-new-sensor" },
                {
                  text: "新增导航 Profile",
                  link: "/zh/development/add-new-nav-profile",
                },
                {
                  text: "Topic 和 Frame 命名",
                  link: "/zh/development/topic-and-frame-naming",
                },
                { text: "参数风格", link: "/zh/development/parameter-style" },
              ],
            },
          ],
        },
      },
    },
  },
  themeConfig: {
    siteTitle: "OSRacer",
    search: { provider: "local" },
    socialLinks: [
      { icon: "github", link: "https://github.com/osrbot/osracer" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2026 OSRBot community",
    },
  },
});
