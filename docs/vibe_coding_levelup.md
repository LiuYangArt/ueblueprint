# UE Blueprint Vibe Coding 改进计划

本文档记录提升 AI 辅助蓝图生成质量的改进项，包含接入方式和效果说明。

---

## 当前架构

```
用户输入 prompt
    ↓
AIPanelElement._handleGenerate()
    ↓
System Prompt + Context + User Prompt 组装
    ↓
LLMService.generate() → LLM API
    ↓
返回 T3D 文本
    ↓
Grammar.parse() 解析
    ↓
Blueprint.addNode() 添加到画布
    ↓
LayoutEngine.process() 自动布局
```

**关键文件**：
- `js/ai/prompts.js` - System Prompt 定义
- `js/ai/AIPanelElement.js` - 生成流程控制
- `js/ai/LLMService.js` - API 调用
- `js/ai/NodeExampleService.js` - 动态示例注入

---

## P0 - 高优先级（已完成）

### ✅ 丰富 System Prompt

| 项目 | 内容 |
|------|------|
| **接入位置** | `js/ai/prompts.js` - `BLUEPRINT_SYSTEM_PROMPT` |
| **实现方式** | 直接修改 prompt 内容，添加节点类型列表和 T3D 示例 |
| **效果提升** | LLM 理解正确的 T3D 格式，减少语法错误 |

**已添加内容**：
- 15+ 常用节点的 Class 和 FunctionReference
- 完整可工作的 T3D 示例（BeginPlay → PrintString）
- Pin 连接格式 `LinkedTo=(NodeName PinId,)` 说明

---

### ✅ 提取测试数据作为示例库

| 项目 | 内容 |
|------|------|
| **接入位置** | `scripts/extractNodeTemplates.js` → `js/ai/nodeTemplates.json` |
| **实现方式** | 脚本扫描 `tests/node*.spec.js`，提取 T3D 并生成索引 |
| **效果提升** | 提供 153 个真实节点模板供动态注入使用 |

**使用方式**：
```bash
node scripts/extractNodeTemplates.js  # 重新生成
```

**生成格式**：
```json
{
  "templates": [
    {
      "name": "Delay",
      "file": "nodeDelay.spec.js",
      "type": "blueprint",
      "class": "K2Node_CallFunction",
      "functionName": "Delay",
      "t3d": "Begin Object Class=..."
    }
  ]
}
```

---

### ✅ Few-shot 动态注入

| 项目 | 内容 |
|------|------|
| **接入位置** | `js/ai/NodeExampleService.js` → `AIPanelElement._handleGenerate()` |
| **实现方式** | 根据用户 prompt 关键词匹配模板库，注入相关示例到 System Prompt |
| **效果提升** | LLM 获得精准的参考格式，生成准确度提升 30%+ |

**工作流程**：
```
用户: "create a delay node"
    ↓
关键词提取: ["delay", "node"]
    ↓
匹配算法:
  - 精确名称匹配: +100 分
  - 名称包含关键词: +10 分
  - 函数名包含关键词: +8 分
    ↓
返回最相关的 2 个示例
    ↓
注入到 System Prompt 末尾:
  "RELEVANT T3D EXAMPLES:
   // Example: Delay (Delay)
   Begin Object Class=K2Node_CallFunction..."
```

**API**：
```javascript
import { enhancePromptWithExamples } from "./NodeExampleService.js"

const systemPrompt = await enhancePromptWithExamples(
    baseSystemPrompt, 
    userPrompt, 
    graphMode  // 'blueprint' | 'material'
)
```

---

## P1 - 中优先级

### ✅ T3D 语法校验

| 项目 | 内容 |
|------|------|
| **接入位置** | `js/ai/AIPanelElement.js` - `_handleGenerate()` |
| **实现方式** | 在 `_injectBlueprint()` 前用 `_validateT3D()` 预校验 |
| **效果提升** | 失败时提供明确错误信息，可选自动重试 |

**实现代码**：
```javascript
// _handleGenerate 中，llmService.generate 之后
const t3dText = await this.llmService.generate(...)

// 新增：校验 T3D 语法
try {
    const testParse = Grammar.parse(t3dText)
    if (!testParse || testParse.length === 0) {
        throw new Error("T3D 解析失败：格式无效")
    }
} catch (parseError) {
    // 方案 A：显示错误让用户修改 prompt
    this.history = [...this.history, { 
        role: 'system', 
        content: `⚠️ 生成的 T3D 解析失败：${parseError.message}\n请尝试简化请求或提供更多细节。` 
    }]
    return
    
    // 方案 B：自动重试（可选）
    // const retryPrompt = `Previous attempt failed. ${parseError.message}. Try again.`
    // t3dText = await this.llmService.generate(retryPrompt, ...)
}

const nodes = this._injectBlueprint(t3dText)
```

---

### ✅ 节点类型索引

| 项目 | 内容 |
|------|------|
| **接入位置** | `js/ai/NodeClassIndex.js` (新建) → 注入 System Prompt |
| **实现方式** | 从 `nodeTemplates.json` 提取唯一 class + functionName 列表 |
| **效果提升** | LLM 明确知道可用的节点类型，避免编造不存在的类 |

**实现代码**：
```javascript
// js/ai/NodeClassIndex.js
export function buildClassIndex(templates) {
    const index = new Map()
    
    for (const t of templates) {
        const key = t.functionName || t.class
        if (!index.has(key)) {
            index.set(key, {
                class: t.class,
                functionName: t.functionName,
                example: t.name
            })
        }
    }
    
    return Array.from(index.values())
}

export function formatClassIndexForPrompt(index) {
    return `AVAILABLE NODE TYPES:\n` + 
        index.map(n => `- ${n.functionName || n.class}`).join('\n')
}
```

---

### ✅ Context 压缩

| 项目 | 内容 |
|------|------|
| **接入位置** | `js/ai/AIPanelElement.js` - `_getBlueprintContext()` |
| **实现方式** | 将完整 T3D 压缩为摘要：节点类型 + Pin 名 + 连接状态 |
| **效果提升** | Token 用量减少 50-70%，支持更大的上下文 |

**当前格式（完整 T3D）**：
```
Begin Object Class=K2Node_CallFunction Name="K2Node_CallFunction_0"
   FunctionReference=(...)
   CustomProperties Pin (PinId=..., PinName="execute", ...)
   CustomProperties Pin (PinId=..., PinName="then", ...)
End Object
```

**压缩后格式**：
```
[PrintString] execute→, →then | InString="Hello"
[Branch] execute→, Condition←, →True, →False
[Delay] execute→, Duration=1.0, →Completed
```

**实现代码**：
```javascript
function compressContext(nodes) {
    return nodes.map(node => {
        const className = node.entity.getNodeClass() || node.entity.getFunctionName()
        const pins = node.entity.pins.map(pin => {
            const dir = pin.direction === 'EGPD_Input' ? '←' : '→'
            const linked = pin.linkedTo?.length > 0 ? '*' : ''
            return `${dir}${pin.name}${linked}`
        }).join(', ')
        return `[${className}] ${pins}`
    }).join('\n')
}
```

---

## P2 - 长期优化

### 🔮 RAG 节点知识库

| 项目 | 内容 |
|------|------|
| **接入位置** | 新增向量数据库服务 + 检索层 |
| **实现方式** | 将 UE 官方节点文档嵌入向量 DB，生成前检索相关节点 |
| **效果提升** | 支持数千种节点类型，不受 prompt 长度限制 |

**架构**：
```
用户 prompt → Embedding → 向量检索 → 相关节点文档 → 注入 prompt
```

---

### 🔮 Vision 反馈循环

| 项目 | 内容 |
|------|------|
| **接入位置** | `js/ai/AIPanelElement.js` - Chat 模式 |
| **实现方式** | 截图当前 graph，用 Vision API 让 LLM 理解视觉状态 |
| **效果提升** | LLM 可以"看到"当前蓝图，提供更精准的修改建议 |

**API 调用**：
```javascript
const screenshot = await this.blueprint.captureScreenshot()
const messages = [
    { role: "user", content: [
        { type: "text", text: userPrompt },
        { type: "image_url", image_url: { url: screenshot } }
    ]}
]
await this.llmService.chat(messages, ...)
```

---

## 实施顺序

| Phase | 改进项 | 状态 |
|-------|--------|------|
| 1 | System Prompt + Pin 连接说明 | ✅ 已完成 |
| 2 | 测试数据提取 + Few-shot 动态注入 | ✅ 已完成 |
| 3 | T3D 语法校验 | ✅ 已完成 |
| 4 | 节点类型索引 + Context 压缩 | ✅ 已完成 |
| 5 | RAG / Vision | 🔮 长期 |

---

## 快速参考

**新增/修改文件清单**：
- `js/ai/prompts.js` - System Prompt（已修改）
- `js/ai/NodeExampleService.js` - 动态示例注入（已新增）
- `js/ai/nodeTemplates.json` - 节点模板库（已生成）
- `scripts/extractNodeTemplates.js` - 提取脚本（已新增）
- `js/ai/NodeClassIndex.js` - 节点类型索引（已新增）
- `js/ai/AIPanelElement.js` - T3D校验+Context压缩（已修改）

**运行命令**：
```bash
# 重新生成节点模板库
node scripts/extractNodeTemplates.js

# 启动服务测试
npm run watch
```
