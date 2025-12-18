---
trigger: always_on
---

这个项目是基于 https://github.com/barsdeveloper/ueblueprint 做的一个项目，用于ue5蓝图的vibe coding。 


# 开发规范 **重要**
- 为了方便与原仓库的改动进行merge，不要改动原仓库文件。 建立新文件来做我们的功能。 
- 原仓库 https://github.com/barsdeveloper/ueblueprint
- 每次改动完执行  npm run build 进行编译
- 绝对禁止把api key等私密数据硬编码到代码中，或把配置文件上传到github
- 使用context7 mcp检索unreal的api


开发中的测试页面
http://localhost:8080/ai-demo.html

---

# UE Blueprint Vibe-Coding LLM Rules

> 本文档定义了 LLM 在生成 Unreal Engine 蓝图代码时必须遵循的规则与格式规范。
> 
> **关键变更**: LLM 现在使用 **Slim IR (简化中间表示)** JSON 格式生成节点，而不是原始 T3D 格式。

---

## 1. 项目概述

本项目 (`ueblueprint`) 是一个 Web 端 UE5 蓝图可视化编辑器，核心能力：
- 渲染 UE5 Blueprint T3D 格式文本
- 与 UE 引擎双向复制（Ctrl+C / Ctrl+V 互通）
- 基于 **Lit** 框架的 Web Components 实现
- **LLM 通过 Slim IR 生成蓝图节点**（由转换器自动转为 T3D）

**技术栈**: JavaScript (ES Modules) · Lit · SCSS · Rollup

---

material 和 blueprint 是两个模式， 有独立的system prompt ， context 规则

---

## 2. Slim IR 格式规范 (LLM 输出格式)

> LLM 生成的蓝图必须使用 **Slim IR JSON 格式**，由 `SlimIRToT3D.js` 自动转换为完整 T3D。

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

### 2.6 常用函数引用

| Slim IR function | 说明 |
|------------------|------|
| `PrintString` | 打印调试字符串 |
| `Delay` | 延迟执行 |
| `GetActorLocation` | 获取位置 |
| `SetActorLocation` | 设置位置 |
| `MakeVector` | 创建向量 |
| `Multiply` / `Add` / `Subtract` / `Divide` | 数学运算 |
| `Sin` / `Cos` / `Abs` | 三角函数/绝对值 |
| `GetGameTimeInSeconds` | 获取游戏时间 |
| `Conv_FloatToString` | 浮点转字符串（PrintString前必须调用） |
| `Conv_IntToString` | 整数转字符串 |

---

## 3. LLM 输出规则

### 3.1 必须遵循

1. **只输出 JSON**：不要任何解释、Markdown 代码块
2. **有效的 id**：每个节点有唯一的 `id` 字符串
3. **合理的坐标**：节点 `pos` 使用合理布局（水平间隔约 300）
4. **正确的连接**：`connections` 中的节点ID和Pin名称必须存在
5. **类型转换**：连接到 `PrintString.InString` 前必须使用 `Conv_*ToString` 函数

### 3.2 禁止事项

- ❌ 不要生成 Markdown 代码块包裹
- ❌ 不要生成注释或解释文字
- ❌ 不要使用占位符（如 `<TODO>`）
- ❌ 不要生成不支持的节点类型
- ❌ 不要省略必要字段（type, id, pos）

### 3.3 布局约定

| 节点类型 | X 位置 | 说明 |
|---------|--------|------|
| 事件/入口 | 0 | 最左侧 |
| 核心逻辑 | 300, 600, 900... | 每个节点间隔 300 |
| 分支节点 | 适当偏移 Y | 上下分布 |

---

## 4. 完整示例

### 4.1 Blueprint: BeginPlay → PrintString

**用户请求**: "打印 Hello World"

**LLM 输出**:
```json
{"nodes":[{"type":"Event","event":"ReceiveBeginPlay","id":"E0","pos":[0,0]},{"type":"CallFunction","function":"PrintString","id":"P0","pos":[300,0],"inputs":{"InString":"Hello World"}}],"connections":[["E0.then","P0.execute"]]}
```

### 4.2 Blueprint: 带分支的逻辑

**用户请求**: "BeginPlay 时检查条件，为真打印 Yes，为假打印 No"

**LLM 输出**:
```json
{"nodes":[{"type":"Event","event":"ReceiveBeginPlay","id":"E0","pos":[0,0]},{"type":"Branch","id":"B0","pos":[300,0]},{"type":"CallFunction","function":"PrintString","id":"T0","pos":[600,-100],"inputs":{"InString":"Yes"}},{"type":"CallFunction","function":"PrintString","id":"F0","pos":[600,100],"inputs":{"InString":"No"}}],"connections":[["E0.then","B0.execute"],["B0.true","T0.execute"],["B0.false","F0.execute"]]}
```

### 4.3 Blueprint: 带延迟的序列

**用户请求**: "游戏开始时打印 Start，等2秒后打印 Done"

**LLM 输出**:
```json
{"nodes":[{"type":"Event","event":"ReceiveBeginPlay","id":"E0","pos":[0,0]},{"type":"CallFunction","function":"PrintString","id":"P1","pos":[300,0],"inputs":{"InString":"Start"}},{"type":"CallFunction","function":"Delay","id":"D0","pos":[600,0],"inputs":{"Duration":2.0}},{"type":"CallFunction","function":"PrintString","id":"P2","pos":[900,0],"inputs":{"InString":"Done"}}],"connections":[["E0.then","P1.execute"],["P1.then","D0.execute"],["D0.Completed","P2.execute"]]}
```

### 4.4 Material: 颜色混合

```json
{"nodes":[{"type":"Constant3Vector","id":"Red","pos":[-400,-100],"value":[1.0,0.0,0.0]},{"type":"Constant3Vector","id":"Blue","pos":[-400,100],"value":[0.0,0.0,1.0]},{"type":"ScalarParameter","id":"Blend","pos":[-400,0],"inputs":{"ParameterName":"BlendAmount","DefaultValue":0.5}},{"type":"Lerp","id":"Mix","pos":[-100,0]}],"connections":[["Red.out","Mix.A"],["Blue.out","Mix.B"],["Blend.out","Mix.Alpha"]]}
```

---

## 5. 错误处理

### 5.1 验证检查清单

生成后自动验证：
- [ ] JSON 格式有效
- [ ] 所有节点有 `type`, `id`, `pos`
- [ ] 所有 `connections` 引用的节点ID存在
- [ ] 所有 `connections` 引用的Pin名称有效
- [ ] 无不支持的节点类型

### 5.2 常见错误及修复

| 错误 | 原因 | 修复 |
|------|------|------|
| 类型不匹配 | 浮点直接连 PrintString | 使用 Conv_FloatToString |
| 连接失败 | Pin 名称拼写错误 | 检查 §2.5 Pin 名称 |
| 节点重叠 | pos 坐标相同 | 调整间隔 |
| 解析失败 | JSON 格式错误 | 检查引号、逗号 |

---

## 6. 技术实现架构

### 6.1 文件结构

```
js/ai/
├── SlimIRSchema.js      # 格式验证 + 类型常量
├── SlimIRToT3D.js       # 核心转换器 (Slim IR → T3D)
├── slimPrompts.js       # LLM System Prompt
└── AIPanelElement.js    # AI 面板集成入口
```

### 6.2 转换流程

```
┌─────────────┐    ┌──────────────────┐    ┌─────────────┐
│ User Prompt │───▶│ LLM              │───▶│ Slim IR     │
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

### 6.3 Token 节省效果

| 指标 | 原 T3D | Slim IR | 节省 |
|------|--------|---------|------|
| System Prompt | ~17KB | ~2KB | 88% |
| 单节点输出 | ~2-5KB | ~200-500B | 90%+ |
| 错误率 | 较高 | 极低 | - |

---

## 7. 项目文件结构

```
ueblueprint/
├── js/
│   ├── Blueprint.js          # 主蓝图组件 (Lit Web Component)
│   ├── Configuration.js      # 配置常量
│   ├── ai/                   # AI 相关模块
│   │   ├── SlimIRSchema.js   # Slim IR 类型定义
│   │   ├── SlimIRToT3D.js    # Slim IR 转 T3D 转换器
│   │   ├── slimPrompts.js    # LLM System Prompt
│   │   └── AIPanelElement.js # AI 面板组件
│   ├── entity/               # T3D 实体类型定义
│   │   ├── ObjectEntity.js   # 节点对象实体
│   │   ├── PinEntity.js      # 引脚实体
│   │   └── ...
│   ├── serialization/        # 序列化/反序列化
│   │   └── Grammar.js        # Parsernostrum 解析语法
│   └── element/              # UI 元素
│       ├── NodeElement.js    # 节点 DOM 元素
│       └── LinkElement.js    # 连线 DOM 元素
├── scss/                     # 样式
├── dist/                     # 构建输出
└── index.html                # 演示页面
```

---

## 附录 A: T3D 格式参考 (开发者内部参考)

> 以下内容用于理解 `SlimIRToT3D.js` 的底层转换逻辑，LLM 无需直接生成。

### A.1 节点基础结构

```
Begin Object Class="/Script/BlueprintGraph.<NodeType>" Name="<NodeName>"
    NodePosX=<Integer>
    NodePosY=<Integer>
    NodeGuid=<32HexChars>
    CustomProperties Pin (...)
    CustomProperties Pin (...)
End Object
```

### A.2 Pin 格式规范

```
CustomProperties Pin (
    PinId=<32HexGuid>,
    PinName="<名称>",
    Direction="EGPD_Output",
    PinType.PinCategory="<类型>",
    LinkedTo=(<NodeName> <PinId>,),
    ...
)
```

### A.3 核心节点类型

| 类型 | Class 路径 | 用途 |
|------|-----------|------|
| 函数入口 | `K2Node_FunctionEntry` | 函数/事件入口点 |
| 函数调用 | `K2Node_CallFunction` | 调用蓝图/C++函数 |
| 变量获取 | `K2Node_VariableGet` | Get 变量节点 |
| 变量设置 | `K2Node_VariableSet` | Set 变量节点 |
| 事件节点 | `K2Node_Event` | 自定义事件 |
| 分支节点 | `K2Node_IfThenElse` | 条件分支 |
| 路由节点 | `K2Node_Knot` | 连线 Reroute 节点 |
| 宏节点 | `K2Node_MacroInstance` | 宏调用 |

### A.4 Pin 类别

- `exec` - 执行流
- `bool` - 布尔值
- `int` / `int64` - 整数
- `real` (SubCategory: `float`/`double`) - 浮点数
- `struct` - 结构体
- `object` - 对象引用
- `string` / `name` / `text` - 字符串类型

---

## 附录 B: 函数映射表

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

## 附录 C: 相关文档

| 文件 | 说明 |
|------|------|
| `docs/slim_ir.md` | Slim IR 完整规范 |
| `docs/vibe_coding_levelup.md` | AI 功能演进记录 |
| `js/ai/slimPrompts.js` | LLM System Prompt |
| `js/ai/SlimIRToT3D.js` | 转换器实现 |

---

## 附录 D: Web 页面使用

### Use in a web page

You can check `index.html` for a working example, the main steps are the following:
1. Make the `dist` directory available in your website by copying it or installing through npm `npm i ueblueprint`.
2. Include `dist/css/ueb-style.min.css` stylesheet in your page.
3. Define eventual CSS variables.
```HTML
<style>
    ueb-blueprint {
        --ueb-height: 500px;
    }
</style>
```
4. Import the class Blueprint in JavaScript (this library uses modules).
```HTML
<script type="module">
    import { Blueprint } from "./dist/ueblueprint.min.js"
</script>
```
5. Define your blueprint by writing the code inside a `template`, inside a `ueb-blueprint` element.
Configuration:
    - Height: `<ueb-blueprint style="--ueb-height: 500px">`
    - Light mode: `<ueb-blueprint class="ueb-light-mode">`
    - Initial zoom: `<ueb-blueprint data-zoom="-4">`
    - Graph type: `<ueb-blueprint data-type="MATERIAL FUNCTION">`

---

*此文档随项目迭代更新，确保 LLM 生成内容与 ueblueprint 渲染器兼容。*
