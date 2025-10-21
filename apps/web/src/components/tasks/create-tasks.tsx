import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { toast } from 'sonner'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from '@/components/ui/dialog'
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from '@/components/ui/select'
import { createTask } from '@/lib/api/tasks'
import { TaskPriority, TaskStatus } from '@jungle/types'
import { useAuthStore } from '@/store/auth-store'
import { TaskStatusBadge } from '@/components/tasks/task-status'
import { TaskPriorityBadge } from '@/components/tasks/task-priority'

const createTaskSchema = z.object({
 title: z.string().min(1, 'Título é obrigatório'),
 description: z.string().max(252, 'Descrição deve ter no máximo 252 caracteres').optional(),
 deadline: z.date().optional(),
 priority: z.nativeEnum(TaskPriority),
 status: z.nativeEnum(TaskStatus),
})

type CreateTaskForm = z.infer<typeof createTaskSchema>

export function CreateTaskDialog() {
 const [open, setOpen] = useState(false)
 const queryClient = useQueryClient()
 const user = useAuthStore((state) => state.user)

 if (!user) {
  return null
 }

 const form = useForm<CreateTaskForm>({
  resolver: zodResolver(createTaskSchema),
  defaultValues: {
   title: '',
   description: '',
   deadline: undefined,
   priority: TaskPriority.MEDIUM,
   status: TaskStatus.TODO,
  },
 })

 const { mutateAsync: createTaskMutation, isPending } = useMutation({
  mutationFn: createTask,
  onSuccess: () => {
   toast.success('Tarefa criada com sucesso')
   queryClient.invalidateQueries({ queryKey: ['tasks'] })
   setOpen(false)
   form.reset()
  },
  onError: () => {
   toast.error('Erro ao criar tarefa')
  },
 })

 const onSubmit = async (data: CreateTaskForm) => {

  await createTaskMutation({
   ...data,
   author: user.id,
   deadline: data.deadline,
  })
 }

 return (
  <Dialog open={open} onOpenChange={setOpen}>
   <DialogTrigger asChild>
    <Button
     variant="outline"
     className="border-input text-foreground hover:bg-muted"
    >
     <Plus className="h-4 w-4" /> Nova Tarefa
    </Button>
   </DialogTrigger>
   <DialogContent className="sm:max-w-[425px] bg-card border-border">
    <DialogHeader>
     <DialogTitle className="text-foreground">Criar Nova Tarefa</DialogTitle>
    </DialogHeader>

    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField
       control={form.control}
       name="title"
       render={({ field }) => (
        <FormItem>
         <FormLabel className="text-foreground">Título</FormLabel>
         <FormControl>
          <Input
           {...field}
           placeholder="Digite o título da tarefa"
           className="bg-background border-input text-foreground"
          />
         </FormControl>
         <FormMessage />
        </FormItem>
       )}
      />

      <FormField
       control={form.control}
       name="description"
       render={({ field }) => (
        <FormItem>
         <FormLabel className="text-foreground">Descrição</FormLabel>
         <FormControl>
          <Textarea
           {...field}
           placeholder="Digite a descrição da tarefa"
           className="bg-background border-input text-foreground max-h-32"
          />
         </FormControl>
         <FormMessage />
        </FormItem>
       )}
      />

      <FormField
       control={form.control}
       name="deadline"
       render={({ field }) => (
        <FormItem>
         <FormLabel className="text-foreground">Prazo</FormLabel>
         <Popover>
          <PopoverTrigger asChild>
           <FormControl>
            <Button
             variant="outline"
             className="w-full justify-start text-left font-normal bg-background border-input text-foreground hover:bg-muted"
            >
             <CalendarIcon className="mr-2 h-4 w-4" />
             {field.value ? (
              format(field.value, 'dd/MM/yyyy', { locale: ptBR })
             ) : (
              <span>Selecione uma data</span>
             )}
            </Button>
           </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-background border-input">
           <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            disabled={(date) => date < new Date()}
            initialFocus
            className="bg-background"
           />
          </PopoverContent>
         </Popover>
         <FormMessage />
        </FormItem>
       )}
      />

      <div className="grid grid-cols-2 gap-4">
       <FormField
        control={form.control}
        name="priority"
        render={({ field }) => (
         <FormItem>
          <FormLabel className="text-foreground">Prioridade</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
           <FormControl>
            <SelectTrigger className="bg-background border-input text-foreground">
             <SelectValue placeholder="Selecione a prioridade" />
            </SelectTrigger>
           </FormControl>
           <SelectContent className="bg-background border-input">
            <SelectItem value={TaskPriority.LOW} className="text-foreground">
             <div className="flex items-center gap-2">
              <TaskPriorityBadge priority={TaskPriority.LOW} />
             </div>
            </SelectItem>
            <SelectItem value={TaskPriority.MEDIUM} className="text-foreground">
             <div className="flex items-center gap-2">
              <TaskPriorityBadge priority={TaskPriority.MEDIUM} />
             </div>
            </SelectItem>
            <SelectItem value={TaskPriority.HIGH} className="text-foreground">
             <div className="flex items-center gap-2">
              <TaskPriorityBadge priority={TaskPriority.HIGH} />
             </div>
            </SelectItem>
            <SelectItem value={TaskPriority.URGENT} className="text-foreground">
             <div className="flex items-center gap-2">
              <TaskPriorityBadge priority={TaskPriority.URGENT} />
             </div>
            </SelectItem>
           </SelectContent>
          </Select>
          <FormMessage />
         </FormItem>
        )}
       />

       <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
         <FormItem>
          <FormLabel className="text-foreground">Status</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
           <FormControl>
            <SelectTrigger className="bg-background border-input text-foreground">
             <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
           </FormControl>
           <SelectContent className="bg-background border-input">
            <SelectItem value={TaskStatus.TODO} className="text-foreground">
             <div className="flex items-center gap-2">
              <TaskStatusBadge status={TaskStatus.TODO} />
             </div>
            </SelectItem>
            <SelectItem value={TaskStatus.IN_PROGRESS} className="text-foreground">
             <div className="flex items-center gap-2">
              <TaskStatusBadge status={TaskStatus.IN_PROGRESS} />
             </div>
            </SelectItem>
            <SelectItem value={TaskStatus.REVIEW} className="text-foreground">
             <div className="flex items-center gap-2">
              <TaskStatusBadge status={TaskStatus.REVIEW} />
             </div>
            </SelectItem>
            <SelectItem value={TaskStatus.DONE} className="text-foreground">
             <div className="flex items-center gap-2">
              <TaskStatusBadge status={TaskStatus.DONE} />
             </div>
            </SelectItem>
           </SelectContent>
          </Select>
          <FormMessage />
         </FormItem>
        )}
       />
      </div>

      <div className="flex justify-between space-x-2 pt-4">
       <Button
        type="button"
        variant="ghost"
        onClick={() => setOpen(false)}
       >
        Cancelar
       </Button>
       <Button
        type="submit"
        disabled={isPending}
        variant="outline"
       >
        {isPending ? 'Criando...' : 'Criar Tarefa'}
       </Button>
      </div>
     </form>
    </Form>
   </DialogContent>
  </Dialog>
 )
}
