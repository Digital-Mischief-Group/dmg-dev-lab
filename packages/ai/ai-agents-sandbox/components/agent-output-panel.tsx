'use client'

import {useEffect, useRef} from 'react'
import {AgentMessage, AgentState} from './agent'
import {MarkdownRenderer} from './markdown-renderer'

interface AgentOutputPanelProps {
  messages: AgentMessage[]
  status: AgentState['status']
}

export function AgentOutputPanel({messages, status}: AgentOutputPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({behavior: 'smooth'})
    }
  }, [messages])

  return (
    <div className='flex-1 overflow-y-auto p-4 border rounded-lg bg-gray-50 dark:bg-gray-900'>
      {messages.length === 0 ? (
        <div className='h-full flex flex-col items-center justify-center text-gray-500'>
          <p>No conversation yet</p>
          <p className='text-sm'>Start by asking the agent something</p>
        </div>
      ) : (
        <div className='space-y-6'>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col ${
                message.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-[80%] ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 border'
                }`}
              >
                {message.role === 'user' ? (
                  <p className='whitespace-pre-wrap'>{message.content}</p>
                ) : (
                  <MarkdownRenderer content={message.content} />
                )}
              </div>
              <span className='text-xs text-gray-500 mt-1'>
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}

          {status === 'thinking' && (
            <div className='flex items-start'>
              <div className='px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border'>
                <div className='flex space-x-2'>
                  <div
                    className='h-2 w-2 bg-gray-500 rounded-full animate-bounce'
                    style={{animationDelay: '0ms'}}
                  ></div>
                  <div
                    className='h-2 w-2 bg-gray-500 rounded-full animate-bounce'
                    style={{animationDelay: '150ms'}}
                  ></div>
                  <div
                    className='h-2 w-2 bg-gray-500 rounded-full animate-bounce'
                    style={{animationDelay: '300ms'}}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      )}
    </div>
  )
}
