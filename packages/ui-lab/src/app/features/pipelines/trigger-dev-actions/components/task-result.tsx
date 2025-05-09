'use client'

import {useEffect, useState} from 'react'
import {useTask} from '../../ai-agents-sandbox/lib/task-context'
import TaskResultVisualizer from './task-result-visualizer'

interface TaskResultProps {
  taskId: string
}

export default function TaskResult({taskId}: TaskResultProps) {
  const {getTask} = useTask()
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true)
        setError(null)
        const task = await getTask(taskId)
        setResult(task.result)
      } catch (err) {
        setError('Failed to load task result')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (taskId) {
      fetchTask()
    }
  }, [taskId, getTask])

  if (loading) {
    return (
      <div className='flex justify-center items-center p-4'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    )
  }

  if (error) {
    return <div className='p-4 bg-red-100 text-red-800 rounded-md'>{error}</div>
  }

  if (!result) {
    return (
      <div className='p-4 bg-yellow-100 text-yellow-800 rounded-md'>
        Task is still processing or has no result...
      </div>
    )
  }

  return <TaskResultVisualizer result={result} />
}
