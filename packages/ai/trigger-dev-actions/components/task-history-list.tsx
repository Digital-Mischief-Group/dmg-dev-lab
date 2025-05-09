'use client'

import {useState} from 'react'

interface TaskHistoryListProps {
  items: any[]
}

export default function TaskHistoryList({items}: TaskHistoryListProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newExpandedItems = new Set(expandedItems)
    if (expandedItems.has(index)) {
      newExpandedItems.delete(index)
    } else {
      newExpandedItems.add(index)
    }
    setExpandedItems(newExpandedItems)
  }

  const renderListItem = (item: any, index: number) => {
    const isExpanded = expandedItems.has(index)
    const isObject = typeof item === 'object' && item !== null

    return (
      <li key={index} className='border-b last:border-b-0 py-2'>
        <div className='flex justify-between items-center'>
          <span className='font-medium'>
            {isObject
              ? `Item ${index + 1}`
              : typeof item === 'string'
              ? item
              : String(item)}
          </span>
          {isObject && (
            <button
              onClick={() => toggleItem(index)}
              className='text-blue-500 text-sm'
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </button>
          )}
        </div>
        {isObject && isExpanded && (
          <pre className='bg-gray-100 p-2 mt-2 text-sm rounded overflow-auto'>
            {JSON.stringify(item, null, 2)}
          </pre>
        )}
      </li>
    )
  }

  return (
    <ul className='divide-y divide-gray-200 border rounded-md'>
      {items.map(renderListItem)}
    </ul>
  )
}
