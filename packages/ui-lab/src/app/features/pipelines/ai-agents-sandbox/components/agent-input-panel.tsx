'use client'

import {useState, FormEvent, KeyboardEvent} from 'react'
import {Effects} from './effects'

interface AgentInputPanelProps {
  onSubmit: (prompt: string) => void
  disabled?: boolean
}

export function AgentInputPanel({
  onSubmit,
  disabled = false,
}: AgentInputPanelProps) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault()
    if (!inputValue.trim() || disabled) return

    onSubmit(inputValue)
    setInputValue('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className='relative w-full mt-auto'>
      <Effects isActive={disabled} />

      <form onSubmit={handleSubmit} className='relative flex flex-col'>
        <div className='relative flex items-end border rounded-lg overflow-hidden bg-white dark:bg-gray-800'>
          <textarea
            className='flex-1 resize-none p-3 pr-16 max-h-[200px] min-h-[60px] focus:outline-none bg-transparent'
            placeholder='Ask the AI agent...'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            rows={1}
          />

          <button
            type='submit'
            disabled={!inputValue.trim() || disabled}
            className='absolute right-2 bottom-2 p-2 rounded-md bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <SendIcon />
          </button>
        </div>

        <div className='text-xs text-gray-500 mt-1 px-2'>
          Press Enter to send, Shift+Enter for new line
        </div>
      </form>
    </div>
  )
}

function SendIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z' />
    </svg>
  )
}
