import React from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, HelpCircle, MapPin } from 'lucide-react';
import { CandyStatus, ScreenState } from '../game/rules';
import { PumpkinLifeIcon, CandyIcon } from './SpookyIllustrations';

interface GameHudBarProps {
  screen: ScreenState;
  lives: number;
  maxLives: number;
  justLostLife: boolean;
  candies: CandyStatus[];
  justEarnedCandyHouseId: number | null;
  activeHouseId: number;
  muted: boolean;
  isFullscreen: boolean;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
  onOpenHowToPlay: () => void;
  onBackToMap: () => void;
}

export const GameHudBar: React.FC<GameHudBarProps> = ({
  screen,
  lives,
  maxLives,
  justLostLife,
  candies,
  justEarnedCandyHouseId,
  activeHouseId,
  muted,
  isFullscreen,
  onToggleMute,
  onToggleFullscreen,
  onOpenHowToPlay,
  onBackToMap,
}) => {
  const showGameplayHud =
    screen === 'map' ||
    screen === 'door' ||
    screen === 'quiz' ||
    screen === 'gameover_catch' ||
    screen === 'last_chance';

  const earnedCount = candies.filter((c) => c.earned).length;

  return (
    <div className="fixed inset-x-0 top-0 z-30 pointer-events-none px-2.5 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 flex items-center justify-between gap-1.5 sm:gap-3">
      {/* Left Perimeter Cluster: Back to Map or Stage Indicator */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 pointer-events-auto shrink-0">
        {(screen === 'door' || screen === 'quiz') && (
          <button
            type="button"
            onClick={(e) => {
              e.currentTarget.blur();
              onBackToMap();
            }}
            className="btn-teal px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm md:text-base flex items-center gap-1.5 whitespace-nowrap shrink-0"
            aria-label="Back to map"
          >
            <MapPin className="w-4 h-4 text-[#F26B21] shrink-0" />
            <span className="hidden sm:inline">Back to map</span>
            <span className="sm:hidden">Map</span>
          </button>
        )}

        {showGameplayHud && (
          <div className="bg-[#0D161E]/90 border-2 border-[#FDF6E2]/80 rounded-xl sm:rounded-2xl px-2.5 py-1 sm:px-3.5 sm:py-1.5 shadow-lg flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-[11px] sm:text-xs md:text-sm uppercase tracking-wider text-[#FDF6E2]/80 font-semibold">
              House
            </span>
            <span className="font-mono-num text-sm sm:text-base md:text-lg font-bold text-[#F26B21]">
              {activeHouseId}/5
            </span>
          </div>
        )}
      </div>

      {/* Center Perimeter Cluster: 3 Pumpkin Lives Counter */}
      {showGameplayHud && (
        <div
          className="pointer-events-auto bg-[#0D161E]/90 border-2 border-[#FDF6E2] rounded-xl sm:rounded-2xl px-2.5 py-1 sm:px-4 sm:py-1.5 shadow-[0_6px_20px_rgba(0,0,0,0.65)] flex items-center gap-1 sm:gap-2 shrink-0"
          aria-label={`Lives remaining: ${lives} of ${maxLives}`}
        >
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#FDF6E2] mr-1 hidden md:inline">
            Lives
          </span>
          <div className="flex items-center gap-0.5 sm:gap-1.5 scale-75 sm:scale-100 origin-center -mx-2 sm:mx-0">
            {Array.from({ length: maxLives }, (_, idx) => {
              const isAlive = idx < lives;
              const isJustLost = !isAlive && idx === lives && justLostLife;
              return (
                <PumpkinLifeIcon
                  key={idx}
                  alive={isAlive}
                  justLost={isJustLost}
                />
              );
            })}
          </div>
          <span className="font-mono-num text-xs sm:text-sm md:text-base font-bold text-[#FDF6E2] ml-0.5 sm:ml-1">
            {lives}/{maxLives}
          </span>
        </div>
      )}

      {/* Right Perimeter Cluster: Candy Obtained Tray + Mute & Fullscreen Icons */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 pointer-events-auto shrink-0">
        {showGameplayHud && (
          <div
            className="hidden lg:flex items-center gap-2 bg-[#0D161E]/90 border-2 border-[#FDF6E2] rounded-2xl px-3.5 py-1.5 shadow-lg"
            aria-label={`Candy obtained: ${earnedCount} of 5`}
          >
            <div className="flex flex-col mr-1">
              <span className="text-[11px] uppercase tracking-wider text-[#FDF6E2]/80 font-semibold leading-tight">
                Candy obtained
              </span>
              <span className="font-mono-num text-sm font-bold text-[#F26B21] leading-tight">
                {earnedCount}/5
              </span>
            </div>
            <div className="flex items-center gap-1.5">
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
        )}

        {/* How to play icon button */}
        {screen !== 'cover' && (
          <button
            type="button"
            onClick={(e) => {
              e.currentTarget.blur();
              onOpenHowToPlay();
            }}
            className="btn-teal w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center"
            aria-label="How to play"
            title="How to play"
          >
            <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#FDF6E2]" />
          </button>
        )}

        {/* Mute / Unmute Icon Button */}
        <button
          type="button"
          onClick={(e) => {
            e.currentTarget.blur();
            onToggleMute();
          }}
          className="btn-teal w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center"
          aria-label={muted ? 'Unmute audio' : 'Mute audio'}
          title={muted ? 'Unmute audio (M)' : 'Mute audio (M)'}
        >
          {muted ? (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-[#F26B21]" />
          ) : (
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#FDF6E2]" />
          )}
        </button>

        {/* Fullscreen Icon Button */}
        <button
          type="button"
          onClick={(e) => {
            e.currentTarget.blur();
            onToggleFullscreen();
          }}
          className="btn-teal w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center"
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#FDF6E2]" />
          ) : (
            <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#FDF6E2]" />
          )}
        </button>
      </div>
    </div>
  );
};
