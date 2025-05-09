import {motion} from 'motion/react'
import {EmptyState, LoadingState} from './agent-states'
import {OutputTabs} from './OutputTabs'
import {type AgentType} from '../lib/types'
import {AgentOutputCards} from './agent-output-cards'

interface OutputContentProps {
  loading: boolean
  output: string
  parsedOutput: any
  selectedAgent: AgentType
  elapsedTime: number
}

export function OutputContent({
  loading,
  output,
  parsedOutput,
  selectedAgent,
  elapsedTime,
}: OutputContentProps) {
  const renderCustomOutput = () => {
    const AgentOutput = AgentOutputCards[selectedAgent.id]?.renderOutput
    if (AgentOutput && parsedOutput) {
      return (
        <div className='space-y-4 max-w-full'>
          <div className='max-w-full overflow-x-auto'>
            <AgentOutput {...parsedOutput} />
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className='flex-1 overflow-y-auto'>
      <div className='p-4'>
        {loading ? (
          <div className='flex flex-col'>
            <LoadingState agent={selectedAgent} elapsedTime={elapsedTime} />
          </div>
        ) : output ? (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className='space-y-4 pb-16'
          >
            {renderCustomOutput() || (
              <OutputTabs
                selectedAgent={selectedAgent}
                parsedOutput={parsedOutput}
                output={output}
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.2}}
          >
            <EmptyState agent={selectedAgent} />
          </motion.div>
        )}
      </div>
    </div>
  )
}
