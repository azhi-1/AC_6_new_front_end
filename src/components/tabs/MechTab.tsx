import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GameData } from '../../types';
import PanelFrame from '../shared/PanelFrame';
import HudBar from '../shared/HudBar';

// 预计算装饰条透明度
const DECO_BAR_OPACITIES = Array.from({ length: 15 }, () => Math.random() * 0.6 + 0.2);
// 预计算假哈希值
const FAKE_HASH = Math.random().toString(16).substring(2, 10).toUpperCase();

const STAT_LABELS: Record<string, string> = {
  weaponType: '武器类型',
  armorPenetration: '破甲等级',
  fixedDamage: '固定伤害',
  ammo: '弹药量',
  optimalRange: '最优距离区间',
  shieldType: '护盾类型',
  shieldMax: '护盾上限',
  initiativeBonus: '先攻加值',
  armorTier: '装甲等级',
  armorMax: '装甲上限',
  structMax: '结构上限',
  acsMax: 'ACS上限',
  meleeBonus: '近战伤害加值',
  maxWeaponWeight: '武器重量上限',
  moveEfficiency: '移动效率',
  totalThrust: '总出力',
  combatStyle: '战斗风格',
  totalEnergy: '总能源',
  effect: '特殊效果'
};

export default function MechTab({ data }: { data: GameData }) {
  const [expandedSlot, setExpandedSlot] = useState<string | null>(null);

  const slots = [
    { id: 'RA', label: '[RA] 右手武器' },
    { id: 'LA', label: '[LA] 左手武器' },
    { id: 'RB', label: '[RB] 右肩武器' },
    { id: 'LB', label: '[LB] 左肩武器' },
    { id: 'HEAD', label: '头部' },
    { id: 'CORE', label: '核心' },
    { id: 'ARMS', label: '手部' },
    { id: 'LEGS', label: '足部' },
    { id: 'BOOSTER', label: '推进器' },
    { id: 'FCS', label: '武器管制系统' },
    { id: 'GENERATOR', label: '发动机' },
    { id: 'EXPANSION', label: '扩充机能' },
  ];

  return (
    <div className="w-full h-full relative flex flex-col md:flex-row overflow-y-auto overflow-x-hidden md:overflow-hidden">
      {/* Background Image */}
      <img src="https://cdn.imgchest.com/files/336795e08f95.jpg" alt="Mech Dashboard" className="absolute inset-0 w-full h-full object-cover md:object-contain object-center opacity-30 mix-blend-screen fixed md:absolute" />
      
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row p-4 gap-4">
        {/* Left: Slots List */}
        <div className="w-full md:w-80 flex flex-col gap-1 md:overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-hud-accent/30 hover:[&::-webkit-scrollbar-thumb]:bg-hud-accent/50 flex-shrink-0">
          {slots.map(slot => {
            const part = data.mech.build[slot.id as keyof typeof data.mech.build];
            const isExpanded = expandedSlot === slot.id;

            return (
              <div key={slot.id} className={`bg-hud-bg/80 border transition-all flex flex-col group ${isExpanded ? 'border-hud-accent shadow-[0_0_10px_rgba(70,170,149,0.2)]' : 'border-hud-border/50 hover:bg-hud-panel hover:border-hud-accent/80'}`}>
                {/* Slot Header & Basic Info */}
                <div 
                  className="p-2 cursor-pointer"
                  onClick={() => setExpandedSlot(isExpanded ? null : slot.id)}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold ${isExpanded ? 'text-hud-accent' : 'text-hud-text/80 group-hover:text-hud-accent'}`}>
                      {slot.label}
                    </span>
                    <div className={`w-4 h-4 border flex items-center justify-center text-[10px] transition-colors ${isExpanded ? 'border-hud-accent text-hud-accent bg-hud-accent/20' : 'border-hud-border/50 text-hud-accent/50 group-hover:border-hud-accent group-hover:text-hud-accent'}`}>
                      {isExpanded ? '−' : '+'}
                    </div>
                  </div>
                  {part ? (
                    <div className="mt-1 flex flex-col">
                      <span className="text-xs font-bold text-hud-accent truncate">{part.name}</span>
                      <div className="flex justify-between text-[8px] text-hud-text/50 mt-0.5">
                        <span>{part.manufacturer}</span>
                        <span className="font-mono">WT: {part.weight}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-1 text-xs text-hud-text/30 italic">EMPTY</div>
                  )}
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {isExpanded && part && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-3 pt-2 border-t border-hud-accent/30 bg-gradient-to-b from-hud-accent/10 to-transparent flex flex-col gap-3">
                        {/* Tech decorative header */}
                        <div className="flex items-center gap-2">
                          <div className="h-[1px] flex-1 bg-hud-accent/30"></div>
                          <span className="text-[8px] text-hud-accent tracking-widest font-mono">SYS_DETAIL_VIEW</span>
                          <div className="h-[1px] flex-1 bg-hud-accent/30"></div>
                        </div>

                        {/* Dynamic Stats Grid */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                          {Object.entries(part)
                            .filter(([key]) => !['type', 'name', 'manufacturer', 'weight'].includes(key))
                            .map(([key, value]) => {
                              let displayValue = value;
                              if (key === 'optimalRange' && typeof value === 'object') {
                                displayValue = `${value.min} - ${value.max}`;
                              }
                              
                              return (
                                <div key={key} className={`flex flex-col relative pl-2 border-l border-hud-accent/50 ${key === 'effect' ? 'col-span-2' : ''}`}>
                                  <span className="text-[9px] text-hud-text/60 mb-0.5">{STAT_LABELS[key] || key}</span>
                                  <span className={`text-xs font-bold text-hud-accent ${key === 'effect' ? 'leading-relaxed' : ''}`}>{displayValue}</span>
                                </div>
                              );
                            })}
                        </div>

                        {/* Decorative Footer */}
                        <div className="mt-1 flex justify-between items-end opacity-80">
                          <div className="flex gap-[2px]">
                            {DECO_BAR_OPACITIES.map((op, i) => (
                              <div key={i} className="w-[2px] h-3 bg-hud-accent" style={{ opacity: op }}></div>
                            ))}
                          </div>
                          <span className="text-[8px] font-mono text-hud-accent/70">
                            DATA_HASH: {FAKE_HASH}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Center: Mech Visualization (Empty space for background) */}
        <div className="flex-1 relative flex items-center justify-center min-h-[150px] md:min-h-0">
        </div>

        {/* Right: Integrated Stats */}
        <div className="w-full md:w-72 flex-shrink-0">
          <PanelFrame title="机体整合数值" className="h-full">
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex justify-between items-center border-b border-hud-border/30 pb-1">
                <span className="text-[10px] text-hud-text/80">机体类型</span>
                <span className="text-sm font-bold text-hud-accent">{data.mech.stats.type}</span>
              </div>
              <div className="flex justify-between items-center border-b border-hud-border/30 pb-1">
                <span className="text-[10px] text-hud-text/80">装甲等级</span>
                <span className="text-sm font-bold text-hud-accent">{data.mech.stats.armorTier}</span>
              </div>
              <div className="flex justify-between items-center border-b border-hud-border/30 pb-1">
                <span className="text-[10px] text-hud-text/80">机体总重</span>
                <span className="text-sm font-bold text-hud-accent">{data.mech.stats.totalWeight.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center border-b border-hud-border/30 pb-1">
                <span className="text-[10px] text-hud-text/80">推重比</span>
                <span className="text-sm font-bold text-hud-accent">{data.mech.stats.thrustToWeight.toFixed(2)}</span>
              </div>
              
              <div className="mt-4 flex flex-col gap-3">
                <HudBar label="装甲值" current={data.pilot.mechState.armor} max={data.pilot.mechState.armorMax} variant="armor" />
                <HudBar label="ACS值" current={data.pilot.mechState.acs} max={data.pilot.mechState.acsMax} variant="acs" />
                <HudBar label="护盾容量" current={data.pilot.mechState.shield} max={data.pilot.mechState.shieldMax} variant="shield" />
              </div>

              <div className="flex justify-between items-center border-b border-hud-border/30 pb-1 mt-4">
                <span className="text-[10px] text-hud-text/80">先攻加值</span>
                <span className="text-sm font-bold text-hud-accent">+{data.mech.stats.initiativeBonus}</span>
              </div>
              <div className="flex justify-between items-center border-b border-hud-border/30 pb-1 mt-2">
                <span className="text-[10px] text-hud-text/80">推重加值</span>
                <span className="text-sm font-bold text-hud-accent">+{data.mech.stats.thrustBonus}</span>
              </div>
            </div>
          </PanelFrame>
        </div>
      </div>
    </div>
  );
}
