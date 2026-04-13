import React from 'react';
import { User, Shield, Radio, Wrench, Crosshair } from 'lucide-react';
import { TabType, GameData } from '../types';
import HudBar from './shared/HudBar';

interface TopBarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  data: GameData;
}

export default function TopBar({ activeTab, setActiveTab, data }: TopBarProps) {
  const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: 'PILOT', label: '驾驶员状态', icon: User },
    { id: 'MECH', label: 'AC整备面板', icon: Shield },
    { id: 'COMM', label: '通讯频道', icon: Radio },
    { id: 'HANGAR', label: '机库', icon: Wrench },
    { id: 'MISSION', label: '作战与行动', icon: Crosshair },
  ];

  return (
    <div className="w-full h-auto min-h-[64px] flex flex-col md:flex-row items-center justify-between bg-hud-panel border border-hud-border px-2 md:px-4 backdrop-blur-md py-2 md:py-0 gap-2 md:gap-0">
      {/* Tabs */}
      <div className="flex space-x-1 overflow-x-auto w-full md:w-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-1 md:pb-0">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(isActive ? 'MAIN' : tab.id)}
              className={`relative flex items-center justify-center gap-1.5 md:gap-2 flex-1 md:flex-none px-2 md:px-4 py-3 md:py-3 text-[10px] md:text-xs font-bold tracking-wider transition-all overflow-hidden whitespace-nowrap flex-shrink-0 ${
                isActive 
                  ? 'text-hud-accent' 
                  : 'text-hud-text/60 hover:text-hud-text hover:bg-hud-panel'
              }`}
            >
              {isActive && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-b from-hud-accent/20 to-transparent pointer-events-none" />
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-hud-accent shadow-[0_0_8px_rgba(70,170,149,0.8)]" />
                </>
              )}
              <Icon className="w-5 h-5 md:w-4 md:h-4" />
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right Stats */}
      <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
        <div className="flex space-x-3 lg:space-x-4 w-auto min-w-[280px] lg:min-w-[480px]">
          <HudBar label="AP" current={data.pilot.mechState.struct} max={data.pilot.mechState.structMax} variant="struct" />
          <HudBar label="ARMOR" current={data.pilot.mechState.armor} max={data.pilot.mechState.armorMax} variant="armor" />
          <HudBar label="ACS" current={data.pilot.mechState.acs} max={data.pilot.mechState.acsMax} variant="acs" />
          <HudBar label="SHIELD" current={data.pilot.mechState.shield} max={data.pilot.mechState.shieldMax} variant="shield" />
        </div>
        <div className="flex flex-col items-end border-l border-hud-border pl-4">
          <span className="text-[10px] text-hud-text/60">当前机甲</span>
          <span className="text-sm font-bold text-hud-accent">{data.mech.current}</span>
        </div>
        <div className="flex flex-col items-end border-l border-hud-border pl-4">
          <span className="text-[10px] text-hud-text/60">系统状态</span>
          <span className="text-sm font-bold text-hud-accent animate-pulse">正常</span>
        </div>
      </div>
    </div>
  );
}
