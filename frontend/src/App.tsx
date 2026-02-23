import { useEffect, useRef } from "react";
import { useChatStore } from "./store/chatStore";
import { ChatMessage } from "./components/chatMessage.js";
import { ChatInput } from "./components/chatInput.js";
import { LoadingSkeleton } from "./components/LoadingSkeleton";

export default function App() {
  const messages = useChatStore(s => s.messages);
  const isLoading = useChatStore(s => s.isLoading);
  const setMessages = useChatStore(s => s.setMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    chrome.storage.local.get(["chat"], (result: { chat?: unknown }) => {
      if (Array.isArray(result.chat)) {
        setMessages(result.chat as { role: "user" | "assistant"; content: string }[]);
      }
    });
  }
}, []);

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.set({ chat: messages });
    }
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Header */}
      <div className="px-4 py-3 border-b bg-white shadow-sm">
        <h1 className="text-lg font-semibold">AI Assistant</h1>
        <p className="text-xs text-gray-500">Powered by Gemini</p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <ChatMessage key={i} {...msg} />
        ))}
        {isLoading && <LoadingSkeleton />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t bg-white p-3">
        <ChatInput />
      </div>
    </div>
  );
}