# Add a New Sensor

Use this guide when adding a lidar, depth camera, tracking camera, encoder
module, or other ROS 2 sensor to OSRacer.

The goal is to add the sensor without breaking the shipped bringup flow.

## Before you start

Collect these facts first:

| Question | Example answer |
| --- | --- |
| How is it connected? | USB, Ethernet, CSI, or CAN bridge |
| What ROS package provides the driver? | vendor driver, upstream ROS driver, or local wrapper |
| What topic should it publish? | `/scan`, `/camera/image_raw`, `/points`, `/imu/data_raw` |
| What frame does it use? | `laser_frame`, `camera_link`, `imu_link` |
| Does it need calibration? | camera intrinsics, extrinsics, time sync |

Do not mount the sensor and start driving immediately. First verify topics and
TF while the car is stationary.

## Recommended file layout

| File type | Recommended location |
| --- | --- |
| Sensor launch file | `osracer_bringup/launch/<sensor>.launch.py` |
| Sensor parameters | `osracer_bringup/param/<sensor>.yaml` |
| Robot frame update | `osracer_description` |
| RViz view | `osracer_debug` or the relevant demo package |
| User instructions | this documentation site |

## Step-by-step

1. Start the standard robot first:

   ```bash
   ros2 launch osracer_bringup bringup.launch.py
   ```

2. Stop it, then test only the new sensor driver in a separate launch file.

3. Confirm the sensor topic appears:

   ```bash
   ros2 topic list
   ros2 topic hz /your_sensor_topic
   ```

4. Add or verify the sensor frame:

   ```bash
   ros2 run tf2_tools view_frames
   ```

5. Open RViz and confirm the data is physically aligned with the robot.

6. Include the sensor launch from `bringup.launch.py` only after the standalone
   check is stable.

7. Document how to enable, disable, and troubleshoot the sensor.

## Acceptance checklist

- Standard bringup still works when the new sensor is disabled.
- The new topic has a stable name.
- The frame name is documented and visible in TF.
- The sensor can be viewed in RViz.
- Startup logs explain missing device or permission problems.
- The robot can be stopped with the existing stop scripts.

## Common mistakes

| Mistake | Why it hurts |
| --- | --- |
| Publishing in `base_link` directly | Makes it hard to reason about sensor mounting and calibration |
| Reusing an existing sensor frame name | Breaks RViz and TF debugging |
| Putting all parameters in the launch file | Makes classroom and lab variants hard to maintain |
| Changing default bringup before standalone testing | Makes it difficult to separate sensor bugs from robot bugs |

## Documentation template

When the sensor is ready, add a short customer-facing page or section:

```md
## Sensor name

- Purpose:
- How to start:
- Expected topic:
- Expected frame:
- RViz check:
- Common failure:
- How to stop:
```
