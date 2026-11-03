import React from 'react';
import { HouseStage } from '../game/rules';
import { SkeletonKidIllustration, WitchIllustration } from './SpookyIllustrations';

interface DoorScreenProps {
  house: HouseStage;
  doorKnocked: boolean;
  doorOpen: boolean;
  onKnock: () => void;
}

export const DoorScreen: React.FC<DoorScreenProps> = ({
  house,
  doorKnocked,
  doorOpen,
  onKnock,
}) => {
  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto px-4 pt-16 pb-6 flex flex-col items-center justify-center min-h-[calc(100vh-2rem)]">
      {/* Stage Header with high-contrast dark stroke so it reads crisply even across the cream moon */}
      <div className="text-center mb-4 bg-[#0D161E]/80 border-2 border-[#FDF6E2]/50 rounded-3xl px-6 py-2.5 shadow-xl">
        <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#FDF6E2]/90">
          {house.difficultyLabel}
        </div>
        <h1
          className="font-creepster text-3xl sm:text-5xl md:text-6xl text-[#F26B21] tracking-wide"
          style={{
            textShadow: '0 4px 0 #0D161E, 0 -2px 0 #0D161E, 3px 0 0 #0D161E, -3px 0 0 #0D161E',
          }}
        >
          House {house.id}: {house.name}
        </h1>
      </div>

      {/* Crooked Haunted Door Frame + Witch Reveal + Kid Waiting */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 my-2 w-full">
        {/* Kid with pumpkin candy bucket ready to knock */}
        <div className="order-2 md:order-1 flex flex-col items-center">
          <SkeletonKidIllustration className="w-40 h-52 md:w-48 md:h-60" celebrating={doorOpen} />
        </div>

        {/* The Haunted Doorway */}
        <div className="order-1 md:order-2 relative w-64 h-80 md:w-72 md:h-96 flex items-center justify-center">
          {/* Stone & Timber Archway Frame */}
          <div className="absolute inset-0 bg-[#0D161E] border-4 border-[#FDF6E2] rounded-t-full rounded-b-2xl shadow-[0_16px_48px_rgba(0,0,0,0.9)] overflow-hidden flex items-end justify-center">
            {/* Interior warm spooky glow + Witch revealed when door opens */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-end p-4 transition-opacity duration-500"
              style={{
                background:
                  'radial-gradient(circle at 50% 45%, #F26B21 0%, #2B193D 65%, #0D161E 100%)',
              }}
            >
              <WitchIllustration
                houseId={house.id}
                mood="idle"
                className="w-48 h-60 md:w-56 md:h-68"
              />
            </div>

            {/* Swinging Wooden Door Panel */}
            <div
              className={`relative w-full h-full origin-left transition-transform duration-700 ease-in-out flex flex-col items-center justify-center ${
                doorKnocked && !doorOpen ? 'animate-shake' : ''
              }`}
              style={{
                backgroundColor: house.doorColor,
                transform: doorOpen
                  ? 'perspective(900px) rotateY(-105deg)'
                  : 'perspective(900px) rotateY(0deg)',
                borderRight: '4px solid #0D161E',
              }}
            >
              {/* Hand-painted vertical wood plank lines */}
              <div className="absolute inset-0 flex justify-evenly pointer-events-none opacity-35">
                <div className="w-1 h-full bg-[#0D161E]" />
                <div className="w-1 h-full bg-[#0D161E]" />
                <div className="w-1 h-full bg-[#0D161E]" />
              </div>

              {/* Gothic Iron Hinges on left edge */}
              <div className="absolute left-0 top-24 w-12 h-4 bg-[#0D161E] rounded-r-full border-y border-r border-[#FDF6E2]/50" />
              <div className="absolute left-0 bottom-16 w-12 h-4 bg-[#0D161E] rounded-r-full border-y border-r border-[#FDF6E2]/50" />

              {/* Inner Door Frame & Spooky Knocker */}
              <div className="absolute inset-3 border-2 border-[#0D161E]/50 rounded-t-full flex flex-col items-center justify-between p-5 pointer-events-none">
                <div className="w-16 h-16 mt-5 rounded-full bg-[#0D161E] border-3 border-[#FDF6E2] flex items-center justify-center shadow-md">
                  <span className="font-creepster text-2xl text-[#F26B21]">#{house.id}</span>
                </div>

                {/* Center Spooky Knocker Ring */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#0D161E] border-2 border-[#FDF6E2]" />
                  <div className="w-14 h-14 -mt-3 rounded-full border-4 border-[#FDF6E2] bg-[#0D161E]/40 shadow-lg" />
                </div>

                {/* Door Handle on right */}
                <div className="w-full flex justify-end pr-2 pb-6">
                  <div className="w-5 h-12 rounded-full bg-[#0D161E] border-2 border-[#FDF6E2]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KNOCK Button or Opening Status */}
      <div className="mt-6 text-center">
        {!doorKnocked ? (
          <button
            type="button"
            onClick={onKnock}
            className="btn-orange px-12 py-4 rounded-3xl font-creepster text-4xl md:text-5xl tracking-wider"
          >
            KNOCK
          </button>
        ) : (
          <p className="font-storybook text-2xl md:text-3xl text-[#F26B21] bg-[#0D161E]/85 px-6 py-2 rounded-2xl border border-[#FDF6E2]/50">
            {doorOpen
              ? `${house.guardianName} opens the creaky door...`
              : 'Knock! Knock! Knock!...'}
          </p>
        )}
      </div>
    </div>
  );
};
