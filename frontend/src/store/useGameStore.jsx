import { create } from "zustand";

export const useGameStore = create((set) => ({
  userInput: "",
  inputArray: [""],
  cursorPosition: 0,
  inputLocked: false,
  correct: 0,
  incorrect: 0,
  progress: 0,

  // Action to update user input
  setUserInput: (input) => {
    // console.log(input); // Log the input
    set((state) => {
      const updatedArray = input.split(" ");
      return {
        userInput: input,
        inputArray: updatedArray,
        cursorPosition: input.length,
      };
    });
  },

  // Action to lock/unlock input
  freezeInput: () => {
    set({ inputLocked: true });
    setTimeout(() => {
      set({ inputLocked: false });
    }, 2000);
  },
  setProgress: (progress) => {
    set({ progress: progress });
  },
  // setIncorrect: (incorrect) => set({ incorrect }),
}));
