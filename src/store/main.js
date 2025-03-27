import {create} from 'zustand'

const useStore = create((set) =>
    ({
        loggedUser: null,
        loggUser: (user) =>
            set((state) => ({
                loggedUser: user,
            })),
        messages:[],
        setMessages:(messages) => set((state) => ({
            messages: messages,
        })),
        setFavorites: (favorites) => set((state) => ({
            loggedUser: {
                ...state.loggedUser,
                favorites: favorites, // Update only the favorites
            }
        })),
    }))


export default useStore;