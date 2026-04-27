# Architecture

OSRacer is organized as a layered ROS 2 project. Each layer should remain easy to replace during secondary development.

## Package layers

| Layer | Package | Responsibility |
| --- | --- | --- |
| Description | `osracer_description` | Robot model, URDF/Xacro, visual model, TF assumptions |
| Bringup | `osracer_bringup` | Hardware startup, chassis, sensors, serial devices, launch entry points |
| Debug | `osracer_debug` | RViz and runtime inspection tools |
| SLAM | `osracer_slam` | Mapping pipelines and map saving workflows |
| Navigation | `osracer_navigation` | Nav2, localization, planners, costmaps, map navigation |

## Data flow

<Mermaid code="flowchart LR\n  Chassis[Chassis Driver] --> Odom[/odom/]\n  IMU[IMU] --> EKF[EKF Fusion]\n  Odom --> EKF\n  EKF --> State[/filtered odometry/]\n  Lidar[Lidar] --> SLAM[SLAM]\n  State --> SLAM\n  SLAM --> Map[Map]\n  Map --> Nav2[Nav2]\n  Nav2 --> Cmd[/motion command/]\n  Cmd --> Chassis" />

## Design principle

Keep package boundaries stable. Add new hardware through launch arguments, parameter files, frame names, and remapping before changing core package behavior.
