# 新增传感器

当你要给 OSRacer 增加雷达、深度相机、定位相机、编码器模块或其他 ROS 2 传感器时，按这页流程做。

目标是：新增传感器，但不破坏交付版默认 bringup。

## 开始前先确认

先把这些信息写下来：

| 问题 | 示例 |
| --- | --- |
| 怎么连接？ | USB、网口、CSI 或 CAN 转接 |
| 驱动来自哪里？ | 厂商驱动、上游 ROS 驱动或本地 wrapper |
| 发布哪个 topic？ | `/scan`、`/camera/image_raw`、`/points`、`/imu/data_raw` |
| 使用哪个 frame？ | `laser_frame`、`camera_link`、`imu_link` |
| 是否需要标定？ | 相机内参、外参、时间同步 |

不要装上新传感器后直接开车。先在车辆静止时验证 topic 和 TF。

## 推荐文件位置

| 文件类型 | 推荐位置 |
| --- | --- |
| 传感器 launch | `osracer_bringup/launch/<sensor>.launch.py` |
| 传感器参数 | `osracer_bringup/param/<sensor>.yaml` |
| 机器人 frame 更新 | `osracer_description` |
| RViz 视图 | `osracer_debug` 或相关 demo 包 |
| 用户说明 | 当前文档站 |

## 操作步骤

1. 先确认标准整车可以启动：

   ```bash
   ros2 launch osracer_bringup bringup.launch.py
   ```

2. 停止整车，再单独用新 launch 测试传感器驱动。

3. 确认传感器 topic 出现：

   ```bash
   ros2 topic list
   ros2 topic hz /your_sensor_topic
   ```

4. 添加或确认传感器 frame：

   ```bash
   ros2 run tf2_tools view_frames
   ```

5. 打开 RViz，确认数据方向和机器人实体安装方向一致。

6. 单独测试稳定后，再把传感器 launch include 到 `bringup.launch.py`。

7. 文档里写清如何启用、停用和排查。

## 验收清单

- 新传感器关闭时，标准 bringup 仍然可用。
- 新 topic 名称稳定。
- frame 名称已记录，并能在 TF 中看到。
- RViz 能看到传感器数据。
- 缺设备或权限不足时，启动日志能看懂。
- 仍能通过已有停止脚本停车。

## 常见错误

| 错误 | 影响 |
| --- | --- |
| 直接把数据发布到 `base_link` | 后续很难判断安装方向和标定问题 |
| 复用已有传感器 frame | 会破坏 RViz 和 TF 排查 |
| 所有参数都写进 launch | 教学和实验室变体难维护 |
| 单独测试前就改默认 bringup | 很难区分是传感器问题还是整车问题 |

## 文档模板

传感器稳定后，补一段客户能看懂的说明：

```md
## 传感器名称

- 用途：
- 启动命令：
- 预期 topic：
- 预期 frame：
- RViz 检查：
- 常见失败：
- 如何停止：
```
