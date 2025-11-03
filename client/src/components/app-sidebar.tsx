import { MessageSquarePlus, Trash2, MessageSquare } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Conversation } from "@shared/schema";
import { ThemeToggle } from "./theme-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AppSidebarProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
}

export function AppSidebar({
  conversations,
  currentConversationId,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
}: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="px-2 py-2">
            <Button
              onClick={onNewChat}
              className="w-full justify-start gap-2 h-10"
              variant="outline"
              data-testid="button-new-chat"
            >
              <MessageSquarePlus className="h-5 w-5" />
              <span>Nova Conversa</span>
            </Button>
          </div>

          <SidebarGroupLabel className="px-4 py-2">Histórico</SidebarGroupLabel>
          <SidebarGroupContent>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <SidebarMenu data-testid="conversations-list">
                {conversations.length === 0 ? (
                  <div className="px-4 py-6 text-center text-sm text-muted-foreground" data-testid="empty-conversations">
                    Nenhuma conversa ainda
                  </div>
                ) : (
                  conversations.map((conversation) => (
                    <SidebarMenuItem key={conversation.id}>
                      <div
                        className={`group relative flex items-center gap-2 rounded-lg px-3 py-2 mx-2 min-h-[44px] cursor-pointer hover-elevate ${
                          currentConversationId === conversation.id
                            ? "bg-sidebar-accent"
                            : ""
                        }`}
                        onClick={() => onSelectConversation(conversation.id)}
                        data-testid={`conversation-${conversation.id}`}
                      >
                        <MessageSquare className="h-4 w-4 shrink-0" />
                        <span className="flex-1 truncate text-sm">
                          {conversation.title}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteConversation(conversation.id);
                          }}
                          data-testid={`button-delete-${conversation.id}`}
                          aria-label="Deletar conversa"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </SidebarMenuItem>
                  ))
                )}
              </SidebarMenu>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Tema</span>
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
