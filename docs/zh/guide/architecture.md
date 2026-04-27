# 系统架构

OSRacer 按 ROS 2 工程分层组织。每一层都应该便于替换和扩展。

## 包分层

| 层级 | 包 | 职责 |
| --- | --- | --- |
| 模型描述 | `osracer_description` | 机器人模型、URDF/Xacro、可视化模型和 TF 假设 |
| 整车启动 | `osracer_bringup` | 硬件启动、底盘、传感器、串口设备和 launch 入口 |
| 调试 | `osracer_debug` | RViz 和运行时检查工具 |
| SLAM | `osracer_slam` | 建图流程和地图保存 |
| 导航 | `osracer_navigation` | Nav2、定位、规划器、代价地图和地图导航 |

## 数据流

<Mermaid code="flowchart LR\n  Chassis[底盘驱动] --> Odom[/odom/]\n  IMU[IMU] --> EKF[EKF 融合]\n  Odom --> EKF\n  EKF --> State[/融合里程计/]\n  Lidar[雷达] --> SLAM[SLAM]\n  State --> SLAM\n  SLAM --> Map[地图]\n  Map --> Nav2[Nav2]\n  Nav2 --> Cmd[/运动指令/]\n  Cmd --> Chassis" />

## 设计原则

保持包边界稳定。新增硬件时优先使用 launch 参数、参数文件、frame 命名和 topic remap，不要直接破坏默认启动行为。
