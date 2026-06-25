# Parameter Style

Parameter files should explain a scenario, not become a dumping ground for every
value a node supports.

## Principles

1. Keep the default profile stable for delivered robots.
2. Use a new YAML file for a new scenario.
3. Put hardware startup parameters and navigation tuning parameters in separate
   files.
4. Prefer clear names over clever abbreviations.
5. Record why important values changed.

## File naming

| Scenario | Example file name |
| --- | --- |
| Low-speed classroom demo | `nav2_classroom_slow.yaml` |
| Faster open-area navigation | `nav2_open_area_fast.yaml` |
| Camera calibration | `camera_calibration.yaml` |
| Chassis EKF | `chassis_ekf_params.yaml` |
| Simulation test | `sim_nav2_smoke.yaml` |

## Parameter comment style

Good comments explain the reason or risk:

```yaml
max_vel_x: 0.5  # classroom demo limit; increase only after map and localization are stable
```

Avoid comments that repeat the key:

```yaml
max_vel_x: 0.5  # max velocity x
```

## Tuning record

When a profile changes, record:

| Field | Example |
| --- | --- |
| Robot | Standard OSRacer delivered chassis |
| Map | classroom_2026_06 |
| Planner | TEB |
| Speed limit | 0.5 m/s |
| Test result | 5 laps without localization loss |
| Known issue | Slows down near glass wall |

This record can live in the page that explains the profile or in the pull
request description.

## Review checklist

- Does the default launch still use the safe profile?
- Can another user understand the scenario from the file name?
- Are changed values documented in the user guide?
- Was the profile tested in RViz before real driving?
- Is there a command to stop the robot if the profile behaves badly?
