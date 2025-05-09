import {motion} from 'motion/react'
import {loadingSpinnerVariants} from '../../lib/animations'

interface CircularProgressProps {
  size?: number
  thickness?: number
  color?: string
}

export function CircularProgress({
  size = 24,
  thickness = 2,
  color = 'currentColor',
}: CircularProgressProps) {
  return (
    <div className='relative inline-flex'>
      {/* Track circle */}
      <svg
        className='text-neutral-200'
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth={thickness}
          strokeLinecap='round'
        />
      </svg>

      {/* Animated circle */}
      <motion.svg
        variants={loadingSpinnerVariants}
        animate='animate'
        className='absolute left-0 top-0 text-blue-600'
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          cx='12'
          cy='12'
          r='10'
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap='round'
          strokeDasharray='60'
          strokeDashoffset='15'
        />
      </motion.svg>
    </div>
  )
}
