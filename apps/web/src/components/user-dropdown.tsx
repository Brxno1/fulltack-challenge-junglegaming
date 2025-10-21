import React from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { ChevronDown, LogOut } from "lucide-react"
import { useAuthStore } from "@/store/auth-store"

export function UserDrodown() {
  const [open, setOpen] = React.useState(false)
  const { user, logout } = useAuthStore()

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full bg-background px-2 py-6 justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="" />
              <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                {user?.username?.slice(0, 2).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium text-foreground group-data-[collapsible=icon]:hidden">{user?.username || 'Usuário'}</p>
          </div>
          <ChevronDown data-state={open ? 'open' : 'closed'} className="w-4 h-4 text-muted-foreground group-data-[collapsible=icon]:hidden transition-transform duration-200 data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 rounded-md">
        <DropdownMenuItem className="p-2 flex items-center space-x-2 hover:bg-accent">
          <Avatar className="w-10 h-10">
            <AvatarImage src="" />
            <AvatarFallback className="bg-muted text-muted-foreground">
              {user?.username?.slice(0, 2).toUpperCase() || 'US'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 flex flex-col">
            <p className="text-sm font-medium text-foreground">{user?.username}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="p-2 flex items-center space-x-2 hover:bg-accent" onClick={() => logout()}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

}