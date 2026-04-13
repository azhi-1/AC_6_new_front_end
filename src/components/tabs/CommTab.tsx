import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GameData, CharacterComm } from '../../types';
import HudBar from '../shared/HudBar';

export default function CommTab({ data }: { data: GameData }) {
  // Preload all portraits when the component mounts
  useEffect(() => {
    Object.values(data.comms).forEach(comm => {
      comm.portraits.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    });
  }, [data.comms]);

  return (
    <div className="w-full h-full p-6 flex flex-col">
      <h2 className="text-xl font-bold text-hud-accent tracking-widest border-b border-hud-border pb-2 mb-6">通讯频道</h2>
      
      <div className="flex-1 flex gap-4 overflow-x-auto pb-4 items-center">
        {Object.values(data.comms).map(comm => (
          <CharacterCard key={comm.id} comm={comm} />
        ))}
      </div>
    </div>
  );
}

function CharacterCard({ comm }: { comm: CharacterComm }) {
  const [isActive, setIsActive] = useState(false);
  const [portraitIdx, setPortraitIdx] = useState(0);

  const handleNextPortrait = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPortraitIdx((prev) => (prev + 1) % comm.portraits.length);
  };

  return (
    <div 
      className={`relative h-[90%] aspect-[832/1216] border transition-all duration-300 cursor-pointer overflow-hidden group flex-shrink-0
        ${isActive ? 'border-hud-accent shadow-[0_0_15px_rgba(70,170,149,0.3)]' : 'border-hud-border/50 hover:border-hud-accent/50'}`}
      onClick={() => setIsActive(!isActive)}
    >
      {/* Portrait Image */}
      <img 
        src={comm.portraits[portraitIdx]} 
        alt={comm.name} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,148,131,0.1)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-50"></div>

      {/* Change Portrait Button */}
      <button 
        onClick={handleNextPortrait}
        className="absolute top-2 right-2 w-6 h-6 bg-black/50 border border-hud-border text-hud-accent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-hud-accent hover:text-black"
      >
        ⟳
      </button>

      {/* Info Bar */}
      <div className="absolute bottom-0 left-0 w-full bg-black/80 backdrop-blur-md border-t border-hud-border p-3 min-h-[60px] flex flex-col justify-center">
        <div className="relative w-full h-full flex items-center">
          <motion.div 
            className="text-sm font-bold tracking-widest text-hud-text drop-shadow-[0_0_5px_rgba(216,232,233,0.8)]"
            animate={{ 
              x: isActive ? 0 : '50%', 
              y: isActive ? -15 : 0,
              scale: isActive ? 0.8 : 1,
              translateX: isActive ? '0%' : '-50%'
            }}
            transition={{ duration: 0.4, ease: "circOut" }}
            style={{ position: 'absolute', transformOrigin: 'left center' }}
          >
            {comm.name}
          </motion.div>

          <AnimatePresence>
            {isActive && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="w-full pt-4 flex flex-col gap-2"
              >
                <HudBar label="好感度" current={comm.affinity} max={100} variant="affinity-red" />
                <HudBar label="默契度" current={comm.sync} max={100} variant="affinity-pink" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
