import {ReactNode} from 'react'

interface MobileDrawerContentAreaProps {
  loading: boolean
  children: ReactNode
}

export function MobileDrawerContentArea({
  loading,
  children,
}: MobileDrawerContentAreaProps) {
  return (
    <div className='flex-1 overflow-y-auto'>
      {loading ? (
        <div className='h-full flex flex-col'>{children}</div>
      ) : (
        <div className='min-h-full'>{children}</div>
      )}
    </div>
  )
}
