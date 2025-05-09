'use client'

import {useState} from 'react'
import {AgentHeader} from './agent-header'
import {AgentInputPanel} from './agent-input-panel'
import {AgentOutputPanel} from './agent-output-panel'
import {AgentMobileOutputPanel} from './agent-mobile-output-panel'
import {useMediaQuery} from '../hooks/use-media-query'

export interface AgentMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
}

export interface AgentState {
  status: 'idle' | 'thinking' | 'responding' | 'error'
  messages: AgentMessage[]
  error?: string
  tokenCount: number
}

export function Agent() {
  const [state, setState] = useState<AgentState>({
    status: 'idle',
    messages: [],
    tokenCount: 0,
  })

  const isMobile = useMediaQuery('(max-width: 768px)')

  const handleSubmit = async (prompt: string) => {
    if (!prompt.trim()) return

    // Create a new user message
    const userMessage: AgentMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
      timestamp: Date.now(),
    }

    // Update state to show thinking status
    setState({
      ...state,
      status: 'thinking',
      messages: [...state.messages, userMessage],
    })

    try {
      // Simulate API response
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Create assistant response
      const assistantMessage: AgentMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I received your message: "${prompt}"`,
        timestamp: Date.now(),
      }

      // Update state with assistant's response
      setState({
        status: 'idle',
        messages: [...state.messages, userMessage, assistantMessage],
        tokenCount:
          state.tokenCount + prompt.length + assistantMessage.content.length,
      })
    } catch (error) {
      setState({
        ...state,
        status: 'error',
        error: 'Failed to get response from the agent',
      })
    }
  }

  return (
    <div className='flex flex-col w-full max-w-5xl h-[90vh] gap-4'>
      <AgentHeader status={state.status} />

      {isMobile ? (
        <AgentMobileOutputPanel
          messages={state.messages}
          status={state.status}
        />
      ) : (
        <AgentOutputPanel messages={state.messages} status={state.status} />
      )}

      <AgentInputPanel
        onSubmit={handleSubmit}
        disabled={state.status === 'thinking' || state.status === 'responding'}
      />
    </div>
  )
}
