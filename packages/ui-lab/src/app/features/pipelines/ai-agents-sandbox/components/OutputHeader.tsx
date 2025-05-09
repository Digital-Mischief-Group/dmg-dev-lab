import {AnimatePresence, motion} from 'motion/react'
import {CompletionIndicator} from './completion-indicator'
import {Countdown} from './agent-states'
import {TokenCounter} from './token-counter'

interface OutputHeaderProps {
  loading: boolean
  parsedOutput: any
  elapsedTime: number
  milliseconds: number
  output: string
}

export function OutputHeader({
  loading,
  parsedOutput,
  elapsedTime,
  milliseconds,
  output,
}: OutputHeaderProps) {
  return (
    <div className='flex-none flex items-center justify-between w-full px-4 py-2 border-b border-border/50'>
      {!loading && parsedOutput && (
        <CompletionIndicator
          status={parsedOutput?.error ? 'error' : 'success'}
          message={
            parsedOutput?.error
              ? `Failed to process request ${parsedOutput?.message}`
              : 'Tokens'
          }
          className='hidden md:flex items-center mb-0'
        >
          <AnimatePresence mode='wait'>
            {parsedOutput?.usage && (
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.2}}
              >
                <TokenCounter
                  promptTokens={parsedOutput?.usage?.promptTokens}
                  completionTokens={parsedOutput?.usage?.completionTokens}
                  totalTokens={parsedOutput?.usage?.totalTokens}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </CompletionIndicator>
      )}

      {(loading || output) && (
        <Countdown
          seconds={elapsedTime}
          milliseconds={loading ? milliseconds : 0}
          loading={loading}
        />
      )}
    </div>
  )
}
