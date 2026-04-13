import React, { useEffect, useState } from 'react';
import { GameData } from '../types';
import PanelFrame from './shared/PanelFrame';

export default function RightSidebar({ data }: { data: GameData }) {
  return (
    <>
      <PanelFrame title="动力炉状态" className="flex-shrink-0">
        <div className="flex gap-2 items-center">
          <div className="w-16 h-16 border border-hud-border rounded-full flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 border-4 border-hud-accent rounded-full border-t-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
            <div className="absolute inset-2 border-2 border-hud-primary rounded-full border-b-transparent animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
            <span className="text-[8px] text-hud-accent">CORE</span>
          </div>
          <div className="flex-1 flex flex-col gap-1 text-[9px]">
            <div className="flex justify-between"><span className="text-hud-text/60">热量 (HEAT)</span><span className="text-orange-400">4128°C</span></div>
            <div className="flex justify-between"><span className="text-hud-text/60">出力 (OUTPUT)</span><span className="text-hud-accent">98%</span></div>
            <div className="flex justify-between"><span className="text-hud-text/60">冷却 (COOLANT)</span><span className="text-blue-400">正常</span></div>
            <div className="flex justify-between"><span className="text-hud-text/60">EN恢复 (RECOVERY)</span><span className="text-hud-accent">最佳</span></div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-1 mt-2">
          {['覆盖', '净化', '全开', '自定义'].map(btn => (
            <button key={btn} className="text-[8px] border border-hud-border bg-hud-bg hover:bg-hud-accent hover:text-black transition-colors py-0.5">
              {btn}
            </button>
          ))}
        </div>
      </PanelFrame>

      <PanelFrame title="战术资源水平" className="flex-shrink-0">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-hud-text/80">弹药剩余 (AMMO)</span>
            <span className="text-xs font-bold text-hud-accent">98%</span>
          </div>
          <div className="w-full h-1 bg-hud-bg border border-hud-border">
            <div className="h-full bg-hud-accent w-[98%]"></div>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-[10px] text-hud-text/80">维修套件 (REPAIR)</span>
            <div className="flex gap-1">
              {[1,2,3].map(i => <div key={i} className="w-4 h-2 bg-hud-accent"></div>)}
            </div>
          </div>
        </div>
      </PanelFrame>

      <PanelFrame title="驾驶员同步" className="flex-shrink-0">
        <NeuralSyncWave syncRate={data.pilot.stats.syncRate} />
      </PanelFrame>

      <PanelFrame title="战术数据链" className="flex-shrink-0">
        <div className="flex flex-col gap-1 text-[9px]">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-hud-accent rounded-full animate-pulse"></div>
            <span className="text-hud-accent">小队指挥官 在线</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-hud-accent rounded-full animate-pulse"></div>
            <span className="text-hud-accent">支援猎犬 在线</span>
          </div>
          {/* Fake Spectrum */}
          <div className="h-8 mt-2 flex items-end gap-[1px] opacity-70">
            {Array.from({length: 40}).map((_, i) => (
              <div key={i} className="w-full bg-hud-primary" style={{ height: `${Math.random() * 100}%`, transition: 'height 0.2s' }}></div>
            ))}
          </div>
        </div>
      </PanelFrame>

      <PanelFrame title="战斗日志" className="flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center mb-2 border-b border-hud-border/30 pb-1">
          <span className="text-[9px] text-hud-text/60">{data.global.time}</span>
          <span className="text-[9px] bg-red-500/20 text-red-400 px-1 border border-red-500/50 animate-pulse">实时</span>
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col gap-1 pr-1">
          {[34, 32, 31].map(id => (
            <div key={id} className="flex gap-2 items-start text-[9px] bg-hud-bg/50 p-1 border-l-2 border-hud-accent">
              <span className="text-hud-accent">[{id}]</span>
              <span className="text-hud-text/80">加密战术通讯 #{id}</span>
            </div>
          ))}
        </div>
      </PanelFrame>
    </>
  );
}

function NeuralSyncWave({ syncRate }: { syncRate: number }) {
  const [points, setPoints] = useState<number[]>(Array(50).fill(50));

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prev => {
        const newPoints = [...prev.slice(1)];
        // Generate heartbeat-like wave
        const isBeat = Math.random() > 0.8;
        const val = isBeat ? 50 + (Math.random() * 40 - 20) : 50 + (Math.random() * 4 - 2);
        newPoints.push(val);
        return newPoints;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const polylinePoints = points.map((p, i) => `${i * 4},${p}`).join(' ');

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-[10px] text-hud-text/80">同步率 (SYNC RATE)</span>
        <span className="text-sm font-bold text-hud-accent">{syncRate}%</span>
      </div>
      <div className="h-12 bg-hud-bg border border-hud-border/50 relative overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
          <polyline
            points={polylinePoints}
            fill="none"
            stroke="var(--color-hud-accent)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            style={{ filter: 'drop-shadow(0 0 4px var(--color-hud-accent))' }}
          />
        </svg>
      </div>
    </div>
  );
}
