# Topic and Frame Naming

Stable names make OSRacer easier to teach, debug, and extend. A good name tells
users what data they are looking at without reading the node source code.

## Standard names customers should know

| Name | Meaning |
| --- | --- |
| `/odom` | Chassis odometry or fused odometry, depending on launch mode |
| `/imu/data` | IMU data used by filters and visualization |
| `/scan` | 2D lidar scan |
| `/cmd_vel` | ROS velocity command input |
| `/ackermann_cmd` | Ackermann command input for car-like control |
| `map` | Global map frame |
| `odom` | Local odometry frame |
| `base_footprint` | Planar robot base frame |
| `base_link` | Robot body frame |
| `imu_link` | IMU frame |

## Naming rules

1. Keep delivered topic names stable unless there is a strong compatibility
   reason to change them.
2. Use launch remapping for experiments instead of changing node source names.
3. Give new sensor frames physical names such as `front_camera_link` or
   `rear_lidar_link`.
4. Do not reuse an existing frame for a different physical device.
5. Document every public topic that a user is expected to inspect or record.

## Example: adding a front depth camera

| Item | Recommended value |
| --- | --- |
| Image topic | `/front_camera/color/image_raw` |
| Camera info topic | `/front_camera/color/camera_info` |
| Frame | `front_camera_link` |
| Optical frame | `front_camera_color_optical_frame` |
| Launch argument | `enable_front_camera:=true` |

Before merging, verify:

```bash
ros2 topic list | grep front_camera
ros2 run tf2_tools view_frames
```

## Remapping pattern

If a third-party driver publishes an inconvenient topic, remap it in launch:

```python
remappings=[
    ('/vendor/image', '/front_camera/color/image_raw'),
    ('/vendor/camera_info', '/front_camera/color/camera_info'),
]
```

This keeps the customer-facing interface stable even if the driver changes.
