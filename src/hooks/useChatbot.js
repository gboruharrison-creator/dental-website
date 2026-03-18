import { useState, useCallback } from "react";
import { sendMessageToAI } from "../utils/anthropic";

export function useChatbot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm the BrightSmile assistant. I can help you with information about our services, prices, and booking appointments. How can I help you today? 😊",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (userInput) => {
    if (!userInput.trim() || isLoading) return;

    const newUserMessage = { role: "user", content: userInput };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const apiMessages = updatedMessages
        .filter((m) => m.role !== "assistant" || updatedMessages.indexOf(m) > 0)
        .map((m) => ({ role: m.role, content: m.content }));

      const reply = await sendMessageToAI(apiMessages);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now. Please call us on 020 7946 0321 and we'll be happy to help!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const clearChat = useCallback(() => {
    setMessages([
      {
        role: "assistant",
        content: "Hi! I'm the BrightSmile assistant. How can I help you today? 😊",
      },
    ]);
  }, []);

  return { messages, isLoading, sendMessage, clearChat };
}