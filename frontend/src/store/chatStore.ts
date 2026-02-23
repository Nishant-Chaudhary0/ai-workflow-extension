import { create } from "zustand";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  setLoading: (val: boolean) => void;
  setMessages: (msgs: Message[]) => void;
  addMessage: (msg: Message) => void;
  updateLastMessage: (chunk: string) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  setLoading: (val) => set({ isLoading: val }),
  setMessages: (msgs) => set({ messages: msgs }),
  addMessage: (msg) =>
    set((state) => ({ messages: [...state.messages, msg] })),
  updateLastMessage: (chunk) =>
    set((state) => {
      const updated = [...state.messages];
      updated[updated.length - 1].content += chunk;
      return { messages: updated };
    }),
  clearChat: () => set({ messages: [] })
}));