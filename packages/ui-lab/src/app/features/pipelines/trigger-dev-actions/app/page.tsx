import {Alert, AlertTitle, AlertDescription} from '@/components/ui/alert'

import {generateTaskToken} from '../lib/auth'

import {TaskSection} from '../components/task-section'

export default async function TriggerDevActionsPage() {
  let triggerToken: string | null = null
  let error: Error | null = null

  try {
    triggerToken = await generateTaskToken()
  } catch (e) {
    error = e as Error
    console.error('Failed to connect to Trigger.dev:', e)
  }

  if (error) {
    const is404Error = error.message.includes('404')
    const isAuthError =
      error.message.includes('401') || error.message.includes('403')

    return (
      <div className='container mx-auto py-8 space-y-8'>
        <Alert variant='destructive'>
          <AlertTitle>Failed to connect to Trigger.dev</AlertTitle>
          <AlertDescription>
            <div className='mt-2 space-y-4'>
              {is404Error ? (
                <>
                  <p>Could not reach the Trigger.dev API. Please check:</p>
                  <ul className='list-disc list-inside space-y-2'>
                    <li>TRIGGER_API_URL is set correctly in your .env file</li>
                    <li>
                      The API endpoint is accessible from your environment
                    </li>
                    <li>Your network connection is stable</li>
                  </ul>
                </>
              ) : isAuthError ? (
                <>
                  <p>Authentication failed. Please verify:</p>
                  <ul className='list-disc list-inside space-y-2'>
                    <li>TRIGGER_API_KEY is set correctly in your .env file</li>
                    <li>The API key has the proper permissions</li>
                    <li>The API key is active and not expired</li>
                  </ul>
                </>
              ) : (
                <>
                  <p>
                    An unexpected error occurred. Please check your
                    configuration:
                  </p>
                  <ul className='list-disc list-inside space-y-2'>
                    <li>TRIGGER_API_KEY is set</li>
                    <li>TRIGGER_API_URL is set</li>
                    <li>
                      Required environment variables are properly configured
                    </li>
                  </ul>
                  <p className='mt-2 text-sm'>Error details: {error.message}</p>
                </>
              )}
              <p className='text-sm mt-4'>
                Need help? Check the{' '}
                <a
                  href='https://trigger.dev/docs/documentation/getting-started/quickstart'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline'
                >
                  Trigger.dev documentation
                </a>
              </p>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!triggerToken) {
    return (
      <div className='container mx-auto py-8 space-y-8'>
        <Alert>
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>
            Unable to initialize Trigger.dev. Please check your configuration
            and try again.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className='container mx-auto py-8 space-y-8'>
      <TaskSection triggerToken={triggerToken} />
    </div>
  )
}
