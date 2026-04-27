# UDEV Troubleshooting

This page documents common UDEV rule issues for OSRacer serial devices.

## Problem

A symlink such as `/dev/osrbot_base` may point to the wrong USB node instead of the tty serial node.

## Root cause

Matching only the USB subsystem is not specific enough. A physical USB device creates multiple kernel nodes, including USB bus nodes and tty nodes.

## Recommended direction

Rules should explicitly match the tty layer with `KERNEL` and `SUBSYSTEM` filters.

## Validation

```bash
ls -l /dev/osrbot_base
udevadm info /dev/osrbot_base
```
