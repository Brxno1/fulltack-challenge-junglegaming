import { SidebarHeader, SidebarTrigger } from '@/components/ui/sidebar'

export function SidebarHeaderSection() {
 return (
  <SidebarHeader className="p-6 bg-card">
   <div className="flex items-center justify-between w-full group-data-[collapsible=icon]:justify-center">
    <div className="flex items-center space-x-2 group-data-[collapsible=icon]:mx-auto">
     <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
      <span className="text-primary-foreground font-bold text-sm">T</span>
     </div>
     <span className="font-bold text-lg group-data-[collapsible=icon]:hidden">TASKIFY</span>
    </div>
    <SidebarTrigger className="size-6 transition-transform duration-200 group-data-[collapsible=icon]:hidden" />
   </div>
  </SidebarHeader>
 )
}


