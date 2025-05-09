'use client'

interface TokenCounterProps {
  count: number
  limit?: number
}

export function TokenCounter({count, limit = 4000}: TokenCounterProps) {
  const percentage = Math.min((count / limit) * 100, 100)
  const isNearLimit = percentage > 80
  const isAtLimit = percentage >= 100

  return (
    <div className='flex flex-col'>
      <div className='text-xs text-gray-500 mb-1'>
        {count.toLocaleString()} / {limit.toLocaleString()} tokens
      </div>

      <div className='w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden'>
        <div
          className={`h-full rounded-full ${
            isAtLimit
              ? 'bg-red-500'
              : isNearLimit
              ? 'bg-yellow-500'
              : 'bg-green-500'
          }`}
          style={{width: `${percentage}%`}}
        />
      </div>
    </div>
  )
}
