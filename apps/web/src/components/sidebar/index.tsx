import { Sidebar } from '@/components/ui/sidebar'
import { useNavigate } from '@tanstack/react-router'
import { SidebarHeaderSection } from './header'
import { SidebarContentSection } from './content'
import { SidebarFooterSection } from './footer'

export function AppSidebar() {
 const navigate = useNavigate()
 return (
  <Sidebar className="border border-input bg-card" collapsible="icon">
   <SidebarHeaderSection />
   <SidebarContentSection
    onNavigate={(href) => navigate({ to: href })}
   />
   <SidebarFooterSection />
  </Sidebar>
 )
}
