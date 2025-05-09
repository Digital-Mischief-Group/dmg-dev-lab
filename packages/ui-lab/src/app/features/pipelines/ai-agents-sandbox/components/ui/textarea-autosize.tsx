'use client'

import * as React from 'react'
import {cn} from '@/lib/utils'
import TextareaAutosize from 'react-textarea-autosize'

export interface TextareaAutosizeProps
  extends React.ComponentPropsWithoutRef<typeof TextareaAutosize> {
  error?: boolean
}

const TextareaAutosizeComponent = React.forwardRef<
  HTMLTextAreaElement,
  TextareaAutosizeProps
>(({className, error, ...props}, ref) => {
  return (
    <TextareaAutosize
      className={cn(
        'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-destructive focus-visible:ring-destructive',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

TextareaAutosizeComponent.displayName = 'TextareaAutosize'

export {TextareaAutosizeComponent as TextareaAutosize}
