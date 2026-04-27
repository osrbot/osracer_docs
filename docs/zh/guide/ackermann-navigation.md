# Ackermann 导航

本页解释 OSRacer 导航与差速机器人的不同之处。

## 大纲

1. Ackermann 转向与差速驱动的区别。
2. 为什么不能直接使用 TurtleBot 默认参数。
3. `wheelbase` 和 `min_turning_radius`。
4. footprint 与真实车体几何。
5. `cmd_vel` 到 Ackermann 指令的转换。
6. 为什么 TEB 适合 car-like robot。
7. 为什么 `spin` recovery 不适合。
8. 实车安全测试清单。
