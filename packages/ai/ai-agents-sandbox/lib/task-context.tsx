'use client'

import {createContext, useContext, ReactNode} from 'react'

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

export {TaskContext}
export type {Task, TaskContextType}
