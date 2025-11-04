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
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAPoCAAAAAAGzNsaAAACXBIWXMAAAsTAAALEwEAmpwYAAAF4WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMi1jMDAwIDc5LjFiNWE3OWI0LCAyMDIyLzA2LzE0LTIyOjA0OjE3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjAgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDI0LTAxLTMwVDEzOjU0OjQyLTAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTAxLTMwVDEzOjU0OjQyLTAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNC0wMS0zMFQxMzo1NDo0Mi0wMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1NmY2OWJkMi0xYWU4LTQ2NGQtYTJkNi02NWYzNmYyOTE1M2MiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1NmY2OWJkMi0xYWU4LTQ2NGQtYTJkNi02NWYzNmYyOTE1M2MiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1NmY2OWJkMi0xYWU4LTQ2NGQtYTJkNi02NWYzNmYyOTE1M2MiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjU2ZjY5YmQyLTFhZTgtNDY0ZC1hMmQ2LTY1ZjM2ZjI5MTUzYyIgc3RFdnQ6d2hlbj0iMjAyNC0wMS0zMFQxMzo1NDo0Mi0wMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI0LjAgKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+7B6TuQAAIABJREFUeJzs3Xl4VOd5N/7vM6MZjUYLEAIhsSGBBYgxNsYvjhcYOzHSJG3SNHWceGmTNG2atOmv6a9p06Rpk6RpmzRx4jt2EjuJbWxsYNYZFmEQAi0grWPPOed9/yDPe+wBMhkZ57nnPt/r4uICuc65z5nBJz73fd/3IZEcRxAEQRAEQRAEb8h8H4AgCIIgCIIgCIII6IIgCIIgCIIgJAIR0AVBEARBEARBEAJEQBcEQRAEQRAEQUgAIqALgiAIgiAIgiAkABHQBUEQRAEQBAEQEoAI6IIgCIIgCIIgCAlABHRBEARBEARBEIQEIAK6IAiCIAiCIAhCAhABXRAEQRAEQRAEIQGIgC4IgiAIgiAIgpAARkjnyWv7MiPTipZ+ZRTWYPB4XRw1IA=="
              alt=""
              className="h-full w-full object-contain"
              style={{ 
                filter: 'drop-shadow(0 0 15px rgba(255,105,180,0.4))',
                maxWidth: '100%',
                objectFit: 'contain'
              }}
              onError={(e) => {
                console.error('Error loading image');
                e.currentTarget.src = 'vecna-logo.png';
              }}
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
