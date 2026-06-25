# Topic 和 Frame 命名

稳定的命名能让 OSRacer 更容易教学、调试和扩展。好的名称应该让用户不用读源码，也能知道自己正在看什么数据。

## 客户应知道的标准名称

| 名称 | 含义 |
| --- | --- |
| `/odom` | 底盘里程计或融合里程计，取决于启动模式 |
| `/imu/data` | IMU 数据，用于滤波和可视化 |
| `/scan` | 2D 雷达数据 |
| `/cmd_vel` | ROS 速度指令输入 |
| `/ackermann_cmd` | 阿克曼车辆控制指令输入 |
| `map` | 全局地图坐标系 |
| `odom` | 局部里程计坐标系 |
| `base_footprint` | 平面车体坐标系 |
| `base_link` | 车身坐标系 |
| `imu_link` | IMU 坐标系 |

## 命名规则

1. 交付版已有 topic 名称保持稳定，除非有明确兼容原因。
2. 实验性改动优先用 launch remap，不要直接改节点源码里的名字。
3. 新传感器 frame 使用物理含义清晰的名字，例如 `front_camera_link` 或 `rear_lidar_link`。
4. 不要把已有 frame 复用给另一个物理设备。
5. 任何用户需要查看或录包的公开 topic，都要在文档中说明。

## 示例：新增前置深度相机

| 项目 | 推荐值 |
| --- | --- |
| 图像 topic | `/front_camera/color/image_raw` |
| Camera info topic | `/front_camera/color/camera_info` |
| Frame | `front_camera_link` |
| Optical frame | `front_camera_color_optical_frame` |
| Launch 参数 | `enable_front_camera:=true` |

合并前至少验证：

```bash
ros2 topic list | grep front_camera
ros2 run tf2_tools view_frames
```

## Remap 写法

如果第三方驱动发布的 topic 不适合作为客户接口，在 launch 里 remap：

```python
remappings=[
    ('/vendor/image', '/front_camera/color/image_raw'),
    ('/vendor/camera_info', '/front_camera/color/camera_info'),
]
```

这样即使底层驱动变化，客户看到的接口仍然稳定。
