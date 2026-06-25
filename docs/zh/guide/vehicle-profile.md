# 车型设置

OSRacer 出厂时已经固定好底盘几何和传感器布局。正常使用时，用户不需要选择不同车型，也不需要在启动、建图或导航前手动修改车体几何参数。

## 出厂已经配置好的内容

| 项目 | 对用户意味着什么 |
| --- | --- |
| 底盘几何 | 机器人模型和导航碰撞范围已经按 OSRacer 准备好。 |
| 轴距和轮距 | 已用于阿克曼底盘驱动、机器人模型和导航配置。 |
| 传感器坐标系 | 雷达、相机、IMU 和车体坐标系通过标准 launch 发布。 |
| 串口设备名 | 底盘控制器默认使用 `/dev/osrbot_base`。 |

实际使用时，上位机教程对标准交付车辆基本通用。客户应优先按照文档启动和检查，不要从其他机器人复制参数。

## 用户需要验证什么

执行 `ros2 launch osracer_bringup bringup.launch.py` 后，重点检查可见状态，而不是先改配置文件：

```bash
ros2 topic list | grep -E 'odom|imu|scan|image|battery'
ros2 run tf2_tools view_frames
```

在 RViz 中确认：

- 机器人模型是一棵连通的 TF 树；
- 雷达点云方向向前，并且能对齐房间环境；
- 启用 USB 相机后能看到相机 topic；
- 车辆静止时，车体和车轮 frame 不跳变；
- 机器人不动时，costmap 不闪烁。

## 什么时候才需要改几何配置

只有在你实际改动车体硬件时，才需要调整相关 ROS 配置，例如：

- 更换雷达支架；
- 移动相机位置；
- 更换轮径；
- 增加会改变碰撞范围的外壳；
- 新增带独立 frame 的传感器。

遇到这些情况时，先记录硬件变化，再修改对应的 ROS 描述或参数文件，并在 RViz 中验证后再上车运动。

## 推荐排查路径

| 现象 | 先检查 | 下一页 |
| --- | --- | --- |
| 机器人模型断开 | `ros2 run tf2_tools view_frames` | [TF 故障排查](/zh/troubleshooting/tf) |
| 雷达方向不对 | 传感器安装方向和 frame | [传感器](/zh/guide/sensors) |
| 导航擦碰障碍物 | costmap 和 inflation 设置 | [Nav2 调参](/zh/guide/nav2-tuning) |
| 里程计跳变 | 底盘和 TF 日志 | [串口故障排查](/zh/troubleshooting/serial) |

不要一开始就修改底层车体几何。先确认标准 bringup、topic 和 TF 都正常运行。
