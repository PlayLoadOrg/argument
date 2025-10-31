// Progress tracking for ARGUMENT game
// Saves player progress to localStorage

const STORAGE_KEY = 'argument_game_progress';

export const saveProgress = (progress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Could not save progress:', error);
  }
};

export const loadProgress = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Could not load progress:', error);
  }
  
  // Return default progress structure
  return {
    currentScenarioIndex: 0,
    results: [],
    lastPlayed: null
  };
};

export const clearProgress = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Could not clear progress:', error);
  }
};

export const calculateAccuracy = (results) => {
  if (results.length === 0) return 0;
  const correct = results.filter(r => r.correct).length;
  return Math.round((correct / results.length) * 100);
};

export const getRepublicStatus = (accuracy) => {
  if (accuracy >= 80) {
    return {
      status: 'stands',
      title: 'The Republic Stands',
      message: 'You have demonstrated the critical thinking necessary for informed citizenship. The Founders would be proud.',
      color: 'green'
    };
  } else if (accuracy >= 60) {
    return {
      status: 'wavers',
      title: 'The Republic Wavers',
      message: 'Your reasoning shows promise, but a republic requires vigilance. Study the fallacies and try again.',
      color: 'yellow'
    };
  } else {
    return {
      status: 'falls',
      title: 'The Republic Falls',
      message: 'Without citizens who can distinguish sound arguments from fallacies, democracy cannot survive. Learn from these examples and defend the Republic.',
      color: 'red'
    };
  }
};