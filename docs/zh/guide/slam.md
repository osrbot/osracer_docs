# SLAM 建图

SLAM 层负责根据雷达和机器人状态估计生成地图，并保存给后续导航使用。

## 支持的流程

- GMapping 建图
- Cartographer 建图
- slam_toolbox 建图
- 地图保存和复用

## 建图前检查

- 雷达 scan topic 稳定。
- `base_link`、雷达 frame、`odom` 和 `map` 关系一致。
- 慢速手动行驶时里程计不跳变。
- 测试区域适合低速安全行驶。

## 地图命名

建议用清晰的场景和日期命名地图：

```bash
maps/lab_2026_04_27.yaml
maps/lab_2026_04_27.pgm
```
