import {TabsContent} from '@/components/ui/tabs'
import {Card} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {MemoizedReactMarkdown} from '../markdown-renderer'

interface TabContentProps {
  parsedOutput: any
}

export function ClassificationTab({parsedOutput}: TabContentProps) {
  if (!parsedOutput.classification) return null

  return (
    <TabsContent value='classification' className='mt-4 space-y-4'>
      <Card className='p-4'>
        <div className='space-y-4'>
          <div>
            <h4 className='text-sm font-medium mb-2'>Query Classification</h4>
            <Badge className='mb-2'>{parsedOutput.classification.type}</Badge>
            <p className='text-sm text-neutral-600'>
              {parsedOutput.classification.reasoning}
            </p>
          </div>
          <div className='pt-4 border-t'>
            <h4 className='text-sm font-medium mb-2'>Routed Response</h4>
            <MemoizedReactMarkdown>
              {parsedOutput.response}
            </MemoizedReactMarkdown>
          </div>
        </div>
      </Card>
    </TabsContent>
  )
}
