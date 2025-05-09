'use client'

import {useState} from 'react'
import TaskResult from './task-result'
import TaskSection from './task-section'
import {useTask} from '../../ai-agents-sandbox/lib/task-context'

interface TaskContainerProps {
  taskId: string | null
  setTaskId: (id: string | null) => void
}

export default function TaskContainer({taskId, setTaskId}: TaskContainerProps) {
  const {submitTask, tasks} = useTask()
  const [input, setInput] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newTaskId = await submitTask(input)
    setTaskId(newTaskId)
    setInput('')
  }

  return (
    <div className='flex flex-col space-y-4 w-full'>
      <TaskSection title='New Task'>
        <form onSubmit={handleSubmit} className='w-full'>
          <div className='flex items-center space-x-2'>
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Enter your task...'
              className='flex-1 p-2 border rounded-md'
            />
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded-md'
            >
              Submit
            </button>
          </div>
        </form>
      </TaskSection>

      {taskId && (
        <TaskSection title='Current Task'>
          <TaskResult taskId={taskId} />
        </TaskSection>
      )}

      <TaskSection title='Task History'>
        {tasks.length > 0 ? (
          <div className='space-y-2'>
            {tasks.map((task) => (
              <div
                key={task.id}
                className='p-2 border rounded cursor-pointer hover:bg-gray-100'
                onClick={() => setTaskId(task.id)}
              >
                {task.input}
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-500'>No tasks yet</p>
        )}
      </TaskSection>
    </div>
  )
}
