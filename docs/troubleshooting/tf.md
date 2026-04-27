# TF Troubleshooting

This page collects TF and frame-related issues.

## Outline

1. Missing `base_link`.
2. Disconnected `map`, `odom`, and `base_link`.
3. Lidar frame offset.
4. Camera frame mismatch.
5. Footprint does not align with the robot model.
6. Tools for checking TF.

```bash
ros2 run rqt_tf_tree rqt_tf_tree
ros2 run tf2_tools view_frames
```
