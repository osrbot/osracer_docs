# 车型 Profile

车型 profile 用于描述不同 OSRacer 车型的车体几何和传感器布局差异。

## 大纲

1. footprint 为什么重要。
2. footprint 如何影响 costmap。
3. OSRC109 footprint。
4. OSRC110 footprint。
5. 传感器 TF 配置。
6. 如何在 RViz 中验证 footprint 和 TF。

## 验证清单

- footprint 覆盖真实车体。
- `base_link` 位置一致。
- 雷达 scan 与环境对齐。
- 转弯时 costmap 保持稳定。
