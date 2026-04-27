# 调试

调试应从单个模块开始，再运行完整导航栈。

## 推荐顺序

1. 里程计
2. IMU
3. 雷达
4. 相机图像
5. 建图
6. 导航

## 常用 launch

```bash
ros2 launch osracer_debug debug_odom.launch.py
ros2 launch osracer_debug debug_imu.launch.py
ros2 launch osracer_debug debug_lidar.launch.py
ros2 launch osracer_debug debug_image.launch.py
```

## 建图调试

```bash
ros2 launch osracer_slam gmapping.launch.py
ros2 launch osracer_slam slam_toolbox.launch.py
ros2 launch osracer_slam cartographer.launch.py
ros2 launch osracer_debug debug_mapping.launch.py
ros2 launch osracer_debug debug_cartographer.launch.py
```
