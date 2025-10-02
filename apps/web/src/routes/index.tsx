import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-6 rounded-lg border border-input shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Bem-vindo!</h2>
      <p className="text-muted-foreground">
        Esta é a página inicial do sistema de tarefas.
        Em breve teremos funcionalidades completas de:
      </p>
      <ul className="list-disc list-inside mt-4 space-y-2 text-sm">
        <li>Autenticação de usuários</li>
        <li>Criação e gerenciamento de tarefas</li>
        <li>Sistema de comentários</li>
        <li>Notificações em tempo real</li>
      </ul>
    </div>
  )
}
