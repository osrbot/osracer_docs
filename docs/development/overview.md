# Secondary Development

Secondary development should be predictable for new contributors. Prefer extension points over direct edits to stable launch files.

## Recommended workflow

1. Identify the package boundary.
2. Add a small parameter file or launch argument.
3. Keep topic names and frame names documented.
4. Test with RViz before testing on the robot.
5. Submit code and documentation changes together.

## Extension examples

- Add a new sensor driver launch file.
- Add a new navigation parameter profile.
- Add a new RViz debug view.
- Add a new map and scenario guide.

## Documentation rule

Every user-facing change should include a matching docs change in this repository.
