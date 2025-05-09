import {Drawer, DrawerTrigger} from '@/components/ui/drawer'
import {MobileDrawerContent} from './MobileDrawerContent'
import {MobileDrawerHeader} from './MobileDrawerHeader'
import {MobileDrawerContentArea} from './MobileDrawerContentArea'
import {type AgentType} from '../../lib/types'
import {OutputContent} from '../OutputContent'
import {useState} from 'react'

interface MobileDrawerProps {
  output: string
  parsedOutput: any
  selectedAgent: AgentType
  loading: boolean
  elapsedTime: number
}

export function MobileDrawer({
  output,
  parsedOutput,
  selectedAgent,
  loading,
  elapsedTime,
}: MobileDrawerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          type='button'
          className='rounded-full w-10 h-10 bg-primary flex items-center justify-center text-white fixed right-4 bottom-4 shadow-lg'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            {open ? (
              <path d='M6 18L18 6M6 6l12 12' />
            ) : (
              <path d='M8 18l6-6-6-6' />
            )}
          </svg>
        </button>
      </DrawerTrigger>

      <MobileDrawerContent>
        <MobileDrawerHeader selectedAgent={selectedAgent} loading={loading} />

        <MobileDrawerContentArea loading={loading}>
          <OutputContent
            loading={loading}
            output={output}
            parsedOutput={parsedOutput}
            selectedAgent={selectedAgent}
            elapsedTime={elapsedTime}
          />
        </MobileDrawerContentArea>
      </MobileDrawerContent>
    </Drawer>
  )
}
