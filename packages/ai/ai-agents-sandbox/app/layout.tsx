import {cn} from '@/lib/utils'
import {TooltipProvider} from '@/components/ui/tooltip'

import {GeistSans} from 'geist/font/sans'

import {ReactNode} from 'react'
import {Toaster} from 'sonner'

export const metadata = {
  title: 'AI Agents Sandbox',
  description: 'Explore AI agents in a sandbox environment.',
}

export default function Layout({children}: {children: ReactNode}) {
  return (
    <html lang='en' className='h-full'>
      <body
        className={cn(
          'relative h-full overflow-hidden bg-muted font-geist',
          GeistSans.variable
        )}
      >
        <div vaul-drawer-wrapper='' className='h-full'>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster richColors />
        </div>
      </body>
    </html>
  )
}
