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
```HTML
<ueb-blueprint>
    <template>


# UE Blueprint Vibe-Coding LLM Rules

> 本文档定义了 LLM 在生成 Unreal Engine 蓝图代码时必须遵循的规则与格式规范。

---

## 1. 项目概述

本项目 (`ueblueprint`) 是一个 Web 端 UE5 蓝图可视化编辑器，核心能力：
- 渲染 UE5 Blueprint T3D 格式文本
- 与 UE 引擎双向复制（Ctrl+C / Ctrl+V 互通）
- 基于 **Lit** 框架的 Web Components 实现

**技术栈**: JavaScript (ES Modules) · Lit · SCSS · Rollup

---

material 和 blueprint 是两个模式， 有独立的system prompt ， context 规则

## 2. T3D 格式规范 (Blueprint Text Format)

LLM 生成的蓝图必须严格遵循 UE5 T3D 序列化格式：

### 2.1 节点基础结构

```
Begin Object Class="/Script/BlueprintGraph.<NodeType>" Name="<NodeName>"
    NodePosX=<Integer>
    NodePosY=<Integer>
    NodeGuid=<32HexChars>
    CustomProperties Pin (...)
    CustomProperties Pin (...)
End Object
```

### 2.2 核心节点类型

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

### 2.3 Pin 格式规范

每个节点的引脚（Pin）必须包含完整属性：

```
CustomProperties Pin (
    PinId=<32HexGuid>,
    PinName="<名称>",
    Direction="EGPD_Output",  // 或留空表示 Input
    PinType.PinCategory="<类型>",
    PinType.PinSubCategory="",
    PinType.PinSubCategoryObject=None,
    LinkedTo=(<NodeName> <PinId>,),  // 连接目标
    PersistentGuid=00000000000000000000000000000000,
    bHidden=False,
    ...
)
```

**Pin 类别 (PinCategory):**
- `exec` - 执行流
- `bool` - 布尔值
- `int` / `int64` - 整数
- `real` (SubCategory: `float`/`double`) - 浮点数
- `struct` - 结构体
- `object` - 对象引用
- `string` / `name` / `text` - 字符串类型

### 2.4 GUID 生成规则

- NodeGuid: 32位大写十六进制字符串
- PinId: 32位大写十六进制字符串
- 每个 GUID 在图中必须唯一

---

## 3. 布局规则

### 3.1 坐标系统

```
NodePosX: 水平位置（右正左负）
NodePosY: 垂直位置（下正上负）
```

### 3.2 布局约定

| 节点类型 | X 位置 | 说明 |
|---------|--------|------|
| 事件/入口 | 最左侧 | X ≤ -400 |
| 变量 Get/Set | 中间偏左 | -400 < X < 0 |
| 函数调用 | 中间向右 | 0 ≤ X |
| 输出/返回 | 最右侧 | X ≥ 600 |

### 3.3 自动布局算法

生成节点时使用水平排列策略：

```javascript
const SPACING_X = 400;  // 节点水平间距
const SPACING_Y = 200;  // 节点垂直间距

// 简单横向排列
nodes.forEach((node, index) => {
    node.NodePosX = index * SPACING_X;
    node.NodePosY = 0;
});
```

---

## 4. LLM 输出格式要求

### 4.1 必须包含的元素

1. **完整的 Object 边界**: `Begin Object ... End Object`
2. **有效的 NodeGuid**: 32位唯一十六进制
3. **正确的坐标**: `NodePosX` 和 `NodePosY`
4. **完整的 Pin 定义**: 包含所有必要属性
5. **正确的连接关系**: `LinkedTo` 引用有效的 PinId

### 4.2 禁止事项

- ❌ 不要生成注释（`//` 或 `/* */`）
- ❌ 不要使用占位符（如 `<TODO>`）
- ❌ 不要省略任何必要属性
- ❌ 不要生成无效的 GUID 格式
- ❌ 不要在 Pin 内容中使用换行

### 4.3 输出示例

**用户请求**: "打印 Hello World"

**LLM 输出**:
```
Begin Object Class="/Script/BlueprintGraph.K2Node_Event" Name="K2Node_Event_0"
    EventReference=(MemberParent=/Script/CoreUObject.Class'"/Script/Engine.Actor"',MemberName="ReceiveBeginPlay")
    NodePosX=-200
    NodePosY=0
    NodeGuid=A1B2C3D4E5F6A1B2C3D4E5F6A1B2C3D4
    CustomProperties Pin (PinId=EXEC001EXEC001EXEC001EXEC0010,PinName="then",Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_CallFunction_0 EXEC002EXEC002EXEC002EXEC0020,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
End Object
Begin Object Class="/Script/BlueprintGraph.K2Node_CallFunction" Name="K2Node_CallFunction_0"
    FunctionReference=(MemberParent=/Script/CoreUObject.Class'"/Script/Engine.KismetSystemLibrary"',MemberName="PrintString")
    NodePosX=200
    NodePosY=0
    NodeGuid=B2C3D4E5F6A1B2C3D4E5F6A1B2C3D4E5
    CustomProperties Pin (PinId=EXEC002EXEC002EXEC002EXEC0020,PinName="execute",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,LinkedTo=(K2Node_Event_0 EXEC001EXEC001EXEC001EXEC0010,),PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
    CustomProperties Pin (PinId=THEN003THEN003THEN003THEN0030,PinName="then",Direction="EGPD_Output",PinType.PinCategory="exec",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
    CustomProperties Pin (PinId=SELF004SELF004SELF004SELF0040,PinName="self",PinFriendlyName=NSLOCTEXT("K2Node","Target","Target"),PinType.PinCategory="object",PinType.PinSubCategory="",PinType.PinSubCategoryObject=/Script/CoreUObject.Class'"/Script/Engine.KismetSystemLibrary"',PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,PersistentGuid=00000000000000000000000000000000,bHidden=True,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
    CustomProperties Pin (PinId=STR005STR005STR005STR0050000,PinName="InString",PinType.PinCategory="string",PinType.PinSubCategory="",PinType.PinSubCategoryObject=None,PinType.PinSubCategoryMemberReference=(),PinType.PinValueType=(),PinType.ContainerType=None,PinType.bIsReference=False,PinType.bIsConst=False,PinType.bIsWeakPointer=False,PinType.bIsUObjectWrapper=False,PinType.bSerializeAsSinglePrecisionFloat=False,DefaultValue="Hello World",PersistentGuid=00000000000000000000000000000000,bHidden=False,bNotConnectable=False,bDefaultValueIsReadOnly=False,bDefaultValueIsIgnored=False,bAdvancedView=False,bOrphanedPin=False,)
End Object
```

---

## 5. 常用函数引用

### 5.1 系统函数

| 函数名 | MemberParent | 说明 |
|--------|--------------|------|
| `PrintString` | `KismetSystemLibrary` | 打印调试字符串 |
| `Delay` | `KismetSystemLibrary` | 延迟执行 |
| `SetTimer` | `TimerManager` | 设置定时器 |
| `GetGameTimeInSeconds` | `KismetSystemLibrary` | 获取游戏时间 |

### 5.2 数学函数

| 函数名 | MemberParent | 说明 |
|--------|--------------|------|
| `Add_FloatFloat` | `KismetMathLibrary` | 浮点加法 |
| `Multiply_FloatFloat` | `KismetMathLibrary` | 浮点乘法 |
| `RandomFloatInRange` | `KismetMathLibrary` | 随机浮点 |
| `FInterpTo` | `KismetMathLibrary` | 浮点插值 |

### 5.3 向量/变换

| 函数名 | MemberParent | 说明 |
|--------|--------------|------|
| `GetActorLocation` | `Actor` | 获取位置 |
| `SetActorLocation` | `Actor` | 设置位置 |
| `VInterpTo` | `KismetMathLibrary` | 向量插值 |
| `MakeVector` | `KismetMathLibrary` | 创建向量 |

---

## 6. 错误处理

### 6.1 验证检查清单

生成后自动验证：
- [ ] 所有 `Begin Object` 都有对应的 `End Object`
- [ ] 所有 GUID 格式正确（32位十六进制）
- [ ] 所有 `LinkedTo` 引用的 PinId 存在
- [ ] 所有坐标为整数
- [ ] 无语法错误（括号匹配、逗号正确）

### 6.2 常见错误及修复

| 错误 | 原因 | 修复 |
|------|------|------|
| 节点重叠 | 坐标相同 | 使用自动布局算法 |
| 连线断开 | PinId 不匹配 | 检查 LinkedTo 引用 |
| 类型不匹配 | Pin 类型错误 | 核对 PinCategory |
| 解析失败 | 格式错误 | 检查括号/引号配对 |

---

## 7. Few-Shot 学习模板

为提高 LLM 生成质量，在 System Prompt 中包含以下示例：

### 7.1 简单事件 + 函数调用

```
用户: 当游戏开始时打印 "Game Started"
输出: [BeginPlay事件 -> PrintString函数]
```

### 7.2 变量操作

```
用户: 获取玩家位置并打印
输出: [GetPlayerPawn -> GetActorLocation -> PrintString]
```

### 7.3 条件分支

```
用户: 如果血量小于 50 则播放受伤音效
输出: [Get Health -> Less Than -> Branch -> PlaySound]
```

---

## 8. System Prompt 模板

```
你是 Unreal Engine 5 蓝图生成专家。你的任务是根据用户描述生成可直接粘贴到 UE5 的蓝图 T3D 文本。

## 核心规则
1. 只输出 T3D 格式文本，不要任何解释
2. 每个节点必须有唯一的 NodeGuid 和 PinId
3. 使用正确的坐标实现合理布局
4. 确保所有连接 (LinkedTo) 双向正确
5. 使用完整的 Pin 属性格式

## 输出格式
直接输出 Begin Object...End Object 块，不使用代码块包裹。

## 布局策略
- 事件节点: X = -400
- 核心逻辑: X = 0, 200, 400...（每个节点间隔 200-400）
- 输出节点: X = 最大值

## 常用节点模板
[此处包含 3-5 个常用节点的完整 T3D 示例]
```

---

## 9. 开发路线图

按执行计划的阶段对应：

| 阶段 | 任务 | 相关规则 |
|------|------|---------|
| 第一阶段 | 硬编码测试 | §4 输出格式 |
| 第二阶段 | Prompt 调试 | §8 System Prompt |
| 第三阶段 | 自动布局 | §3 布局规则 |
| 第四阶段 | UI 集成 | - |
| 第五阶段 | 错误处理 | §6 错误处理 |

---

10. Slim IR 架构 (Token 优化)
核心思路：LLM 生成紧凑 JSON (~2KB prompt)，由 SlimIRToT3D.js 转换为 T3D。

支持的节点类型：Event, CallFunction, Branch, Sequence, CustomEvent

相关文件：

js/ai/SlimIRSchema.js - 类型定义
js/ai/SlimIRToT3D.js - 转换器
js/ai/slimPrompts.js - System Prompt
docs/slim_ir.md - 完整规范

## 11. 附录：项目文件结构

```
ueblueprint/
├── js/
│   ├── Blueprint.js          # 主蓝图组件 (Lit Web Component)
│   ├── Configuration.js      # 配置常量
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

*此文档随项目迭代更新，确保 LLM 生成内容与 ueblueprint 渲染器兼容。*
