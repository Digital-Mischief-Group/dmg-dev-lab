import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {ResponseTab} from './tabs/ResponseTab'
import {StepsTab} from './tabs/StepsTab'
import {ClassificationTab} from './tabs/ClassificationTab'
import {ToolsTab} from './tabs/ToolsTab'
import {IterationsTab} from './tabs/IterationsTab'
import {type AgentType} from '../lib/types'

interface OutputTabsProps {
  selectedAgent: AgentType
  parsedOutput: any
  output: string
}

export function OutputTabs({
  selectedAgent,
  parsedOutput,
  output,
}: OutputTabsProps) {
  if (!output) return null

  const availableTabs = selectedAgent.resultTabs || ['response']

  return (
    <Tabs defaultValue='response' className='w-full'>
      <TabsList
        className='grid w-full'
        style={{gridTemplateColumns: `repeat(${availableTabs.length}, 1fr)`}}
      >
        {availableTabs.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            disabled={
              (tab === 'steps' && !parsedOutput.steps?.length) ||
              (tab === 'tools' && !parsedOutput.toolCalls?.length) ||
              (tab === 'iterations' && !parsedOutput.iterations?.length)
            }
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className='mt-4 space-y-4'>
        <ResponseTab parsedOutput={parsedOutput} />
        <StepsTab parsedOutput={parsedOutput} />
        <ClassificationTab parsedOutput={parsedOutput} />
        <ToolsTab parsedOutput={parsedOutput} />
        <IterationsTab parsedOutput={parsedOutput} />
      </div>
    </Tabs>
  )
}
