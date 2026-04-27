# 相机标定

本页记录相机标定流程，以及标定文件的管理方式。

## 标定命令

```bash
ros2 run camera_calibration cameracalibrator --size 8x6 --square 0.03 image:=/rgb/image_raw camera:=/rgb
```

## 输出文件

默认标定文件通常位于：

```text
~/.ros/camera_info/rgb.yaml
```

## 大纲

1. 准备标定板。
2. 运行标定命令。
3. 保存并检查 `rgb.yaml`。
4. 将稳定标定数据纳入项目配置。
5. 按设备和 commit 记录已知问题。
