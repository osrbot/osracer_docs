# 串口故障排查

本页汇总串口驱动和底盘通信问题。

## 期望设备

底盘驱动默认使用固定设备名：

```bash
ls -l /dev/osrbot_base
```

如果设备不存在，先重新插拔底盘控制器 USB 线，再重新加载 OSRacer 包提供的 UDEV 规则，或者重启车载计算机。

## 只启动底盘检查

```bash
ros2 launch osracer_bringup chassis_ackermann.launch.py
```

日志里应该能看到：

- 当前使用的串口设备。
- 固件识别信息。
- 驱动启动后里程计和 IMU topic 正常发布。

串口打开后，上位机驱动会自动维护底盘连接状态。控制器被拔掉或重启后，驱动会尝试重连，不需要完整重启 ROS。

## 常见处理

| 现象 | 检查 | 处理 |
| --- | --- | --- |
| `/dev/osrbot_base` 不存在 | `ls /dev/osrbot_base` | 重新插拔 USB，安装 UDEV 规则，或重启 |
| 权限不足 | `groups` | 把当前用户加入串口访问组，然后重新登录 |
| 一直重连 | 底盘 launch 日志 | 检查 USB 线，并确认没有其他终端占用串口 |
| 没有里程计 | `ros2 topic hz /odom` | 重启底盘 launch，查看串口日志 |

## 手动串口助手

只在诊断时使用，不要和底盘 launch 同时占用串口：

```bash
python3 $(ros2 pkg prefix osracer_bringup)/share/osracer_bringup/script/osrbot_tool.py
```

串口助手会过滤高频遥测，只显示命令响应和状态信息，包括手动查询到的统一诊断状态。
