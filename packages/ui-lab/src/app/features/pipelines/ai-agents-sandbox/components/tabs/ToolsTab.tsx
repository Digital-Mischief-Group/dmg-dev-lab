import {TabsContent} from '@/components/ui/tabs'
import {Card} from '@/components/ui/card'
import {CompletionIndicator} from '../completion-indicator'
import {MemoizedReactMarkdown} from '../markdown-renderer'

interface TabContentProps {
  parsedOutput: any
}

export function ToolsTab({parsedOutput}: TabContentProps) {
  if (!parsedOutput.toolCalls?.length) return null

  return (
    <TabsContent value='tools' className='mt-4 space-y-4'>
      {parsedOutput.toolCalls.map((tool: any, index: number) => (
        <Card key={index} className='p-4'>
          <CompletionIndicator
            status='success'
            message={`${tool.name || `Tool ${index + 1}`}`}
            className='mb-2'
          />
          <div className='space-y-2'>
            <div className='text-sm text-neutral-600'>
              <MemoizedReactMarkdown>
                {tool.input || tool.args || tool.parameters}
              </MemoizedReactMarkdown>
            </div>
            {tool.output && (
              <div className='pt-2 border-t'>
                <h4 className='text-xs font-medium mb-1'>Output</h4>
                <MemoizedReactMarkdown>{tool.output}</MemoizedReactMarkdown>
              </div>
            )}
          </div>
        </Card>
      ))}
    </TabsContent>
  )
}
