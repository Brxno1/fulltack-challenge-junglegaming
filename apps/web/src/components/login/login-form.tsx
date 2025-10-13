
import { useMutation } from '@tanstack/react-query'
import { LoaderCircle, Undo2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

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
import axios, { AxiosError } from 'axios'

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

interface LoginFormProps {
  email: string
  password: string
}

export function LoginForm() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { mutateAsync: loginFn } = useMutation({
    mutationFn: async ({ email, password }: LoginFormProps) => {
      const response = await axios.post('http://localhost:3002/auth/login', { email, password })
      return response.data
    },
    onSuccess: async () => {
      toast(`Login realizado com sucesso`, {
        action: (
          <Button className="ml-2" size="icon" form="login-form">
            <Undo2 size={16} />
          </Button>
        ),
      })
      form.reset({
        email: '',
        password: '',
      })
      return
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error('Erro ao fazer login', {
          action: (
            <Button className="ml-2" size="icon" form="login-form">
              <Undo2 size={16} />

            </Button>
          ),
        })
        form.reset({
          email: '',
          password: '',
        })
      }
    },
  })

  return (
    <Card className="relative overflow-hidden">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => loginFn(data))} id="login-form">
          <CardHeader className="gap-1 text-center">
            <CardDescription>
              Faça login para continuar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
          <CardFooter className="my-2 flex justify-center">
            <InteractiveHoverButton
              type="submit"
              className="flex w-[12rem] items-center justify-center rounded-2xl font-semibold"
              disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
              {form.formState.isSubmitting ? (
                <span className="flex items-center gap-2">
                  Entrando
                  <LoaderCircle className="ml-1 size-4 animate-spin font-semibold" />
                </span>
              ) : (
                <>Entrar</>
              )}
            </InteractiveHoverButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
