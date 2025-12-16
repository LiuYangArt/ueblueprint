# Slim IR 规范文档

> **版本**: 0.1.0 (实验阶段)  
> **状态**: 最小实验已验证，核心实现待完成  
> **最后更新**: 2024-12-16

## 1. 概述

### 1.1 背景

当前 LLM 生成蓝图节点需要直接输出完整的 T3D (Unreal Engine Text-based Description) 格式，存在以下问题：

| 问题 | 影响 |
|------|------|
| System Prompt 约 17KB | 包含冗长的 T3D 语法规则和示例 |
| 单节点 T3D 约 2-5KB | 80%+ 是重复的 Pin 布尔标志 |
| LLM 需生成 32 位 GUID | 容易出错，增加验证复杂度 |
| 复杂的引用路径 | 如 `/Script/CoreUObject.Class'/Script/Engine.Actor'` |

### 1.2 解决方案

定义紧凑的 **Slim IR (简化中间表示)** JSON 格式：
1. LLM 只生成 Slim IR (~200-500 bytes)
2. 后处理脚本将 Slim IR 转换为完整 T3D (~2000-5000 bytes)
3. 现有 Grammar 解析器处理 T3D

### 1.3 预期收益

| 指标 | 改进 |
|------|------|
| Token 节省 | **80-93%** |
| System Prompt | 从 ~17KB 降至 ~2-3KB |
| 错误率 | 大幅降低（无需生成 GUID/复杂路径） |

---

## 2. Slim IR 格式规范

### 2.1 顶层结构

```json
{
  "nodes": [ ... ],      // 节点定义数组
  "connections": [ ... ] // 连接定义数组
}
```

### 2.2 节点定义

每个节点包含以下字段：

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `type` | string | ✓ | 节点类型（见 2.4 节） |
| `id` | string | ✓ | 唯一标识符，用于连接引用 |
| `pos` | [number, number] | ✓ | 节点位置 [X, Y] |
| `inputs` | object | - | 输入参数值（可选） |

#### 类型特定字段

| 节点类型 | 额外字段 | 说明 |
|----------|----------|------|
| `Event` | `event` | 事件名称，如 `"ReceiveBeginPlay"` |
| `CallFunction` | `function` | 函数名称，如 `"PrintString"` |
| `CustomEvent` | `eventName` | 自定义事件名称 |
| `VariableGet` | `variableName` | 变量名称 |
| `VariableSet` | `variableName` | 变量名称 |
| `Branch` | - | 无额外字段 |
| `Constant` | `value` | 常量值（Material） |
| `Constant3Vector` | `value` | [R, G, B] 数组（Material） |

### 2.3 连接定义

连接使用 `[source, target]` 二元组数组：

```json
"connections": [
  ["Event_0.then", "Print_0.execute"],
  ["Print_0.then", "Branch_0.execute"],
  ["Branch_0.true", "Delay_0.execute"]
]
```

**格式**: `"节点ID.Pin名称"`

### 2.4 支持的节点类型

#### Blueprint 模式

| Slim IR Type | UE Class | 说明 |
|--------------|----------|------|
| `Event` | `K2Node_Event` | 蓝图事件 |
| `CallFunction` | `K2Node_CallFunction` | 函数调用 |
| `Branch` | `K2Node_IfThenElse` | 条件分支 |
| `Sequence` | `K2Node_ExecutionSequence` | 顺序执行 |
| `CustomEvent` | `K2Node_CustomEvent` | 自定义事件 |
| `VariableGet` | `K2Node_VariableGet` | 获取变量 |
| `VariableSet` | `K2Node_VariableSet` | 设置变量 |
| `DoOnce` | `K2Node_MacroInstance` | 只执行一次 |
| `ForEachLoop` | `K2Node_MacroInstance` | 遍历循环 |
| `FlipFlop` | `K2Node_MacroInstance` | 切换器 |

#### Material 模式

| Slim IR Type | UE Class | 说明 |
|--------------|----------|------|
| `Constant` | `MaterialExpressionConstant` | 标量常量 |
| `Constant3Vector` | `MaterialExpressionConstant3Vector` | RGB 颜色 |
| `Multiply` | `MaterialExpressionMultiply` | 乘法 |
| `Add` | `MaterialExpressionAdd` | 加法 |
| `Lerp` | `MaterialExpressionLinearInterpolate` | 线性插值 |
| `TextureSample` | `MaterialExpressionTextureSample` | 纹理采样 |
| `TexCoord` | `MaterialExpressionTextureCoordinate` | UV 坐标 |
| `ScalarParameter` | `MaterialExpressionScalarParameter` | 标量参数 |

### 2.5 常用 Pin 名称

#### Blueprint Exec Pins
- `execute` - 执行入口
- `then` - 执行出口
- `true` / `false` - Branch 条件出口
- `LoopBody` - 循环体
- `Completed` - 完成

#### Blueprint Data Pins
- `InString` - PrintString 输入
- `Duration` - Delay 时长
- `Condition` - Branch 条件
- `ReturnValue` - 函数返回值

#### Material Pins
- `A`, `B` - 二元运算输入
- `Alpha` - Lerp 混合因子
- `out` / `Output` - 输出

---

## 3. 完整示例

### 3.1 Blueprint: BeginPlay → PrintString → Delay

**Slim IR (386 bytes)**:
```json
{
  "nodes": [
    { "type": "Event", "event": "ReceiveBeginPlay", "id": "Event_0", "pos": [0, 0] },
    { "type": "CallFunction", "function": "PrintString", "id": "Print_0", "pos": [300, 0], "inputs": { "InString": "Hello!" } },
    { "type": "CallFunction", "function": "Delay", "id": "Delay_0", "pos": [600, 0], "inputs": { "Duration": 2.0 } }
  ],
  "connections": [
    ["Event_0.then", "Print_0.execute"],
    ["Print_0.then", "Delay_0.execute"]
  ]
}
```

**生成的 T3D (~5400 bytes)**: 见 `scripts/testSlimIR.mjs` 输出

### 3.2 Blueprint: Branch 示例

```json
{
  "nodes": [
    { "type": "Event", "event": "ReceiveBeginPlay", "id": "BP_0", "pos": [0, 0] },
    { "type": "Branch", "id": "Branch_0", "pos": [300, 0] },
    { "type": "CallFunction", "function": "PrintString", "id": "TrueAction", "pos": [600, -100], "inputs": { "InString": "True!" } },
    { "type": "CallFunction", "function": "PrintString", "id": "FalseAction", "pos": [600, 100], "inputs": { "InString": "False!" } }
  ],
  "connections": [
    ["BP_0.then", "Branch_0.execute"],
    ["Branch_0.true", "TrueAction.execute"],
    ["Branch_0.false", "FalseAction.execute"]
  ]
}
```

### 3.3 Material: 颜色混合

```json
{
  "nodes": [
    { "type": "Constant3Vector", "id": "Red", "pos": [-400, -100], "value": [1.0, 0.0, 0.0] },
    { "type": "Constant3Vector", "id": "Blue", "pos": [-400, 100], "value": [0.0, 0.0, 1.0] },
    { "type": "ScalarParameter", "id": "Blend", "pos": [-400, 0], "inputs": { "ParameterName": "BlendAmount", "DefaultValue": 0.5 } },
    { "type": "Lerp", "id": "Mix", "pos": [-100, 0] }
  ],
  "connections": [
    ["Red.out", "Mix.A"],
    ["Blue.out", "Mix.B"],
    ["Blend.out", "Mix.Alpha"]
  ]
}
```

---

## 4. 实现架构

### 4.1 文件结构

```
js/ai/
├── SlimIRSchema.js      # 格式验证 + 类型常量
├── SlimIRToT3D.js       # 核心转换器
├── slimPrompts.js       # 简化版 System Prompt
├── SlimIRExperiment.js  # 实验原型 ✅ (已创建)
└── AIPanelElement.js    # 集成入口 (待修改)

scripts/
└── testSlimIR.mjs       # Node.js 测试 ✅ (已创建)

slim-ir-experiment.html  # 浏览器测试页 ✅ (已创建)
```

### 4.2 转换流程

```
┌─────────────┐    ┌──────────────────┐    ┌─────────────┐
│ User Prompt │───▶│ LLM (Slim IR)    │───▶│ Slim IR     │
└─────────────┘    │ + slimPrompts.js │    │ JSON        │
                   └──────────────────┘    └──────┬──────┘
                                                  │
                   ┌──────────────────┐           ▼
                   │ SlimIRToT3D.js   │◀──────────┘
                   │ (转换器)         │
                   └────────┬─────────┘
                            │
                            ▼
┌─────────────┐    ┌──────────────────┐    ┌─────────────┐
│ Canvas      │◀───│ Grammar.parse()  │◀───│ T3D Text    │
│ (渲染节点)   │    │ (现有解析器)     │    └─────────────┘
└─────────────┘    └──────────────────┘
```

### 4.3 核心模块说明

#### SlimIRSchema.js
```javascript
// 节点类型枚举
export const BLUEPRINT_NODE_TYPES = {
  Event: { class: 'K2Node_Event', pins: ['then'] },
  CallFunction: { class: 'K2Node_CallFunction', pins: ['execute', 'then'] },
  Branch: { class: 'K2Node_IfThenElse', pins: ['execute', 'Condition', 'true', 'false'] },
  // ...
}

// 验证函数
export function validateSlimIR(ir) { ... }
```

#### SlimIRToT3D.js
```javascript
// 主转换函数
export function convertSlimIRToT3D(ir, graphMode = 'blueprint') {
  // 1. 验证 IR
  // 2. 创建节点 T3D
  // 3. 解析连接
  // 4. 注入 LinkedTo
  return t3dText
}
```

#### slimPrompts.js
```javascript
export const SLIM_BLUEPRINT_PROMPT = `
You are a UE5 Blueprint expert. Generate nodes in Slim IR JSON format.

OUTPUT FORMAT:
{ "nodes": [...], "connections": [...] }

SUPPORTED TYPES: Event, CallFunction, Branch, Sequence, ...

EXAMPLE:
{ "nodes": [{"type":"Event","event":"ReceiveBeginPlay","id":"E0","pos":[0,0]}], "connections": [] }

OUTPUT ONLY JSON.
`
```

---

## 5. 实现进度

### 5.1 已完成 ✅

- [x] 格式规范设计
- [x] 最小实验验证 (386 bytes → 5400 bytes, 节省 92.8%)
- [x] 创建 `SlimIRExperiment.js` 原型
- [x] 创建 `slim-ir-experiment.html` 测试页
- [x] 创建 `scripts/testSlimIR.mjs` Node.js 测试
- [x] 创建 `SlimIRSchema.js` - 类型定义 + 验证
- [x] 创建 `SlimIRToT3D.js` - 生产级转换器
- [x] 创建 `slimPrompts.js` - 简化版 System Prompt (~2KB)
- [x] 修改 `AIPanelElement.js` - 集成 Slim IR 模式
- [x] 添加 `useSlimIR` 开关（默认启用）

### 5.2 待完成

- [ ] 浏览器内完整测试
- [ ] 添加设置界面开关
- [ ] Material 节点更完整支持
- [ ] 更多 Blueprint 节点类型支持

### 5.3 已知限制

1. **节点类型覆盖**：当前只支持基础节点类型，需要逐步扩展
2. **Material 模式**：尚未实现
3. **复杂连接**：多输出连接、数组参数等需要额外处理
4. **错误恢复**：需要添加更健壮的错误处理

---

## 6. 测试指南

### 6.1 Node.js 测试

```bash
cd e:\SF_ActiveDocs\MyPlugins\ueblueprint
node scripts/testSlimIR.mjs
```

预期输出：
```
🧪 SLIM IR EXPERIMENT
📥 INPUT: Slim IR - 386 bytes
📤 OUTPUT: T3D - ~5400 bytes
✅ VALIDATION: All checks passed
🎉 SUCCESS!
```

### 6.2 浏览器测试

```bash
npm start
# 打开 http://localhost:8080/slim-ir-experiment.html
# 点击 "运行实验" 按钮
```

### 6.3 验证检查项

- [ ] T3D 包含 `Begin Object` / `End Object`
- [ ] NodeGuid 是有效的 32 位 hex
- [ ] 连接有 `LinkedTo=(...)`
- [ ] `Grammar.parse()` 返回正确节点数
- [ ] 节点可在画布上渲染

---

## 7. 后续规划

### Phase 1: 核心完善
- 完成 SlimIRToT3D.js 生产版本
- 支持所有常用 Blueprint 节点
- 添加输入验证和错误处理

### Phase 2: 集成上线
- 修改 AIPanelElement 支持 Slim IR 模式
- 添加设置开关
- 更新文档和示例

### Phase 3: Material 支持
- 实现 Material 节点转换
- 更新 slimPrompts.js

### Phase 4: 优化迭代
- 收集使用反馈
- 扩展节点类型库
- 性能优化

---

## 附录 A: 函数映射表

常用函数的 Slim IR `function` 值与 T3D `FunctionReference` 映射：

| Slim IR function | MemberParent | MemberName |
|------------------|--------------|------------|
| `PrintString` | KismetSystemLibrary | PrintString |
| `Delay` | KismetSystemLibrary | Delay |
| `GetActorLocation` | (bSelfContext) | K2_GetActorLocation |
| `SetActorLocation` | (bSelfContext) | K2_SetActorLocation |
| `SpawnActor` | GameplayStatics | BeginDeferredActorSpawnFromClass |
| `MakeVector` | KismetMathLibrary | MakeVector |

---

## 附录 B: 相关文件路径

| 文件 | 说明 |
|------|------|
| `docs/slim_ir.md` | 本文档 |
| `docs/vibe_coding_levelup.md` | AI 功能演进记录 |
| `js/ai/prompts.js` | 当前 T3D 提示词 |
| `js/ai/nodeTemplates.json` | T3D 节点模板库 |
| `js/ai/AIPanelElement.js` | AI 面板主组件 |
| `js/parser/Grammar.js` | T3D 解析器 |
