import {Inter_Tight} from 'next/font/google'
import {ReactNode} from 'react'

import {cn} from '@/lib/utils'
import {Toaster} from '@/components/ui/sonner'
import {TooltipProvider} from '@/components/ui/tooltip'

const inter = Inter_Tight({subsets: ['latin']})

export const metadata = {
  title: 'AI SDK Enrich Form',
  description: 'AI SDK Enrich Form Demo',
}

export default function Layout({children}: {children: ReactNode}) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'flex min-h-svh bg-muted flex-col antialiased',
          inter.className
        )}
      >
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        <Toaster position='top-center' richColors />
      </body>
    </html>
  )
}
