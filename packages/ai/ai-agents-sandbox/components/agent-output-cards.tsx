'use client'

import {AgentMessage} from './agent'
import {MarkdownRenderer} from './markdown-renderer'

interface AgentOutputCardsProps {
  messages: AgentMessage[]
}

export function AgentOutputCards({messages}: AgentOutputCardsProps) {
  const assistantMessages = messages.filter(
    (message) => message.role === 'assistant'
  )

  if (assistantMessages.length === 0) {
    return null
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
      {assistantMessages.map((message) => (
        <div
          key={message.id}
          className='border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow'
        >
          <div className='h-full flex flex-col'>
            <div className='text-xs text-gray-500 mb-2'>
              {new Date(message.timestamp).toLocaleString()}
            </div>

            <div className='flex-1 overflow-hidden'>
              <MarkdownRenderer content={message.content} />
            </div>

            <div className='mt-4 pt-2 border-t flex justify-end'>
              <button className='text-xs text-blue-600 hover:text-blue-800'>
                Copy Response
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
