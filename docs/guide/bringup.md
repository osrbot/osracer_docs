# Bringup

Bringup is the hardware startup layer. It should answer one question: can the robot publish the expected state and accept motion commands safely?

## Main entry

```bash
ros2 launch osracer_bringup bringup.launch.py
```

## Bringup checklist

1. Confirm serial permissions and UDEV rules.
2. Confirm chassis driver starts without reconnect loops.
3. Confirm odometry topic is published.
4. Confirm lidar and camera topics are visible.
5. Confirm TF frames are connected in RViz.
6. Confirm emergency stop and safe command limits before driving.

## Development notes

When adding hardware, prefer a new parameter file and launch argument. Keep default bringup stable for existing users.
