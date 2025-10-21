'use client'

import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { LoaderCircle, RotateCw } from 'lucide-react'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { api } from '@/lib/axios'

import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/store/auth-store'

const registerFormSchema = z.object({
  username: z.string().min(3, 'Username deve ter pelo menos 3 caracteres'),
  email: z.string().email('Insira um email válido'),
  password: z
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres e conter pelo menos uma letra maiúscula')
    .regex(/(?=.*[A-Z])/),
})

interface RegisterFormProps {
  username: string
  email: string
  password: string
}

export function RegisterForm() {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const { mutateAsync: onCreateAccount } = useMutation({
    mutationFn: async ({ username, email, password }: RegisterFormProps) => {
      const response = await api.post('/auth/register', { username, email, password })
      return response.data
    },
    onSuccess: (data) => {
      useAuthStore.getState().setAuth(data.user)
      toast(`Conta criada com sucesso`)
      navigate({ to: '/' })
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error('Erro ao criar conta', {
          action: (
            <Button
              form="form-auth"
              variant={'ghost'}
              type="submit"
              className="ml-auto transition-all hover:bg-red-950/40"
            >
              <RotateCw className="h-4 w-4 text-rose-300" />
            </Button>
          ),
        })
        form.reset({
          username: '',
          email: '',
          password: '',
        })
      }
    },
  })

  const handleCreateAccount = async ({ username, email, password }: RegisterFormProps) => {
    await onCreateAccount({ username, email, password })
  }

  return (
    <Card className="relative overflow-hidden">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreateAccount)} id="form-auth">
          <CardHeader className="text-center">
            <CardDescription>
              Crie uma conta para continuar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <div className="group relative space-y-2">
                    <FormLabel
                      className={cn(
                        'className="origin-start has-[+input:not(:placeholder-shown)]:font-medium" absolute top-[50%] block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:text-foreground',
                        {
                          'text-red-500': fieldState.error,
                        },
                      )}
                    >
                      <span
                        className={cn('inline-flex bg-card px-2', {
                          'text-red-500': fieldState.error,
                        })}
                      >
                        Username
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} placeholder=" " />
                    </FormControl>
                  </div>
                  <FormMessage className="ml-2 text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <div className="group relative space-y-2">
                    <FormLabel
                      className={cn(
                        'className="origin-start has-[+input:not(:placeholder-shown)]:font-medium" absolute top-[50%] block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:text-foreground',
                        {
                          'text-red-500': fieldState.error,
                        },
                      )}
                    >
                      <span
                        className={cn('inline-flex bg-card px-2', {
                          'text-red-500': fieldState.error,
                        })}
                      >
                        Email
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input type="email" {...field} placeholder=" " />
                    </FormControl>
                  </div>
                  <FormMessage className="ml-2 text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <div className="group relative space-y-2">
                    <FormLabel
                      className={cn(
                        'className="origin-start has-[+input:not(:placeholder-shown)]:font-medium" absolute top-[50%] block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:text-foreground',
                        {
                          'text-red-500': fieldState.error,
                        },
                      )}
                    >
                      <span
                        className={cn('inline-flex bg-card px-2', {
                          'text-red-500': fieldState.error,
                        })}
                      >
                        Senha
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} placeholder=" " />
                    </FormControl>
                  </div>
                  <FormMessage className="ml-2 text-red-500" />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <InteractiveHoverButton
              type="submit"
              className="mx-auto flex w-[12rem] items-center justify-center rounded-2xl font-semibold"
              disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
              {form.formState.isSubmitting ? (
                <span className="flex items-center gap-2">
                  Criando conta
                  <LoaderCircle className="ml-1 animate-spin font-semibold" />
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Criar conta
                </span>
              )}
            </InteractiveHoverButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
