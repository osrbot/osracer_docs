# Navigation

OSRacer navigation is built around a real Ackermann steering chassis. Start here
when you want to show autonomous driving, compare planners, or evaluate research
changes on a mapped classroom, lab, corridor, or test track.

## What OSRacer Can Demonstrate

- Map-based autonomous navigation with Nav2.
- Faster Ackermann-oriented navigation with the TEB profile.
- DWB as a simpler baseline for comparison and debugging.
- SLAM plus navigation during early site setup.
- Scenario-based profiles for classrooms, labs, corridors, and race tracks.

## Recommended reading path

If you are new to OSRacer navigation, read these pages in order:

1. [SLAM](./slam.md) — build and save the map used by navigation.
2. [Nav2 Speed Optimization](./nav2-speed-optimization.md) — understand the faster command chain, planner profile, and fused odometry path.
3. [Ackermann Navigation](./ackermann-navigation.md) — understand why OSRacer is different from differential-drive robots.
4. [Nav2 Tuning](./nav2-tuning.md) — tune velocity, acceleration, costmaps, and planner parameters after the default profile works.
5. [Nav2 Troubleshooting](../troubleshooting/nav2.md) — use only when navigation behavior is abnormal.

## Planner selection

Use TEB for the default Ackermann-oriented profile:

```bash
ros2 launch osracer_navigation bringup_launch.py slam:=True planner:=teb
```

Use DWB as a simpler baseline or comparison profile:

```bash
ros2 launch osracer_navigation bringup_launch.py slam:=True planner:=dwb
```

## Customer Performance Priorities

1. Reusable maps for the target venue.
2. Stable localization and fused odometry during repeated runs.
3. Planner behavior that respects Ackermann steering limits.
4. Smooth obstacle clearance through costmap and inflation settings.
5. Safe speed and acceleration increases after low-speed navigation works.
6. Repeatable results recorded by scenario and planner profile.

## Development notes

Keep navigation parameter files small and named by scenario. For example, use separate files for lab, classroom, corridor, and race track tests.

Every navigation profile change should record:

- robot setup;
- map or test field;
- planner name;
- changed parameters;
- observed result;
- rollback note.
