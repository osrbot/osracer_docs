# Getting Started

This page gives OSRacer users the shortest path from a powered robot to the first ROS 2 bringup.

## Recommended environment

- OSRacer robot with Jetson Orin Nano or another Ubuntu 22.04 computer
- ROS 2 Humble installed on the robot
- The OSRacer workspace built and sourced
- Keyboard, display, SSH, or remote terminal access to the robot

## If the robot is already deployed

Most delivered robots already include the OSRacer workspace. Open a terminal on
the robot and source the workspace:

```bash
source /opt/ros/humble/setup.bash
source ~/osracer_ws/install/setup.bash
```

If your workspace is installed in another directory, replace `~/osracer_ws` with
that path.

## If you need to build from source

```bash
mkdir -p ~/osracer_ws/src
cd ~/osracer_ws/src
git clone --recursive https://github.com/osrbot/osracer.git
cd ~/osracer_ws
rosdep install --from-paths src --ignore-src -r -y
colcon build --symlink-install
source install/setup.bash
```

## First checks

Confirm that the chassis device exists:

```bash
ls -l /dev/osrbot_base
```

Confirm that OSRacer packages are visible:

```bash
ros2 pkg list | grep osracer
```

## Start the robot

```bash
ros2 launch osracer_bringup bringup.launch.py
```

For a chassis-only check, use:

```bash
ros2 launch osracer_bringup chassis_ackermann.launch.py
```

The chassis node prints the serial device and firmware identification in the ROS
log. The connection state is maintained automatically by the driver.

## Next steps

- Use [Bringup](/guide/bringup) to verify topics, TF, and RViz.
- Use [SLAM](/guide/slam) to create a map.
- Use [Navigation](/guide/navigation) to run Nav2.
- Use [Serial troubleshooting](/troubleshooting/serial) if the chassis does not connect.
