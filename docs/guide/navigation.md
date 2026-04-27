# Navigation

The navigation layer is based on Nav2. It consumes a map, localization, costmaps, planners, and controller parameters.

## Common modes

- Navigate on an existing map.
- Run SLAM and navigation together during development.
- Compare TEB and DWB local planning behavior.

## Tuning priorities

1. Confirm TF and localization first.
2. Tune robot footprint and inflation radius.
3. Set safe velocity and acceleration limits.
4. Tune local planner constraints for Ackermann motion.
5. Test recovery behavior in a controlled area.

## Development notes

Keep navigation parameter files small and named by scenario. For example, use separate files for lab, classroom, corridor, and race track tests.
