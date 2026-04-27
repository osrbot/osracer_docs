# Navigation

The navigation layer is based on Nav2. It consumes a map, localization, costmaps, planners, and controller parameters.

## Common modes

- Navigate on an existing map.
- Run SLAM and navigation together during development.
- Compare TEB and DWB local planning behavior.

## Recommended reading path

If you are new to OSRacer navigation, read these pages in order:

1. [Ackermann Navigation](./ackermann-navigation.md) — understand why OSRacer is different from differential-drive robots.
2. [Nav2 Speed Optimization](./nav2-speed-optimization.md) — understand the key command-chain and planner changes.
3. [Nav2 Tuning](./nav2-tuning.md) — tune velocity, acceleration, costmaps, and planner parameters safely.
4. [Nav2 Troubleshooting](../troubleshooting/nav2.md) — debug common runtime problems.

## Planner selection

Use TEB for the default Ackermann-oriented profile:

```bash
ros2 launch osracer_navigation bringup_launch.py slam:=True planner:=teb
```

Use DWB as a simpler baseline or comparison profile:

```bash
ros2 launch osracer_navigation bringup_launch.py slam:=True planner:=dwb
```

## Tuning priorities

1. Confirm TF and localization first.
2. Confirm `odometry/filtered` is stable.
3. Tune robot footprint and inflation radius.
4. Set safe velocity and acceleration limits.
5. Tune local planner constraints for Ackermann motion.
6. Test recovery behavior in a controlled area.

## Development notes

Keep navigation parameter files small and named by scenario. For example, use separate files for lab, classroom, corridor, and race track tests.

Every navigation profile change should record:

- robot model;
- map or test field;
- planner name;
- changed parameters;
- observed result;
- rollback note.
