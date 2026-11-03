import React from 'react';
import { X } from 'lucide-react';
import { PumpkinLifeIcon, BlackCatIcon, CandyIcon } from './SpookyIllustrations';

interface HowToPlayModalProps {
  open: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#091016]/85"
      role="dialog"
      aria-modal="true"
      aria-labelledby="how-to-play-title"
    >
      <div className="relative w-full max-w-xl bg-[#1F3A4D] border-4 border-[#FDF6E2] rounded-3xl p-6 md:p-8 shadow-[0_16px_48px_rgba(0,0,0,0.85)] text-[#FDF6E2]">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 btn-teal w-10 h-10 rounded-full flex items-center justify-center"
          aria-label="Close How to play"
        >
          <X className="w-5 h-5" />
        </button>

        <h2
          id="how-to-play-title"
          className="font-storybook text-3xl md:text-4xl text-[#F26B21] text-center mb-6 drop-shadow-[0_3px_0_#0D161E]"
        >
          How to Play
        </h2>

        <div className="space-y-4 text-base md:text-lg">
          <div className="flex items-center gap-4 bg-[#132533] border-2 border-[#FDF6E2]/30 rounded-2xl p-4">
            <div className="shrink-0">
              <PumpkinLifeIcon alive={true} />
            </div>
            <div>
              <p className="font-bold text-[#F26B21]">3 Pumpkin Lives</p>
              <p className="text-sm md:text-base text-[#FDF6E2]/90">
                Start with 3 pumpkins. A wrong answer makes the witch cackle and costs 1 pumpkin!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#132533] border-2 border-[#FDF6E2]/30 rounded-2xl p-4">
            <div className="shrink-0 bg-[#0D161E] p-2 rounded-xl border border-[#FDF6E2]">
              <BlackCatIcon className="w-8 h-8" />
            </div>
            <div>
              <p className="font-bold text-[#F26B21]">Ask the Black Cat (Hint)</p>
              <p className="text-sm md:text-base text-[#FDF6E2]/90">
                Stuck on a riddle? Ask the black cat once per house to scratch out a wrong option.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#132533] border-2 border-[#FDF6E2]/30 rounded-2xl p-4">
            <div className="shrink-0">
              <CandyIcon houseId={1} earned={true} sparkleBonus={true} />
            </div>
            <div>
              <p className="font-bold text-[#F26B21]">Break the Curse & Last Chance</p>
              <p className="text-sm md:text-base text-[#FDF6E2]/90">
                Miss the same question twice to face a bonus riddle and restore 1 pumpkin! Lose all 3 lives for one final Last Chance riddle.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={onClose}
            className="btn-orange px-8 py-3 rounded-2xl font-bold text-xl tracking-wide"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};
