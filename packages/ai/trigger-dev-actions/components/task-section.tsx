interface TaskSectionProps {
  title: string
  children: React.ReactNode
}

export default function TaskSection({title, children}: TaskSectionProps) {
  return (
    <div className='bg-white rounded-lg shadow-sm p-4 w-full'>
      <h2 className='text-xl font-semibold mb-3'>{title}</h2>
      <div className='w-full'>{children}</div>
    </div>
  )
}
