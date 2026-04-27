# Nav2 调参

本页提供 OSRacer 导航调参的结构化流程。

## 调参原则

1. 先稳定，再提速。
2. 先低速验证，再提高速度上限。
3. 先验证 TF 和里程计，再修改规划器参数。
4. 每次只修改一组参数。
5. 每次测试都记录车型、地图、planner 和结果。

## 调参前检查

以下检查未通过前，不建议开始调 planner 参数。

### TF

导航 TF 链路应保持连通：

```text
map -> odom -> base_link -> sensor frames
```

常用工具：

```bash
ros2 run rqt_tf_tree rqt_tf_tree
ros2 run tf2_tools view_frames
```

### 里程计

优化后的导航 profile 建议优先使用 EKF 融合里程计：

```bash
ros2 topic hz /odometry/filtered
ros2 topic echo /odometry/filtered
```

低速行驶时，机器人状态不应出现明显跳变。

### 雷达和 costmap

检查雷达数据是否稳定，costmap 是否正常更新：

```bash
ros2 topic hz /scan
ros2 launch osracer_debug debug_lidar.launch.py
```

在 RViz 中确认 scan 能和墙面、障碍物对齐。

### Footprint

机器人 footprint 应覆盖真实车体。footprint 太小会增加碰撞风险，太大则可能导致机器人无法通过窄通道。

## TEB 调参

TEB 是 OSRacer 推荐的局部规划器，因为它可以表达 wheelbase 和 turning radius 等 car-like 约束。

建议按以下顺序调 TEB：

1. 几何参数；
2. 速度限制；
3. 加速度限制；
4. 障碍物距离；
5. 优化权重；
6. 采样数和迭代次数。

### 几何参数

| 参数 | 调参说明 |
| --- | --- |
| `wheelbase` | 匹配车辆模型中前后轴参考点的真实距离 |
| `min_turning_radius` | 匹配车辆安全可行的最小转弯半径 |
| `footprint_model` | 使用能反映真实车体的 line 或 polygon 模型 |

### 速度和加速度

| 参数 | 调参说明 |
| --- | --- |
| `max_vel_x` | 低速导航稳定后再逐步提高 |
| `max_vel_x_backwards` | 倒车未充分测试前应保持保守 |
| `max_vel_theta` | 必须结合转弯半径保持物理可行 |
| `acc_lim_x` | 提高后响应更快，但可能带来打滑或过冲 |
| `acc_lim_theta` | 应结合转弯稳定性调整 |

### 障碍物行为

| 参数 | 调参说明 |
| --- | --- |
| `min_obstacle_dist` | 降低后允许更贴近障碍物，但风险更高 |
| `inflation_dist` | 增大后路径更保守 |
| `weight_obstacle` | 增大后避障约束更强 |
| `weight_inflation` | 控制靠近膨胀区的代价 |

### 优化行为

| 参数 | 调参说明 |
| --- | --- |
| `no_inner_iterations` | 降低后计算量更小，但解质量可能下降 |
| `no_outer_iterations` | 降低后优化成本更低 |
| `weight_optimaltime` | 增大后更倾向于快速轨迹 |
| `weight_kinematics_forward_drive` | 增大后减少倒车或别扭动作 |
| `weight_kinematics_turning_radius` | 保证轨迹符合 car-like 转弯约束 |

## DWB 调参

DWB 适合作为基础局部规划器。它通常更容易理解，但对 Ackermann 约束的表达不如 TEB 自然。

建议按以下顺序调 DWB：

1. controller 频率；
2. 速度和加速度限制；
3. 采样数量；
4. 轨迹展开时间；
5. critic 权重。

| 参数 | 调参说明 |
| --- | --- |
| `controller_frequency` | 提高后响应更快，但 CPU 负载也更高 |
| `min_vel_x` | 避免机器人过慢爬行 |
| `max_vel_x` | 前进速度上限 |
| `max_speed_xy` | 平面运动总速度上限 |
| `acc_lim_x` | 加速度限制 |
| `decel_lim_x` | 减速度限制，应保证安全停止 |
| `vx_samples` | 降低后计算量下降，但搜索分辨率降低 |
| `vtheta_samples` | 降低后计算量下降，但转弯质量可能下降 |
| `sim_time` | 缩短后更快，但更短视 |
| `PathDist.scale` | 增大后更贴近全局路径 |
| `GoalDist.scale` | 增大后更积极接近目标 |

## Costmap 调参

很多导航行为问题首先应该从 costmap 查起，而不是直接改 planner。

| 参数 | 作用 |
| --- | --- |
| `footprint` | 定义机器人碰撞形状 |
| `inflation_radius` | 控制障碍物影响范围 |
| `cost_scaling_factor` | 控制膨胀代价衰减速度 |
| `obstacle_layer` | 将传感器障碍物写入 costmap |
| `voxel_layer` | 适合 3D 或高度相关障碍物数据 |

一个简单原则：先调 footprint 和 inflation，再提高最高速度。

## 测试顺序

每次调参建议使用可复现流程：

1. 启动 bringup；
2. 验证 TF 和里程计；
3. 验证雷达和 costmap；
4. 发送短直线目标；
5. 发送低速转弯目标；
6. 发送长距离路径目标；
7. 前面全部稳定后再提高速度。

## 实车调参记录

每次测试复制这个模板。

```md
## 调参记录

- 日期：
- 车型：
- 地图：
- Planner：
- 参数文件：
- 最大速度：
- Controller 频率：
- 问题：
- 改动：
- 结果：
- 下一步：
- 回滚说明：
```

## 安全注意事项

- 始终准备物理停止方式。
- 高速改动必须在开阔区域测试。
- 不要在人、玻璃、楼梯或易碎物附近调参。
- 更高加速度不仅是性能提升，也是安全风险。
