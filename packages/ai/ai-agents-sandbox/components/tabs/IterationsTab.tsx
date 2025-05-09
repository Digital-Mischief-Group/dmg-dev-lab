import {TabsContent} from '@/components/ui/tabs'
import {Card} from '@/components/ui/card'
import {CompletionIndicator} from '../completion-indicator'
import {MemoizedReactMarkdown} from '../markdown-renderer'

interface TabContentProps {
  parsedOutput: any
}

export function IterationsTab({parsedOutput}: TabContentProps) {
  if (!parsedOutput.iterations?.length) return null

  return (
    <TabsContent value='iterations' className='mt-4 space-y-4'>
      {parsedOutput.iterations.map((iteration: any, index: number) => (
        <Card key={index} className='p-4'>
          <CompletionIndicator
            status='success'
            message={`Iteration ${index + 1}`}
            className='mb-2'
          />
          <div className='space-y-2'>
            <MemoizedReactMarkdown>
              {iteration.output || iteration.result || iteration.text}
            </MemoizedReactMarkdown>
          </div>
        </Card>
      ))}
    </TabsContent>
  )
}
