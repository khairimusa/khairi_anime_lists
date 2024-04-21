import { create } from "zustand";

const useStore = create((set) => ({
  airingLists: [],
  upcomingLists: [],
  completedLists: [],
  likedLists: [],
  setAiringLists: (airingLists) => {
    set((state) => ({
      ...state,
      airingLists,
    }));
  },
  setUpcomingLists: (upcomingLists) => {
    set((state) => ({
      ...state,
      upcomingLists,
    }));
  },
  setCompletedLists: (completedLists) => {
    set((state) => ({
      ...state,
      completedLists,
    }));
  },
}));

export default useStore;
