'use client'

import {useState, useEffect} from 'react'
import {useMediaQuery} from '@/hooks/use-media-query'
import {OutputPanel} from './OutputPanel'
import {InputPanel} from './InputPanel'
import {MobileDrawer} from './mobile/MobileDrawer'
import {testAgent} from '@/app/actions'
import {AgentType} from '@/lib/types'

// Default agent configuration
const DEFAULT_AGENT: AgentType = {
  id: 'multi-step-tool-usage',
  name: 'Multi-step Tool Usage',
  description:
    'An agent that can use tools in multiple steps to solve complex problems',
  resultTabs: ['response', 'steps', 'tools'],
  params: {
    temperature: 0.7,
    maxTokens: 1000,
    topP: 0.95,
  },
}

export function AgentSandbox() {
  const [selectedAgent, setSelectedAgent] = useState<AgentType>(DEFAULT_AGENT)
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [parsedOutput, setParsedOutput] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)

  const isMobile = useMediaQuery('(max-width: 768px)')

  // Reset timer when loading state changes
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (loading) {
      setElapsedTime(0)
      timer = setInterval(() => setElapsedTime((prev) => prev + 1), 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [loading])

  const handleSubmit = async (userInput: string) => {
    if (!userInput.trim() || loading) return

    setLoading(true)
    setOutput('')
    setParsedOutput(null)

    try {
      // Call the server action
      const response = await testAgent(
        selectedAgent.id,
        {prompt: userInput},
        selectedAgent.params || {}
      )

      setOutput(response as string)

      try {
        // Try to parse the JSON response
        const parsed = JSON.parse(response as string)
        setParsedOutput(parsed)
      } catch (error) {
        console.warn('Failed to parse response as JSON:', error)
        // If parsing fails, just use the raw output
        setParsedOutput({output: response})
      }
    } catch (error) {
      console.error('Error calling agent:', error)
      setParsedOutput({error: true, message: (error as Error).message})
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col md:flex-row w-full h-[calc(100vh-theme(spacing.16))] gap-4 p-4'>
      <InputPanel
        selectedAgent={selectedAgent}
        onAgentChange={setSelectedAgent}
        input={input}
        onInputChange={setInput}
        onSubmit={handleSubmit}
        loading={loading}
      />

      {isMobile ? (
        <MobileDrawer
          output={output}
          parsedOutput={parsedOutput}
          selectedAgent={selectedAgent}
          loading={loading}
          elapsedTime={elapsedTime}
        />
      ) : (
        <OutputPanel
          selectedAgent={selectedAgent}
          loading={loading}
          output={output}
          parsedOutput={parsedOutput}
        />
      )}
    </div>
  )
}
