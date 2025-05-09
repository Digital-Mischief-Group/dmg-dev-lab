import {PromptEditor} from '../components/prompt-editor'

export default function Home() {
  return (
    <div className='container mx-auto py-8 px-4'>
      <h1 className='text-3xl font-bold mb-8 text-center'>
        Quickbooks Oracle Few Shot Prompt
      </h1>
      <div className='grid gap-6'>
        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md'>
          <PromptEditor />
        </div>
      </div>
    </div>
  )
}
