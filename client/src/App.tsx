import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ChatProvider, useChat } from "@/context/chat-context";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Chat } from "@/pages/chat";
import { Menu } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Chat} />
    </Switch>
  );
}

function AppContent() {
  const {
    conversations,
    setConversations,
    currentConversationId,
    setCurrentConversationId,
  } = useChat();
  
  const { toast } = useToast();

  const deleteConversationMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/conversations/${id}`);
      return response.json();
    },
    // Exclusão otimista
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["/api/conversations"] });
      const previous = queryClient.getQueryData<Conversation[]>(["/api/conversations"]);
      // otimisticamente remover do cache e do estado local
      queryClient.setQueryData<Conversation[] | undefined>(["/api/conversations"], (old) => old?.filter((c) => c.id !== id));
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (currentConversationId === id) {
        setCurrentConversationId(null);
      }
      return { previous };
    },
    onError: (error: Error, id: string, context: any) => {
      // rollback
      if (context?.previous) {
        queryClient.setQueryData(["/api/conversations"], context.previous);
        setConversations(context.previous);
      }
      toast({
        title: "Erro ao deletar conversa",
        description: error.message || "Tente novamente mais tarde",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/conversations"] });
    },
  });

  const handleNewChat = () => {
    setCurrentConversationId(null);
  };

  const handleSelectConversation = (id: string) => {
    setCurrentConversationId(id);
  };

  const handleDeleteConversation = (id: string) => {
    deleteConversationMutation.mutate(id);
  };

  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar
          conversations={conversations}
          currentConversationId={currentConversationId}
          onNewChat={handleNewChat}
          onSelectConversation={handleSelectConversation}
          onDeleteConversation={handleDeleteConversation}
        />
        <div className="flex flex-col flex-1 w-full">
          <header className="flex items-center justify-between p-3 border-b h-14 shrink-0">
            <SidebarTrigger data-testid="button-sidebar-toggle">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <div className="flex-1"></div>
            <div className="w-10"></div>
          </header>
          <main className="flex-1 overflow-hidden">
            <Router />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <ChatProvider>
            <AppContent />
          </ChatProvider>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
