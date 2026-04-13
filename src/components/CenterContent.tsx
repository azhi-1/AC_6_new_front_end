import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TabType, GameData } from '../types';
import CommTab from './tabs/CommTab';
import MechTab from './tabs/MechTab';
import PanelFrame from './shared/PanelFrame';

export default function CenterContent({ activeTab, data }: { activeTab: TabType, data: GameData }) {
  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {activeTab === 'MAIN' && <MainTab />}
          {activeTab === 'PILOT' && <PilotTab data={data} />}
          {activeTab === 'MECH' && <MechTab data={data} />}
          {activeTab === 'COMM' && <CommTab data={data} />}
          {activeTab === 'HANGAR' && <HangarTab data={data} />}
          {activeTab === 'MISSION' && <MissionTab data={data} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function MainTab() {
  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
      <img src="https://cdn.imgchest.com/files/95054217c44d.png" alt="Main Background" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen" />
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 border border-hud-accent bg-hud-bg/80 px-6 py-2 backdrop-blur-md hidden md:block">
        <span className="text-hud-accent font-bold tracking-[0.3em] text-sm animate-pulse">
          ///MAIN SYSTEM//COMBAT MODE ACTIVE///
        </span>
      </div>
    </div>
  );
}

function PilotTab({ data }: { data: GameData }) {
  return (
    <div className="p-4 md:p-6 w-full h-full flex flex-col gap-4 relative overflow-y-auto overflow-x-hidden">
      {/* Background Tech Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(70,170,149,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(70,170,149,0.2)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      <div className="flex justify-between items-end border-b border-hud-accent/50 pb-2 z-10 flex-shrink-0">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-hud-accent tracking-[0.2em] drop-shadow-[0_0_8px_rgba(70,170,149,0.5)]">PILOT STATUS</h2>
          <div className="text-[10px] text-hud-text/60 tracking-widest mt-1">驾驶员状态 // 核心数据链连接正常</div>
        </div>
        <div className="text-[10px] text-hud-accent/60 font-mono tracking-widest hidden md:block">
          ID: C-621 // STATUS: ACTIVE
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 flex-1 z-10 mt-2">
        {/* Left Column: Core Attributes */}
        <div className="flex flex-col gap-6">
          <PanelFrame title="驾驶属性 // CORE ATTRIBUTES" className="flex-1">
            <div className="flex flex-col gap-6 mt-4 h-full">
              {/* APM */}
              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-xs text-hud-text/80 tracking-wider">APM (操作频率)</span>
                  <span className="text-lg font-bold text-hud-accent">{data.pilot.stats.apm}</span>
                </div>
                <div className="h-1.5 w-full bg-hud-bg border border-hud-border/50 relative overflow-hidden">
                  <motion.div 
                    className="h-full bg-hud-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (data.pilot.stats.apm / 300) * 100)}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ boxShadow: '0 0 8px var(--color-hud-accent)' }}
                  />
                </div>
              </div>

              {/* KRL Level */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs text-hud-text/80 tracking-wider">KRL 等级</span>
                  <span className="text-sm font-bold text-hud-accent">Lv.{data.pilot.stats.krlLevel}</span>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-3 flex-1 border ${i < data.pilot.stats.krlLevel ? 'bg-hud-accent border-hud-accent shadow-[0_0_5px_rgba(70,170,149,0.5)]' : 'bg-transparent border-hud-border/30'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Pilot Bonus */}
              <div className="mt-auto bg-hud-accent/10 border border-hud-accent/30 p-3 relative overflow-hidden group mb-[22px] z-10">
                <div className="absolute top-0 left-0 w-1 h-full bg-hud-accent shadow-[0_0_8px_var(--color-hud-accent)]"></div>
                <div className="text-[10px] text-hud-text/60 mb-1 tracking-widest relative z-20">综合驾驶加值</div>
                <div className="text-4xl font-black text-hud-accent relative z-20">+{data.pilot.stats.pilotBonus}</div>
                <div className="absolute right-2 bottom-2 opacity-20 group-hover:opacity-40 transition-opacity z-10">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-hud-accent)" strokeWidth="1"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
              </div>
            </div>
          </PanelFrame>
        </div>

        {/* Center Column: Neural Sync */}
        <div className="flex flex-col items-center justify-center relative">
          {/* Crosshair background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-full h-[1px] bg-hud-accent"></div>
            <div className="h-full w-[1px] bg-hud-accent absolute"></div>
            <div className="w-48 h-48 border border-hud-accent rounded-full absolute"></div>
          </div>
          
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Outer rotating dashed ring */}
            <svg className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(70, 170, 149, 0.3)" strokeWidth="0.5" strokeDasharray="2 4" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(70, 170, 149, 0.6)" strokeWidth="1" strokeDasharray="10 5 2 5" />
            </svg>
            {/* Inner rotating ring */}
            <svg className="absolute inset-0 w-full h-full animate-[spin_15s_linear_infinite_reverse]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="36" fill="none" stroke="var(--color-hud-accent)" strokeWidth="2" strokeDasharray="20 10 5 10" />
              <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(70, 170, 149, 0.4)" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
            
            {/* Center Data */}
            <div className="text-center flex flex-col items-center justify-center bg-hud-bg/80 rounded-full w-40 h-40 backdrop-blur-md border border-hud-accent/30 shadow-[inset_0_0_30px_rgba(70,170,149,0.2)] z-10">
              <div className="text-[10px] text-hud-text/60 tracking-widest mb-1">NEURAL SYNC</div>
              <div className="text-5xl font-black text-hud-accent drop-shadow-[0_0_15px_rgba(70,170,149,0.8)]">
                {data.pilot.stats.syncRate}<span className="text-2xl text-hud-accent/70">%</span>
              </div>
              <div className="text-[9px] text-hud-bg font-bold mt-2 bg-hud-accent px-3 py-0.5 rounded-sm animate-pulse tracking-widest">
                STABLE
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Profile & Resources */}
        <div className="flex flex-col gap-6">
          <PanelFrame title="驾驶员档案 // PROFILE" className="flex-1">
            <div className="flex flex-col gap-6 mt-4 h-full">
              {/* Funds */}
              <div className="bg-hud-bg border border-hud-border/50 p-4 relative">
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-500/50"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-500/50"></div>
                <div className="text-xs text-hud-text/60 tracking-widest mb-2">资金 (COAM)</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl text-yellow-500 font-bold">₵</span>
                  <span className="text-4xl font-black text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.4)] tracking-wider">
                    {data.pilot.profile.funds.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* EXP */}
              <div className="bg-hud-bg border border-hud-border/50 p-4">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs text-hud-text/60 tracking-widest">当前经验 (EXP)</span>
                  <span className="text-sm font-bold text-hud-accent">{data.pilot.profile.exp} / {data.pilot.profile.expRequired}</span>
                </div>
                <div className="relative h-4 w-full bg-hud-bg border border-hud-border/50 overflow-hidden p-[2px]">
                  {/* Grid background for progress bar */}
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(70,170,149,0.1)_1px,transparent_1px)] bg-[size:4px_100%]"></div>
                  <motion.div 
                    className="h-full bg-hud-accent opacity-90 relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.pilot.profile.exp / data.pilot.profile.expRequired) * 100}%` }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                    style={{ boxShadow: '0 0 10px var(--color-hud-accent)' }}
                  >
                    {/* Inner hashes */}
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.2)_1px,transparent_1px)] bg-[size:6px_100%]"></div>
                  </motion.div>
                </div>
              </div>

              {/* Decorative Barcode / Data */}
              <div className="mt-auto flex flex-col gap-2 opacity-80 mb-2">
                <div className="flex justify-between text-[9px] font-mono text-hud-accent">
                  <span>SYS_AUTH: VERIFIED</span>
                  <span>{data.global.time}</span>
                </div>
                <div className="h-10 w-full flex gap-[2px]">
                  {Array.from({ length: 45 }).map((_, i) => (
                    <div key={i} className="h-full bg-hud-accent" style={{ width: `${Math.random() * 5 + 1}px`, opacity: Math.random() * 0.6 + 0.2 }}></div>
                  ))}
                </div>
              </div>
            </div>
          </PanelFrame>
        </div>
      </div>
    </div>
  );
}

function HangarTab({ data }: { data: GameData }) {
  return (
    <div className="p-4 md:p-6 w-full h-full flex flex-col md:flex-row gap-4 md:gap-6 relative overflow-y-auto overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(70,170,149,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(70,170,149,0.2)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Left: Equipment */}
      <div className="w-full md:w-1/3 flex flex-col">
        <PanelFrame title="机库整备设备" className="h-full">
          <div className="flex flex-col gap-2 mt-4 overflow-y-auto pr-2">
            {Object.entries(data.hangar.equipment).map(([name, desc]) => (
              <div key={name} className="bg-hud-bg/80 border border-hud-border/50 p-3 hover:border-hud-accent transition-colors group">
                <div className="text-sm font-bold text-hud-accent mb-1 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-hud-accent group-hover:animate-pulse"></div>
                  {name}
                </div>
                <div className="text-[10px] text-hud-text/70 leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </PanelFrame>
      </div>

      {/* Right: Available Parts */}
      <div className="flex-1 flex flex-col">
        <PanelFrame title="可用机甲部件库存" className="h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 overflow-y-auto pr-2">
            {Object.entries(data.hangar.availableParts).map(([id, part]) => (
              <div key={id} className="bg-hud-bg/80 border border-hud-border/50 p-3 flex flex-col hover:bg-hud-panel transition-colors cursor-pointer group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-hud-accent/10 -rotate-45 translate-x-4 -translate-y-4 group-hover:bg-hud-accent/30 transition-colors"></div>
                <div className="text-[10px] text-hud-text/50 mb-1">{part.type}</div>
                <div className="text-sm font-bold text-hud-accent truncate">{part.name}</div>
                <div className="flex justify-between items-end mt-2 text-[10px]">
                  <span className="text-hud-text/60">{part.manufacturer}</span>
                  <span className="text-hud-accent/80 font-mono">WT: {part.weight}</span>
                </div>
              </div>
            ))}
          </div>
        </PanelFrame>
      </div>
    </div>
  );
}

function MissionTab({ data }: { data: GameData }) {
  return (
    <div className="p-4 md:p-6 w-full h-full flex flex-col gap-4 relative overflow-y-auto overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(circle_at_center,rgba(70,170,149,0.4)_0,transparent_70%)]"></div>
      
      <div className="flex justify-between items-end border-b border-hud-accent/50 pb-2 z-10 flex-shrink-0">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-hud-accent tracking-[0.2em]">MISSION BOARD</h2>
          <div className="text-[10px] text-hud-text/60 tracking-widest mt-1">任务简报 // 雇佣兵网络已连接</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 z-10 mt-2 flex flex-col gap-4">
        {Object.values(data.missions).map(mission => (
          <div key={mission.id} className="bg-hud-bg/90 border border-hud-border/50 p-4 relative group hover:border-hud-accent transition-colors">
            {/* Status indicator line */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${mission.status === '已完成' ? 'bg-hud-accent' : mission.status === '进行中' ? 'bg-yellow-500' : 'bg-hud-text/30'}`}></div>
            
            <div className="flex justify-between items-start pl-3">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className={`text-[10px] px-2 py-0.5 border ${mission.type === '困难' ? 'border-red-500/50 text-red-400' : 'border-hud-accent/50 text-hud-accent'}`}>
                    {mission.type}
                  </span>
                  <span className="text-[10px] text-hud-text/60">委托方: {mission.faction}</span>
                </div>
                <h3 className="text-lg font-bold text-hud-text group-hover:text-hud-accent transition-colors">{mission.name}</h3>
              </div>
              <div className="text-right">
                <div className={`text-xs font-bold ${mission.status === '已完成' ? 'text-hud-accent' : mission.status === '进行中' ? 'text-yellow-500' : 'text-hud-text/50'}`}>
                  [{mission.status}]
                </div>
                <div className="text-[10px] text-hud-text/50 mt-1 font-mono">{mission.deadline}</div>
              </div>
            </div>

            <div className="pl-3 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <div className="text-[10px] text-hud-accent/70 mb-2 border-b border-hud-accent/20 pb-1">作战目标</div>
                <ul className="text-xs text-hud-text/80 flex flex-col gap-1">
                  {mission.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-hud-accent mt-0.5">▸</span> {obj}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[10px] text-yellow-500/70 mb-2 border-b border-yellow-500/20 pb-1">预计报酬</div>
                <div className="flex flex-col gap-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-hud-text/60">资金</span>
                    <span className="text-yellow-400 font-mono">₵ {mission.rewardFunds.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-hud-text/60">经验</span>
                    <span className="text-hud-accent font-mono">+{mission.rewardExp} EXP</span>
                  </div>
                  {mission.rewardItems.length > 0 && (
                    <div className="flex justify-between mt-1 pt-1 border-t border-hud-border/30">
                      <span className="text-hud-text/60">附加物资</span>
                      <span className="text-hud-text font-mono">{mission.rewardItems.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
