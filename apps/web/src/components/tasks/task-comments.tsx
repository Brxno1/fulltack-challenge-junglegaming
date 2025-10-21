import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Send } from 'lucide-react'
import { formatDistanceToNow } from '@/lib/date-utils'
import { cn } from '@/lib/utils'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { TaskComment } from '@jungle/types'

interface TaskCommentsProps {
 taskId: string
}

export function TaskComments({ taskId }: TaskCommentsProps) {
 const [newComment, setNewComment] = useState('')
 const queryClient = useQueryClient()

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!newComment.trim()) return

  try {
   await api.post(`/tasks/${taskId}/comments`, {
    content: newComment,
   })

   queryClient.invalidateQueries({ queryKey: ['comments', taskId] })
   setNewComment('')
  } catch (error) {
   console.error('Erro ao criar comentário:', error)
  }
 }

 const { data: commentsData, isLoading, error } = useQuery({
  queryKey: ['comments', taskId],
  queryFn: async () => {
   const response = await api.get(`/tasks/${taskId}/comments`)
   return response.data
  },
  enabled: !!taskId,
 })

 const comments = commentsData?.comments || []

 if (isLoading) {
  return <div className="p-4 text-center text-muted-foreground">Carregando comentários...</div>
 }

 if (error) {
  return <div className="p-4 text-center text-destructive">Erro ao carregar comentários</div>
 }

 return (
  <div className="flex flex-col h-full bg-background p-2">
   <div className="h-[330px] space-y-3 overflow-y-auto">
    {comments.length === 0 ? (
     <div className="p-4 text-center text-muted-foreground">Nenhum comentário ainda</div>
    ) : (
     comments.map((comment: TaskComment) => (
      <div key={comment.id} className="flex gap-3 p-1 bg-accent w-fit rounded-lg">
       <Avatar className="size-8">
        <AvatarFallback className="text-xs bg-primary text-primary-foreground">
         {comment.authorName?.split(' ').map((n: string) => n[0]).join('') || 'U'}
        </AvatarFallback>
       </Avatar>
       <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
         <span className="text-sm font-medium">{comment.authorName || comment.author || 'Usuário'}</span>
         <span className="text-xs text-muted-foreground">•</span>
         <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(comment.createdAt))}
         </span>
        </div>
        <p className={cn("text-sm text-foreground")}>{comment.content}</p>
       </div>
      </div>
     ))
    )}
   </div>

   <div className="border-t mt-12">
    <form onSubmit={handleSubmit} className="flex gap-2 p-2 bg-card border border-input rounded-md">
     <Input
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      placeholder="Adicionar comentário..."
      className="flex-1 border border-transparent rounded-md"
     />
     <Button type="submit" size="sm" disabled={!newComment.trim()}>
      <Send className="size-4" />
     </Button>
    </form>
   </div>
  </div>
 )
}
