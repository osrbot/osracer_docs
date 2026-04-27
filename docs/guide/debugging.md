# Debugging

Debugging should start from individual modules before running the full navigation stack.

## Recommended order

1. Odometry
2. IMU
3. Lidar
4. Camera image
5. Mapping
6. Navigation

## Common launch files

```bash
ros2 launch osracer_debug debug_odom.launch.py
ros2 launch osracer_debug debug_imu.launch.py
ros2 launch osracer_debug debug_lidar.launch.py
ros2 launch osracer_debug debug_image.launch.py
```

## Mapping debug

```bash
ros2 launch osracer_slam gmapping.launch.py
ros2 launch osracer_slam slam_toolbox.launch.py
ros2 launch osracer_slam cartographer.launch.py
ros2 launch osracer_debug debug_mapping.launch.py
ros2 launch osracer_debug debug_cartographer.launch.py
```
