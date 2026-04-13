import React from 'react';

export default function PanelFrame({ children, title, className = '' }: { children: React.ReactNode, title?: string, className?: string }) {
  return (
    <div className={`relative bg-hud-panel border border-hud-border backdrop-blur-sm p-3 ${className}`}>
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-hud-accent"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-hud-accent"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-hud-accent"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-hud-accent"></div>
      
      {title && (
        <div className="text-[10px] font-bold tracking-[0.2em] text-hud-accent mb-2 border-b border-hud-border/50 pb-1">
          {title}
        </div>
      )}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}
