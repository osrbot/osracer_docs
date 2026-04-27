# Nav2 Speed Optimization

This page documents the key navigation speed optimization introduced by commit `f5ddd87` in the OSRacer source project.

## Background

OSRacer is an Ackermann steering robot. A default Nav2 configuration that works for a small differential-drive robot is usually too conservative for a racing-style car platform.

The optimization goal is simple:

- reduce command latency;
- make planner switching explicit;
- use fused odometry for navigation;
- tune TEB and DWB for faster real-robot response;
- avoid recovery behaviors that do not match Ackermann kinematics.

## Summary of changes

| Area | Change | Intent |
| --- | --- | --- |
| Command chain | Removed `velocity_smoother` | Reduce command latency and remapping complexity |
| Launch API | Added `planner` argument | Switch between TEB and DWB from launch command |
| Params file | Build default params path from planner name | Load `teb_nav2_params.yaml` or `dwb_nav2_params.yaml` automatically |
| Odometry | Changed Nav2 odom input to `odometry/filtered` | Use EKF fused state instead of raw odometry |
| TEB | Increased speed limits and reduced optimization cost | Faster car-like local planning |
| DWB | Increased velocity limits and reduced sampling cost | Faster baseline local planning |
| Recovery | Removed `spin` recovery | Ackermann cars cannot rotate in place safely |

## Command chain before and after

Before the optimization, the command path had an additional smoother node:

<Mermaid code="flowchart LR\n  Controller[controller_server] --> NavCmd[/cmd_vel_nav/]\n  NavCmd --> Smoother[velocity_smoother]\n  Smoother --> Cmd[/cmd_vel/]\n  Cmd --> Chassis[Chassis Driver]" />

After the optimization, `controller_server` publishes directly to `cmd_vel`:

<Mermaid code="flowchart LR\n  Controller[controller_server] --> Cmd[/cmd_vel/]\n  Cmd --> Chassis[Chassis Driver]" />

This reduces latency and removes one remapping layer. The tradeoff is that velocity limits, acceleration limits, and chassis-side command handling must be tuned more carefully.

## Planner selection

The navigation launch file now accepts a planner argument.

Use TEB:

```bash
ros2 launch osracer_navigation bringup_launch.py slam:=True planner:=teb
```

Use DWB:

```bash
ros2 launch osracer_navigation bringup_launch.py slam:=True planner:=dwb
```

The default params file follows the selected planner:

```text
planner:=teb -> teb_nav2_params.yaml
planner:=dwb -> dwb_nav2_params.yaml
```

TEB should be treated as the default choice for Ackermann-style navigation. DWB is useful as a simpler baseline and for comparative debugging.

## Why use `odometry/filtered`

The optimized configuration uses `odometry/filtered` as Nav2's odometry input.

This topic should come from EKF fusion, usually combining wheel odometry and IMU. For navigation, this is more stable than raw chassis odometry because it gives Nav2 a smoother and more consistent state estimate.

Before tuning local planner parameters, verify:

```bash
ros2 topic hz /odometry/filtered
ros2 topic echo /odometry/filtered
```

## TEB optimization direction

The TEB profile was tuned for faster Ackermann navigation. The important ideas are:

- increase forward and angular velocity limits;
- increase acceleration limits;
- increase lookahead distance;
- reduce the number of samples and optimization iterations;
- tune `wheelbase` and `min_turning_radius` for car-like motion;
- reduce overly conservative obstacle inflation when the test area is controlled;
- raise time-optimal behavior weight so the planner prefers faster trajectories.

Key parameters to review when adapting this profile:

| Parameter | Why it matters |
| --- | --- |
| `max_vel_x` | Forward speed limit |
| `max_vel_x_backwards` | Reverse speed limit for recovery or maneuvering |
| `max_vel_theta` | Angular velocity bound, still constrained by turning radius |
| `acc_lim_x` | Forward acceleration limit |
| `acc_lim_theta` | Angular acceleration limit |
| `wheelbase` | Car geometry used by the planner |
| `min_turning_radius` | Minimum feasible turning radius |
| `dt_ref` | Temporal resolution of the trajectory |
| `max_samples` | Upper bound for trajectory samples |
| `no_inner_iterations` | Inner optimizer iterations |
| `no_outer_iterations` | Outer optimizer iterations |
| `weight_optimaltime` | Weight for faster trajectories |
| `weight_obstacle` | Obstacle avoidance strength |

## DWB optimization direction

The DWB profile was tuned as a faster baseline planner:

- increase `controller_frequency`;
- increase `min_vel_x`, `max_vel_x`, and `max_speed_xy`;
- increase acceleration and deceleration limits;
- reduce `vx_samples` and `vtheta_samples` to lower computation cost;
- reduce `sim_time` to shorten trajectory rollout;
- increase `PathDist.scale` and `GoalDist.scale` to encourage useful progress.

DWB can be useful when you need a simpler local planner for comparison, but it does not model car-like constraints as naturally as TEB.

## Why remove `spin` recovery

`spin` recovery is designed for robots that can rotate in place. OSRacer uses Ackermann steering, so in-place rotation is not physically valid.

The safer recovery direction is:

- `backup`;
- `wait`;
- replan with a feasible turning radius;
- manually reset the test when the robot is in a constrained pose.

## Validation checklist

Before testing at higher speed, validate the system at low speed.

- `cmd_vel` is published when a goal is sent.
- The chassis driver receives the command.
- `odometry/filtered` is stable.
- TF tree is connected from `map` to `odom` to `base_link`.
- Costmaps update correctly.
- The selected planner loads the expected params file.
- The robot can stop safely.
- The robot can turn without violating its real turning radius.

## Rollback strategy

If the robot becomes unstable after increasing speed:

1. reduce `max_vel_x`;
2. reduce `acc_lim_x` and `decel_lim_x`;
3. increase obstacle distance and inflation radius;
4. increase TEB optimization iterations;
5. switch from TEB to DWB for baseline comparison;
6. restore a velocity smoother only if command smoothness cannot be solved in planner and chassis layers.

## Documentation rule

Whenever a navigation profile is changed, update the documentation with:

- robot model;
- map or test field;
- planner name;
- changed parameters;
- observed result;
- rollback note.
