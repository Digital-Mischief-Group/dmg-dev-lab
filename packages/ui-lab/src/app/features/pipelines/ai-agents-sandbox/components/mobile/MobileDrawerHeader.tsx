import {DrawerHeader, DrawerTitle} from '@/components/ui/drawer'
import {type AgentType} from '../../lib/types'

interface MobileDrawerHeaderProps {
  selectedAgent: AgentType
  loading: boolean
}

export function MobileDrawerHeader({
  selectedAgent,
  loading,
}: MobileDrawerHeaderProps) {
  return (
    <DrawerHeader className='flex-none border-b px-4 py-3'>
      <DrawerTitle className='flex items-center justify-between gap-2 text-xs font-medium'>
        <span>
          {loading ? 'Processing...' : `${selectedAgent.name} Output`}
        </span>
      </DrawerTitle>
    </DrawerHeader>
  )
}
