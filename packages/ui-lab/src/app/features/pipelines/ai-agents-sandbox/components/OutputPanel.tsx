import {useState, useEffect} from 'react'
import {motion} from 'motion/react'
import {cn} from '@/lib/utils'
import {slideInFromRight} from '../lib/animations'
import {type AgentType} from '../lib/types'
import {OutputHeader} from './OutputHeader'
import {OutputContent} from './OutputContent'

interface OutputPanelProps {
  selectedAgent: AgentType
  loading: boolean
  output: string
  parsedOutput: any
}

export function OutputPanel({
  selectedAgent,
  loading,
  output,
  parsedOutput,
}: OutputPanelProps) {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [milliseconds, setMilliseconds] = useState(0)

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout
    let msTimer: NodeJS.Timeout

    if (loading) {
      setElapsedTime(0)
      setMilliseconds(0)
      timer = setInterval(() => setElapsedTime((prev) => prev + 1), 1000)
      msTimer = setInterval(
        () => setMilliseconds((prev) => (prev + 10) % 1000),
        10
      )
    }

    return () => {
      if (timer) clearInterval(timer)
      if (msTimer) clearInterval(msTimer)
    }
  }, [loading])

  return (
    <motion.div
      variants={slideInFromRight}
      className={cn(
        'flex flex-col min-h-0 overflow-hidden bg-muted',
        'h-full w-full',
        'md:w-1/2 lg:w-3/5'
      )}
    >
      <h2 className='absolute top-4 right-4 hidden md:block text-[9px] font-medium text-neutral-400 '>
        {loading ? 'Processing...' : 'Output'}
      </h2>

      <OutputHeader
        loading={loading}
        parsedOutput={parsedOutput}
        elapsedTime={elapsedTime}
        milliseconds={milliseconds}
        output={output}
      />

      <OutputContent
        loading={loading}
        output={output}
        parsedOutput={parsedOutput}
        selectedAgent={selectedAgent}
        elapsedTime={elapsedTime}
      />
    </motion.div>
  )
}
