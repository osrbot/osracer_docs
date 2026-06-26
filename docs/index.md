---
layout: home

hero:
  name: OSRacer
  text: ROS 2 autonomous racing and research platform
  tagline: Customer-facing guide for racing demos, SLAM mapping, Nav2 navigation, Ackermann vehicle behavior, and robot-side setup.
  image:
    src: /osracer-mark.svg
    alt: OSRacer
  actions:
    - theme: brand
      text: Mapping and Navigation
      link: /guide/navigation
    - theme: alt
      text: SLAM
      link: /guide/slam
    - theme: alt
      text: 简体中文
      link: /zh/

features:
  - title: Ackermann racing platform
    details: Use a steering-car chassis model for racing demos, controller research, and vehicle-behavior experiments.
  - title: Mapping and navigation first
    details: Build maps with SLAM, reuse them for Nav2 navigation, and compare planners for classrooms, labs, and test tracks.
  - title: Robot-ready workflow
    details: Start from the Jetson-based vehicle setup, then bring up the chassis, sensors, TF, odometry, and RViz when needed.
---

# Documentation Entry

## Choose Your Path

<div class="doc-path">
  <a href="/osracer_docs/guide/navigation"><strong>Run navigation:</strong> use Nav2 with OSRacer Ackermann constraints, planner choices, and tuning notes.</a>
  <a href="/osracer_docs/guide/slam"><strong>Build maps:</strong> run SLAM and save reusable maps for classrooms, labs, or test fields.</a>
  <a href="/osracer_docs/guide/nav2-speed-optimization"><strong>Improve speed:</strong> review the optimized Nav2 command chain, planner profile, and fused odometry path.</a>
  <a href="/osracer_docs/guide/vehicle-profile"><strong>Understand the car:</strong> review the delivered vehicle geometry, sensor layout, and Ackermann behavior.</a>
  <a href="/osracer_docs/guide/getting-started"><strong>First boot:</strong> confirm the robot environment only when setting up or recovering a vehicle.</a>
</div>

## Platform Highlights

<div class="metric-grid">
  <div class="metric-card">
    <strong>Primary use</strong>
    <div class="value">Racing</div>
    Ackermann steering chassis for demos, control, and research.
  </div>
  <div class="metric-card">
    <strong>Navigation stack</strong>
    <div class="value">Nav2</div>
    TEB-first profile with DWB available for comparison.
  </div>
  <div class="metric-card">
    <strong>Mapping</strong>
    <div class="value">SLAM</div>
    GMapping, Cartographer, and slam_toolbox workflows.
  </div>
  <div class="metric-card">
    <strong>Robot computer</strong>
    <div class="value">Jetson Orin</div>
    Ubuntu 22.04 / ROS 2 Humble on the vehicle.
  </div>
</div>

## What Customers Usually Care About First

1. The car can run Ackermann-style navigation instead of differential-drive examples.
2. SLAM can produce reusable maps for the target classroom, lab, or track.
3. Nav2 can use those maps with planner profiles suitable for OSRacer motion.
4. Sensors, TF, odometry, and RViz checks are available when validating setup or diagnosing issues.

::: tip Customer documentation scope
This site describes how to use and troubleshoot OSRacer. Low-level firmware protocol details stay in the firmware repository.
:::
