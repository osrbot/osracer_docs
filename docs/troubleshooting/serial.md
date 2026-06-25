# Serial Troubleshooting

This page collects serial driver and chassis communication issues.

## Expected device

The chassis driver expects a stable device name:

```bash
ls -l /dev/osrbot_base
```

If the device is missing, reconnect the robot controller USB cable, then reload
the UDEV rules provided by the OSRacer package or reboot the robot computer.

## Start a chassis-only check

```bash
ros2 launch osracer_bringup chassis_ackermann.launch.py
```

The log should show:

- The selected serial device.
- Firmware identification.
- Odometry and IMU topics publishing after the driver starts.

The driver automatically refreshes the chassis connection state while the serial
port is open. If the controller is unplugged or restarted, the driver should
retry without requiring a full ROS restart.

## Common fixes

| Symptom | Check | Action |
| --- | --- | --- |
| `/dev/osrbot_base` is missing | `ls /dev/osrbot_base` | Reconnect USB, reinstall UDEV rules, or reboot |
| Permission denied | `groups` | Add the user to the serial access group and log in again |
| Reconnect loop | chassis launch log | Check the USB cable and make sure no other terminal is using the same port |
| No odometry | `ros2 topic hz /odom` | Restart the chassis launch and inspect the serial log |

## Manual serial assistant

Use the assistant only for diagnosis, not while the chassis launch is running:

```bash
python3 $(ros2 pkg prefix osracer_bringup)/share/osracer_bringup/script/osrbot_tool.py
```

It filters high-frequency telemetry and shows command responses and status
messages, including the unified diagnostic status when requested from the menu.
