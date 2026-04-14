import React, { useState, useEffect } from 'react';
import { mockData } from './mockData';
import { GameData, TabType } from './types';
import { mapMvuDataToGameData } from './dataMapper';
import TopBar from './components/TopBar';
import RightSidebar from './components/RightSidebar';
import CenterContent from './components/CenterContent';

/**
 * 从最新 assistant 楼层读取 MVU stat_data，映射为 GameData。
 * 若不在 ST 环境（如 Vite dev 模式）则返回 null，调用方使用 mockData 兜底。
 */
async function fetchGameData(): Promise<GameData | null> {
  if (typeof getLastMessageId === 'undefined') return null;

  try {
    // 找最后一条 assistant 楼层
    const lastMsgId = getLastMessageId();
    const messages = getChatMessages(`0-${lastMsgId}`, { role: 'assistant' });
    const targetMsgId =
      messages.length > 0 ? messages[messages.length - 1].message_id : lastMsgId;

    // 优先使用 MVU，降级使用原生 getVariables
    let variables: Record<string, any>;
    if (typeof Mvu !== 'undefined') {
      variables = Mvu.getMvuData({ type: 'message', message_id: targetMsgId });
    } else {
      variables = getVariables({ type: 'message', message_id: targetMsgId });
    }

    const stat_data =
      typeof _ !== 'undefined' ? _.get(variables, 'stat_data') : variables?.stat_data;

    if (!stat_data) return null;

    return mapMvuDataToGameData(stat_data);
  } catch (e) {
    console.error('[AC6 HUD] fetchGameData 失败:', e);
    return null;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('MAIN');
  const [gameData, setGameData] = useState<GameData>(mockData);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchGameData();
      if (data) setGameData(data);
    };

    const init = async () => {
      try {
        // 等待 MVU 框架初始化
        if (typeof waitGlobalInitialized !== 'undefined') {
          await waitGlobalInitialized('Mvu');
        }

        await loadData();

        // 监听变量更新事件，保持 UI 实时同步
        if (typeof eventOn !== 'undefined' && typeof Mvu !== 'undefined') {
          eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, loadData);
        }
      } catch (e) {
        console.error('[AC6 HUD] MVU 初始化失败，使用 mockData:', e);
      }
    };

    init();
  }, []);

  return (
    /*
     * 高度方案：用 aspect-ratio: 16/9 替代 h-screen。
     * ST 消息 iframe 初始视口很矮，100vh / h-screen 会把内容锁死在矮 iframe 里。
     * 改用 aspect-ratio 后，容器高度由宽度决定，body.scrollHeight 可被测量，
     * 配合酒馆助手的 iframe 自动撑高机制即可正常展开。
     */
    <div
      id="ac6-outer"
      className="relative w-full bg-hud-bg text-hud-text font-mono overflow-hidden"
      style={{ aspectRatio: '16 / 9' }}
    >
      <div
        className="relative w-full h-full bg-black flex flex-col overflow-hidden"
        style={{ boxShadow: '0 0 100px rgba(18, 148, 131, 0.2) inset' }}
      >
        <div className="crt-overlay"></div>
        <div className="crt-vignette"></div>

        {/* Grid Layout */}
        <div className="relative z-10 w-full h-full flex flex-col md:grid md:grid-cols-[1fr_320px] md:grid-rows-[64px_1fr] gap-2 md:gap-4 p-2 md:p-4 overflow-hidden">
          {/* Top Bar spans full width */}
          <div className="md:col-span-2 flex-shrink-0">
            <TopBar activeTab={activeTab} setActiveTab={setActiveTab} data={gameData} />
          </div>

          {/* Center Content */}
          <div className="relative flex-1 overflow-hidden border border-hud-border bg-hud-panel/30">
            <CenterContent activeTab={activeTab} data={gameData} />
          </div>

          {/* Right Sidebar */}
          <div className="hidden md:flex relative flex-col gap-3 overflow-y-auto overflow-x-hidden pr-2">
            <RightSidebar data={gameData} />
          </div>
        </div>
      </div>
    </div>
  );
}
