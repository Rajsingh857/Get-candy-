import React, { useState } from 'react';
import { HelpCircle, Share2, RotateCcw, Check } from 'lucide-react';
import { CandyStatus } from '../game/rules';
import {
  TitleEmblemSvg,
  SkeletonKidIllustration,
  CandyIcon,
} from './SpookyIllustrations';

interface CoverScreenProps {
  onStart: () => void;
}

export const CoverScreen: React.FC<CoverScreenProps> = ({ onStart }) => {
  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-8 flex flex-col items-center justify-between min-h-[calc(100vh-1rem)] text-center">
      {/* Upper Negative-Space Region with Bespoke Inline SVG Title Lockup */}
      <div className="w-full pt-4 md:pt-8">
        <TitleEmblemSvg />
      </div>

      {/* Centerpiece: Kid in Skeleton Costume with Pumpkin Candy Bucket in front of the Moon */}
      <div className="my-auto flex flex-col items-center">
        <div className="animate-float">
          <SkeletonKidIllustration className="w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80" celebrating={true} />
        </div>

        <button
          type="button"
          data-start="true"
          onClick={onStart}
          className="btn-orange mt-2 px-14 py-4 rounded-3xl font-creepster text-4xl md:text-5xl tracking-wider"
        >
          START
        </button>
      </div>

      {/* Single flat borderless inline control-hint line in bottom safe margin */}
      <p className="text-xs md:text-sm text-[#FDF6E2]/75 tracking-wide pb-2">
        Enter / Space Start · 1-3 Answer · H Black Cat Hint · M Mute
      </p>
    </div>
  );
};

interface IntroScreenProps {
  onGoToMap: () => void;
  onOpenHowToPlay: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({
  onGoToMap,
  onOpenHowToPlay,
}) => {
  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-2rem)]">
      <div className="bg-[#1F3A4D]/95 border-4 border-[#FDF6E2] rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col md:flex-row items-center gap-8">
        {/* Kid with Pumpkin Ready */}
        <div className="shrink-0">
          <SkeletonKidIllustration className="w-40 h-52 md:w-48 md:h-60" />
        </div>

        {/* Mission Brief & Action Buttons */}
        <div className="text-center md:text-left flex-1">
          <h1 className="font-creepster text-4xl sm:text-5xl md:text-6xl text-[#F26B21] drop-shadow-[0_4px_0_#0D161E] mb-4">
            Escape Halloween
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-[#FDF6E2] leading-relaxed mb-8 font-medium">
            You&apos;ve got your pumpkin ready for the spookiest night of the year. Your mission: visit 5 haunted houses, solve their riddles and collect a bone-chilling pile of candy.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <button
              type="button"
              onClick={onGoToMap}
              className="btn-orange px-12 py-4 rounded-2xl font-creepster text-3xl md:text-4xl tracking-wider"
            >
              GO!
            </button>

            <button
              type="button"
              onClick={onOpenHowToPlay}
              className="btn-teal px-6 py-4 rounded-2xl font-bold text-lg md:text-xl flex items-center gap-2.5"
            >
              <HelpCircle className="w-6 h-6 text-[#F26B21]" />
              <span>How to play</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface WinScreenProps {
  candies: CandyStatus[];
  score: number;
  livesRemaining: number;
  onPlayAgain: () => void;
}

export const WinScreen: React.FC<WinScreenProps> = ({
  candies,
  score,
  livesRemaining,
  onPlayAgain,
}) => {
  const [copied, setCopied] = useState(false);
  const earnedCount = candies.filter((c) => c.earned).length;
  const sparkleCount = candies.filter((c) => c.earned && c.sparkleBonus).length;

  const handleShare = () => {
    const shareText = `🎃 I escaped Halloween! Candy collected: ${earnedCount}/5 (${sparkleCount} flawless sparkles) · Score: ${score} pts! 🍬`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareText).catch(() => {});
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2600);
  };

  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto px-4 py-10 flex flex-col items-center justify-center min-h-[calc(100vh-2rem)] text-center">
      <div className="w-full bg-[#1F3A4D]/95 border-4 border-[#FDF6E2] rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col items-center">
        <SkeletonKidIllustration className="w-36 h-44 mb-2" celebrating={true} />

        <h1 className="font-creepster text-4xl sm:text-6xl md:text-7xl text-[#F26B21] drop-shadow-[0_5px_0_#0D161E] mb-3">
          You escaped Halloween!
        </h1>

        <p className="text-xl md:text-2xl font-bold text-[#FDF6E2] mb-4">
          Candy collected: <span className="font-mono-num text-[#F26B21]">{earnedCount}/5</span>
        </p>

        {/* Visual Candy Tray Showcase */}
        <div className="flex items-center justify-center gap-3 bg-[#132533] border-2 border-[#FDF6E2]/50 rounded-2xl px-6 py-4 mb-6">
          {candies.map((c) => (
            <CandyIcon
              key={c.houseId}
              houseId={c.houseId}
              earned={c.earned}
              sparkleBonus={c.sparkleBonus}
              justEarned={c.earned}
            />
          ))}
        </div>

        {/* Score & Stats Row */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-lg bg-[#0D161E]/85 border-2 border-[#FDF6E2]/40 rounded-2xl p-4 mb-6">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#FDF6E2]/70">Score</div>
            <div className="font-mono-num text-2xl md:text-3xl font-bold text-[#F26B21]">
              {score}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-[#FDF6E2]/70">Sparkles</div>
            <div className="font-mono-num text-2xl md:text-3xl font-bold text-amber-300">
              {sparkleCount}/5
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-[#FDF6E2]/70">Lives Left</div>
            <div className="font-mono-num text-2xl md:text-3xl font-bold text-[#FDF6E2]">
              {livesRemaining}/3
            </div>
          </div>
        </div>

        {/* Thank you for playing line */}
        <p className="font-storybook text-2xl text-[#FDF6E2] mb-6">
          Thank you for playing!
        </p>

        {/* Play Again & Share Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            data-start="true"
            onClick={onPlayAgain}
            className="btn-orange px-8 py-4 rounded-2xl font-bold text-xl md:text-2xl flex items-center gap-2.5"
          >
            <RotateCcw className="w-6 h-6" />
            <span>Play again</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="btn-teal px-8 py-4 rounded-2xl font-bold text-xl md:text-2xl flex items-center gap-2.5"
          >
            {copied ? (
              <>
                <Check className="w-6 h-6 text-emerald-400" />
                <span>Copied Result!</span>
              </>
            ) : (
              <>
                <Share2 className="w-6 h-6 text-[#F26B21]" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
