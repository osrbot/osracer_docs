---
layout: home

hero:
  name: OSRacer
  text: ROS 2 autonomous racing car user guide
  tagline: Customer-facing instructions for Jetson setup, chassis bringup, desktop demos, SLAM, navigation, RViz checks, and common troubleshooting.
  image:
    src: /osracer-mark.svg
    alt: OSRacer
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Bringup
      link: /guide/bringup
    - theme: alt
      text: 简体中文
      link: /zh/

features:
  - title: Ready on the robot
    details: Start from the OSRacer installed on Jetson Orin Nano, then verify serial, sensors, TF, odometry, and RViz.
  - title: Demo workflows
    details: Run chassis checks, desktop demos, mapping, navigation, and stop scripts with documented commands.
  - title: Teaching and research
    details: Use SLAM, Nav2, camera calibration, Ackermann navigation, and simulation/racing packages as extension points.
---

# Documentation Entry

## Choose Your Path

<div class="doc-path">
  <a href="/osracer_docs/guide/getting-started"><strong>First boot:</strong> confirm the robot environment, build the workspace, and source ROS.</a>
  <a href="/osracer_docs/guide/bringup"><strong>Start the car:</strong> bring up the chassis, sensors, TF, and RViz-visible state.</a>
  <a href="/osracer_docs/guide/slam"><strong>Build a map:</strong> run SLAM and save maps for classroom or lab spaces.</a>
  <a href="/osracer_docs/guide/navigation"><strong>Navigate:</strong> run Nav2 with OSRacer Ackermann constraints and tuning notes.</a>
  <a href="/osracer_docs/troubleshooting/serial"><strong>Serial issue:</strong> check device names, permissions, chassis logs, and reconnect behavior.</a>
</div>

## Typical Customer Setup

<div class="metric-grid">
  <div class="metric-card">
    <strong>Robot computer</strong>
    <div class="value">Jetson Orin</div>
    Ubuntu 22.04 / ROS 2 Humble on the vehicle.
  </div>
  <div class="metric-card">
    <strong>Chassis port</strong>
    <div class="value">/dev/osrbot_base</div>
    Stable UDEV device used by the chassis launch file.
  </div>
  <div class="metric-card">
    <strong>Main launch</strong>
    <div class="value">bringup</div>
    Starts chassis, robot description, lidar, camera, and LED nodes.
  </div>
  <div class="metric-card">
    <strong>Control style</strong>
    <div class="value">Ackermann</div>
    Steering car model for demos, navigation, and research.
  </div>
</div>

## What You Should See

1. The chassis launch prints the serial device and firmware identification in the ROS log.
2. The driver keeps the chassis connection state refreshed automatically.
3. `/odom`, IMU, battery, lidar, camera, and TF topics become available after bringup.
4. RViz should show a connected robot model without wheel or base-frame jumps.

::: tip Customer documentation scope
This site describes how to use and troubleshoot OSRacer. Low-level firmware protocol details stay in the firmware repository.
:::
