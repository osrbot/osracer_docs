# Vehicle Setup

OSRacer is delivered with a fixed chassis geometry and sensor layout. In normal
use you do not need to choose between different chassis variants or edit the base
geometry before running bringup, SLAM, or navigation.

## What is factory configured

| Item | What it means for users |
| --- | --- |
| Chassis geometry | The robot model and navigation collision envelope are already prepared for OSRacer. |
| Wheelbase and track width | Used by the Ackermann driver, robot model, and navigation configuration. |
| Sensor frames | Lidar, camera, IMU, and base frames are published through the standard launch files. |
| Serial device name | The chassis controller is expected at `/dev/osrbot_base`. |

The practical result is that the same upper-computer tutorial applies to the
standard shipped vehicle. Customers should start from the documented bringup
commands instead of copying parameters from another robot.

## What users should verify

After `ros2 launch osracer_bringup bringup.launch.py`, check the visible robot
state rather than editing geometry files:

```bash
ros2 topic list | grep -E 'odom|imu|scan|image|battery'
ros2 run tf2_tools view_frames
```

In RViz, confirm:

- the robot model appears as one connected tree;
- the lidar scan points forward and matches the room;
- the camera topic is visible when the USB camera is enabled;
- the base frame and wheel frames do not jump while the car is stationary;
- costmaps do not flicker when the robot is not moving.

## When geometry work is needed

Only change geometry-related configuration when you have physically modified the
robot, for example:

- replacing the lidar bracket;
- moving the camera;
- changing wheel size;
- installing a custom body shell that changes the collision envelope;
- adding a new sensor with a new frame.

For those cases, document the hardware change, update the matching ROS
description or parameter file, and verify the result in RViz before driving.

## Recommended troubleshooting path

| Symptom | First check | Next page |
| --- | --- | --- |
| Robot model is disconnected | `ros2 run tf2_tools view_frames` | [TF troubleshooting](/troubleshooting/tf) |
| Lidar appears rotated | Sensor mounting and frame direction | [Sensors](/guide/sensors) |
| Navigation clips obstacles | Costmap and inflation settings | [Nav2 tuning](/guide/nav2-tuning) |
| Odometry jumps | Chassis and TF logs | [Serial troubleshooting](/troubleshooting/serial) |

Do not start by changing low-level vehicle geometry. First confirm that the
standard bringup launches and topics are running correctly.
