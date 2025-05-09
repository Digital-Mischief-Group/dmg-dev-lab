'use client'

import {ChangeEvent, useEffect, useRef, useState} from 'react'

interface AutoResizeTextAreaProps {
  value: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  className?: string
  id?: string
  minHeight?: number
  maxHeight?: number
}

export const AutoResizeTextArea = ({
  value,
  onChange,
  placeholder,
  className = '',
  id,
  minHeight = 100,
  maxHeight = 400,
}: AutoResizeTextAreaProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [currentHeight, setCurrentHeight] = useState<number>(minHeight)

  const adjustHeight = () => {
    const textArea = textAreaRef.current
    if (!textArea) return

    // Reset height to auto to get the correct scrollHeight
    textArea.style.height = 'auto'

    // Calculate new height
    const newHeight = Math.max(
      minHeight,
      Math.min(textArea.scrollHeight, maxHeight)
    )

    // Apply new height
    textArea.style.height = `${newHeight}px`
    setCurrentHeight(newHeight)
  }

  // Adjust height when value changes
  useEffect(() => {
    adjustHeight()
  }, [value, adjustHeight])

  // Initial adjustment after component mounts
  useEffect(() => {
    adjustHeight()
  }, [])

  return (
    <textarea
      ref={textAreaRef}
      value={value}
      onChange={(e) => {
        onChange(e)
        adjustHeight()
      }}
      placeholder={placeholder}
      id={id}
      className={`resize-none overflow-y-auto ${className}`}
      style={{height: `${currentHeight}px`}}
    />
  )
}
