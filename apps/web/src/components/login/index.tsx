import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { LoginForm } from './login-form'
import { RegisterForm } from './register-form'

export function AuthTabs() {
  return (
    <div className="flex items-center bg-background border border-input justify-center h-screen">
      <Tabs defaultValue="register" className="w-[400px] rounded-md pt-2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="register">
            Criar conta
          </TabsTrigger>
          <TabsTrigger value="login">Entrar</TabsTrigger>
        </TabsList>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

