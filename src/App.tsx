/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import {
  HOUSES,
  RECOVERY_RIDDLES,
  GameStateData,
  createInitialGameState,
  enterHouseDoor,
  applyBlackCatHint,
  submitQuizAnswer,
  resolveBreakCurseRiddle,
  resolveLastChanceRiddle,
  countCollectedCandies,
} from './game/rules';
import { spookySound } from './game/sound';
import { SpookyBackdrop } from './components/SpookyBackdrop';
import { GameHudBar } from './components/GameHudBar';
import { HowToPlayModal } from './components/HowToPlayModal';
import {
  BreakCurseModal,
  GameOverCatchScreen,
  LastChanceRiddleScreen,
  FinalGameOverScreen,
} from './components/RecoveryModals';
import { MapScreen } from './components/MapScreen';
import { DoorScreen } from './components/DoorScreen';
import { QuizScreen } from './components/QuizScreen';
import { CoverScreen, IntroScreen, WinScreen } from './components/StoryScreens';

export default function App() {
  const [gameState, setGameState] = useState<GameStateData>(() => {
    const params = new URLSearchParams(window.location.search);
    const autostart = params.get('autostart') === '1';
    return createInitialGameState(autostart);
  });

  const [howToPlayOpen, setHowToPlayOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Transient UI animation states for quiz answers, life loss, candy drop, and lock cracking
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [witchMood, setWitchMood] = useState<'idle' | 'happy' | 'cackle'>('idle');
  const [justLostLife, setJustLostLife] = useState(false);
  const [justEarnedCandyHouseId, setJustEarnedCandyHouseId] = useState<number | null>(null);
  const [justUnlockedHouseIndex, setJustUnlockedHouseIndex] = useState<number | null>(null);

  const timersRef = useRef<number[]>([]);

  const scheduleTimer = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  // Keep document.body.dataset.state synced with the Game Shell state machine
  useEffect(() => {
    if (gameState.screen === 'cover') {
      document.body.dataset.state = 'title';
    } else if (
      gameState.screen === 'win' ||
      gameState.screen === 'gameover_catch' ||
      gameState.screen === 'gameover_final'
    ) {
      document.body.dataset.state = 'gameover';
    } else {
      document.body.dataset.state = 'playing';
    }
  }, [gameState.screen]);

  // Listen for fullscreen changes
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const handleToggleMute = useCallback(() => {
    const nextMuted = spookySound.toggleMute();
    setMuted(nextMuted);
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  const handleStartFromCover = useCallback(() => {
    spookySound.startBackgroundMusic();
    spookySound.playLockUnlock();
    setGameState((prev) => ({ ...prev, screen: 'intro' }));
  }, []);

  const handleGoToMap = useCallback(() => {
    spookySound.startBackgroundMusic();
    spookySound.playLockUnlock();
    setGameState((prev) => ({ ...prev, screen: 'map' }));
  }, []);

  const handleSelectHouse = useCallback((houseIndex: number) => {
    spookySound.playLockUnlock();
    setSelectedOption(null);
    setAnswerState('idle');
    setWitchMood('idle');
    setGameState((prev) => enterHouseDoor(prev, houseIndex));
  }, []);

  const handleKnockDoor = useCallback(() => {
    if (gameState.doorKnocked) return;
    spookySound.playDoorKnock();
    setGameState((prev) => ({ ...prev, doorKnocked: true }));

    scheduleTimer(() => {
      spookySound.playCreakyDoor();
      setGameState((prev) => ({ ...prev, doorOpen: true }));
    }, 650);

    scheduleTimer(() => {
      setGameState((prev) => ({
        ...prev,
        screen: 'quiz',
        lastFeedbackMessage: null,
      }));
    }, 1550);
  }, [gameState.doorKnocked, scheduleTimer]);

  const handleUseBlackCatHint = useCallback(() => {
    spookySound.playCatHint();
    setGameState((prev) => applyBlackCatHint(prev));
  }, []);

  const handleSelectQuizAnswer = useCallback(
    (option: string) => {
      if (answerState === 'correct') return;

      const house = HOUSES[gameState.activeHouseIndex];
      const question = house.questions[gameState.currentQuestionIndex];
      const isRight = option === question.correctAnswer;

      setSelectedOption(option);

      if (isRight) {
        setAnswerState('correct');
        setWitchMood('happy');
        spookySound.playCheer();
        setGameState((prev) => ({
          ...prev,
          lastFeedbackMessage: 'Treat! Spot on!',
        }));

        // Move to the next question after 1 second (1000ms) as specified in prompt
        scheduleTimer(() => {
          setGameState((prev) => {
            const outcome = submitQuizAnswer(prev, option);
            if (outcome.stageCompleted) {
              spookySound.playCandyDing();
              setJustEarnedCandyHouseId(house.id);
              if (!outcome.allHousesCompleted) {
                setJustUnlockedHouseIndex(prev.activeHouseIndex + 1);
              }
            }
            return outcome.nextState;
          });
          setSelectedOption(null);
          setAnswerState('idle');
          setWitchMood('idle');
        }, 1000);
      } else {
        setAnswerState('wrong');
        setWitchMood('cackle');
        setJustLostLife(true);
        spookySound.playWitchCackle();

        scheduleTimer(() => {
          setJustLostLife(false);
        }, 600);

        // Apply wrong answer rule immediately so feedback & life loss appear right away
        setGameState((prev) => {
          const outcome = submitQuizAnswer(prev, option);
          return outcome.nextState;
        });

        scheduleTimer(() => {
          setAnswerState('idle');
          setSelectedOption(null);
        }, 550);
      }
    },
    [
      answerState,
      gameState.activeHouseIndex,
      gameState.currentQuestionIndex,
      scheduleTimer,
    ]
  );

  const handleContinueToMapAfterStage = useCallback(() => {
    spookySound.playLockUnlock();
    setGameState((prev) => ({
      ...prev,
      screen: 'map',
      stageClearedModal: false,
      lastFeedbackMessage: null,
    }));
  }, []);

  const handleBackToMap = useCallback(() => {
    clearTimers();
    setSelectedOption(null);
    setAnswerState('idle');
    setWitchMood('idle');
    setGameState((prev) => ({
      ...prev,
      screen: 'map',
      stageClearedModal: false,
      lastFeedbackMessage: null,
    }));
  }, [clearTimers]);

  const handleBreakCurseAnswer = useCallback((option: string) => {
    setGameState((prev) => {
      const result = resolveBreakCurseRiddle(prev, option);
      if (result.solved) {
        spookySound.playCheer();
        setWitchMood('idle');
      } else {
        spookySound.playWitchCackle();
      }
      return result.nextState;
    });
  }, []);

  const handleStartLastChance = useCallback(() => {
    spookySound.playLockUnlock();
    setGameState((prev) => ({ ...prev, screen: 'last_chance' }));
  }, []);

  const handleLastChanceAnswer = useCallback((option: string) => {
    setGameState((prev) => {
      const result = resolveLastChanceRiddle(prev, option);
      if (result.revived) {
        spookySound.playCheer();
        setWitchMood('idle');
      } else {
        spookySound.playWitchCackle();
      }
      return result.nextState;
    });
  }, []);

  const handlePlayAgain = useCallback(() => {
    clearTimers();
    spookySound.playLockUnlock();
    setSelectedOption(null);
    setAnswerState('idle');
    setWitchMood('idle');
    setJustEarnedCandyHouseId(null);
    setJustUnlockedHouseIndex(null);
    setGameState(createInitialGameState(true));
  }, [clearTimers]);

  // Keyboard shortcuts (Enter/Space on Cover/Intro/Door, 1-3 in Quiz, H for Hint, M for Mute)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'm' || e.key === 'M') {
        handleToggleMute();
        return;
      }

      if (howToPlayOpen) {
        if (e.key === 'Escape') setHowToPlayOpen(false);
        return;
      }

      if (gameState.screen === 'cover' && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        handleStartFromCover();
      } else if (gameState.screen === 'intro' && e.key === 'Enter') {
        e.preventDefault();
        handleGoToMap();
      } else if (gameState.screen === 'door' && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        handleKnockDoor();
      } else if (gameState.screen === 'quiz' && !gameState.breakCurseActive && !gameState.stageClearedModal) {
        if (e.key === 'h' || e.key === 'H') {
          handleUseBlackCatHint();
        } else if (e.key === '1' || e.key === '2' || e.key === '3') {
          const idx = Number(e.key) - 1;
          const currentQ =
            HOUSES[gameState.activeHouseIndex].questions[gameState.currentQuestionIndex];
          if (currentQ && currentQ.options[idx]) {
            const opt = currentQ.options[idx];
            if (!gameState.eliminatedOptions.includes(opt)) {
              handleSelectQuizAnswer(opt);
            }
          }
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    gameState,
    howToPlayOpen,
    handleToggleMute,
    handleStartFromCover,
    handleGoToMap,
    handleKnockDoor,
    handleUseBlackCatHint,
    handleSelectQuizAnswer,
  ]);

  const currentHouse = HOUSES[gameState.activeHouseIndex];
  const currentRiddle =
    RECOVERY_RIDDLES[gameState.currentRiddleIndex % RECOVERY_RIDDLES.length];
  const candiesEarnedCount = countCollectedCandies(gameState);

  return (
    <main className="relative w-screen h-screen overflow-y-auto overflow-x-hidden select-none">
      {/* Consistent Spooky-Cute Hand-Painted Night Sky, Cream Moon, Fog & Stars */}
      <SpookyBackdrop
        confettiActive={gameState.screen === 'win' || gameState.stageClearedModal}
        largeMoon={gameState.screen === 'cover'}
      />

      {/* Perimeter HUD & Utility Controls (Mute, Fullscreen, Lives, Candy Tray) */}
      <GameHudBar
        screen={gameState.screen}
        lives={gameState.lives}
        maxLives={gameState.maxLives}
        justLostLife={justLostLife}
        candies={gameState.candies}
        justEarnedCandyHouseId={justEarnedCandyHouseId}
        activeHouseId={
          gameState.screen === 'map'
            ? gameState.currentHouseIndex + 1
            : currentHouse.id
        }
        muted={muted}
        isFullscreen={isFullscreen}
        onToggleMute={handleToggleMute}
        onToggleFullscreen={handleToggleFullscreen}
        onOpenHowToPlay={() => setHowToPlayOpen(true)}
        onBackToMap={handleBackToMap}
      />

      {/* Screens in Order */}
      {gameState.screen === 'cover' && (
        <CoverScreen onStart={handleStartFromCover} />
      )}

      {gameState.screen === 'intro' && (
        <IntroScreen
          onGoToMap={handleGoToMap}
          onOpenHowToPlay={() => setHowToPlayOpen(true)}
        />
      )}

      {gameState.screen === 'map' && (
        <MapScreen
          currentHouseIndex={gameState.currentHouseIndex}
          completedHouses={gameState.completedHouses}
          candies={gameState.candies}
          justUnlockedHouseIndex={justUnlockedHouseIndex}
          justEarnedCandyHouseId={justEarnedCandyHouseId}
          onSelectHouse={handleSelectHouse}
        />
      )}

      {gameState.screen === 'door' && (
        <DoorScreen
          house={currentHouse}
          doorKnocked={gameState.doorKnocked}
          doorOpen={gameState.doorOpen}
          onKnock={handleKnockDoor}
        />
      )}

      {gameState.screen === 'quiz' && (
        <QuizScreen
          house={currentHouse}
          questionIndex={gameState.currentQuestionIndex}
          hintUsedInStage={gameState.hintUsedInStage}
          eliminatedOptions={gameState.eliminatedOptions}
          selectedOption={selectedOption}
          answerState={answerState}
          witchMood={witchMood}
          feedbackMessage={gameState.lastFeedbackMessage}
          stageClearedModal={gameState.stageClearedModal}
          stageSparkleEarned={
            Boolean(gameState.candies[gameState.activeHouseIndex]?.sparkleBonus)
          }
          onSelectAnswer={handleSelectQuizAnswer}
          onUseBlackCatHint={handleUseBlackCatHint}
          onContinueToMap={handleContinueToMapAfterStage}
        />
      )}

      {gameState.screen === 'win' && (
        <WinScreen
          candies={gameState.candies}
          score={gameState.score}
          livesRemaining={gameState.lives}
          onPlayAgain={handlePlayAgain}
        />
      )}

      {gameState.screen === 'gameover_catch' && (
        <div className="min-h-screen flex items-center justify-center pt-16 pb-8">
          <GameOverCatchScreen
            houseId={currentHouse.id}
            onStartLastChance={handleStartLastChance}
          />
        </div>
      )}

      {gameState.screen === 'last_chance' && (
        <div className="min-h-screen flex items-center justify-center pt-16 pb-8">
          <LastChanceRiddleScreen
            riddle={currentRiddle}
            onAnswer={handleLastChanceAnswer}
          />
        </div>
      )}

      {gameState.screen === 'gameover_final' && (
        <div className="min-h-screen flex items-center justify-center pt-16 pb-8">
          <FinalGameOverScreen
            candiesEarned={candiesEarnedCount}
            score={gameState.score}
            onTryAgain={handlePlayAgain}
          />
        </div>
      )}

      {/* How to Play Pop-up Modal */}
      <HowToPlayModal
        open={howToPlayOpen}
        onClose={() => setHowToPlayOpen(false)}
      />

      {/* Recovery Challenge: Break the Curse Modal */}
      <BreakCurseModal
        open={gameState.breakCurseActive}
        riddle={currentRiddle}
        onSelectAnswer={handleBreakCurseAnswer}
      />
    </main>
  );
}
