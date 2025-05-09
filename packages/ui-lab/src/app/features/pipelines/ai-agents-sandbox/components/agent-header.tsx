import {AgentState} from './agent'
import {CompletionIndicator} from './completion-indicator'
import {TokenCounter} from './token-counter'

interface AgentHeaderProps {
  status: AgentState['status']
  tokenCount?: number
}

export function AgentHeader({status, tokenCount = 0}: AgentHeaderProps) {
  return (
    <header className='flex items-center justify-between w-full py-2 px-4 border-b'>
      <div className='flex items-center gap-2'>
        <h1 className='text-xl font-semibold'>AI Agent</h1>
        <CompletionIndicator status={status} />
      </div>

      <div className='flex items-center gap-4'>
        <TokenCounter count={tokenCount} />
        <div className='text-sm text-gray-500'>
          {status === 'idle' && 'Ready'}
          {status === 'thinking' && 'Thinking...'}
          {status === 'responding' && 'Responding...'}
          {status === 'error' && 'Error!'}
        </div>
      </div>
    </header>
  )
}
