# 二次开发

本栏目面向已经能正常启动、建图和导航的 OSRacer 用户，包括教学、科研和客户二次开发场景。

推荐原则很简单：先保持交付版机器人行为稳定，再把你的实验做成独立的 launch、参数文件、节点或演示脚本。

## 开发路线图

<Mermaid code="flowchart LR\n  Base[标准 bringup 正常] --> Choose[选择一个扩展点]\n  Choose --> Sensor[新增传感器]\n  Choose --> Nav[导航调参]\n  Choose --> Demo[教学演示]\n  Choose --> Race[赛车算法]\n  Sensor --> Verify[RViz 和 topic 检查]\n  Nav --> Verify\n  Demo --> Verify\n  Race --> Verify\n  Verify --> Record[记录命令和结果]" />

## 推荐流程

| 步骤 | 做什么 | 上车运动前的证据 |
| --- | --- | --- |
| 1. 从正常机器人开始 | 先运行标准 bringup，确认 topic。 | `/odom`、雷达、相机和 TF 可见。 |
| 2. 选定包边界 | 判断改动属于 bringup、SLAM、导航、demo 还是 race。 | 改动文件集中在对应包内。 |
| 3. 做小扩展 | 优先新增 launch、YAML 或节点。 | 原有启动命令仍然可用。 |
| 4. 先不运动验证 | 用 RViz、`ros2 topic list`、`ros2 topic hz` 和日志检查。 | TF 不断开，串口不循环重连。 |
| 5. 低速实车测试 | 在空旷场地使用保守速度。 | 机器人能正常停车，指令可回退。 |
| 6. 记录结果 | 写清命令、前提和已知限制。 | 其他用户能复现同样测试。 |

## 包选择指南

| 目标 | 从哪里开始 | 常见文件 |
| --- | --- | --- |
| 新增或替换传感器 | `osracer_bringup` | launch、传感器参数、RViz 视图 |
| 修改机器人显示 | `osracer_description` | URDF/Xacro、mesh、frame launch |
| 建图 | `osracer_slam` | SLAM launch、地图保存命令 |
| 调导航 | `osracer_navigation` | Nav2 YAML、BT XML、RViz 配置 |
| 做课堂演示 | `osracer_demo` | shell 脚本、GUI 按钮、RViz 启动器 |
| 开发赛车算法 | `osracer_race` | 控制器节点、安全闸门、评估 CSV |
| 测仿真流程 | `osracer_sim` | 仿真 launch、场景参数 |

## 不建议一开始就改什么

除非你有明确原因和回滚方案，否则不要先改这些地方：

- 替换默认 bringup 入口；
- 改公共 topic 或 frame 名称；
- 为标准交付车修改底盘几何；
- 把硬件启动和导航调参混在同一个参数文件；
- 绕过已有停止脚本或安全闸门。

## 最小示例：新增一个课堂演示

1. 在 `osracer_demo/scripts/` 下新增脚本。
2. 脚本保持可读、可停止：启动需要的 launch，并打印正在做什么。
3. 通过 `stop_all_demo.sh` 加入对应停止路径。
4. 命令行脚本确认可用后，再加入 GUI 按钮或菜单。
5. 在演示文档里写清启动命令。

给学生使用前，至少验证：

```bash
$(ros2 pkg prefix osracer_demo)/share/osracer_demo/scripts/stop_all_demo.sh
ros2 topic list | grep -E 'cmd_vel|ackermann|odom'
```

## 文档规则

所有影响用户使用方式的改动，都应该写清：

- 用户要执行什么命令；
- 日志、topic 或 RViz 应该看到什么；
- 如何停止或回滚；
- 是已经实车验证、仿真验证，还是只做了静态检查。
