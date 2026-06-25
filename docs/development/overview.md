# Secondary Development

This section is for teachers, researchers, and customers who want to extend
OSRacer after the standard robot can already bring up, map, and navigate.

The recommended rule is simple: keep the delivered robot behavior stable, then
add your experiment as a separate launch file, parameter file, node, or demo
script.

## Development map

<Mermaid code="flowchart LR\n  Base[Standard bringup works] --> Choose[Choose one extension point]\n  Choose --> Sensor[New sensor]\n  Choose --> Nav[Navigation tuning]\n  Choose --> Demo[Teaching demo]\n  Choose --> Race[Racing algorithm]\n  Sensor --> Verify[RViz and topic checks]\n  Nav --> Verify\n  Demo --> Verify\n  Race --> Verify\n  Verify --> Record[Document command and result]" />

## Recommended workflow

| Step | What to do | Evidence before driving |
| --- | --- | --- |
| 1. Start from a working robot | Run the standard bringup and confirm topics. | `/odom`, lidar, camera, and TF are visible. |
| 2. Pick one package boundary | Decide whether the change belongs to bringup, SLAM, navigation, demo, or race. | The changed files stay in that package. |
| 3. Add a small extension | Prefer a new launch file, YAML file, or node. | Existing launch commands still work. |
| 4. Verify without motion | Use RViz, `ros2 topic list`, `ros2 topic hz`, and logs. | No TF break, no serial reconnect loop. |
| 5. Test at low speed | Use an open area and conservative speed limits. | Robot stops correctly and commands are reversible. |
| 6. Document the result | Add commands, assumptions, and known limits. | Another user can repeat the same test. |

## Package guide

| Goal | Start here | Typical files |
| --- | --- | --- |
| Add or replace a sensor | `osracer_bringup` | launch file, sensor parameter file, RViz view |
| Change robot visualization | `osracer_description` | URDF/Xacro, mesh, frame launch |
| Build a map | `osracer_slam` | SLAM launch, map save command |
| Tune navigation | `osracer_navigation` | Nav2 YAML, BT XML, RViz config |
| Create classroom demos | `osracer_demo` | shell script, GUI action, RViz launcher |
| Develop racing algorithms | `osracer_race` | controller node, safety gate, evaluation CSV |
| Test simulation workflows | `osracer_sim` | sim launch, scenario parameters |

## What not to change first

Avoid these changes until you have a clear reason and a rollback plan:

- replacing the default bringup entry point;
- changing common topic or frame names;
- editing delivered chassis geometry for a standard robot;
- mixing hardware startup and navigation tuning in the same parameter file;
- bypassing the existing stop scripts or safety gates.

## Minimal example: add a classroom demo

1. Create a script under `osracer_demo/scripts/`.
2. Keep it non-destructive: start required launch files and print what it is doing.
3. Add a matching stop path through `stop_all_demo.sh`.
4. Add a button or menu entry only after the command-line script works.
5. Document the command in the demo guide.

Before using it with students, verify:

```bash
$(ros2 pkg prefix osracer_demo)/share/osracer_demo/scripts/stop_all_demo.sh
ros2 topic list | grep -E 'cmd_vel|ackermann|odom'
```

## Documentation rule

Every user-facing change should include:

- the command users should run;
- what they should see in logs, topics, or RViz;
- how to stop or roll back;
- whether the test was verified on a robot, in simulation, or only by static checks.
