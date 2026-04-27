# Nav2 导航提速优化

本页记录 OSRacer 源码项目中 commit `f5ddd87` 引入的关键导航提速改动。

## 背景

OSRacer 是 Ackermann 转向车辆。很多默认 Nav2 配置更适合小型差速机器人，对于赛车形态的车体来说通常偏保守。

这次优化的目标很明确：

- 降低运动指令链路延迟；
- 让 planner 切换显式化；
- 使用融合里程计作为导航输入；
- 针对实车响应优化 TEB 和 DWB 参数；
- 避免不符合 Ackermann 运动学的 recovery 行为。

## 改动总览

| 模块 | 改动 | 目的 |
| --- | --- | --- |
| 指令链路 | 移除 `velocity_smoother` | 降低指令延迟，减少 remap 复杂度 |
| Launch API | 新增 `planner` 参数 | 通过启动命令切换 TEB 和 DWB |
| 参数文件 | 默认 params 路径跟随 planner 名称 | 自动加载 `teb_nav2_params.yaml` 或 `dwb_nav2_params.yaml` |
| 里程计 | Nav2 输入切换到 `odometry/filtered` | 使用 EKF 融合状态，而不是原始里程计 |
| TEB | 提高速度限制并降低优化成本 | 更快的 car-like 局部规划 |
| DWB | 提高速度限制并降低采样成本 | 更快的基础局部规划 |
| Recovery | 移除 `spin` recovery | Ackermann 车辆不适合原地旋转 |

## 指令链路变化

优化前，指令链路中有额外的 smoother 节点：

<Mermaid code="flowchart LR\n  Controller[controller_server] --> NavCmd[/cmd_vel_nav/]\n  NavCmd --> Smoother[velocity_smoother]\n  Smoother --> Cmd[/cmd_vel/]\n  Cmd --> Chassis[底盘驱动]" />

优化后，`controller_server` 直接输出到 `cmd_vel`：

<Mermaid code="flowchart LR\n  Controller[controller_server] --> Cmd[/cmd_vel/]\n  Cmd --> Chassis[底盘驱动]" />

这样可以减少延迟和一层 remap。代价是速度限制、加速度限制和底盘侧指令处理需要更谨慎地调参。

## Planner 选择

导航 launch 文件现在支持 `planner` 参数。

使用 TEB：

```bash
ros2 launch osracer_navigation bringup_launch.py slam:=True planner:=teb
```

使用 DWB：

```bash
ros2 launch osracer_navigation bringup_launch.py slam:=True planner:=dwb
```

默认参数文件跟随 planner 选择：

```text
planner:=teb -> teb_nav2_params.yaml
planner:=dwb -> dwb_nav2_params.yaml
```

TEB 应作为 Ackermann 导航的默认选择。DWB 更适合作为基础对照和调试方案。

## 为什么使用 `odometry/filtered`

优化后的配置使用 `odometry/filtered` 作为 Nav2 的里程计输入。

这个 topic 通常来自 EKF 融合，一般会融合轮速里程计和 IMU。对于导航来说，它比原始底盘里程计更稳定，也能给 Nav2 提供更一致的状态估计。

调 planner 参数之前，先验证：

```bash
ros2 topic hz /odometry/filtered
ros2 topic echo /odometry/filtered
```

## TEB 优化方向

TEB profile 面向更快的 Ackermann 导航调参。关键思路是：

- 提高前进速度和角速度限制；
- 提高加速度限制；
- 增大前视距离；
- 减少采样数和优化迭代次数；
- 根据真实车型调整 `wheelbase` 和 `min_turning_radius`；
- 在受控测试区域中降低过于保守的 obstacle / inflation 设置；
- 提高时间最优权重，让 planner 更倾向于快速轨迹。

适配该 profile 时重点关注这些参数：

| 参数 | 作用 |
| --- | --- |
| `max_vel_x` | 前进速度上限 |
| `max_vel_x_backwards` | 倒车速度上限 |
| `max_vel_theta` | 角速度限制，仍会受转弯半径约束 |
| `acc_lim_x` | 前进加速度限制 |
| `acc_lim_theta` | 角加速度限制 |
| `wheelbase` | planner 使用的车辆几何参数 |
| `min_turning_radius` | 最小可行转弯半径 |
| `dt_ref` | 轨迹时间分辨率 |
| `max_samples` | 轨迹采样数量上限 |
| `no_inner_iterations` | 内层优化迭代次数 |
| `no_outer_iterations` | 外层优化迭代次数 |
| `weight_optimaltime` | 快速轨迹权重 |
| `weight_obstacle` | 避障约束强度 |

## DWB 优化方向

DWB profile 被调成更快的基础局部规划器：

- 提高 `controller_frequency`；
- 提高 `min_vel_x`、`max_vel_x` 和 `max_speed_xy`；
- 提高加速度和减速度限制；
- 减少 `vx_samples` 和 `vtheta_samples`，降低计算量；
- 缩短 `sim_time`，减少轨迹展开时间；
- 提高 `PathDist.scale` 和 `GoalDist.scale`，鼓励更有效地贴近路径和目标。

DWB 适合作为更简单的对照方案，但它对 car-like 约束的表达不如 TEB 自然。

## 为什么移除 `spin` recovery

`spin` recovery 面向可以原地旋转的机器人。OSRacer 使用 Ackermann 转向，原地旋转并不是物理可行行为。

更合理的 recovery 方向是：

- `backup`；
- `wait`；
- 使用可行转弯半径重新规划；
- 当机器人卡在非常受限的姿态时，手动重置测试。

## 验证清单

高速测试前，先低速验证。

- 发送目标点后 `cmd_vel` 正常发布。
- 底盘驱动能收到运动指令。
- `odometry/filtered` 稳定。
- TF tree 从 `map` 到 `odom` 到 `base_link` 连通。
- costmap 正常更新。
- 选中的 planner 加载了预期参数文件。
- 机器人可以安全停止。
- 机器人转弯不超过真实最小转弯半径。

## 回滚策略

如果提速后机器人不稳定：

1. 降低 `max_vel_x`；
2. 降低 `acc_lim_x` 和 `decel_lim_x`；
3. 增大 obstacle distance 和 inflation radius；
4. 增加 TEB 优化迭代次数；
5. 切换到 DWB 做基础对照；
6. 只有当 planner 和底盘层都无法解决指令平滑问题时，再考虑恢复 velocity smoother。

## 文档规则

每次修改导航 profile，都应该同步记录：

- 车型；
- 地图或测试场地；
- planner 名称；
- 改动参数；
- 实测现象；
- 回滚说明。
