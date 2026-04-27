# 快速开始

这页帮助新开发者从空环境走到第一次启动 OSRacer。

## 推荐环境

- Ubuntu 22.04
- ROS 2 Humble
- 使用 `colcon` 创建工作空间
- 具备 OSRacer 车辆、底盘控制器、雷达、相机和串口设备

## 克隆源码项目

```bash
mkdir -p ~/osracer_ws/src
cd ~/osracer_ws/src
git clone --recursive https://github.com/osrbot/osracer.git
```

## 安装依赖

```bash
cd ~/osracer_ws
rosdep install --from-paths src --ignore-src -r -y
```

## 编译

```bash
colcon build --symlink-install
source install/setup.bash
```

## 第一次启动

```bash
ros2 launch osracer_bringup bringup.launch.py
```

## 下一步

在修改 launch、topic、frame 或导航参数之前，建议先阅读系统架构页。
