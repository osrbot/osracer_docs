# 导航

OSRacer 导航围绕真实阿克曼转向底盘构建。需要展示自主行驶、对比 planner，或在教室、实验室、走廊、测试场地上验证科研改动时，应先看本页。

## OSRacer 能展示什么

- 基于 Nav2 的地图导航。
- 面向阿克曼底盘的 TEB 提速导航 profile。
- DWB 作为更简单的对照和调试 baseline。
- 场地早期部署时同时运行 SLAM 和导航。
- 面向教室、实验室、走廊和赛道的场景化 profile。

## 推荐阅读路径

如果你刚开始理解 OSRacer 导航，建议按顺序阅读：

1. [SLAM 建图](./slam.md) — 先创建并保存导航使用的地图。
2. [Nav2 导航提速优化](./nav2-speed-optimization.md) — 理解提速后的指令链路、planner profile 和融合里程计路径。
3. [Ackermann 导航](./ackermann-navigation.md) — 理解 OSRacer 和差速机器人的不同。
4. [Nav2 调参](./nav2-tuning.md) — 默认 profile 跑通后，再调整速度、加速度、costmap 和 planner 参数。
5. [Nav2 故障排查](../troubleshooting/nav2.md) — 只有导航行为异常时再看。

## Planner 选择

使用 TEB 作为默认 Ackermann 导航 profile：

```bash
ros2 launch osracer_navigation bringup_launch.py slam:=True planner:=teb
```

使用 DWB 作为更简单的基础对照 profile：

```bash
ros2 launch osracer_navigation bringup_launch.py slam:=True planner:=dwb
```

## 客户优先关注的性能

1. 目标场地地图可复用。
2. 多次运行时定位和融合里程计稳定。
3. Planner 行为符合阿克曼转向约束。
4. 通过 costmap 和 inflation 保持平滑避障。
5. 低速导航稳定后，再逐步提高速度和加速度。
6. 按场景和 planner profile 记录可复现结果。

## 开发建议

导航参数文件建议按场景拆分，例如实验室、教室、走廊和赛道。

每次修改导航 profile，都应该记录：

- 机器人配置；
- 地图或测试场地；
- planner 名称；
- 改动参数；
- 实测现象；
- 回滚说明。
