import React from 'react';
import { HouseStage } from '../game/rules';
import {
  WitchIllustration,
  SkeletonKidIllustration,
  BlackCatIcon,
  CandyIcon,
} from './SpookyIllustrations';

interface QuizScreenProps {
  house: HouseStage;
  questionIndex: number;
  hintUsedInStage: boolean;
  eliminatedOptions: string[];
  selectedOption: string | null;
  answerState: 'idle' | 'correct' | 'wrong';
  witchMood: 'idle' | 'happy' | 'cackle';
  feedbackMessage: string | null;
  stageClearedModal: boolean;
  stageSparkleEarned: boolean;
  onSelectAnswer: (option: string) => void;
  onUseBlackCatHint: () => void;
  onContinueToMap: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  house,
  questionIndex,
  hintUsedInStage,
  eliminatedOptions,
  selectedOption,
  answerState,
  witchMood,
  feedbackMessage,
  stageClearedModal,
  stageSparkleEarned,
  onSelectAnswer,
  onUseBlackCatHint,
  onContinueToMap,
}) => {
  const question = house.questions[questionIndex];

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-20 pb-6 flex flex-col justify-center min-h-[calc(100vh-2rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* LEFT COLUMN: Witch at the Door + Kid with the Pumpkin + Black Cat */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-md bg-[#132533]/90 border-3 border-[#FDF6E2] rounded-3xl p-4 shadow-[0_12px_36px_rgba(0,0,0,0.75)] flex items-end justify-center gap-2">
            {/* Witch at the open doorway */}
            <div className="flex flex-col items-center">
              <WitchIllustration
                houseId={house.id}
                mood={witchMood}
                className="w-40 h-52 sm:w-48 sm:h-60"
              />
              <span className="text-xs sm:text-sm font-bold text-[#F26B21] bg-[#0D161E] px-3 py-1 rounded-full border border-[#FDF6E2]/50">
                {house.guardianName}
              </span>
            </div>

            {/* Kid with Pumpkin Bucket */}
            <div className="flex flex-col items-center">
              <SkeletonKidIllustration
                className="w-32 h-44 sm:w-40 sm:h-52"
                celebrating={answerState === 'correct'}
              />
              <span className="text-xs sm:text-sm font-bold text-[#FDF6E2] bg-[#0D161E] px-3 py-1 rounded-full border border-[#FDF6E2]/50">
                You
              </span>
            </div>
          </div>

          {/* Ask the Black Cat Hint Button (1 per stage) */}
          <div className="mt-4 w-full max-w-md flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={hintUsedInStage || answerState !== 'idle'}
              onClick={onUseBlackCatHint}
              className={`w-full py-3 px-5 rounded-2xl font-bold text-base md:text-lg flex items-center justify-center gap-3 border-3 transition-all ${
                hintUsedInStage
                  ? 'bg-[#0D161E]/60 border-[#FDF6E2]/30 text-[#FDF6E2]/45'
                  : 'btn-teal hover:border-[#F26B21]'
              }`}
              aria-label={
                hintUsedInStage
                  ? 'Ask the black cat (Hint already used in this house)'
                  : 'Ask the black cat (Removes one wrong option)'
              }
            >
              <BlackCatIcon className="w-7 h-7" />
              <span>
                {hintUsedInStage
                  ? 'Black cat hint used (0/1 left)'
                  : 'Ask the black cat (1/1 hint)'}
              </span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Question Counter (1/3, 2/3, 3/3), Question & 2-3 Large Answer Buttons */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-[#1F3A4D]/95 border-4 border-[#FDF6E2] rounded-3xl p-6 md:p-8 shadow-[0_16px_48px_rgba(0,0,0,0.85)]">
            {/* Top Row: House Title & Question Counter */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="font-storybook text-lg md:text-xl text-[#F26B21]">
                {house.name}
              </span>
              <span
                className="font-mono-num bg-[#0D161E] border-2 border-[#FDF6E2] text-[#FDF6E2] px-4 py-1 rounded-2xl text-lg md:text-xl font-bold"
                aria-label={`Question ${questionIndex + 1} of ${house.questions.length}`}
              >
                {questionIndex + 1}/{house.questions.length}
              </span>
            </div>

            {/* Question Text (Large projector-readable white on dark) */}
            <div className="bg-[#132533] border-2 border-[#FDF6E2]/50 rounded-2xl p-5 md:p-6 mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FDF6E2] leading-snug">
                {question.prompt}
              </h2>
            </div>

            {/* 2 to 3 Large Easy-to-Tap Answer Buttons */}
            <div className="grid grid-cols-1 gap-4">
              {question.options.map((option, idx) => {
                const isEliminated = eliminatedOptions.includes(option);
                const isSelected = selectedOption === option;
                const isCorrectPick = isSelected && answerState === 'correct';
                const isWrongPick = isSelected && answerState === 'wrong';

                let buttonStyle = 'btn-orange';
                if (isCorrectPick) {
                  buttonStyle =
                    'bg-emerald-500 text-[#0D161E] border-3 border-[#FDF6E2] shadow-[0_6px_0_#065F46,0_0_28px_rgba(16,185,129,0.8)] scale-[1.02]';
                } else if (isWrongPick) {
                  buttonStyle =
                    'bg-red-600 text-[#FDF6E2] border-3 border-[#FDF6E2] shadow-[0_6px_0_#7F1D1D,0_0_28px_rgba(239,68,68,0.8)] animate-shake';
                } else if (isEliminated) {
                  buttonStyle =
                    'bg-[#0D161E]/60 text-[#FDF6E2]/35 border-2 border-[#FDF6E2]/20 line-through opacity-50';
                }

                return (
                  <button
                    key={option}
                    type="button"
                    disabled={isEliminated || answerState === 'correct'}
                    onClick={() => onSelectAnswer(option)}
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-xl md:text-2xl text-left flex items-center justify-between gap-4 ${buttonStyle}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono-num w-9 h-9 rounded-xl bg-[#0D161E]/80 text-[#FDF6E2] border border-[#FDF6E2]/60 flex items-center justify-center text-base shrink-0">
                        {idx + 1}
                      </span>
                      <span>{option}</span>
                    </span>

                    {isCorrectPick && <span className="text-2xl font-bold">✓</span>}
                    {isWrongPick && <span className="text-2xl font-bold">✗</span>}
                  </button>
                );
              })}
            </div>

            {/* Feedback Banner ("Oops! The witch cackles... try again!" or "Treat! Spot on!") */}
            <div className="min-h-[3.25rem] mt-5 flex items-center justify-center">
              {feedbackMessage && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`w-full text-center py-2.5 px-4 rounded-2xl font-bold text-lg md:text-xl border-2 ${
                    answerState === 'wrong'
                      ? 'bg-red-950/90 border-red-400 text-red-100'
                      : answerState === 'correct'
                      ? 'bg-emerald-950/90 border-emerald-400 text-emerald-100'
                      : 'bg-[#0D161E]/90 border-[#F26B21] text-[#FDF6E2]'
                  }`}
                >
                  {feedbackMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stage Complete Modal (after solving all 3 questions in Houses 1-4) */}
      {stageClearedModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#091016]/85"
          role="dialog"
          aria-modal="true"
          aria-labelledby="stage-complete-title"
        >
          <div className="w-full max-w-lg bg-[#1F3A4D] border-4 border-[#FDF6E2] rounded-3xl p-6 md:p-8 shadow-2xl text-center flex flex-col items-center">
            <div className="mb-3 scale-125">
              <CandyIcon
                houseId={house.id}
                earned={true}
                sparkleBonus={stageSparkleEarned}
                justEarned={true}
              />
            </div>

            <h2
              id="stage-complete-title"
              className="font-creepster text-4xl md:text-5xl text-[#F26B21] drop-shadow-[0_4px_0_#0D161E] mb-2"
            >
              House {house.id} Cleared!
            </h2>

            <p className="text-lg md:text-xl text-[#FDF6E2] mb-2">
              You earned the <strong>{house.candyName}</strong>!
            </p>

            {stageSparkleEarned && (
              <p className="text-sm md:text-base font-bold text-amber-300 bg-[#0D161E] border border-amber-300/60 px-4 py-1.5 rounded-full mb-5">
                ★ Bonus Candy Sparkle for 0 wrong answers!
              </p>
            )}

            <button
              type="button"
              onClick={onContinueToMap}
              className="btn-orange px-10 py-4 rounded-2xl font-bold text-xl md:text-2xl mt-2"
            >
              Back to map
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
