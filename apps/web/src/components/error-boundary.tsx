import React from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorBoundaryState {
 hasError: boolean
 error?: Error
}

interface ErrorBoundaryProps {
 children: React.ReactNode
 fallback?: React.ComponentType<{ error: Error; reset: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
 constructor(props: ErrorBoundaryProps) {
  super(props)
  this.state = { hasError: false }
 }

 static getDerivedStateFromError(error: Error): ErrorBoundaryState {
  return { hasError: true, error }
 }

 componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
  console.error('ErrorBoundary caught an error:', error, errorInfo)
 }

 render() {
  if (this.state.hasError) {
   if (this.props.fallback) {
    return <this.props.fallback error={this.state.error!} reset={() => this.setState({ hasError: false })} />
   }

   return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
     <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
     <h2 className="text-xl font-semibold mb-2">Algo deu errado</h2>
     <p className="text-muted-foreground mb-4">
      Ocorreu um erro inesperado. Tente recarregar a página.
     </p>
     <Button
      onClick={() => window.location.reload()}
      variant="outline"
      className="gap-2"
     >
      <RefreshCw className="h-4 w-4" />
      Recarregar página
     </Button>
    </div>
   )
  }

  return this.props.children
 }
}
