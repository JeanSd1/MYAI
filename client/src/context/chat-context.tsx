import { createContext, useContext, useState, ReactNode } from "react";
import { Conversation } from "@shared/schema";

interface ChatContextType {
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  currentConversationId: string | null;
  setCurrentConversationId: React.Dispatch<React.SetStateAction<string | null>>;
  deleteConversation: (id: string) => Promise<boolean>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);

  const deleteConversation = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/conversations/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setConversations(prev => prev.filter(conv => conv.id !== id));
        if (currentConversationId === id) {
          setCurrentConversationId(null);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting conversation:', error);
      return false;
    }
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        setConversations,
        currentConversationId,
        setCurrentConversationId,
        deleteConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return context;
}
