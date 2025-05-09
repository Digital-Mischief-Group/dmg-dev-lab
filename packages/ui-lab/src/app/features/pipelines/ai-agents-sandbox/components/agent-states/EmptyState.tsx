import {TextEffect} from '../effects/TextEffect'
import {type AgentType} from '../../lib/types'

interface EmptyStateProps {
  agent: AgentType
}

export function EmptyState({agent}: EmptyStateProps) {
  return (
    <div className='flex flex-col items-center justify-center h-full py-16 space-y-6 text-center'>
      <div className='rounded-full bg-neutral-100 p-6'>
        <AgentIcon className='w-12 h-12 text-neutral-400' />
      </div>

      <div className='space-y-2 max-w-sm'>
        <TextEffect
          per='word'
          preset='fade'
          className='text-lg font-medium text-neutral-700'
        >
          {agent.name} Agent
        </TextEffect>

        <p className='text-sm text-neutral-500'>
          {agent.description ||
            'Ready to process your request. Enter your input to get started.'}
        </p>
      </div>
    </div>
  )
}

function AgentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path d='M12 2a5 5 0 0 1 5 5v6a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z'></path>
      <path d='M15 9.3a8 8 0 0 1 4.5 3.2'></path>
      <path d='M8.9 9.3a8 8 0 0 0-4.4 3.2'></path>
      <path d='M3 19h18'></path>
      <path d='M7 19a4 4 0 0 1 4 4'></path>
      <path d='M17 19a4 4 0 0 0-4 4'></path>
    </svg>
  )
}
