import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import React from 'react'


export function TasksSearch() {
  const [searchValue, setSearchValue] = React.useState('')

  const handleSearch = () => {
  }

  return (
    <div className="flex w-full items-center gap-4 mb-2">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Pesquisar tarefas"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleSearch}
          className="pl-10 h-10 bg-background border-border"
        />
      </div>
    </div>
  )
}
