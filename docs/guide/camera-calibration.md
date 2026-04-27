# Camera Calibration

This page documents the camera calibration workflow and how calibration files should be managed.

## Calibration command

```bash
ros2 run camera_calibration cameracalibrator --size 8x6 --square 0.03 image:=/rgb/image_raw camera:=/rgb
```

## Output

The default calibration file is usually written under:

```text
~/.ros/camera_info/rgb.yaml
```

## Outline

1. Prepare the calibration board.
2. Run calibration.
3. Save and review `rgb.yaml`.
4. Move stable calibration data into project configuration.
5. Track known issues by device and commit.
