'use client'

import {useState} from 'react'
import TaskHistoryList from './task-history-list'

interface TaskResultVisualizerProps {
  result: any
}

export default function TaskResultVisualizer({
  result,
}: TaskResultVisualizerProps) {
  const [expanded, setExpanded] = useState(false)

  // Determine the type of result and render accordingly
  const renderResult = () => {
    if (!result) return null

    // If the result is a string
    if (typeof result === 'string') {
      return <p className='whitespace-pre-wrap'>{result}</p>
    }

    // If the result is an array
    if (Array.isArray(result)) {
      return (
        <div className='space-y-2'>
          {result.length === 0 ? (
            <p className='text-gray-500'>Empty array</p>
          ) : (
            <TaskHistoryList items={result} />
          )}
        </div>
      )
    }

    // If the result is an object
    if (typeof result === 'object') {
      return (
        <div className='space-y-2'>
          <button
            className='text-blue-500 underline'
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Collapse' : 'Expand'} JSON
          </button>
          {expanded && (
            <pre className='bg-gray-100 p-4 rounded-md overflow-auto max-h-96'>
              {JSON.stringify(result, null, 2)}
            </pre>
          )}
        </div>
      )
    }

    // Default case
    return <p>{String(result)}</p>
  }

  return (
    <div className='w-full bg-white rounded-md p-4 shadow-sm'>
      {renderResult()}
    </div>
  )
}
