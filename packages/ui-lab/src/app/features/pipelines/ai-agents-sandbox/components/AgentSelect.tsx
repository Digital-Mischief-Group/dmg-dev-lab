'use client'

import {Label} from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {AgentType} from '@/lib/types'

// Available agent types
const AVAILABLE_AGENTS: AgentType[] = [
  {
    id: 'multi-step-tool-usage',
    name: 'Multi-step Tool Usage',
    description:
      'An agent that can use tools in multiple steps to solve complex problems',
    resultTabs: ['response', 'steps', 'tools'],
  },
  {
    id: 'sequential-processing',
    name: 'Sequential Processing',
    description: 'Process content through a series of sequential steps',
    resultTabs: ['response', 'steps'],
  },
  {
    id: 'routing',
    name: 'Routing',
    description: 'Route to specialized agents based on query classification',
    resultTabs: ['response', 'classification'],
  },
  {
    id: 'parallel-processing',
    name: 'Parallel Processing',
    description: 'Process content in parallel using multiple agents',
    resultTabs: ['response'],
  },
  {
    id: 'orchestrator-worker',
    name: 'Orchestrator-Worker',
    description:
      'Use an orchestrator to plan and delegate tasks to worker agents',
    resultTabs: ['response'],
  },
  {
    id: 'evaluator-optimizer',
    name: 'Evaluator-Optimizer',
    description: 'Evaluate and optimize content through multiple iterations',
    resultTabs: ['response', 'iterations'],
  },
]

interface AgentSelectProps {
  selectedAgent: AgentType
  onAgentChange: (agent: AgentType) => void
  disabled?: boolean
}

export function AgentSelect({
  selectedAgent,
  onAgentChange,
  disabled,
}: AgentSelectProps) {
  return (
    <div className='space-y-2'>
      <Label htmlFor='agent-select'>Agent Type</Label>
      <Select
        value={selectedAgent.id}
        onValueChange={(value) => {
          const agent = AVAILABLE_AGENTS.find((a) => a.id === value)
          if (agent) {
            onAgentChange(agent)
          }
        }}
        disabled={disabled}
      >
        <SelectTrigger id='agent-select'>
          <SelectValue placeholder='Select an agent' />
        </SelectTrigger>
        <SelectContent>
          {AVAILABLE_AGENTS.map((agent) => (
            <SelectItem key={agent.id} value={agent.id}>
              {agent.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedAgent.description && (
        <p className='text-xs text-muted-foreground'>
          {selectedAgent.description}
        </p>
      )}
    </div>
  )
}
