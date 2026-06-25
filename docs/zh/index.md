---
layout: home

hero:
  name: OSRacer
  text: ROS 2 阿克曼赛车使用手册
  tagline: 面向客户的 OSRacer 使用文档：Jetson 环境、整车启动、桌面演示、SLAM 建图、Nav2 导航、RViz 检查和常见故障排查。
  image:
    src: /osracer-mark.svg
    alt: OSRacer
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/getting-started
    - theme: alt
      text: 整车启动
      link: /zh/guide/bringup
    - theme: alt
      text: English
      link: /

features:
  - title: 拿到车先跑起来
    details: 从 Jetson Orin Nano 上已部署的 OSRacer 环境开始，检查串口、传感器、TF、里程计和 RViz。
  - title: 演示功能清晰
    details: 覆盖底盘检查、桌面演示、建图、导航、停止脚本和常见启动命令。
  - title: 教学科研可扩展
    details: 基于 SLAM、Nav2、相机标定、阿克曼导航、仿真和赛车算法继续开发。
---

# 文档入口

## 你应该怎么读

<div class="doc-path">
  <a href="/osracer_docs/zh/guide/getting-started"><strong>第一次开机：</strong>确认车载 Jetson 环境、工作空间和 ROS source。</a>
  <a href="/osracer_docs/zh/guide/bringup"><strong>启动整车：</strong>启动底盘、传感器、TF 和 RViz 可见状态。</a>
  <a href="/osracer_docs/zh/guide/slam"><strong>开始建图：</strong>运行 SLAM，并保存教室或实验室地图。</a>
  <a href="/osracer_docs/zh/guide/navigation"><strong>运行导航：</strong>使用适配阿克曼底盘的 Nav2 参数和调试步骤。</a>
  <a href="/osracer_docs/zh/troubleshooting/serial"><strong>串口异常：</strong>检查设备名、权限、底盘日志和自动重连行为。</a>
</div>

## 客户常用配置

<div class="metric-grid">
  <div class="metric-card">
    <strong>车载计算机</strong>
    <div class="value">Jetson Orin</div>
    车端运行 Ubuntu 22.04 / ROS 2 Humble。
  </div>
  <div class="metric-card">
    <strong>底盘串口</strong>
    <div class="value">/dev/osrbot_base</div>
    通过 UDEV 固定的底盘设备名。
  </div>
  <div class="metric-card">
    <strong>主启动入口</strong>
    <div class="value">bringup</div>
    启动底盘、机器人模型、雷达、相机和 LED 节点。
  </div>
  <div class="metric-card">
    <strong>底盘类型</strong>
    <div class="value">Ackermann</div>
    面向演示、导航和科研算法的赛车转向模型。
  </div>
</div>

## 启动后应该看到什么

1. 底盘启动日志会显示串口设备和固件识别信息。
2. 上位机驱动会自动维护底盘连接状态。
3. `/odom`、IMU、电池、雷达、相机和 TF 相关 topic 会陆续出现。
4. RViz 中机器人模型应连通，底盘和车轮不应跳变。

::: tip 客户文档边界
这个站点只说明 OSRacer 的使用和排查流程；底层固件协议细节保留在固件仓库中。
:::
