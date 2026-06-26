---
layout: home

hero:
  name: OSRacer
  text: ROS 2 竞速与科研导航平台
  tagline: 面向客户的 OSRacer 使用文档：竞速演示、SLAM 建图、Nav2 导航、阿克曼车辆行为和车端环境。
  image:
    src: /osracer-mark.svg
    alt: OSRacer
  actions:
    - theme: brand
      text: 建图与导航
      link: /zh/guide/navigation
    - theme: alt
      text: SLAM 建图
      link: /zh/guide/slam
    - theme: alt
      text: English
      link: /

features:
  - title: 阿克曼竞速平台
    details: 基于赛车转向模型，面向竞速演示、控制算法和车辆行为研究。
  - title: 建图导航优先
    details: 用 SLAM 创建地图，用 Nav2 复用地图，并对比不同 planner 在教室、实验室和赛道中的效果。
  - title: 车端流程完整
    details: 基于 Jetson 车端环境，在需要时启动底盘、传感器、TF、里程计和 RViz。
---

# 文档入口

## 你应该怎么读

<div class="doc-path">
  <a href="/osracer_docs/zh/guide/navigation"><strong>运行导航：</strong>使用适配 OSRacer 阿克曼底盘的 Nav2、planner 选择和调参说明。</a>
  <a href="/osracer_docs/zh/guide/slam"><strong>开始建图：</strong>运行 SLAM，并保存教室、实验室或测试场地地图。</a>
  <a href="/osracer_docs/zh/guide/nav2-speed-optimization"><strong>导航提速：</strong>查看优化后的 Nav2 指令链路、planner profile 和融合里程计路径。</a>
  <a href="/osracer_docs/zh/guide/vehicle-profile"><strong>了解车辆：</strong>查看交付版车体几何、传感器布局和阿克曼行为。</a>
  <a href="/osracer_docs/zh/guide/getting-started"><strong>第一次开机：</strong>只有在部署或恢复车辆时，再确认车载 Jetson 环境和 ROS workspace。</a>
</div>

## 平台重点

<div class="metric-grid">
  <div class="metric-card">
    <strong>主要用途</strong>
    <div class="value">竞速</div>
    阿克曼转向底盘，适合演示、控制和科研。
  </div>
  <div class="metric-card">
    <strong>导航栈</strong>
    <div class="value">Nav2</div>
    默认面向 TEB，DWB 可作为对照。
  </div>
  <div class="metric-card">
    <strong>建图</strong>
    <div class="value">SLAM</div>
    支持 GMapping、Cartographer 和 slam_toolbox 流程。
  </div>
  <div class="metric-card">
    <strong>车载计算机</strong>
    <div class="value">Jetson Orin</div>
    车端运行 Ubuntu 22.04 / ROS 2 Humble。
  </div>
</div>

## 客户通常先关心什么

1. 这是一辆阿克曼赛车，不是直接套差速机器人示例。
2. SLAM 能在目标教室、实验室或赛道生成可复用地图。
3. Nav2 能基于这些地图运行，并使用适合 OSRacer 运动特性的 planner profile。
4. 传感器、TF、里程计和 RViz 检查用于验收或问题排查，不是客户阅读主线。

::: tip 客户文档边界
这个站点只说明 OSRacer 的使用和排查流程；底层固件协议细节保留在固件仓库中。
:::
