import { create } from "zustand";

export const useMetricsStore = create((set, get) => ({
  correct: 0,
  incorrect: 0,
  incorrectIndices: new Set(),
  progress: 0,
  accuracy: 0,
  stats: {
    accuracy: 0,
    progress: 0,
  },

  setIncorrect: (incorrect) => {
    set({ incorrect: incorrect });
  },

  setIncorrectIndices: (indices) =>
    set((state) => {
      const newIncorrectIndices = new Set(state.incorrectIndices);
      newIncorrectIndices.add(indices);
      return {
        incorrectIndices: newIncorrectIndices,
        incorrect: newIncorrectIndices.size,
      };
    }),

  setCalAcc: () => {
    set((state) => {
      return {
        accuracy: parseFloat(
          ((state.correct / (state.incorrect + state.correct)) * 100).toFixed(2)
        ),
      };
    });
    get().updateStats();
  },
  setProgress: (progress) => {
    set({ progress: progress });
    get().setCalAcc();
    get().updateStats();
  },
  setCorrect: (correct) => {
    set({ correct: correct });
  },
  updateStats: () => {
    const state = get();
    set({
      stats: {
        accuracy: state.accuracy,
        progress: state.progress,
      },
    });
  },
}));
