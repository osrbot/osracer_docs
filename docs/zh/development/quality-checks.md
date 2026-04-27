# 静态检查

文档站使用静态检查来保证内容可读、代码规范，并且可以稳定部署。

## 本地检查

```bash
npm run lint
npm run typecheck
npm run build
```

## 检查内容

- 使用 markdownlint 检查 Markdown 风格。
- 使用 ESLint 检查代码和配置。
- 使用 Prettier 检查格式。
- 使用 vue-tsc 检查 Vue 和 TypeScript 类型。
- 执行 VitePress 生产构建。

## 评审期望

文档 PR 应该通过和 GitHub Actions 一致的检查。
