# 快速开始

这页帮助 OSRacer 用户从一台已经上电的机器人走到第一次 ROS 2 启动。

## 推荐环境

- OSRacer 机器人，车载 Jetson Orin Nano 或其他 Ubuntu 22.04 计算机
- 车端已经安装 ROS 2 Humble
- OSRacer 工作空间已经编译
- 可以通过键盘显示器、SSH 或远程终端登录机器人

## 如果机器人已经部署好

交付版机器人通常已经包含 OSRacer 工作空间。登录车端后执行：

```bash
source /opt/ros/humble/setup.bash
source ~/osracer_ws/install/setup.bash
```

如果你的工作空间不在 `~/osracer_ws`，请替换成实际路径。

## 如果需要从源码编译

```bash
mkdir -p ~/osracer_ws/src
cd ~/osracer_ws/src
git clone --recursive https://github.com/osrbot/osracer.git
cd ~/osracer_ws
rosdep install --from-paths src --ignore-src -r -y
colcon build --symlink-install
source install/setup.bash
```

## 第一次检查

确认底盘设备存在：

```bash
ls -l /dev/osrbot_base
```

确认 OSRacer 包可以被 ROS 识别：

```bash
ros2 pkg list | grep osracer
```

## 启动整车

```bash
ros2 launch osracer_bringup bringup.launch.py
```

只检查底盘时可以启动：

```bash
ros2 launch osracer_bringup chassis_ackermann.launch.py
```

底盘节点会在 ROS 日志中显示串口设备和固件识别信息，连接状态由上位机驱动自动维护。

## 下一步

- 看 [整车启动](/zh/guide/bringup) 检查 topic、TF 和 RViz。
- 看 [SLAM 建图](/zh/guide/slam) 创建地图。
- 看 [导航](/zh/guide/navigation) 运行 Nav2。
- 如果底盘没有连接，看 [串口故障排查](/zh/troubleshooting/serial)。
