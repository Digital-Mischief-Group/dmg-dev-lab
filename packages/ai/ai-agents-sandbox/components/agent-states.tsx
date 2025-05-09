'use client'

import {createContext, useContext, useReducer, ReactNode} from 'react'
import {AgentMessage} from './agent'

type AgentStatus = 'idle' | 'thinking' | 'responding' | 'error'

interface AgentStateContext {
  status: AgentStatus
  messages: AgentMessage[]
  error?: string
  tokenCount: number
}

type AgentAction =
  | {type: 'SUBMIT_PROMPT'; payload: string}
  | {type: 'START_THINKING'}
  | {type: 'START_RESPONDING'}
  | {type: 'ADD_MESSAGE'; payload: AgentMessage}
  | {type: 'SET_ERROR'; payload: string}
  | {type: 'RESET_ERROR'}
  | {type: 'CLEAR_MESSAGES'}

const initialState: AgentStateContext = {
  status: 'idle',
  messages: [],
  tokenCount: 0,
}

const AgentStateContext = createContext<
  | {
      state: AgentStateContext
      dispatch: React.Dispatch<AgentAction>
    }
  | undefined
>(undefined)

function agentReducer(
  state: AgentStateContext,
  action: AgentAction
): AgentStateContext {
  switch (action.type) {
    case 'SUBMIT_PROMPT': {
      const userMessage: AgentMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: action.payload,
        timestamp: Date.now(),
      }

      return {
        ...state,
        status: 'thinking',
        messages: [...state.messages, userMessage],
      }
    }

    case 'START_THINKING':
      return {
        ...state,
        status: 'thinking',
      }

    case 'START_RESPONDING':
      return {
        ...state,
        status: 'responding',
      }

    case 'ADD_MESSAGE':
      return {
        ...state,
        status: 'idle',
        messages: [...state.messages, action.payload],
        tokenCount: state.tokenCount + action.payload.content.length,
      }

    case 'SET_ERROR':
      return {
        ...state,
        status: 'error',
        error: action.payload,
      }

    case 'RESET_ERROR':
      return {
        ...state,
        status: 'idle',
        error: undefined,
      }

    case 'CLEAR_MESSAGES':
      return {
        ...state,
        messages: [],
        tokenCount: 0,
      }

    default:
      return state
  }
}

export function AgentStateProvider({children}: {children: ReactNode}) {
  const [state, dispatch] = useReducer(agentReducer, initialState)

  return (
    <AgentStateContext.Provider value={{state, dispatch}}>
      {children}
    </AgentStateContext.Provider>
  )
}

export function useAgentState() {
  const context = useContext(AgentStateContext)

  if (context === undefined) {
    throw new Error('useAgentState must be used within an AgentStateProvider')
  }

  return context
}
