# Nav2 Speed Optimization

This page documents the key navigation speed optimization introduced by commit `f5ddd87`.

## Outline

1. Background and goals.
2. Removing `velocity_smoother`.
3. Direct `controller_server` to `cmd_vel` output.
4. Planner selection with `planner:=teb` or `planner:=dwb`.
5. TEB parameter changes.
6. DWB parameter changes.
7. Using `odometry/filtered`.
8. Removing `spin` recovery for Ackermann vehicles.
9. Validation checklist.
10. Rollback strategy.
