# UDEV 故障排查

本页记录 OSRacer 串口设备常见 UDEV 规则问题。

## 问题

`/dev/osrbot_base` 之类的软链接可能指向错误的 USB 节点，而不是 tty 串口节点。

## 根因

只匹配 USB 子系统不够精确。同一个物理 USB 设备会生成多个内核节点，包括 USB 总线节点和 tty 节点。

## 推荐方向

规则应通过 `KERNEL` 和 `SUBSYSTEM` 明确匹配 tty 层。

## 验证

```bash
ls -l /dev/osrbot_base
udevadm info /dev/osrbot_base
```
