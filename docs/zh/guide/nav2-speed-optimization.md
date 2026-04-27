# Nav2 导航提速优化

本页记录 commit `f5ddd87` 引入的关键导航提速改动。

## 大纲

1. 背景和目标。
2. 移除 `velocity_smoother`。
3. `controller_server` 直接输出 `cmd_vel`。
4. 使用 `planner:=teb` 或 `planner:=dwb` 选择规划器。
5. TEB 参数变化。
6. DWB 参数变化。
7. 使用 `odometry/filtered`。
8. 为 Ackermann 车辆移除 `spin` recovery。
9. 验证清单。
10. 回滚策略。
