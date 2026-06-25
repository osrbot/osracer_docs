# Add a New Navigation Profile

A navigation profile is a named set of Nav2 parameters for a specific use case,
such as a classroom demo, a narrow lab corridor, or a faster research run.

For the standard delivered robot, do not create a new profile just to change the
factory vehicle geometry. Start from the existing OSRacer settings and tune the
navigation behavior around the environment.

## When to add a profile

Add a profile when the scenario is repeatable and different from the default:

- low-speed classroom demonstration;
- narrow indoor map;
- faster open-area navigation;
- obstacle-heavy lab route;
- comparison between TEB and DWB;
- research experiment that needs recorded parameters.

For a one-time test, prefer launch arguments or a temporary YAML copy outside the
main customer workflow.

## Profile structure

| Part | What to record |
| --- | --- |
| Scenario | Map, floor type, obstacle density, lighting if camera is used |
| Planner | TEB, DWB, or another controller |
| Speed policy | Maximum speed, acceleration, reverse behavior |
| Costmap | Inflation radius, obstacle range, update frequency |
| Recovery behavior | What the robot should do when blocked |
| Validation result | Date, operator, map, pass/fail notes |

## Step-by-step

1. Confirm the default navigation works on the same map:

   ```bash
   ros2 launch osracer_navigation navigation.launch.py
   ```

2. Copy the closest existing parameter file and rename it for the scenario.

3. Change one group of parameters at a time. Start with speed and costmap
   conservatism before planner-specific weights.

4. Test without motion first:

   ```bash
   ros2 param dump /controller_server
   ros2 topic list | grep -E 'cmd_vel|plan|costmap'
   ```

5. Run at low speed in RViz and confirm:

   - the global path is stable;
   - the local trajectory does not ask for impossible turns;
   - costmaps do not flicker;
   - the robot stops when blocked;
   - the operator can stop the demo immediately.

6. Only increase speed after the low-speed run is repeatable.

7. Document the command and the test result next to the profile.

## Tuning order

Use this order to keep debugging manageable:

1. Map quality and localization stability.
2. Costmap obstacle visibility.
3. Safe speed and acceleration limits.
4. Planner selection.
5. Planner weights and recovery behavior.

If the robot cannot localize or costmaps are wrong, planner tuning will not fix
the problem.

## Documentation template

```md
## Profile name

- Scenario:
- Map:
- Planner:
- Speed limit:
- Start command:
- RViz checks:
- Tested by:
- Known limits:
```
