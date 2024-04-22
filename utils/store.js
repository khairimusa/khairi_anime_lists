import { create } from "zustand";

const useStore = create((set) => ({
  airingLists: [],
  upcomingLists: [],
  completedLists: [],
  modalVisible: false,
  favourite: false,
  setFavourite: () => set((state) => ({ favourite: !state.favourite })),
  setModalVisible: () =>
    set((state) => ({ modalVisible: !state.modalVisible })),
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
  favouriteAnimes: [],
  addFavourite: (currentAnime) => {
    set((state) => ({
      favouriteAnimes: [
        ...state.favouriteAnimes,
        {
          liked: false,
          currentAnime,
        },
      ],
    }));
  },
  removeFavourite: (id) => {
    set((state) => ({
      favouriteAnimes: state.favouriteAnimes.filter((anime) => anime.id !== id),
    }));
  },
  toggleFavourite: (id) => {
    set((state) => ({
      favouriteAnimes: state.favouriteAnimes.map((anime) =>
        anime.mal_id === id ? { ...anime, liked: !anime.completed } : anime
      ),
    }));
  },
}));

export default useStore;
