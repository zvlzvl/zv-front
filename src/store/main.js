import {create} from 'zustand'

const useStore = create((set) =>
    ({
        loggedUser: null,
        loggUser: (user) =>
            set((state) => ({
                loggedUser: user,
            })),

        chatUsers:[],
        setChatUsers:(chatUsers) => set((state) => ({
            chatUsers: chatUsers,
        })),
        selectedUser:null,
        setSelectedUser:(selectedUser) => set((state) => ({
            selectedUser: selectedUser,
        })),
        conversation:[],
        setConversation: (conversation) => set((state) => ({
            conversation: conversation,
        })),
        setFavorites: (favorites) => set((state) => ({
            loggedUser: {
                ...state.loggedUser,
                favorites: favorites, // Update only the favorites
            }
        })),
    }))


export default useStore;