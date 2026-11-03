import React from 'react';
import { RecoveryRiddle } from '../game/rules';
import { WitchIllustration, SkeletonKidIllustration } from './SpookyIllustrations';

interface BreakCurseModalProps {
  open: boolean;
  riddle: RecoveryRiddle;
  onSelectAnswer: (option: string) => void;
}

export const BreakCurseModal: React.FC<BreakCurseModalProps> = ({
  open,
  riddle,
  onSelectAnswer,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#091016]/90"
      role="dialog"
      aria-modal="true"
      aria-labelledby="break-curse-title"
    >
      <div className="w-full max-w-2xl bg-[#1F3A4D] border-4 border-[#F26B21] rounded-3xl p-6 md:p-8 shadow-[0_16px_48px_rgba(0,0,0,0.9)] text-center">
        <div className="inline-block bg-[#0D161E] border-2 border-[#FDF6E2] rounded-2xl px-4 py-1 text-sm font-bold uppercase tracking-wider text-[#F26B21] mb-3">
          Recovery Challenge
        </div>

        <h2
          id="break-curse-title"
          className="font-creepster text-4xl md:text-5xl text-[#F26B21] mb-2 drop-shadow-[0_4px_0_#0D161E]"
        >
          Break the curse!
        </h2>

        <p className="text-base md:text-lg text-[#FDF6E2]/90 mb-5">
          Solve this bonus riddle to restore <strong>+1 Pumpkin</strong> and return to the question!
        </p>

        <div className="bg-[#132533] border-2 border-[#FDF6E2] rounded-2xl p-5 mb-6">
          <p className="text-xl md:text-2xl font-bold text-[#FDF6E2] leading-snug">
            {riddle.prompt}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3.5 max-w-lg mx-auto">
          {riddle.options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onSelectAnswer(opt)}
              className="btn-orange py-3.5 px-6 rounded-2xl font-bold text-lg md:text-xl"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

interface GameOverCatchScreenProps {
  houseId: number;
  onStartLastChance: () => void;
}

export const GameOverCatchScreen: React.FC<GameOverCatchScreenProps> = ({
  houseId,
  onStartLastChance,
}) => (
  <div className="relative z-10 w-full max-w-3xl mx-auto px-4 flex flex-col items-center text-center">
    <div className="w-36 h-44 mb-2">
      <WitchIllustration houseId={houseId} mood="cackle" className="w-full h-full" />
    </div>

    <h1 className="font-creepster text-5xl md:text-7xl text-[#F26B21] drop-shadow-[0_6px_0_#0D161E] mb-3">
      The witches caught you!
    </h1>

    <p className="text-xl md:text-2xl text-[#FDF6E2] max-w-xl mb-8">
      You ran out of pumpkins! Solve one final riddle to escape with 1 life and keep your candy!
    </p>

    <button
      type="button"
      onClick={onStartLastChance}
      className="btn-orange px-10 py-4 rounded-3xl font-bold text-2xl md:text-3xl tracking-wide"
    >
      Last Chance
    </button>
  </div>
);

interface LastChanceRiddleScreenProps {
  riddle: RecoveryRiddle;
  onAnswer: (option: string) => void;
}

export const LastChanceRiddleScreen: React.FC<LastChanceRiddleScreenProps> = ({
  riddle,
  onAnswer,
}) => (
  <div className="relative z-10 w-full max-w-2xl mx-auto px-4">
    <div className="bg-[#1F3A4D]/95 border-4 border-[#FDF6E2] rounded-3xl p-6 md:p-8 shadow-2xl text-center">
      <h1 className="font-creepster text-4xl md:text-6xl text-[#F26B21] drop-shadow-[0_4px_0_#0D161E] mb-2">
        Last Chance!
      </h1>
      <p className="text-base md:text-lg text-[#FDF6E2]/90 mb-5">
        Answer right to revive with 1 pumpkin and continue from this house!
      </p>

      <div className="bg-[#132533] border-2 border-[#FDF6E2] rounded-2xl p-5 mb-6">
        <p className="text-xl md:text-2xl font-bold text-[#FDF6E2]">{riddle.prompt}</p>
      </div>

      <div className="grid grid-cols-1 gap-3.5 max-w-lg mx-auto">
        {riddle.options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onAnswer(opt)}
            className="btn-orange py-4 px-6 rounded-2xl font-bold text-xl"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  </div>
);

interface FinalGameOverScreenProps {
  candiesEarned: number;
  score: number;
  onTryAgain: () => void;
}

export const FinalGameOverScreen: React.FC<FinalGameOverScreenProps> = ({
  candiesEarned,
  score,
  onTryAgain,
}) => (
  <div className="relative z-10 w-full max-w-xl mx-auto px-4 text-center">
    <div className="bg-[#1F3A4D]/95 border-4 border-[#FDF6E2] rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col items-center">
      <SkeletonKidIllustration className="w-32 h-40 mb-2" />
      <h1 className="font-creepster text-5xl md:text-6xl text-[#F26B21] drop-shadow-[0_5px_0_#0D161E] mb-2">
        Game over
      </h1>
      <p className="text-lg md:text-xl text-[#FDF6E2] mb-5">
        The spell was too strong this time! Ready to start fresh from House 1?
      </p>

      <div className="flex items-center justify-center gap-6 bg-[#132533] border-2 border-[#FDF6E2]/40 rounded-2xl px-6 py-3 mb-6">
        <div>
          <div className="text-xs uppercase text-[#FDF6E2]/75">Candy collected</div>
          <div className="font-mono-num text-2xl font-bold text-[#F26B21]">{candiesEarned}/5</div>
        </div>
        <div className="h-8 w-px bg-[#FDF6E2]/25" />
        <div>
          <div className="text-xs uppercase text-[#FDF6E2]/75">Score</div>
          <div className="font-mono-num text-2xl font-bold text-[#FDF6E2]">{score}</div>
        </div>
      </div>

      <button
        type="button"
        data-start="true"
        onClick={onTryAgain}
        className="btn-orange px-10 py-4 rounded-3xl font-bold text-2xl tracking-wide"
      >
        Try again
      </button>
    </div>
  </div>
);
