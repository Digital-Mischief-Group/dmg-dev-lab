import {TabsContent} from '@/components/ui/tabs'
import {Card} from '@/components/ui/card'
import {CompletionIndicator} from '../completion-indicator'
import {MemoizedReactMarkdown} from '../markdown-renderer'

interface TabContentProps {
  parsedOutput: any
}

export function StepsTab({parsedOutput}: TabContentProps) {
  if (!parsedOutput.steps?.length) return null

  return (
    <TabsContent value='steps' className='mt-4 space-y-4'>
      {parsedOutput.steps.map((step: any, index: number) => (
        <Card key={index} className='p-4'>
          <CompletionIndicator
            status='success'
            message={`${step.step || `Step ${index + 1}`}: ${
              step.output ? 'completed' : 'success'
            }`}
            className='mb-2'
          />
          <MemoizedReactMarkdown>
            {step.output || step.result || step.text}
          </MemoizedReactMarkdown>
        </Card>
      ))}
    </TabsContent>
  )
}
