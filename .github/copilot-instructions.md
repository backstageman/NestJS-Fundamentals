## 目的

本文件为在此仓库中工作的 AI 编码代理（Copilot / 助手）提供可执行、项目特定的指导，帮助快速理解架构、开发流程与代码风格。

## 快速概览（大局）

- **框架**: NestJS（TypeScript）。主要入口：`src/main.ts`。
- **模块边界**: 当前为最小的单模块示例，核心文件：`src/app.module.ts`、`src/app.controller.ts`、`src/app.service.ts`。
- **职责划分**: 控制器（routes）放在 `controllers`（这里是 `AppController`），业务逻辑放在 `providers`/services（这里是 `AppService`）。遵循 Nest 的依赖注入模式。

## 关键命令与开发工作流

- 安装依赖: `npm install`
- 启动（开发）: `npm run start:dev`（热重载）
- 生产运行: `npm run start:prod`（先 `npm run build`）
- 构建: `npm run build`（输出到 `dist/`）
- 单元测试: `npm run test`（Jest，根配置在 `package.json` 的 `jest` 字段，`rootDir` 指向 `src`）
- e2e 测试: `npm run test:e2e`（使用 `test/jest-e2e.json`）

在对代码做出修改后，先运行相关单元/集成测试，再构建并在本地运行以验证变更。

## 项目特有约定与模式

- 文件组织为标准 Nest starter：顶级 `src/`，测试在 `test/`。
- 使用 TypeScript 且启用了 `tsconfig-paths`（可在开发测试命令中见到）。
- 代码风格: `prettier` + `eslint`（`npm run format`、`npm run lint`）。请在提交前遵循这些工具修复样式问题。
- 测试文件：以 `.spec.ts` 结尾，Jest 运行时的 `rootDir` 为 `src`，因此测试应与源文件同目录或相对 `src`。

## 常见修改示例（可直接生成或补全）

- 新增控制器：创建 `src/your-name.controller.ts`，在 `src/app.module.ts` 的 `controllers` 数组中添加该控制器。
- 新增服务：创建 `src/your-name.service.ts` 并在 `AppModule` 的 `providers` 中注册，或在需要的模块中注册。
- 路由示例（一致写法）:

```ts
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }
}
```

注意：保持 controller 只是转发请求到 service；业务逻辑应放在 service 中，便于测试。

## 集成点与外部依赖

- 目前没有外部数据库或第三方 API 的连接代码（starter 模板）。如需添加，请在 `AppModule` 中通过 `imports` 注入模块（例如 `TypeOrmModule.forRoot()`）。

## 编辑/补丁指南（AI 行为约束）

- 不要修改 `package.json` 的依赖版本，除非有明确测试和用户要求。
- 修改代码时：同时更新或添加对应的测试（`.spec.ts`），并在提交前运行 `npm run test`。
- 若需新增脚本或工具，先在回复中列出变更清单并征得用户确认。

## 可检查的关键文件

- `package.json`：脚本、依赖与 jest 配置
- `src/main.ts`：应用入口与监听端口
- `src/app.module.ts`：模块注册点（controllers/providers/imports）
- `src/app.controller.ts` / `src/app.service.ts`：示例 controller/service
- `test/`：e2e 测试配置与样例

## 交付格式与沟通

- 当生成代码补丁时，请同时提供：修改点摘要、受影响文件清单、如何在本地验证（命令）以及需要人工确认的风险点。
- 如果在仓库中找不到必须的信息（例如数据库连接字符串、外部 API 规范），请明确在回复中列出缺失项并建议默认安全占位符。

---

请审阅此草案并指出需要补充或更精确描述的地方（例如你想要更多关于测试、CI、或具体编码风格的规则）。
