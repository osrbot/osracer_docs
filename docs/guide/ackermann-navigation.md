# Ackermann Navigation

This page explains how OSRacer navigation differs from differential-drive robots.

## Outline

1. Ackermann steering vs differential drive.
2. Why TurtleBot defaults are not enough.
3. `wheelbase` and `min_turning_radius`.
4. Footprint and real chassis geometry.
5. `cmd_vel` to Ackermann command conversion.
6. Why TEB is a good fit for car-like robots.
7. Why `spin` recovery is not suitable.
8. Real-robot safety checklist.
