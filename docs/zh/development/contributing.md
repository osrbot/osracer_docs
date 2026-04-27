# 贡献指南

OSRacer 是社区开放项目。贡献应该让机器人更容易使用、调试和扩展。

## Pull Request 检查清单

- 改动目的清晰。
- launch 文件和参数文件已说明。
- 新行为包含最小测试或手动验证说明。
- 尽量同步更新中英文文档。
- 提交评审前通过静态检查。

## Commit message 建议

使用简短、明确的 commit message：

```text
feat: add lidar bringup profile
fix: correct camera frame name
docs: add Nav2 tuning notes
chore: update CI checks
```

这些 commit message 后续可以生成公开更新日志。
