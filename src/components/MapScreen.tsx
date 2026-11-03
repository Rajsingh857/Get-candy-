import React from 'react';
import { CandyStatus, HOUSES } from '../game/rules';
import {
  CrookedHouseIllustration,
  PumpkinLifeIcon,
  CandyIcon,
} from './SpookyIllustrations';

interface MapScreenProps {
  currentHouseIndex: number;
  completedHouses: boolean[];
  candies: CandyStatus[];
  justUnlockedHouseIndex: number | null;
  justEarnedCandyHouseId: number | null;
  onSelectHouse: (houseIndex: number) => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({
  currentHouseIndex,
  completedHouses,
  candies,
  justUnlockedHouseIndex,
  justEarnedCandyHouseId,
  onSelectHouse,
}) => {
  // Stepped hill elevations for the 5 houses from left to right
  const stepOffsets = [
    'md:translate-y-12',
    'md:translate-y-4',
    'md:-translate-y-4',
    'md:translate-y-2',
    'md:-translate-y-8',
  ];

  const earnedCount = candies.filter((c) => c.earned).length;

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-16 pb-6 flex flex-col items-center justify-between min-h-[calc(100vh-2rem)]">
      {/* Header Title */}
      <div className="text-center mt-2 md:mt-4">
        <h1 className="font-creepster text-4xl sm:text-5xl md:text-6xl text-[#F26B21] drop-shadow-[0_5px_0_#0D161E]">
          Go house to house!
        </h1>
        <p className="text-base md:text-xl text-[#FDF6E2]/95 mt-1 font-semibold">
          Click on House {currentHouseIndex + 1} to knock on the door and solve 3 riddles!
        </p>
      </div>

      {/* Winding Hill Path & 5 Crooked Haunted Houses */}
      <div className="relative w-full my-auto py-4">
        {/* Decorative dashed winding trail connecting the 5 houses on desktop */}
        <svg
          viewBox="0 0 1000 160"
          className="hidden md:block absolute inset-x-8 bottom-8 w-[calc(100%-4rem)] h-36 pointer-events-none z-0"
          aria-hidden="true"
        >
          <path
            d="M 80 120 Q 280 50, 480 65 T 920 45"
            fill="none"
            stroke="#FDF6E2"
            strokeWidth="5"
            strokeDasharray="14 14"
            opacity="0.35"
          />
        </svg>

        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5 items-end justify-items-center">
          {HOUSES.map((house, idx) => {
            const isCompleted = completedHouses[idx];
            const isCurrent = idx === currentHouseIndex && !isCompleted;
            const isLocked = idx > currentHouseIndex;
            const justUnlocked = justUnlockedHouseIndex === idx;

            return (
              <div
                key={house.id}
                className={`flex flex-col items-center transition-transform ${stepOffsets[idx]}`}
              >
                {/* Player's Pumpkin Marker above the current house */}
                <div className="h-12 flex items-center justify-center mb-1">
                  {isCurrent && (
                    <div
                      className="animate-float flex items-center gap-1.5 bg-[#0D161E] border-2 border-[#F26B21] rounded-full px-3 py-1 shadow-[0_0_16px_rgba(242,107,33,0.9)]"
                      data-testid={`player-pumpkin-house-${house.id}`}
                    >
                      <div className="w-6 h-6 flex items-center justify-center">
                        <PumpkinLifeIcon alive={true} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#F26B21]">
                        You
                      </span>
                    </div>
                  )}
                </div>

                {/* Clickable House Button (only current house is enabled) */}
                <button
                  type="button"
                  disabled={!isCurrent}
                  onClick={() => onSelectHouse(idx)}
                  aria-label={
                    isCurrent
                      ? `Visit House ${house.id}: ${house.name} (Unlocked)`
                      : isCompleted
                      ? `House ${house.id}: ${house.name} (Completed)`
                      : `House ${house.id}: ${house.name} (Locked)`
                  }
                  className={`group relative rounded-3xl p-2 md:p-3 transition-all focus-visible:outline-4 focus-visible:outline-[#F26B21] ${
                    isCurrent
                      ? 'bg-[#1F3A4D]/85 border-3 border-[#F26B21] shadow-[0_0_28px_rgba(242,107,33,0.55)] hover:scale-105'
                      : isCompleted
                      ? 'bg-[#132533]/80 border-2 border-emerald-400/70 opacity-90'
                      : 'bg-[#0D161E]/65 border-2 border-[#FDF6E2]/25 opacity-65'
                  }`}
                >
                  <CrookedHouseIllustration
                    houseId={house.id}
                    isCurrent={isCurrent}
                    isCompleted={isCompleted}
                    isLocked={isLocked}
                    justUnlocked={justUnlocked}
                  />

                  <div className="mt-1 text-center px-1">
                    <div className="font-storybook text-base md:text-lg text-[#FDF6E2] font-bold">
                      House {house.id}
                    </div>
                    <div className="text-xs text-[#FDF6E2]/90 whitespace-nowrap">
                      {house.name}
                    </div>
                    <div
                      className={`mt-1.5 inline-block px-3 py-0.5 rounded-full text-xs font-bold ${
                        isCurrent
                          ? 'bg-[#F26B21] text-[#FDF6E2]'
                          : isCompleted
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-[#0D161E] text-[#FDF6E2]/60'
                      }`}
                    >
                      {isCurrent ? 'ENTER' : isCompleted ? 'DONE' : 'LOCKED'}
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Corner / Tray for Mobile & Tablet (on Desktop it's also in top-right HUD) */}
      <div className="w-full flex flex-wrap items-center justify-between gap-4 bg-[#0D161E]/90 border-2 border-[#FDF6E2] rounded-2xl px-4 py-2.5 max-w-xl lg:hidden">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#FDF6E2]/80 font-bold block">
            Candy obtained
          </span>
          <span className="font-mono-num text-base font-bold text-[#F26B21]">
            {earnedCount}/5 Collected
          </span>
        </div>
        <div className="flex items-center gap-2">
          {candies.map((c) => (
            <CandyIcon
              key={c.houseId}
              houseId={c.houseId}
              earned={c.earned}
              sparkleBonus={c.sparkleBonus}
              justEarned={justEarnedCandyHouseId === c.houseId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
