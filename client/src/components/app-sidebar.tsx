import { MessageSquarePlus, Trash2, MessageSquare } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
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
  const [toDelete, setToDelete] = useState<{ id: string; title: string } | null>(null);
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
                        <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            // abrir diálogo de confirmação
                            setToDelete({ id: conversation.id, title: conversation.title });
                          }}
                          data-testid={`button-delete-${conversation.id}`}
                          aria-label="Deletar conversa"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        </>
                      </div>
                    </SidebarMenuItem>
                  ))
                )}
              </SidebarMenu>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Dialogo de confirmação de exclusão */}
      <AlertDialog open={!!toDelete} onOpenChange={(open) => { if (!open) setToDelete(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir conversa?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a conversa "{toDelete?.title}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel onClick={() => setToDelete(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (toDelete) onDeleteConversation(toDelete.id);
                setToDelete(null);
              }}
            >
              Excluir
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <SidebarFooter className="border-t p-4">
        <div className="flex flex-col gap-2">
          <a
            href="https://github.com/JeanSd1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            @JeanSd1
          </a>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Tema</span>
            <ThemeToggle />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
