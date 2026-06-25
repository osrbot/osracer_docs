# TF 故障排查

TF 把地图、里程计、车体、车轮、雷达、相机和 IMU 连接成一棵坐标树。TF 有问题时，RViz、SLAM、Nav2 和传感器叠加显示都会异常。

## 快速检查

bringup 启动后执行：

```bash
ros2 run tf2_tools view_frames
ros2 run rqt_tf_tree rqt_tf_tree
ros2 topic hz /tf
```

常见链路应保持连通：

```text
map -> odom -> base_footprint -> base_link -> sensor frames
```

有些启动方式只有在 SLAM、定位或导航运行后才会发布 `map`。这是正常现象；但底盘启动时，`odom -> base_footprint -> base_link` 应保持稳定。

## RViz 中应该检查什么

- 机器人模型是一体连通的。
- 雷达数据朝前，并能对齐墙面。
- 相机 frame 在车前方，而不是车底或车后。
- 车辆静止时，车轮 frame 不跳变。
- 在建图和导航之间切换时，机器人不跳变。

## 常见问题

| 现象 | 可能原因 | 先做什么 |
| --- | --- | --- |
| RViz 没有机器人模型 | 机器人描述 launch 没启动 | 启动完整 bringup |
| `map` 和 `odom` 断开 | SLAM 或定位未运行 | 启动建图或导航 |
| 传感器数据方向不对 | 传感器 frame 方向或安装不对 | 检查传感器 launch 和 RViz 坐标轴 |
| RViz 中机器人跳变 | 里程计、EKF 或 TF 发布冲突 | 检查是否有两个节点发布同一 transform |
| Costmap 偏移 | 传感器 frame 或里程计 frame 不匹配 | 对比雷达 scan 和真实墙面 |

## 安全排查顺序

1. 停止导航或 demo。
2. 只启动底盘。
3. 确认里程计和车体 frame 稳定。
4. 加入机器人描述。
5. 加入雷达。
6. 最后再启动 SLAM 或定位。

按这个顺序排查，更容易定位是哪一个节点引入了 TF 问题。
