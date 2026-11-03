export type ScreenState =
  | 'cover'
  | 'intro'
  | 'map'
  | 'door'
  | 'quiz'
  | 'win'
  | 'gameover_catch' // "The witches caught you!" with Last Chance button
  | 'last_chance'    // The final riddle screen
  | 'gameover_final'; // Final "Game over" with Try again button

export interface Question {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
}

export interface HouseStage {
  id: number; // 1 to 5
  name: string;
  difficultyLabel: string;
  guardianName: string;
  guardianTitle: string;
  candyName: string;
  candyType: 'lollipop' | 'wrapped' | 'corn' | 'chocolate' | ' cauldron_drop';
  roofColor: string;
  wallColor: string;
  doorColor: string;
  questions: Question[];
}

export interface RecoveryRiddle {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
}

export interface CandyStatus {
  houseId: number;
  earned: boolean;
  sparkleBonus: boolean; // True if completed with 0 wrong answers in that house
}

export interface GameStateData {
  screen: ScreenState;
  lives: number;
  maxLives: number;
  currentHouseIndex: number; // 0 to 4 (tracks which house is currently unlocked / active)
  activeHouseIndex: number;  // 0 to 4 (the house currently being visited)
  currentQuestionIndex: number; // 0 to 2
  questionWrongCount: number; // Wrong answers on the current question
  stageWrongCount: number;    // Total wrong answers in the current house stage
  hintUsedInStage: boolean;
  eliminatedOptions: string[]; // Options removed by hint or previous wrong click on current question
  candies: CandyStatus[];
  completedHouses: boolean[]; // [false, false, false, false, false]
  score: number;
  breakCurseActive: boolean;
  currentRiddleIndex: number;
  doorKnocked: boolean;
  doorOpen: boolean;
  stageClearedModal: boolean;
  lastFeedbackMessage: string | null;
}

export const HOUSES: HouseStage[] = [
  {
    id: 1,
    name: 'Crooked Broom Cottage',
    difficultyLabel: 'Stage 1 · Easy',
    guardianName: 'Hazel the Hedge Witch',
    guardianTitle: 'Keeper of the Broomstick',
    candyName: 'Swirly Pumpkin Lollipop',
    candyType: 'lollipop',
    roofColor: '#2B193D',
    wallColor: '#1F3A4D',
    doorColor: '#F26B21',
    questions: [
      {
        id: 'h1_q1',
        prompt: 'What do witches use to fly?',
        options: ['Broom', 'Private plane'],
        correctAnswer: 'Broom',
      },
      {
        id: 'h1_q2',
        prompt: "What is the main ingredient of a witch's potion?",
        options: ['Frog eyes', 'Ketchup'],
        correctAnswer: 'Frog eyes',
      },
      {
        id: 'h1_q3',
        prompt: 'Which fruit is carved on Halloween?',
        options: ['Pumpkin', 'Mango', 'Banana'],
        correctAnswer: 'Pumpkin',
      },
    ],
  },
  {
    id: 2,
    name: 'Whispering Cat Manor',
    difficultyLabel: 'Stage 2 · Mild',
    guardianName: 'Agatha & Shadow',
    guardianTitle: 'Mistress of Midnight Cats',
    candyName: 'Moonlight Wrapped Taffy',
    candyType: 'wrapped',
    roofColor: '#1E2D3D',
    wallColor: '#243B4A',
    doorColor: '#D9531E',
    questions: [
      {
        id: 'h2_q1',
        prompt: "What animal is a witch's classic pet?",
        options: ['Black cat', 'Goldfish'],
        correctAnswer: 'Black cat',
      },
      {
        id: 'h2_q2',
        prompt: 'What do you say when you go door to door?',
        options: ['Trick or treat', 'Happy New Year'],
        correctAnswer: 'Trick or treat',
      },
      {
        id: 'h2_q3',
        prompt: 'Which creature hangs upside down in caves?',
        options: ['Bat', 'Elephant'],
        correctAnswer: 'Bat',
      },
    ],
  },
  {
    id: 3,
    name: 'Rattling Bones Tower',
    difficultyLabel: 'Stage 3 · Medium',
    guardianName: 'Barnaby Bones',
    guardianTitle: 'The Grinning Phantom Witch',
    candyName: 'Golden Candy Corn Trio',
    candyType: 'corn',
    roofColor: '#2B223C',
    wallColor: '#1B3344',
    doorColor: '#F26B21',
    questions: [
      {
        id: 'h3_q1',
        prompt: 'Which colour is most linked to Halloween?',
        options: ['Orange and black', 'Pink and yellow'],
        correctAnswer: 'Orange and black',
      },
      {
        id: 'h3_q2',
        prompt: 'What do ghosts say?',
        options: ['Boo!', 'Moo!'],
        correctAnswer: 'Boo!',
      },
      {
        id: 'h3_q3',
        prompt: 'What is a skeleton made of?',
        options: ['Bones', 'Jelly'],
        correctAnswer: 'Bones',
      },
    ],
  },
  {
    id: 4,
    name: 'Stitched Gargoyle Spire',
    difficultyLabel: 'Stage 4 · Spooky',
    guardianName: 'Countess Volt & Frankie',
    guardianTitle: 'Warden of October Nights',
    candyName: 'Enchanted Bat Truffle',
    candyType: 'chocolate',
    roofColor: '#1B2838',
    wallColor: '#223A4E',
    doorColor: '#E05A19',
    questions: [
      {
        id: 'h4_q1',
        prompt: 'Which night is Halloween celebrated on?',
        options: ['31 October', '25 December', '14 February'],
        correctAnswer: '31 October',
      },
      {
        id: 'h4_q2',
        prompt: 'Which monster is made of stitched body parts?',
        options: ['Frankenstein', 'Snowman', 'Robot'],
        correctAnswer: 'Frankenstein',
      },
      {
        id: 'h4_q3',
        prompt: 'What does a vampire fear?',
        options: ['Sunlight', 'Rain'],
        correctAnswer: 'Sunlight',
      },
    ],
  },
  {
    id: 5,
    name: 'Full Moon Fortress',
    difficultyLabel: 'Stage 5 · Tricky',
    guardianName: 'Grand High Witch Morgana',
    guardianTitle: 'Empress of the Full Moon',
    candyName: 'Glowing Cauldron Sour Gem',
    candyType: ' cauldron_drop',
    roofColor: '#251836',
    wallColor: '#172E3E',
    doorColor: '#F26B21',
    questions: [
      {
        id: 'h5_q1',
        prompt: 'Which Halloween creature turns into a wolf at full moon?',
        options: ['Werewolf', 'Mummy', 'Dragon'],
        correctAnswer: 'Werewolf',
      },
      {
        id: 'h5_q2',
        prompt:
          '"I have a face but no head, I glow at night and I\'m carved with a grin."',
        options: ["Jack-o'-lantern", 'Clock', 'Balloon'],
        correctAnswer: "Jack-o'-lantern",
      },
      {
        id: 'h5_q3',
        prompt: 'Which creature is wrapped in bandages?',
        options: ['Mummy', 'Zombie', 'Vampire'],
        correctAnswer: 'Mummy',
      },
    ],
  },
];

export const RECOVERY_RIDDLES: RecoveryRiddle[] = [
  {
    id: 'riddle_witch',
    prompt:
      '"I fly but I have no wings, I cast spells but I\'m not a wizard. Who am I?"',
    options: ['Witch on a broom', 'Flying toaster', 'Sleepy owl'],
    correctAnswer: 'Witch on a broom',
  },
  {
    id: 'riddle_booberries',
    prompt: '"What do you call a ghost\'s favourite fruit?"',
    options: ['Boo-berries', 'Water-melon', 'Green apples'],
    correctAnswer: 'Boo-berries',
  },
  {
    id: 'riddle_skeleton_door',
    prompt: '"Why didn\'t the skeleton open the locked haunted door?"',
    options: ['It had no body and no key!', 'It forgot its umbrella', 'It was too tall'],
    correctAnswer: 'It had no body and no key!',
  },
];

export function createInitialGameState(autostart = false): GameStateData {
  return {
    screen: autostart ? 'map' : 'cover',
    lives: 3,
    maxLives: 3,
    currentHouseIndex: 0,
    activeHouseIndex: 0,
    currentQuestionIndex: 0,
    questionWrongCount: 0,
    stageWrongCount: 0,
    hintUsedInStage: false,
    eliminatedOptions: [],
    candies: HOUSES.map((h) => ({
      houseId: h.id,
      earned: false,
      sparkleBonus: false,
    })),
    completedHouses: [false, false, false, false, false],
    score: 0,
    breakCurseActive: false,
    currentRiddleIndex: 0,
    doorKnocked: false,
    doorOpen: false,
    stageClearedModal: false,
    lastFeedbackMessage: null,
  };
}

export function canSelectHouse(state: GameStateData, houseIndex: number): boolean {
  return houseIndex === state.currentHouseIndex && !state.completedHouses[houseIndex];
}

export function enterHouseDoor(state: GameStateData, houseIndex: number): GameStateData {
  if (!canSelectHouse(state, houseIndex)) {
    return state;
  }
  return {
    ...state,
    screen: 'door',
    activeHouseIndex: houseIndex,
    currentQuestionIndex: 0,
    questionWrongCount: 0,
    stageWrongCount: 0,
    hintUsedInStage: false,
    eliminatedOptions: [],
    breakCurseActive: false,
    doorKnocked: false,
    doorOpen: false,
    stageClearedModal: false,
    lastFeedbackMessage: null,
  };
}

export function applyBlackCatHint(state: GameStateData): GameStateData {
  if (state.hintUsedInStage || state.screen !== 'quiz') {
    return state;
  }
  const house = HOUSES[state.activeHouseIndex];
  const question = house.questions[state.currentQuestionIndex];
  const availableWrongOptions = question.options.filter(
    (opt) => opt !== question.correctAnswer && !state.eliminatedOptions.includes(opt)
  );
  if (availableWrongOptions.length === 0) {
    return {
      ...state,
      hintUsedInStage: true,
    };
  }
  const optionToRemove = availableWrongOptions[0];
  return {
    ...state,
    hintUsedInStage: true,
    eliminatedOptions: [...state.eliminatedOptions, optionToRemove],
    lastFeedbackMessage: `Purr! The black cat scratched out "${optionToRemove}"!`,
  };
}

export interface AnswerOutcome {
  nextState: GameStateData;
  isCorrect: boolean;
  stageCompleted: boolean;
  allHousesCompleted: boolean;
  triggeredBreakCurse: boolean;
  triggeredGameOverCatch: boolean;
}

/**
 * Evaluates a player's answer to the current quiz question.
 * Note: For UI timing, the caller can show green/red button feedback first and then commit or advance.
 */
export function submitQuizAnswer(
  state: GameStateData,
  selectedOption: string
): AnswerOutcome {
  const house = HOUSES[state.activeHouseIndex];
  const question = house.questions[state.currentQuestionIndex];
  const isCorrect = selectedOption === question.correctAnswer;

  if (isCorrect) {
    const isLastQuestionInHouse = state.currentQuestionIndex >= house.questions.length - 1;
    const questionPoints = 100;

    if (!isLastQuestionInHouse) {
      return {
        isCorrect: true,
        stageCompleted: false,
        allHousesCompleted: false,
        triggeredBreakCurse: false,
        triggeredGameOverCatch: false,
        nextState: {
          ...state,
          currentQuestionIndex: state.currentQuestionIndex + 1,
          questionWrongCount: 0,
          eliminatedOptions: [],
          score: state.score + questionPoints,
          lastFeedbackMessage: 'Treat! Spot on!',
        },
      };
    }

    // Completed all 3 questions in this house!
    const earnedSparkle = state.stageWrongCount === 0;
    const stageBonus = earnedSparkle ? 150 : 50;
    const updatedCandies = state.candies.map((c, idx) =>
      idx === state.activeHouseIndex
        ? { ...c, earned: true, sparkleBonus: earnedSparkle }
        : c
    );
    const updatedCompleted = state.completedHouses.map((done, idx) =>
      idx === state.activeHouseIndex ? true : done
    );
    const isFinalHouse = state.activeHouseIndex >= HOUSES.length - 1;

    return {
      isCorrect: true,
      stageCompleted: true,
      allHousesCompleted: isFinalHouse,
      triggeredBreakCurse: false,
      triggeredGameOverCatch: false,
      nextState: {
        ...state,
        candies: updatedCandies,
        completedHouses: updatedCompleted,
        currentHouseIndex: isFinalHouse
          ? state.currentHouseIndex
          : state.activeHouseIndex + 1,
        score: state.score + questionPoints + stageBonus,
        stageClearedModal: !isFinalHouse,
        screen: isFinalHouse ? 'win' : state.screen,
        lastFeedbackMessage: earnedSparkle
          ? 'Flawless Stage! You earned a Candy + Golden Sparkle!'
          : 'Stage Complete! You earned a piece of Candy!',
      },
    };
  }

  // Wrong answer logic
  const nextLives = Math.max(0, state.lives - 1);
  const nextQuestionWrongCount = state.questionWrongCount + 1;
  const nextStageWrongCount = state.stageWrongCount + 1;
  const nextEliminated = state.eliminatedOptions.includes(selectedOption)
    ? state.eliminatedOptions
    : [...state.eliminatedOptions, selectedOption];

  // If lives hit 0, trigger Game Over ("The witches caught you!") with Last Chance
  if (nextLives === 0) {
    return {
      isCorrect: false,
      stageCompleted: false,
      allHousesCompleted: false,
      triggeredBreakCurse: false,
      triggeredGameOverCatch: true,
      nextState: {
        ...state,
        lives: 0,
        questionWrongCount: nextQuestionWrongCount,
        stageWrongCount: nextStageWrongCount,
        eliminatedOptions: nextEliminated,
        screen: 'gameover_catch',
        lastFeedbackMessage: 'Oops! The witch cackles... try again!',
      },
    };
  }

  // If same question wrong twice (and still has lives > 0), trigger "Break the curse!"
  if (nextQuestionWrongCount >= 2) {
    return {
      isCorrect: false,
      stageCompleted: false,
      allHousesCompleted: false,
      triggeredBreakCurse: true,
      triggeredGameOverCatch: false,
      nextState: {
        ...state,
        lives: nextLives,
        questionWrongCount: nextQuestionWrongCount,
        stageWrongCount: nextStageWrongCount,
        eliminatedOptions: nextEliminated,
        breakCurseActive: true,
        lastFeedbackMessage: 'Oops! The witch cackles... Break the curse!',
      },
    };
  }

  // Step 1: Retry same question straight away
  return {
    isCorrect: false,
    stageCompleted: false,
    allHousesCompleted: false,
    triggeredBreakCurse: false,
    triggeredGameOverCatch: false,
    nextState: {
      ...state,
      lives: nextLives,
      questionWrongCount: nextQuestionWrongCount,
      stageWrongCount: nextStageWrongCount,
      eliminatedOptions: nextEliminated,
      lastFeedbackMessage: 'Oops! The witch cackles... try again!',
    },
  };
}

/**
 * Resolves the "Break the curse!" recovery challenge riddle (when a player gets the same question wrong twice).
 * Solving it restores 1 pumpkin and returns to the question.
 * Failing it means no candy for that house, and the player moves on to the next one (or win screen if House 5).
 */
export function resolveBreakCurseRiddle(
  state: GameStateData,
  selectedOption: string
): { nextState: GameStateData; solved: boolean } {
  const riddle = RECOVERY_RIDDLES[state.currentRiddleIndex % RECOVERY_RIDDLES.length];
  const solved = selectedOption === riddle.correctAnswer;

  if (solved) {
    return {
      solved: true,
      nextState: {
        ...state,
        lives: Math.min(state.maxLives, state.lives + 1),
        breakCurseActive: false,
        questionWrongCount: 0,
        eliminatedOptions: [],
        currentRiddleIndex: state.currentRiddleIndex + 1,
        lastFeedbackMessage: 'Curse broken! +1 Pumpkin restored!',
      },
    };
  }

  // Failed Break the Curse: no candy for this house, but move on to the next house!
  const updatedCompleted = state.completedHouses.map((done, idx) =>
    idx === state.activeHouseIndex ? true : done
  );
  const isFinalHouse = state.activeHouseIndex >= HOUSES.length - 1;

  return {
    solved: false,
    nextState: {
      ...state,
      breakCurseActive: false,
      completedHouses: updatedCompleted,
      currentHouseIndex: isFinalHouse
        ? state.currentHouseIndex
        : state.activeHouseIndex + 1,
      currentRiddleIndex: state.currentRiddleIndex + 1,
      screen: isFinalHouse ? 'win' : 'map',
      stageClearedModal: false,
      lastFeedbackMessage:
        'The curse held! No candy from this house, moving to the next house.',
    },
  };
}

/**
 * Resolves the "Last Chance" riddle when lives === 0.
 * Right means revive with 1 life and continue from the same house.
 * Wrong means "Game over" with a Try again button that restarts from house 1.
 */
export function resolveLastChanceRiddle(
  state: GameStateData,
  selectedOption: string
): { nextState: GameStateData; revived: boolean } {
  const riddle = RECOVERY_RIDDLES[state.currentRiddleIndex % RECOVERY_RIDDLES.length];
  const revived = selectedOption === riddle.correctAnswer;

  if (revived) {
    return {
      revived: true,
      nextState: {
        ...state,
        lives: 1,
        screen: 'quiz',
        breakCurseActive: false,
        questionWrongCount: 0,
        eliminatedOptions: [],
        currentRiddleIndex: state.currentRiddleIndex + 1,
        lastFeedbackMessage: 'You escaped the witches! Revived with 1 Pumpkin!',
      },
    };
  }

  return {
    revived: false,
    nextState: {
      ...state,
      lives: 0,
      screen: 'gameover_final',
      currentRiddleIndex: state.currentRiddleIndex + 1,
      lastFeedbackMessage: 'Game over! The witches caught you for good!',
    },
  };
}

export function countCollectedCandies(state: GameStateData): number {
  return state.candies.filter((c) => c.earned).length;
}

export function countSparkleCandies(state: GameStateData): number {
  return state.candies.filter((c) => c.earned && c.sparkleBonus).length;
}
