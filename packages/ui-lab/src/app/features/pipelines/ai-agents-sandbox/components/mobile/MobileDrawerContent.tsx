import {DrawerContent} from '@/components/ui/drawer'
import {ReactNode} from 'react'

interface MobileDrawerContentProps {
  children: ReactNode
}

export function MobileDrawerContent({children}: MobileDrawerContentProps) {
  return (
    <DrawerContent className='flex flex-col rounded-t-[10px] h-[96vh] fixed bottom-0 left-0 right-0'>
      {children}
    </DrawerContent>
  )
}
