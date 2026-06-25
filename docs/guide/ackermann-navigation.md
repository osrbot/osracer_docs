# Ackermann Navigation

This page explains how OSRacer navigation differs from differential-drive robots.

## Why Ackermann is different

A differential-drive robot can rotate in place by driving the left and right wheels in opposite directions. An Ackermann vehicle cannot do that. It moves like a car: forward or backward motion is coupled with steering angle.

This changes how navigation should be configured:

- the planner must respect a minimum turning radius;
- recovery behaviors cannot assume in-place rotation;
- the delivered geometry and wheelbase settings should stay consistent;
- velocity limits should be tuned with steering feasibility in mind;
- narrow spaces may require reversing or replanning instead of spinning.

## Why TurtleBot defaults are not enough

Many Nav2 examples are tuned for small differential-drive platforms. Those defaults often assume:

- compact robot geometry;
- low speed;
- in-place rotation;
- simple circular or near-circular geometry;
- recovery behaviors such as `spin`.

OSRacer needs car-like tuning. Using differential-drive defaults may cause slow motion, impossible turns, oscillation, or invalid recovery behavior.

## Important geometry parameters

### `wheelbase`

`wheelbase` describes the effective distance between the front and rear axle references used by the planner. If this value is wrong, the planner may generate turns that the real robot cannot follow.

### `min_turning_radius`

`min_turning_radius` defines the smallest feasible turning radius. A smaller value makes the planner more aggressive, but if it is smaller than the real vehicle can achieve, the robot may cut corners, oscillate, or fail near obstacles.

### Factory geometry

The standard OSRacer geometry is configured before delivery. For normal
bringup, SLAM, and navigation, users should verify RViz and costmap behavior
rather than editing vehicle geometry files.

Change geometry-related settings only after a physical modification such as a
new sensor bracket, different wheel size, or custom body shell.

## Command conversion

Nav2 usually outputs `cmd_vel` as linear and angular velocity. An Ackermann chassis driver must convert that command into steering and speed.

A simplified relation is:

```text
steering_angle = atan(wheelbase * angular_z / linear_x)
```

This means the command is sensitive to both speed and angular velocity. When speed is very low, steering conversion must handle edge cases carefully.

## Why TEB fits car-like robots

TEB is a good match for OSRacer because it can represent constraints that matter for Ackermann vehicles:

- minimum turning radius;
- wheelbase;
- forward-drive preference;
- trajectory time optimization;
- obstacle distance constraints;
- feasibility checks along the trajectory.

This does not mean TEB works without tuning. It means TEB gives OSRacer the right control knobs.

## Why `spin` recovery is not suitable

`spin` recovery asks the robot to rotate in place. That is not physically valid for OSRacer.

Preferred recovery options are:

- `backup`;
- `wait`;
- replan with a feasible turning radius;
- reset the test when the robot is trapped in a pose that requires in-place rotation.

## Testing checklist

Before using a new Ackermann navigation setup, verify:

- the standard robot model is connected in RViz;
- the delivered wheelbase setting has not been accidentally changed;
- `min_turning_radius` is physically reachable;
- `cmd_vel` conversion does not explode near zero speed;
- local paths are feasible in RViz;
- the robot can stop safely;
- recovery behavior does not request in-place rotation.

## Common symptoms

| Symptom | Possible cause |
| --- | --- |
| Robot cannot follow turns | `min_turning_radius` too small or `wheelbase` wrong |
| Robot oscillates near goal | Goal tolerance too strict or local planner over-constrained |
| Robot drives too slowly | Velocity limits too conservative or costmap too inflated |
| Robot tries invalid recovery | Differential-drive recovery behavior still enabled |
| Robot clips obstacles | Costmap too aggressive or TF offset wrong |

## Design rule

Treat OSRacer as a car first, and a generic Nav2 robot second. Navigation settings should start from the delivered OSRacer configuration, not from differential-drive examples.
