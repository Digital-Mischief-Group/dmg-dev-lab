'use client'

import React from 'react'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({content}: MarkdownRendererProps) {
  // This is a simple implementation; for a real app, you'd use a library like react-markdown
  const formattedContent = content
    // Handle code blocks
    .replace(
      /```([a-z]*)\n([\s\S]*?)```/g,
      '<pre class="p-2 rounded bg-gray-100 dark:bg-gray-900 text-sm overflow-x-auto my-2 font-mono">$2</pre>'
    )
    // Handle inline code
    .replace(
      /`([^`]+)`/g,
      '<code class="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-900 text-sm font-mono">$1</code>'
    )
    // Handle headings
    .replace(
      /^### (.*$)/gm,
      '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>'
    )
    .replace(
      /^## (.*$)/gm,
      '<h2 class="text-xl font-semibold mt-5 mb-2">$1</h2>'
    )
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>')
    // Handle lists
    .replace(/^\s*-\s(.*)/gm, '<li class="ml-4">$1</li>')
    // Handle bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Handle italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Handle links
    .replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" target="_blank" class="text-blue-600 hover:underline">$1</a>'
    )
    // Handle line breaks
    .replace(/\n/g, '<br />')

  return (
    <div
      className='prose dark:prose-invert prose-sm max-w-none w-full prose-pre:my-2 prose-pre:p-2 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900'
      dangerouslySetInnerHTML={{__html: formattedContent}}
    />
  )
}
