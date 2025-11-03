import { Message } from "@shared/schema";
import { Bot, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-4 px-4 py-6 ${
        isUser ? "max-w-3xl ml-auto" : "w-full"
      }`}
      data-testid={`message-${message.role}-${message.id}`}
    >
      {!isUser && (
        <Avatar className="h-7 w-7 shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className="flex-1 space-y-2">
        <div className="leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
        </div>
      </div>

      {isUser && (
        <Avatar className="h-7 w-7 shrink-0">
          <AvatarFallback className="bg-muted">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
