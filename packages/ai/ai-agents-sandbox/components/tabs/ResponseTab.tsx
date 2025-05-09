import {TabsContent} from '@/components/ui/tabs'
import {Card} from '@/components/ui/card'
import {CompletionIndicator} from '../completion-indicator'
import {MemoizedReactMarkdown} from '../markdown-renderer'
import {formatJSONString} from '../../lib/utils'

interface TabContentProps {
  parsedOutput: any
}

export function ResponseTab({parsedOutput}: TabContentProps) {
  return (
    <TabsContent value='response' className='mt-4 space-y-4'>
      <Card className='p-4'>
        <CompletionIndicator
          status={parsedOutput.error ? 'error' : 'success'}
          message={
            parsedOutput.text ||
            parsedOutput.response ||
            parsedOutput.finalOutput ||
            parsedOutput.output
          }
          className='mb-4'
        />
        <div className='max-w-full overflow-x-auto'>
          <MemoizedReactMarkdown>
            {formatJSONString(
              parsedOutput.text ||
                parsedOutput.response ||
                parsedOutput.finalOutput ||
                parsedOutput.output
            )}
          </MemoizedReactMarkdown>
        </div>
      </Card>
    </TabsContent>
  )
}
