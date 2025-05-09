'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {nord} from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import {formatMarkdownContent} from '@/lib/utils'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({content, className}: MarkdownRendererProps) {
  const formattedContent = formatMarkdownContent(content)

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                {...props}
                style={nord}
                language={match[1]}
                PreTag='div'
                className='rounded-md my-4'
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code
                className='bg-muted px-1.5 py-0.5 rounded text-sm font-mono'
                {...props}
              >
                {children}
              </code>
            )
          },
          p({node, className, children, ...props}) {
            return (
              <p className='mb-4 leading-7' {...props}>
                {children}
              </p>
            )
          },
          h1({node, className, children, ...props}) {
            return (
              <h1 className='text-3xl font-bold mt-6 mb-4' {...props}>
                {children}
              </h1>
            )
          },
          h2({node, className, children, ...props}) {
            return (
              <h2 className='text-2xl font-bold mt-5 mb-3' {...props}>
                {children}
              </h2>
            )
          },
          h3({node, className, children, ...props}) {
            return (
              <h3 className='text-xl font-bold mt-4 mb-2' {...props}>
                {children}
              </h3>
            )
          },
          ol({node, className, children, ...props}) {
            return (
              <ol className='list-decimal pl-8 mb-4 space-y-1' {...props}>
                {children}
              </ol>
            )
          },
          ul({node, className, children, ...props}) {
            return (
              <ul className='list-disc pl-8 mb-4 space-y-1' {...props}>
                {children}
              </ul>
            )
          },
          li({node, className, children, ...props}) {
            return (
              <li className='mb-1' {...props}>
                {children}
              </li>
            )
          },
          table({node, className, children, ...props}) {
            return (
              <div className='overflow-auto max-w-full my-4'>
                <table
                  className='border-collapse border border-border w-full'
                  {...props}
                >
                  {children}
                </table>
              </div>
            )
          },
          thead({node, className, children, ...props}) {
            return (
              <thead className='bg-muted' {...props}>
                {children}
              </thead>
            )
          },
          tbody({node, className, children, ...props}) {
            return <tbody {...props}>{children}</tbody>
          },
          tr({node, className, children, ...props}) {
            return (
              <tr className='border-b border-border' {...props}>
                {children}
              </tr>
            )
          },
          th({node, className, children, ...props}) {
            return (
              <th
                className='border border-border p-2 text-left font-medium'
                {...props}
              >
                {children}
              </th>
            )
          },
          td({node, className, children, ...props}) {
            return (
              <td className='border border-border p-2' {...props}>
                {children}
              </td>
            )
          },
          blockquote({node, className, children, ...props}) {
            return (
              <blockquote
                className='border-l-4 border-primary pl-4 py-1 italic my-4 text-muted-foreground'
                {...props}
              >
                {children}
              </blockquote>
            )
          },
          a({node, className, children, ...props}) {
            return (
              <a
                className='text-primary underline hover:text-primary/80 transition-colors'
                target='_blank'
                rel='noopener noreferrer'
                {...props}
              >
                {children}
              </a>
            )
          },
          pre({node, className, children, ...props}) {
            return (
              <pre
                className='overflow-auto rounded-md bg-muted p-4 my-4'
                {...props}
              >
                {children}
              </pre>
            )
          },
          img({node, className, ...props}) {
            return (
              <img
                className='max-w-full rounded-md my-4 mx-auto'
                alt={props.alt || 'Image'}
                {...props}
              />
            )
          },
        }}
      >
        {formattedContent}
      </ReactMarkdown>
    </div>
  )
}

// Memoized version for better performance
export const MemoizedReactMarkdown = React.memo(MarkdownRenderer)
