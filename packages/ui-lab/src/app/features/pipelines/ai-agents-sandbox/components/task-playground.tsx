'use client'

import {useState} from 'react'
import TaskContainer from './task-container'
import {TaskProvider} from './trigger-provider'

export default function TaskPlayground() {
  const [taskId, setTaskId] = useState<string | null>(null)

  return (
    <TaskProvider>
      <div className='w-full'>
        <TaskContainer taskId={taskId} setTaskId={setTaskId} />
      </div>
    </TaskProvider>
  )
}
