import { SidebarFooter, SidebarTrigger } from '@/components/ui/sidebar'
import { UserDrodown } from '../user-dropdown'

export function SidebarFooterSection() {
 return (
  <SidebarFooter className="p-2 flex items-center justify-center bg-card">
   <SidebarTrigger className="hidden size-6 transition-transform duration-200 group-data-[collapsible=icon]:flex" />
   <UserDrodown />
  </SidebarFooter>
 )
}


