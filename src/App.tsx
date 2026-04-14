import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CenterContent from './components/CenterContent';
import RightSidebar from './components/RightSidebar';
import TopBar from './components/TopBar';
import { mapMvuDataToGameData } from './dataMapper';
import { mockData } from './mockData';
import { GameData, TabType } from './types';

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
     * 高度方案：用 aspect-ratio 替代 h-screen。
     * ST 消息 iframe 初始视口很矮，100vh / h-screen 会把内容锁死在矮 iframe 里。
     * 改用 aspect-ratio 后，容器高度由宽度决定，body.scrollHeight 可被测量，
     * 配合酒馆助手的 iframe 自动撑高机制即可正常展开。
     */
    <div
      id="ac6-outer"
      className="relative w-full bg-hud-bg text-hud-text font-mono overflow-hidden aspect-[9/16] md:aspect-video"
    >
      <div
        className="relative w-full h-full bg-black flex flex-col overflow-hidden"
        style={{ boxShadow: '0 0 100px rgba(18, 148, 131, 0.2) inset' }}
      >
        <div className="crt-overlay"></div>
        <div className="crt-vignette"></div>

        {/* Grid Layout — sidebar折叠时中央内容占满宽度 */}
        <div className={`relative z-10 w-full h-full flex flex-col md:grid ${sidebarOpen ? 'md:grid-cols-[1fr_320px]' : 'md:grid-cols-[1fr]'} md:grid-rows-[64px_1fr] gap-2 md:gap-4 p-2 md:p-4 overflow-hidden`}>
          {/* Top Bar spans full width */}
          <div className={`${sidebarOpen ? 'md:col-span-2' : ''} flex-shrink-0 relative z-50`}>
            <TopBar activeTab={activeTab} setActiveTab={setActiveTab} data={gameData} />
          </div>

          {/* Center Content + Sidebar Toggle */}
          <div className="relative flex-1 overflow-hidden flex">
            <div className="relative flex-1 overflow-hidden border border-hud-border bg-hud-panel/30">
              <CenterContent activeTab={activeTab} data={gameData} />
            </div>

            {/* Sidebar Toggle Button — 仅PC端显示 */}
            <button
              onClick={() => setSidebarOpen(prev => !prev)}
              className="hidden md:flex items-center justify-center w-5 flex-shrink-0 border border-hud-border bg-hud-panel hover:bg-hud-accent/20 transition-colors cursor-pointer ml-1"
              title={sidebarOpen ? '收起侧栏' : '展开侧栏'}
            >
              {sidebarOpen ? <ChevronRight className="w-3 h-3 text-hud-accent" /> : <ChevronLeft className="w-3 h-3 text-hud-accent" />}
            </button>
          </div>

          {/* Right Sidebar — 折叠时完全不渲染，Canvas/动画零开销 */}
          {sidebarOpen && (
            <div className="hidden md:flex relative flex-col gap-3 overflow-y-auto overflow-x-hidden pr-2">
              <RightSidebar data={gameData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
