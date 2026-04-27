# Jetson Orin Nano 安装

本页将内部安装记录整理为可公开复现的安装指南。

## 适用范围

- Jetson Orin Nano
- JetPack 6.2.1
- Ubuntu 22.04.5
- ROS 2 Humble

## 大纲

1. 准备系统环境。
2. 安装 ROS 2 Humble。
3. 安装 OSRacer 依赖。
4. 编译 `osracer_ws`。
5. 配置用户权限。
6. 验证 bringup 和 debug 工具。

## 注意

内部远程访问凭据和机器相关密钥不能发布到公开文档中。
