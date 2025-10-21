import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { TaskComment } from '@jungle/types'
import { useAuthStore } from '@/store/auth-store'
import { TabsContent } from '../ui/tabs'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const schema = z.object({
  content: z.string().min(1).max(100),
})

interface TaskCommentsProps {
  taskId: string
}

export function TaskComments({ taskId }: TaskCommentsProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })
  const queryClient = useQueryClient()

  const user = useAuthStore((state) => state.user)

  const onSubmit = async (data: z.infer<typeof schema>) => {
    await api.post(`/tasks/${taskId}/comments`, data)
    queryClient.invalidateQueries({ queryKey: ['comments', taskId] })
    form.reset()
  }

  const { data: commentsData, isLoading, error } = useSuspenseQuery({
    queryKey: ['comments', taskId],
    queryFn: async () => {
      const response = await api.get(`/tasks/${taskId}/comments`)
      return response.data
    },
  })

  const comments = commentsData?.comments || []

  if (isLoading) {
    return <div className="p-4 text-center text-muted-foreground">Carregando comentários...</div>
  }

  if (error) {
    return <div className="p-4 text-center text-destructive">Erro ao carregar comentários</div>
  }

  return (
    <TabsContent value="comments" className="flex flex-col h-[400px]">
      <div className="space-y-3 flex-1 overflow-y-auto p-2">
        {comments.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">Nenhum comentário ainda</div>
        ) : (
          comments.map((comment: TaskComment) => (
            <div key={comment.id} className={cn("flex max-w-[60%] gap-3 p-3 w-fit rounded-lg bg-secondary text-secondary-foreground", {
              'ml-auto bg-primary text-primary-foreground': comment.author === user?.id,
            })}>
              <Avatar className="size-8 flex-shrink-0">
                <AvatarFallback className="text-xs bg-background text-foreground">
                  {comment.authorName?.slice(0, 2).toUpperCase() || 'US'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">{comment.authorName ?? 'Usuário'}</span>
                  <span className="text-xs">•</span>
                  <span className="text-xs">
                    {new Intl.DateTimeFormat('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    }).format(new Date(comment.createdAt))}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap break-words">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 p-2">
        <Input
          {...form.register('content')}
          placeholder="Adicionar comentário..."
          className="flex-1"
        />
        <Button type="submit" size="sm" disabled={!form.formState.isValid || form.formState.isSubmitting}>
          <Send className="size-4" />
        </Button>
      </form>
    </TabsContent>
  )
}
