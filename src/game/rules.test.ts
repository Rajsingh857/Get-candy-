import test from 'node:test';
import assert from 'node:assert/strict';
import {
  HOUSES,
  RECOVERY_RIDDLES,
  createInitialGameState,
  canSelectHouse,
  enterHouseDoor,
  applyBlackCatHint,
  submitQuizAnswer,
  resolveBreakCurseRiddle,
  resolveLastChanceRiddle,
  countCollectedCandies,
  countSparkleCandies,
} from './rules';

test('initial state sets 3 lives, 5 locked/sequential houses, and 0 candies', () => {
  const state = createInitialGameState(false);
  assert.equal(state.screen, 'cover');
  assert.equal(state.lives, 3);
  assert.equal(state.candies.length, 5);
  assert.equal(countCollectedCandies(state), 0);
  assert.equal(canSelectHouse(state, 0), true);
  assert.equal(canSelectHouse(state, 1), false);
});

test('autostart starts directly on map screen', () => {
  const state = createInitialGameState(true);
  assert.equal(state.screen, 'map');
});

test('completing a house with no wrong answers awards candy and sparkle bonus and unlocks next house', () => {
  let state = createInitialGameState(true);
  state = enterHouseDoor(state, 0);
  state = { ...state, screen: 'quiz' };

  const q1 = submitQuizAnswer(state, 'Broom');
  assert.equal(q1.isCorrect, true);
  assert.equal(q1.stageCompleted, false);
  state = q1.nextState;
  assert.equal(state.currentQuestionIndex, 1);

  const q2 = submitQuizAnswer(state, 'Frog eyes');
  assert.equal(q2.isCorrect, true);
  state = q2.nextState;
  assert.equal(state.currentQuestionIndex, 2);

  const q3 = submitQuizAnswer(state, 'Pumpkin');
  assert.equal(q3.isCorrect, true);
  assert.equal(q3.stageCompleted, true);
  state = q3.nextState;

  assert.equal(countCollectedCandies(state), 1);
  assert.equal(countSparkleCandies(state), 1);
  assert.equal(state.currentHouseIndex, 1);
  assert.equal(canSelectHouse(state, 0), false);
  assert.equal(canSelectHouse(state, 1), true);
});

test('black cat hint removes one wrong option once per stage', () => {
  let state = createInitialGameState(true);
  state = enterHouseDoor(state, 0);
  state = { ...state, screen: 'quiz' };

  const hinted = applyBlackCatHint(state);
  assert.equal(hinted.hintUsedInStage, true);
  assert.equal(hinted.eliminatedOptions.length, 1);
  assert.equal(hinted.eliminatedOptions[0], 'Private plane');

  // Calling again in same stage does not remove anything else
  const hintedAgain = applyBlackCatHint(hinted);
  assert.deepEqual(hintedAgain.eliminatedOptions, hinted.eliminatedOptions);
});

test('getting the same question wrong twice with lives remaining triggers Break the Curse', () => {
  let state = createInitialGameState(true);
  state = enterHouseDoor(state, 0);
  state = { ...state, screen: 'quiz', currentQuestionIndex: 2 }; // 3 options on Q3

  const wrong1 = submitQuizAnswer(state, 'Mango');
  assert.equal(wrong1.isCorrect, false);
  assert.equal(wrong1.triggeredBreakCurse, false);
  assert.equal(wrong1.nextState.lives, 2);

  const wrong2 = submitQuizAnswer(wrong1.nextState, 'Banana');
  assert.equal(wrong2.isCorrect, false);
  assert.equal(wrong2.triggeredBreakCurse, true);
  assert.equal(wrong2.nextState.breakCurseActive, true);
  assert.equal(wrong2.nextState.lives, 1);

  // Solving Break the Curse restores 1 pumpkin and returns to the question
  const solved = resolveBreakCurseRiddle(
    wrong2.nextState,
    RECOVERY_RIDDLES[0].correctAnswer
  );
  assert.equal(solved.solved, true);
  assert.equal(solved.nextState.lives, 2);
  assert.equal(solved.nextState.breakCurseActive, false);
});

test('failing Break the Curse awards no candy for that house and advances to next house', () => {
  let state = createInitialGameState(true);
  state = enterHouseDoor(state, 0);
  state = {
    ...state,
    screen: 'quiz',
    lives: 1,
    questionWrongCount: 2,
    breakCurseActive: true,
  };

  const failed = resolveBreakCurseRiddle(state, 'Flying toaster');
  assert.equal(failed.solved, false);
  assert.equal(countCollectedCandies(failed.nextState), 0);
  assert.equal(failed.nextState.currentHouseIndex, 1);
  assert.equal(failed.nextState.screen, 'map');
});

test('reaching 0 lives triggers Last Chance and solving revives with 1 life', () => {
  let state = createInitialGameState(true);
  state = enterHouseDoor(state, 2);
  state = { ...state, screen: 'quiz', lives: 1 };

  const wrong = submitQuizAnswer(state, 'Pink and yellow');
  assert.equal(wrong.triggeredGameOverCatch, true);
  assert.equal(wrong.nextState.lives, 0);
  assert.equal(wrong.nextState.screen, 'gameover_catch');

  // Revive on Last Chance
  const revived = resolveLastChanceRiddle(
    wrong.nextState,
    RECOVERY_RIDDLES[0].correctAnswer
  );
  assert.equal(revived.revived, true);
  assert.equal(revived.nextState.lives, 1);
  assert.equal(revived.nextState.screen, 'quiz');

  // Failing Last Chance leads to gameover_final
  const failed = resolveLastChanceRiddle(wrong.nextState, 'Wrong answer');
  assert.equal(failed.revived, false);
  assert.equal(failed.nextState.screen, 'gameover_final');
});

test('all 5 houses contain 3 questions matching the prompt specification', () => {
  assert.equal(HOUSES.length, 5);
  for (const house of HOUSES) {
    assert.equal(house.questions.length, 3);
  }
});
