import {Clock02Icon} from '../icons/Clock02Icon'

interface CountdownProps {
  seconds: number
  milliseconds: number
  loading: boolean
}

export function Countdown({seconds, milliseconds, loading}: CountdownProps) {
  const formatTime = () => {
    // Format display time as MM:SS.ms
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    const ms = Math.floor(milliseconds / 10)

    return `${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}.${ms.toString().padStart(2, '0')}`
  }

  return (
    <div className='flex items-center space-x-1.5'>
      <Clock02Icon className='h-3 w-3 text-neutral-500' />
      <span className='text-xs text-neutral-600 font-mono'>{formatTime()}</span>
      {loading && (
        <span className='relative flex h-2 w-2'>
          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
          <span className='relative inline-flex rounded-full h-2 w-2 bg-green-500'></span>
        </span>
      )}
    </div>
  )
}
