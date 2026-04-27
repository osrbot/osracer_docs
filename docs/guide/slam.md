# SLAM

The SLAM layer builds and saves maps from lidar and robot state estimation.

## Supported workflows

- GMapping based mapping
- Cartographer based mapping
- slam_toolbox based mapping
- Map saving for later navigation

## Before mapping

Check these items before tuning SLAM parameters:

- Lidar scan topic is stable.
- `base_link`, lidar frame, `odom`, and `map` are consistent.
- Odometry does not jump during slow manual driving.
- The robot can move slowly and safely in the target area.

## Output

The map should be saved with clear names, for example:

```bash
maps/lab_2026_04_27.yaml
maps/lab_2026_04_27.pgm
```
