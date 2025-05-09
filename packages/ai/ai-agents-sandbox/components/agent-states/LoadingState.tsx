import {CircularProgress} from '../ui/CircularProgress'
import {TextEffect} from '../effects/TextEffect'
import {type AgentType} from '../../lib/types'

interface LoadingStateProps {
  agent: AgentType
  elapsedTime: number
}

export function LoadingState({agent, elapsedTime}: LoadingStateProps) {
  // Generate a loading message based on elapsed time
  const getLoadingMessage = () => {
    if (elapsedTime < 3) return 'Processing request...'
    if (elapsedTime < 6) return 'Analyzing input...'
    if (elapsedTime < 10) return 'Generating response...'
    if (elapsedTime < 15) return 'This is taking a bit longer than usual...'
    return 'Still working, thank you for your patience...'
  }

  return (
    <div className='flex flex-col items-center justify-center py-16 space-y-6'>
      <CircularProgress size={48} />

      <div className='text-center space-y-2'>
        <TextEffect
          per='word'
          preset='fade'
          className='text-sm text-neutral-600 font-medium'
        >
          {getLoadingMessage()}
        </TextEffect>

        <p className='text-xs text-neutral-400'>
          {agent.name} agent is processing for {elapsedTime}s
        </p>
      </div>
    </div>
  )
}
