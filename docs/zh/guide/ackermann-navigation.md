# Ackermann 导航

本页解释 OSRacer 导航与差速机器人的不同之处。

## Ackermann 为什么不同

差速机器人可以通过左右轮反向转动实现原地旋转。Ackermann 车辆不能这样做，它更像汽车：前进或后退运动必须和转向角耦合。

这会影响导航配置：

- planner 必须遵守最小转弯半径；
- recovery 行为不能假设机器人可以原地旋转；
- footprint 和 wheelbase 必须匹配真实车辆；
- 速度限制要结合转向可行性一起调；
- 窄空间中可能需要倒车或重新规划，而不是 spin。

## 为什么不能直接套 TurtleBot 默认参数

很多 Nav2 示例面向小型差速机器人。这些默认参数通常隐含：

- 较小 footprint；
- 低速运动；
- 可以原地旋转；
- 近似圆形车体；
- 使用 `spin` 等 recovery 行为。

OSRacer 需要 car-like 调参。直接使用差速车默认参数，可能导致速度过慢、转弯不可行、路径抖动，或者 recovery 行为无效。

## 关键几何参数

### `wheelbase`

`wheelbase` 表示 planner 使用的前后轴参考点有效距离。如果这个值不正确，planner 可能生成真实车辆无法跟踪的转弯轨迹。

### `min_turning_radius`

`min_turning_radius` 表示最小可行转弯半径。值越小，planner 越激进；但如果小于真实车辆能力，机器人可能切角、抖动，或在障碍物附近失败。

### Footprint

footprint 是 costmap 和 planner 使用的碰撞形状。

好的 footprint 应该：

- 覆盖真实车体；
- 包含重要突出部分；
- 匹配当前 `base_link` 约定；
- 在 RViz 中结合真实障碍物验证。

## 指令转换

Nav2 通常输出 `cmd_vel`，包含线速度和角速度。Ackermann 底盘驱动需要将这个指令转换成转向角和速度。

一个简化关系是：

```text
steering_angle = atan(wheelbase * angular_z / linear_x)
```

这意味着指令同时受速度和角速度影响。当速度很低时，转向转换必须谨慎处理边界情况。

## 为什么 TEB 适合 car-like robot

TEB 适合 OSRacer，因为它可以表达 Ackermann 车辆关心的约束：

- 最小转弯半径；
- wheelbase；
- 前进偏好；
- 轨迹时间优化；
- 障碍物距离约束；
- 轨迹可行性检查。

这不代表 TEB 不需要调参，而是说明 TEB 给了 OSRacer 正确的调参旋钮。

## 为什么 `spin` recovery 不适合

`spin` recovery 会要求机器人原地旋转，这对 OSRacer 不是物理可行动作。

更合适的 recovery 方向是：

- `backup`；
- `wait`；
- 基于可行转弯半径重新规划；
- 当机器人卡在需要原地旋转才能脱困的姿态时，手动重置测试。

## 测试清单

使用新的 Ackermann 导航 profile 之前，确认：

- footprint 匹配真实车体；
- `wheelbase` 匹配当前车型；
- `min_turning_radius` 是真实可达的；
- `cmd_vel` 转换在低速附近不会异常；
- RViz 中局部路径物理可行；
- 机器人可以安全停止；
- recovery 行为不会请求原地旋转。

## 常见现象

| 现象 | 可能原因 |
| --- | --- |
| 机器人跟不上转弯 | `min_turning_radius` 太小或 `wheelbase` 不正确 |
| 接近目标点时抖动 | 目标容差太严格或局部规划器约束过强 |
| 车速太慢 | 速度限制过保守或 costmap 膨胀过大 |
| 机器人尝试无效 recovery | 仍启用了差速车 recovery 行为 |
| 车体擦碰障碍物 | footprint 太小或 TF 偏移错误 |

## 设计原则

先把 OSRacer 当作一辆车，再把它当作一个通用 Nav2 机器人。导航 profile 应基于真实车体几何设计，而不是直接复制差速机器人示例。
