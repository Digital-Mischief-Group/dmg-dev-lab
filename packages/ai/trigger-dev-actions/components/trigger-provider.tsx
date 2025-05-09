'use client'

import {createContext, useContext, useState, ReactNode} from 'react'
import {v4 as uuidv4} from 'uuid'

interface Task {
  id: string
  input: string
  result: any
  timestamp: number
}

interface TaskContextType {
  tasks: Task[]
  submitTask: (input: string) => Promise<string>
  getTask: (id: string) => Promise<Task>
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function useTask() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider')
  }
  return context
}

interface TaskProviderProps {
  children: ReactNode
}

export function TaskProvider({children}: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([])

  const submitTask = async (input: string): Promise<string> => {
    const taskId = uuidv4()

    // Create a new task with a pending result
    const newTask: Task = {
      id: taskId,
      input,
      result: null,
      timestamp: Date.now(),
    }

    setTasks((prevTasks) => [newTask, ...prevTasks])

    // Simulate an API call or processing time
    setTimeout(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? {...task, result: `Processed result for: ${input}`}
            : task
        )
      )
    }, 2000)

    return taskId
  }

  const getTask = async (id: string): Promise<Task> => {
    return new Promise((resolve, reject) => {
      const task = tasks.find((t) => t.id === id)
      if (task) {
        resolve(task)
      } else {
        reject(new Error(`Task with ID ${id} not found`))
      }
    })
  }

  const value = {
    tasks,
    submitTask,
    getTask,
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
