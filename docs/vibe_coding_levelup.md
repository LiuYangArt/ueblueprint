# UE Blueprint Vibe Coding 改进计划

本文档记录了提升 AI 辅助蓝图生成质量的改进项，按优先级和实施难度分类。

## 当前架构概述

项目通过解析 UE 的 T3D 格式文本来渲染蓝图节点：
- **T3D 解析**：`js/entity/` 目录下的 Entity 类解析 `Begin Object...End Object` 结构
- **节点模板**：`js/template/node/` 根据节点类型决定渲染样式
- **AI 生成**：`js/ai/LLMService.js` 调用 LLM 生成 T3D 文本
- **Prompt**：`js/ai/prompts.js` 定义系统提示词

---

## 改进项列表

### P0 - 高优先级（推荐首先实施）

| 改进项 | 描述 | 难度 | 预估时间 | 状态 |
|--------|------|------|----------|------|
| **丰富 System Prompt** | 在 `prompts.js` 中添加更多节点类型和完整 T3D 示例 | ⭐ 简单 | 1h | ✅ 已完成 |
| **提取测试数据作为示例库** | 从 `tests/node*.spec.js` 中自动提取节点 T3D 作为参考 | ⭐⭐ 中等 | 2-3h | 待定 |
| **Pin 连接格式说明** | 在 prompt 中明确说明 `LinkedTo` 属性格式 | ⭐ 简单 | 30min | ✅ 已完成 |


---

### P1 - 中优先级

| 改进项 | 描述 | 难度 | 预估时间 |
|--------|------|------|----------|
| **T3D 语法校验** | 生成后验证 T3D 是否可解析，失败时提示用户或自动重试 | ⭐⭐ 中等 | 3-4h |
| **节点类型索引** | 构建常用节点的 Class Path 索引，在生成前提供给 LLM | ⭐⭐ 中等 | 2-3h |
| **Context 压缩** | 将完整 T3D 压缩为摘要格式（节点类型 + Pin 名 + 连接） | ⭐⭐ 中等 | 3h |
| **Few-shot 动态注入** | 根据用户请求类型，自动选择相关的 T3D 示例注入 prompt | ⭐⭐⭐ 较难 | 4-5h |

---

### P2 - 低优先级 / 长期

| 改进项 | 描述 | 难度 | 预估时间 |
|--------|------|------|----------|
| **RAG 节点知识库** | 将 UE 节点文档嵌入向量数据库，生成前检索相关节点 | ⭐⭐⭐⭐ 复杂 | 1-2 周 |
| **多轮迭代生成** | 支持"生成 → 编辑 → 验证"的对话流程 | ⭐⭐⭐ 较难 | 1 周 |
| **Vision 反馈循环** | 截图当前 graph，用 Vision API 让 LLM 理解视觉状态 | ⭐⭐⭐ 较难 | 1 周 |
| **自动 Pin 连接修复** | 后处理逻辑自动推断/修复 Pin 连接 | ⭐⭐⭐ 较难 | 4-5h |

---

## 详细方案

### 1. 丰富 System Prompt（P0）

**目标**：让 LLM 更好地理解 T3D 格式和常用节点类型

**修改文件**：`js/ai/prompts.js`

**内容扩展**：
- 添加 15-20 个常用节点的 Class Path
- 添加 1-2 个完整可工作的 T3D 示例（含节点连接）
- 明确说明 Pin 属性格式（PinId、LinkedTo、DefaultValue 等）

**示例补充**：
```
常用节点类型：
- PrintString: /Script/BlueprintGraph.K2Node_CallFunction (FunctionReference.MemberName="PrintString")
- Delay: /Script/BlueprintGraph.K2Node_CallFunction (FunctionReference.MemberName="Delay")
- ForEachLoop: /Script/BlueprintGraph.K2Node_CallFunction (FunctionReference.MemberName="ForEachLoop")
- SpawnActor: /Script/BlueprintGraph.K2Node_CallFunction (FunctionReference.MemberName="SpawnActor")
- Sequence: /Script/BlueprintGraph.K2Node_ExecutionSequence
- Branch: /Script/BlueprintGraph.K2Node_IfThenElse
...
```

---

### 2. 提取测试数据作为示例库（P0）

**目标**：利用 `tests/` 目录中 180+ 个 spec 文件中的真实 T3D 数据

**实现方式**：
1. 创建脚本扫描 `tests/node*.spec.js`
2. 提取 `value: String.raw\`...\`` 中的 T3D 片段
3. 生成 JSON 索引：`{ nodeName, className, t3dSnippet }`
4. 在 prompt 中按需引用

**产出文件**：`js/ai/nodeTemplates.json`

---

### 3. T3D 语法校验（P1）

**目标**：在添加到 graph 前验证 T3D 是否合法

**修改文件**：`js/ai/AIPanelElement.js`

**实现逻辑**：
```javascript
// 在 _handleGenerate 中
try {
    const entities = Grammar.parse(t3dText)
    if (!entities || entities.length === 0) {
        throw new Error("Failed to parse T3D")
    }
    // 继续添加节点...
} catch (parseError) {
    // 显示错误或提示 LLM 重试
}
```

---

## 实施顺序建议

1. ✅ **Phase 1**：丰富 System Prompt + Pin 连接说明 — **已完成 (2024-12-16)**
2. 🔲 **Phase 2**：提取测试数据作为示例（可选）
3. 🔲 **Phase 3**：T3D 语法校验
4. � **Phase 4**：节点类型索引 + Context 压缩
5. 🔮 **Future**：RAG / 多轮迭代 / Vision


---

## 相关文件

- `js/ai/prompts.js` - System Prompt 定义
- `js/ai/LLMService.js` - LLM 调用服务
- `js/ai/AIPanelElement.js` - AI 面板组件
- `js/ai/LayoutEngine.js` - 节点布局引擎
- `tests/node*.spec.js` - 节点测试数据（共 180+ 个文件）
- `js/Configuration.js` - 节点类型路径配置
