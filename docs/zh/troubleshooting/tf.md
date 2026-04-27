# TF 故障排查

本页汇总 TF 和 frame 相关问题。

## 大纲

1. 缺少 `base_link`。
2. `map`、`odom`、`base_link` 未连通。
3. 雷达 frame 偏移。
4. 相机 frame 不匹配。
5. footprint 与机器人模型不对齐。
6. TF 检查工具。

```bash
ros2 run rqt_tf_tree rqt_tf_tree
ros2 run tf2_tools view_frames
```
