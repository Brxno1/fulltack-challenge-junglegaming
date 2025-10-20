import {
 SidebarContent,
 SidebarGroup,
 SidebarGroupContent,
 SidebarMenu,
 SidebarMenuButton,
 SidebarMenuItem,
 SidebarSeparator,
} from '@/components/ui/sidebar'
import { LayoutDashboard, CheckSquare, Calendar, Inbox, LucideIcon, Settings } from 'lucide-react'

type Item = {
 icon: LucideIcon
 label: string
 href: string
 disabled: boolean
}

type Props = {
 onNavigate: (href: string) => void
}

export function SidebarContentSection({ onNavigate }: Props) {
 const items: Item[] = [
  { icon: LayoutDashboard, label: 'Visão geral', href: '/', disabled: false },
  { icon: CheckSquare, label: 'Minhas tarefas', href: '/tasks', disabled: true },
  { icon: Calendar, label: 'Calendário', href: '/calendar', disabled: true },
  { icon: Inbox, label: 'Caixa de entrada', href: '/inbox', disabled: true },
  { icon: Settings, label: 'Configurações', href: '/settings', disabled: true },
 ]
 
 return (
  <SidebarContent className="w-full">
   <SidebarGroup>
    <SidebarGroupContent>
     <SidebarMenu>
      {items.map((item: Item) => {
       const Icon = item.icon
       return (
        <SidebarMenuItem key={item.label} className="flex items-center justify-center">
         <SidebarMenuButton
          onClick={() => onNavigate(item.href)}
          className="data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
          disabled={item.disabled}
          data-active={location.pathname === item.href}
         >
          <Icon className="size-5" />
          <span>{item.label}</span>
         </SidebarMenuButton>
        </SidebarMenuItem>
       )
      })}
     </SidebarMenu>
    </SidebarGroupContent>
   </SidebarGroup>

   <SidebarSeparator className="bg-border" />
  </SidebarContent>
 )
}


