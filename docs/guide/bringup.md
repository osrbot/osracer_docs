# Bringup

Bringup is the hardware startup layer. It should answer one question: can the robot publish the expected state and accept motion commands safely?

## Main entry for the whole robot

```bash
ros2 launch osracer_bringup bringup.launch.py
```

This starts the chassis driver, robot description, lidar, camera, and LED matrix
nodes. Keep the terminal open so you can see reconnect messages and driver
warnings.

## Chassis-only check

Use this when you only want to verify the base before starting sensors:

```bash
ros2 launch osracer_bringup chassis_ackermann.launch.py
```

The chassis log should show the selected serial device and firmware
identification. The driver maintains the robot-side connection state
automatically; there is no customer action required for that behavior.

## Bringup checklist

1. Confirm serial permissions and UDEV rules.
2. Confirm chassis driver starts without reconnect loops.
3. Confirm odometry topic is published.
4. Confirm lidar and camera topics are visible.
5. Confirm TF frames are connected in RViz.
6. Confirm emergency stop and safe command limits before driving.

## Useful checks

```bash
ros2 topic list | grep -E 'odom|imu|scan|image|battery'
ros2 run tf2_tools view_frames
```

Open RViz and check that:

- The robot model is connected to the odometry frame.
- Wheel and base frames do not jump.
- Lidar data appears in the expected direction.
- Camera image topics are visible when the USB camera is enabled.

## Safe stop

If a demo or navigation launch is still running, stop it before changing modes:

```bash
$(ros2 pkg prefix osracer_demo)/share/osracer_demo/scripts/stop_all_demo.sh
```

You can also press `Ctrl+C` in each launch terminal. The chassis driver attempts
to report a clean disconnect before closing the serial port.

## Development notes

When adding hardware, prefer a new parameter file and launch argument. Keep default bringup stable for existing users.
