import { useChatStore } from "../store/chatStore.ts";
import { handleError } from "../utils/errorHandler.ts";

export const useStreaming = () => {
  const updateLastMessage = useChatStore(s => s.updateLastMessage);
  const setLoading = useChatStore(s => s.setLoading);

  const startStream = async (prompt: string) => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) throw new Error("API failed");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        const chunk = decoder.decode(value);
        updateLastMessage(chunk);
      }

    } catch (error) {
      const msg = handleError(error);
      updateLastMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return { startStream };
};