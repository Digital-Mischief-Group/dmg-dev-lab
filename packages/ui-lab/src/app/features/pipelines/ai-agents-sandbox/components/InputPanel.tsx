'use client'

import {motion} from 'motion/react'
import {slideInFromLeft} from '../lib/animations'
import {cn} from '@/lib/utils'
import {useMediaQuery} from '@/hooks/use-media-query'
import {AgentSelect} from './AgentSelect'
import {AgentType} from '@/lib/types'
import {TextareaAutosize} from './ui/textarea-autosize'
import {Button} from './ui/button'

interface InputPanelProps {
  selectedAgent: AgentType
  onAgentChange: (agent: AgentType) => void
  input: string
  onInputChange: (value: string) => void
  onSubmit: (value: string) => void
  loading: boolean
}

export function InputPanel({
  selectedAgent,
  onAgentChange,
  input,
  onInputChange,
  onSubmit,
  loading,
}: InputPanelProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(input)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={slideInFromLeft}
      className={cn(
        'flex flex-col min-h-0 bg-card p-4 rounded-md border shadow-sm',
        'h-full',
        isMobile ? 'w-full' : 'w-full md:w-1/2 lg:w-2/5'
      )}
    >
      <h2 className='absolute top-4 right-4 hidden md:block text-[9px] font-medium text-neutral-400'>
        Input
      </h2>

      <div className='flex-none mb-4'>
        <AgentSelect
          selectedAgent={selectedAgent}
          onAgentChange={onAgentChange}
          disabled={loading}
        />
      </div>

      <div className='flex flex-col flex-1 overflow-hidden'>
        <div className='flex-1 overflow-y-auto'>
          <TextareaAutosize
            placeholder={`Enter your ${selectedAgent.name} input...`}
            className='w-full h-full min-h-[200px] bg-background resize-none p-3 rounded-md border'
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className='flex-none mt-4'>
          <Button
            type='submit'
            className='w-full'
            disabled={loading || !input.trim()}
          >
            {loading ? 'Processing...' : 'Send to Agent'}
          </Button>
        </div>
      </div>
    </motion.form>
  )
}
