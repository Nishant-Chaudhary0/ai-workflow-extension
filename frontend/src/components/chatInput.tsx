import { useState } from "react";
import { useChatStore } from "../store/chatStore";
import { useStreaming } from "../hooks/useStreaming";
import { useRateLimit } from "../hooks/useRateLimit";

export const ChatInput = () => {
  const [input, setInput] = useState("");
  const addMessage = useChatStore(s => s.addMessage);
  const isLoading = useChatStore(s => s.isLoading);
  const { startStream } = useStreaming();
  const canSend = useRateLimit(5, 60000);

  const handleSend = async () => {
    if (!input.trim() || !canSend()) return;

    addMessage({ role: "user", content: input });
    addMessage({ role: "assistant", content: "" });

    await startStream(input);
    setInput("");
  };

  return (
    <div className="flex items-center gap-2">
      <input
        className="flex-1 px-4 py-2 rounded-full border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="Ask something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isLoading}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="px-4 py-2 rounded-full bg-black text-white hover:opacity-90 transition"
      >
        Send
      </button>
    </div>
  );
};