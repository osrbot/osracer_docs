# TF Troubleshooting

TF connects the map, odometry, robot body, wheels, lidar, camera, and IMU into
one coordinate tree. If TF is broken, RViz, SLAM, Nav2, and sensor overlays will
all look wrong.

## Quick check

Run these commands after bringup:

```bash
ros2 run tf2_tools view_frames
ros2 run rqt_tf_tree rqt_tf_tree
ros2 topic hz /tf
```

The common chain should be connected:

```text
map -> odom -> base_footprint -> base_link -> sensor frames
```

Some launches may publish `map` only after SLAM, localization, or navigation is
running. That is normal; `odom -> base_footprint -> base_link` should still be
stable during chassis bringup.

## What to check in RViz

- The robot model appears as one connected model.
- Lidar data points forward and aligns with walls.
- Camera frames are in front of the car, not under or behind it.
- Wheel frames do not jump while the car is stationary.
- The robot does not jump when switching between mapping and navigation.

## Common problems

| Symptom | Likely cause | First action |
| --- | --- | --- |
| No robot model in RViz | Robot description launch is not running | Start full bringup |
| `map` and `odom` are disconnected | SLAM or localization is not running | Start mapping or navigation |
| Sensor data appears rotated | Sensor frame direction or mounting is wrong | Check sensor launch and RViz axes |
| Robot jumps in RViz | Odometry, EKF, or TF publisher conflict | Check whether two nodes publish the same transform |
| Costmap is shifted | Sensor frame or odometry frame mismatch | Compare lidar scan with real walls |

## Safe recovery path

1. Stop navigation or demos.
2. Start chassis-only bringup.
3. Confirm odometry and base frames are stable.
4. Add robot description.
5. Add lidar.
6. Add SLAM or localization last.

This order makes it easier to find which node introduced the TF issue.
