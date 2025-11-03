import { useEffect, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Conversation, Message, ChatResponse } from "@shared/schema";
import { ChatMessage } from "@/components/chat-message";
import { TypingIndicator } from "@/components/typing-indicator";
import { ChatInput } from "@/components/chat-input";
import { EmptyState } from "@/components/empty-state";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@/context/chat-context";

export default function Chat() {
  const {
    conversations,
    setConversations,
    currentConversationId,
    setCurrentConversationId,
  } = useChat();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { data: loadedConversations } = useQuery<Conversation[]>({
    queryKey: ["/api/conversations"],
  });

  useEffect(() => {
    if (loadedConversations) {
      setConversations(loadedConversations);
    }
  }, [loadedConversations, setConversations]);

  const currentConversation = conversations.find(
    (c) => c.id === currentConversationId
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages]);

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest(
        "POST",
        "/api/chat",
        {
          message,
          conversationId: currentConversationId || undefined,
        }
      );
      const data: ChatResponse = await response.json();
      return data;
    },
    onSuccess: (data) => {
      setConversations((prev) => {
        const existingIndex = prev.findIndex((c) => c.id === data.conversationId);
        
        if (existingIndex >= 0) {
          const updated = [...prev];
          const conversation = updated[existingIndex];
          conversation.messages.push(data.userMessage);
          conversation.messages.push(data.aiMessage);
          conversation.updatedAt = Date.now();
          return updated;
        } else {
          const newConversation: Conversation = {
            id: data.conversationId,
            title: data.userMessage.content.slice(0, 50) + (data.userMessage.content.length > 50 ? "..." : ""),
            messages: [data.userMessage, data.aiMessage],
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };
          setCurrentConversationId(data.conversationId);
          return [newConversation, ...prev];
        }
      });
      queryClient.invalidateQueries({ queryKey: ["/api/conversations"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao enviar mensagem",
        description: error.message || "Tente novamente mais tarde",
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = (content: string) => {
    sendMessageMutation.mutate(content);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        {!currentConversation || currentConversation.messages.length === 0 ? (
          <EmptyState onPromptClick={handleSendMessage} />
        ) : (
          <ScrollArea className="h-full">
            <div className="py-6">
              {currentConversation.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {sendMessageMutation.isPending && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        )}
      </div>

      <ChatInput
        onSend={handleSendMessage}
        disabled={sendMessageMutation.isPending}
      />
    </div>
  );
}

export { Chat };
