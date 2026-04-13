import React from 'react';
import { motion } from 'motion/react';

interface HudBarProps {
  label: string;
  current: number;
  max: number;
  variant?: 'struct' | 'armor' | 'acs' | 'shield' | 'affinity-red' | 'affinity-pink';
}

export default function HudBar({ label, current, max, variant = 'struct' }: HudBarProps) {
  const percent = Math.max(0, Math.min(100, (current / max) * 100)) || 0;
  
  let colorClass = 'bg-hud-accent';
  let shadowColor = 'rgba(70,170,149,0.8)';
  if (variant === 'acs') {
    colorClass = 'bg-orange-500';
    shadowColor = 'rgba(249,115,22,0.8)';
  }
  if (variant === 'armor') {
    colorClass = 'bg-blue-400';
    shadowColor = 'rgba(96,165,250,0.8)';
  }
  if (variant === 'shield') {
    colorClass = 'bg-purple-400';
    shadowColor = 'rgba(192,132,252,0.8)';
  }
  if (variant === 'affinity-red') {
    colorClass = 'bg-red-500';
    shadowColor = 'rgba(239,68,68,0.8)';
  }
  if (variant === 'affinity-pink') {
    colorClass = 'bg-pink-400';
    shadowColor = 'rgba(244,114,182,0.8)';
  }

  return (
    <div className="flex flex-col w-full gap-1">
      <div className="flex justify-between items-baseline relative">
        <span className="text-[9px] font-bold tracking-wider text-hud-text/80 uppercase">{label}</span>
        <span className="text-[9px] font-mono text-hud-text/90">{current} <span className="text-hud-text/40">/ {max}</span></span>
      </div>
      <div className="h-2 w-full bg-black/50 border border-hud-border/50 overflow-hidden relative">
        {/* Background grid pattern for empty state */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,255,255,0.05)_2px,rgba(255,255,255,0.05)_3px)] pointer-events-none"></div>
        
        <motion.div 
          className={`h-full ${colorClass} relative`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ boxShadow: `0 0 10px ${shadowColor}` }}
        >
          {/* Segmented overlay on the filled bar */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(0,0,0,0.4)_2px,rgba(0,0,0,0.4)_3px)] pointer-events-none"></div>
        </motion.div>
      </div>
    </div>
  );
}
