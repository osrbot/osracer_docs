# 导航

导航层基于 Nav2，使用地图、定位、代价地图、规划器和控制器参数完成路径规划与跟踪。

## 常见模式

- 在已有地图上导航。
- 开发阶段同时运行 SLAM 和导航。
- 对比 TEB 和 DWB 局部规划效果。

## 推荐阅读路径

如果你刚开始理解 OSRacer 导航，建议按顺序阅读：

1. [Ackermann 导航](./ackermann-navigation.md) — 理解 OSRacer 和差速机器人的不同。
2. [Nav2 导航提速优化](./nav2-speed-optimization.md) — 理解关键指令链路和 planner 改动。
3. [Nav2 调参](./nav2-tuning.md) — 安全地调整速度、加速度、costmap 和 planner 参数。
4. [Nav2 故障排查](../troubleshooting/nav2.md) — 排查常见运行时问题。

## Planner 选择

使用 TEB 作为默认 Ackermann 导航 profile：

```bash
ros2 launch osracer_navigation bringup_launch.py slam:=True planner:=teb
```

使用 DWB 作为更简单的基础对照 profile：

```bash
ros2 launch osracer_navigation bringup_launch.py slam:=True planner:=dwb
```

## 调参顺序

1. 先确认 TF 和定位。
2. 确认 `odometry/filtered` 稳定。
3. 确认出厂车体几何，再调整 costmap inflation。
4. 设置安全的速度和加速度限制。
5. 根据 Ackermann 运动约束调整局部规划器。
6. 在受控区域测试恢复行为。

## 开发建议

导航参数文件建议按场景拆分，例如实验室、教室、走廊和赛道。

每次修改导航 profile，都应该记录：

- 机器人配置；
- 地图或测试场地；
- planner 名称；
- 改动参数；
- 实测现象；
- 回滚说明。
