# Getting Started

This page gives new developers a short path from a clean machine to the first OSRacer bringup.

## Recommended environment

- Ubuntu 22.04
- ROS 2 Humble
- A workspace created with `colcon`
- Access to the OSRacer robot, chassis controller, lidar, camera, and serial devices

## Clone the source project

```bash
mkdir -p ~/osracer_ws/src
cd ~/osracer_ws/src
git clone --recursive https://github.com/osrbot/osracer.git
```

## Install dependencies

```bash
cd ~/osracer_ws
rosdep install --from-paths src --ignore-src -r -y
```

## Build

```bash
colcon build --symlink-install
source install/setup.bash
```

## First bringup

```bash
ros2 launch osracer_bringup bringup.launch.py
```

## Next steps

Read the architecture page before changing launch files, topics, frames, or navigation parameters.
