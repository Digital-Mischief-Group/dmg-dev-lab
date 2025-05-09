'use client'

import {cn} from '@/lib/utils'
import {type InputStatus} from '@/lib/types'

interface CompletionIndicatorProps {
  status: InputStatus
  message?: string
  className?: string
  children?: React.ReactNode
}

export function CompletionIndicator({
  status,
  message,
  className,
  children,
}: CompletionIndicatorProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'bg-green-500'
      case 'loading':
        return 'bg-yellow-500'
      case 'error':
        return 'bg-red-500'
      case 'idle':
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusText = () => {
    if (message) return message

    switch (status) {
      case 'success':
        return 'Success'
      case 'loading':
        return 'Processing...'
      case 'error':
        return 'Error'
      case 'idle':
      default:
        return 'Waiting'
    }
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className='flex items-center gap-1.5'>
        <div
          className={cn(
            'h-2 w-2 rounded-full',
            getStatusColor(),
            status === 'loading' ? 'animate-pulse' : ''
          )}
        />
        <span className='text-sm text-neutral-600 font-medium'>
          {getStatusText()}
        </span>
      </div>
      {children}
    </div>
  )
}
