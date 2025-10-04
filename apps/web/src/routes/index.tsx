import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="border-input rounded-lg border p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-semibold">Bem-vindo!</h2>
      <p className="text-muted-foreground">
        Esta é a página inicial do sistema de tarefas. Em breve teremos
        funcionalidades completas de:
      </p>
      <ul className="mt-4 list-inside list-disc space-y-2 text-sm">
        <li>Autenticação de usuários</li>
        <li>Criação e gerenciamento de tarefas</li>
        <li>Sistema de comentários</li>
        <li>Notificações em tempo real</li>
      </ul>
    </div>
  );
}
