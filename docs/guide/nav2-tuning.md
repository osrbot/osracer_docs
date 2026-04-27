# Nav2 Tuning

This page provides a structured tuning workflow for OSRacer navigation.

## Tuning principles

1. Make the robot stable before making it fast.
2. Tune at low speed before increasing speed limits.
3. Verify TF and odometry before changing planner parameters.
4. Change one group of parameters at a time.
5. Record every test with robot model, map, planner, and result.

## Pre-flight checks

Do not start planner tuning until these checks pass.

### TF

The navigation TF chain should be connected:

```text
map -> odom -> base_link -> sensor frames
```

Useful tools:

```bash
ros2 run rqt_tf_tree rqt_tf_tree
ros2 run tf2_tools view_frames
```

### Odometry

For optimized navigation profiles, prefer EKF fused odometry:

```bash
ros2 topic hz /odometry/filtered
ros2 topic echo /odometry/filtered
```

The robot should not show large jumps while driving slowly.

### Lidar and costmap

Check that lidar data is stable and costmaps update correctly:

```bash
ros2 topic hz /scan
ros2 launch osracer_debug debug_lidar.launch.py
```

In RViz, verify that the scan aligns with walls and obstacles.

### Footprint

The robot footprint should cover the real chassis shape. A footprint that is too small can cause collision risk. A footprint that is too large can prevent the robot from passing narrow spaces.

## TEB tuning

TEB is the recommended local planner for OSRacer because it can model car-like constraints such as wheelbase and turning radius.

Tune TEB in this order:

1. geometry;
2. speed limits;
3. acceleration limits;
4. obstacle distance;
5. optimization cost;
6. sampling and iteration count.

### Geometry parameters

| Parameter | Tuning note |
| --- | --- |
| `wheelbase` | Match the real distance between front and rear axle references used by the vehicle model |
| `min_turning_radius` | Match the smallest safe turning radius of the car |
| `footprint_model` | Prefer a line or polygon model that reflects the real chassis |

### Speed and acceleration

| Parameter | Tuning note |
| --- | --- |
| `max_vel_x` | Increase gradually after low-speed navigation is stable |
| `max_vel_x_backwards` | Keep conservative unless reverse motion is well tested |
| `max_vel_theta` | Must remain physically feasible with turning radius |
| `acc_lim_x` | Higher values improve response but may cause slipping or overshoot |
| `acc_lim_theta` | Tune with turning stability in mind |

### Obstacle behavior

| Parameter | Tuning note |
| --- | --- |
| `min_obstacle_dist` | Lower values allow closer paths but increase collision risk |
| `inflation_dist` | Larger values create more conservative paths |
| `weight_obstacle` | Higher values make obstacle avoidance stronger |
| `weight_inflation` | Controls the cost of being near inflated obstacles |

### Optimization behavior

| Parameter | Tuning note |
| --- | --- |
| `no_inner_iterations` | Lower values reduce computation but may reduce solution quality |
| `no_outer_iterations` | Lower values reduce optimization cost |
| `weight_optimaltime` | Higher values prefer faster trajectories |
| `weight_kinematics_forward_drive` | Higher values discourage backward or awkward motion |
| `weight_kinematics_turning_radius` | Keeps trajectories feasible for car-like motion |

## DWB tuning

DWB is useful as a baseline local planner. It is usually easier to understand but less natural for Ackermann constraints.

Tune DWB in this order:

1. controller frequency;
2. velocity and acceleration limits;
3. sampling count;
4. rollout time;
5. critic weights.

| Parameter | Tuning note |
| --- | --- |
| `controller_frequency` | Higher frequency can improve response but increases CPU load |
| `min_vel_x` | Helps avoid very slow creeping behavior |
| `max_vel_x` | Forward velocity limit |
| `max_speed_xy` | Overall planar speed limit |
| `acc_lim_x` | Acceleration limit |
| `decel_lim_x` | Deceleration limit; should allow safe stopping |
| `vx_samples` | Lower values reduce compute cost but reduce search resolution |
| `vtheta_samples` | Lower values reduce compute cost but may reduce turn quality |
| `sim_time` | Shorter rollout is faster but more myopic |
| `PathDist.scale` | Higher values encourage staying near the global path |
| `GoalDist.scale` | Higher values encourage progress toward the goal |

## Costmap tuning

Costmaps often explain navigation behavior better than the planner itself.

| Parameter | Effect |
| --- | --- |
| `footprint` | Defines the robot collision shape |
| `inflation_radius` | Controls how far obstacles influence paths |
| `cost_scaling_factor` | Controls how quickly inflated cost decays |
| `obstacle_layer` | Inserts sensor obstacles into the costmap |
| `voxel_layer` | Useful for 3D or height-aware obstacle data |

A good rule is to tune footprint and inflation before increasing maximum speed.

## Test sequence

Use a repeatable sequence for every tuning session:

1. start bringup;
2. verify TF and odometry;
3. verify lidar and costmap;
4. send a short straight-line goal;
5. send a slow turning goal;
6. send a longer path goal;
7. increase speed only after all previous tests are stable.

## Real-robot tuning record

Copy this template for each test.

```md
## Tuning Record

- Date:
- Robot model:
- Map:
- Planner:
- Params file:
- Max speed:
- Controller frequency:
- Problem:
- Change:
- Result:
- Next step:
- Rollback note:
```

## Safety notes

- Always keep a physical stop method ready.
- Test high-speed changes in an open area.
- Do not tune near people, glass, stairs, or fragile objects.
- Treat higher acceleration as a safety risk, not only a performance improvement.
