# 整车启动

整车启动层负责让硬件节点上线，并确认机器人状态和运动指令链路正常。

## 全车启动入口

```bash
ros2 launch osracer_bringup bringup.launch.py
```

这个入口会启动底盘驱动、机器人模型、雷达、相机和 LED 矩阵节点。保持终端打开，方便查看重连信息和驱动告警。

## 只检查底盘

如果你只想先确认底盘，不启动传感器：

```bash
ros2 launch osracer_bringup chassis_ackermann.launch.py
```

底盘日志应显示当前使用的串口设备和固件识别信息。底盘连接状态由上位机驱动自动维护，用户不需要手动操作。

## 检查清单

1. 确认串口权限和 UDEV 规则。
2. 确认底盘驱动稳定启动。
3. 确认里程计 topic 正常发布。
4. 确认雷达和相机 topic 可见。
5. 在 RViz 中确认 TF 连通。
6. 实车运动前确认速度限制和测试场地安全。

## 常用检查

```bash
ros2 topic list | grep -E 'odom|imu|scan|image|battery'
ros2 run tf2_tools view_frames
```

打开 RViz 后重点看：

- 机器人模型是否连接到里程计坐标系。
- 车身和车轮 frame 是否稳定、不跳变。
- 雷达数据方向是否正确。
- 启用 USB 相机后，图像 topic 是否可见。

## 安全停止

切换演示、建图或导航模式前，先停止当前 demo：

```bash
$(ros2 pkg prefix osracer_demo)/share/osracer_demo/scripts/stop_all_demo.sh
```

也可以在每个 launch 终端里按 `Ctrl+C`。底盘驱动关闭串口前会尽量上报正常断开状态。

## 开发建议

新增硬件时，优先增加参数文件和 launch 参数，保持默认 bringup 对已有用户稳定。
