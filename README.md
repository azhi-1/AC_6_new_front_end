# AC6 风格机甲驾驶舱 UI (SillyTavern MVU 扩展)

## 项目简介
本项目是一个基于 React + Tailwind CSS + Framer Motion 构建的硬核科幻风格（FUI）前端界面，视觉灵感来源于《装甲核心6》（Armored Core 6）。
该界面专为 SillyTavern（酒馆）的 **MVU（Message Variable Update）变量系统** 设计，用于可视化展示游戏状态、机甲整备、驾驶员属性、通讯频道及任务面板。项目已完成深度的移动端适配与 UI 细节打磨。

## 核心功能模块
- **驾驶员状态 (PILOT)**：展示 APM、KRL 等级、综合驾驶加值、神经同步率 (Neural Sync) 及资金经验等。
- **AC整备面板 (MECH)**：展示机甲 12 个槽位的装备详情及机体整合数值（AP、装甲、ACS、护盾等）。
- **通讯频道 (COMM)**：展示角色立绘、好感度与默契度，支持立绘切换与预加载。
- **机库 (HANGAR)**：展示可用机甲部件库存与机库整备设备。
- **作战与行动 (MISSION)**：展示当前任务列表、任务状态、目标及报酬。

## MVU 变量系统接入指南

当前项目使用 `src/mockData.ts` 作为静态测试数据驱动 UI。要将其正式接入 SillyTavern 的 MVU 变量系统，请将以下逻辑交给 Claude 或在您的脚本中实现：

### 1. 数据获取核心逻辑
在 React 的顶层组件（如 `App.tsx`）中，使用以下逻辑替换现有的 `mockData` 引入：

```javascript
// 1. 等待 MVU 框架初始化
await waitGlobalInitialized('Mvu');

async function fetchMvuData() {
  // 2. 获取锚点：回溯查找最后一条 assistant 消息
  const lastMsgId = getLastMessageId();
  const messages = getChatMessages('0-1', { role: 'assistant' });
  // 假设 getChatMessages 返回数组，取最后一条的 ID
  const targetMsgId = messages.length > 0 ? messages[messages.length - 1].mesId : lastMsgId;

  // 3. 读取变量 (优先使用 Mvu，降级使用原生 getVariables)
  let variables;
  if (window.Mvu) {
    variables = Mvu.getMvuData({ type: 'message', message_id: targetMsgId });
  } else {
    variables = getVariables({ type: 'message', message_id: targetMsgId });
  }

  // 4. 提取数据
  const statData = _.get(variables, 'stat_data');
  
  // 5. 返回数据，如果提取失败则使用 mockData 兜底
  return statData || mockData;
}
```

### 2. React 状态集成示例
在 `App.tsx` 中，您可以这样管理状态：

```tsx
import React, { useState, useEffect } from 'react';
// 导入您的 mockData 作为兜底
import { mockData } from './mockData'; 

export default function App() {
  const [gameData, setGameData] = useState(mockData);

  useEffect(() => {
    // 定义获取数据的异步函数
    const loadData = async () => {
      try {
        const data = await fetchMvuData(); // 调用上方的获取逻辑
        setGameData(data);
      } catch (error) {
        console.error("MVU 数据获取失败:", error);
      }
    };

    loadData();

    // 可选：监听酒馆的楼层更新事件，或者设置定时器轮询以保持 UI 实时同步
    // eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, loadData);
  }, []);

  // ... 将 gameData 传递给子组件
  // <TopBar data={gameData} />
  // <CenterContent data={gameData} />
}
```

### 3. 注意事项
- **数据结构对齐**：请确保酒馆中 `schema.ts` 定义的 `stat_data` 结构与本项目 `src/types.ts` 中的 `GameData` 接口完全一致。如果不一致，需要在 `fetchMvuData` 步骤中进行数据映射（Mapping）。
- **图片跨域**：通讯频道的立绘使用了外部图床，在酒馆 iframe 中加载时请确保图床允许跨域（CORS），目前使用的 `imgchest.com` 测试正常。
