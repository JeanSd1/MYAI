import { Sparkles, Lightbulb, Code, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";

interface EmptyStateProps {
  onPromptClick: (prompt: string) => void;
}

const suggestedPrompts = [
  {
    icon: Lightbulb,
    text: "Me ajude a criar um plano de estudos",
    prompt: "Pode me ajudar a criar um plano de estudos eficiente para aprender programação?",
  },
  {
    icon: Code,
    text: "Explique um conceito de programação",
    prompt: "Pode me explicar o que é programação orientada a objetos de forma simples?",
  },
  {
    icon: BookOpen,
    text: "Resuma um artigo ou texto",
    prompt: "Como posso melhorar minhas habilidades de escrita e comunicação?",
  },
  {
    icon: Sparkles,
    text: "Ideias criativas para um projeto",
    prompt: "Me dê ideias criativas para um projeto de tecnologia inovador",
  },
];

export function EmptyState({ onPromptClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex h-48 w-96 items-center justify-center mb-8">
            <img
              src="/vecna-logo.png"
              alt="Vecna AI"
              className="h-full w-full object-contain"
              style={{ filter: 'drop-shadow(0 0 10px rgba(255,105,180,0.3))' }}
            />
          </div>
          <h1 className="text-2xl font-semibold">Como posso ajudar você hoje?</h1>
          <p className="text-muted-foreground">
            Comece uma conversa ou escolha uma das sugestões abaixo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {suggestedPrompts.map((prompt, index) => {
            const Icon = prompt.icon;
            return (
              <Card
                key={index}
                className="p-4 cursor-pointer hover-elevate active-elevate-2 transition-all border"
                onClick={() => onPromptClick(prompt.prompt)}
                data-testid={`prompt-card-${index}`}
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-sm leading-relaxed">{prompt.text}</p>
                </div>
              </Card>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}
