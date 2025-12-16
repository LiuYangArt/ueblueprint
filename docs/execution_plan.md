

一、 核心模块架构 (Module Breakdown)
你需要开发以下四个模块来实现这个功能：

1. 前端交互模块 (UI/UX Layer)
功能：在现有的 ueblueprint 界面上增加一个浮层。

组件：

一个文本输入框（让用户输入需求，如“创建一把AK47开火的逻辑”）。

一个“生成 (Generate)”按钮。

一个状态指示器（显示“思考中...”或“渲染中”）。

2. LLM 服务模块 (Intelligence Layer)
功能：接收用户需求，组装提示词（Prompt），并返回 UE 格式的文本。

建议：为了安全（隐藏 API Key）和跨域处理，建议用 Python (FastAPI/Flask) 或 Node.js 写一个简单的后端接口。如果只是个人用，直接在前端调 API 也可以。

核心产出：LLM 输出一段原始的 Blueprint 文本（此时坐标通常是乱的）。

3. 布局与解析引擎 (The Layout Engine) —— 最关键模块
痛点：LLM 生成的文本通常不包含坐标，或者坐标都是 (0,0)。如果直接喂给渲染器，所有节点会叠在一起。

功能：

解析：用正则提取 LLM 返回文本中的所有 Begin Object。

排版：根据节点类型（Event 在左，Function 在右）计算每个节点的 NodePosX 和 NodePosY。

重组：将带有新坐标的文本重新拼装回去。

4. 蓝图适配器 (Blueprint Adapter)
功能：将处理好的文本注入到现有的 ueblueprint 库中进行渲染。

操作：调用该库的底层方法（如 app.loadText(...)），触发布局更新。

二、 执行步骤 (Execution Roadmap)
建议按照以下顺序开发，每一步都是一个可测试的里程碑。

第一阶段：环境准备与接口探查
代码理解：在 ueblueprint 源码中找到处理“粘贴”事件的函数。

目标：找到是哪个函数把剪贴板里的文本变成了屏幕上的节点。假设该函数叫 importNodesFromText(text)。

硬编码测试：

在代码里写死一段 UE 蓝图文本（比如打印 Hello World）。

做一个按钮，点击后调用上面的函数。

验收标准：点击按钮，屏幕上出现节点，且不需要手动按 Ctrl+V。

第二阶段：后端与 Prompt 调试 (不含坐标)
搭建 LLM 调用：写一个脚本调用 GPT-4o 或 DeepSeek。

调试 System Prompt：

这是最难的一步。你需要告诉 LLM：“你必须严格输出 UE5 的 T3D 格式”。

技巧：使用 "Few-Shot"（少样本提示），给 LLM 喂两三个简单的蓝图文本范例。

验证输出：把 LLM 生成的文本（先不管坐标），手动复制到你的工具里看能否报错。只要能显示（哪怕叠在一起）就算成功。

第三阶段：开发“自动布局算法” (Auto-Layout)
这是让产品从“能用”变成“好用”的关键。

编写解析器：写一个 JS 函数，把长字符串切分成对象数组。

实现简单流式布局：

设置一个变量 currentX = 0。

遍历每个节点，将 NodePosX 设置为 currentX。

每次循环 currentX += 300 (节点大概的宽度)。

集成：LLM Output -> 解析 -> 修改坐标 -> 重组文本 -> 渲染。

验收标准：生成的节点在屏幕上呈一字长蛇阵排开，不再重叠。

第四阶段：UI 集成与交互
修改 Vue 组件：在页面顶部或侧边添加“AI 助手”面板。

串联流程：用户输入 -> 发送后端 -> 后端返回文本 -> 前端自动布局 -> 渲染上屏。

第五阶段：优化与修补
错误处理：如果 LLM 生成了错误的格式，前端要提示“生成失败，请重试”。

复杂布局（可选）：如果节点很多，一字长蛇阵太长了，可以改进算法实现简单的“换行”或“树状排列”。

三、 关键代码片段示例 (供参考)
1. 正则替换坐标的思路 (JavaScript)
如果你不想写复杂的解析器，可以用正则暴力替换坐标来实现简单的横向排列：

JavaScript

function autoLayoutBlueprint(rawText) {
    let offsetX = 0;
    const spacing = 400; // 每个节点的间距
    
    // 正则匹配 NodePosX=数字
    // 这是一个简化版逻辑，实际可能需要更严谨的解析
    return rawText.replace(/NodePosX=([-\d]+)/g, (match) => {
        let newPos = `NodePosX=${offsetX}`;
        offsetX += spacing;
        return newPos;
    });
}
