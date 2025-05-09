import {Toaster} from 'sonner'
import {Inter_Tight} from 'next/font/google'
import {cn} from '@/lib/utils'

const inter = Inter_Tight({subsets: ['latin']})

export default function TriggerDevActionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={cn('flex min-h-svh flex-col antialiased', inter.className)}
      >
        <div vaul-drawer-wrapper=''>
          <div className='min-h-screen bg-gray-50'>
            {children}
            <Toaster />
          </div>
        </div>
      </body>
    </html>
  )
}
