'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

export default function MessageInput() {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Auto-resize the textarea based on its content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '60px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [message]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle cmd+d for dictate
    if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
      e.preventDefault();
      console.log('Dictate activated');
      // Add dictation functionality here
    }

    // Handle cmd+o for speak
    if ((e.metaKey || e.ctrlKey) && e.key === 'o') {
      e.preventDefault();
      console.log('Speak activated');
      // Add speech functionality here
    }
  };

  return (
    <motion.form
      className="message-input-form home-message-input absolute right-0 bottom-0 left-0 z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="message-input-container home-message-input-container mx-auto max-w-4xl px-4 pb-8">
        <div
          className={`message-input-middle mirror-container relative border-white/10 border-t bg-transparent backdrop-blur-sm ${isFocused ? 'focused' : ''}`}
        >
          <textarea
            ref={textareaRef}
            className={`message-textarea w-full bg-transparent px-6 py-4 text-white focus:outline-none ${message ? '' : 'empty'}`}
            placeholder="  Ask Ocean..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{ height: '60px' }}
          />
          <div className="mirror-text pointer-events-none absolute top-0 right-0 bottom-0 left-0 opacity-0">
            <span className="cursor-char-wrapper">
              <span className="cursor-block"> </span>
            </span>
          </div>
        </div>

        <div className="message-input-action-buttons -translate-y-1/2 absolute top-1/2 right-6 transform">
          <div className="action-buttons flex items-center">
            <button type="button" className="mr-[8px]">
              <Image
                src="/assets/mobile-dictate-button.svg"
                alt="dictate button"
                width={32}
                height={32}
                className="mr-[8px]"
              />
            </button>
            <button type="button" className={message ? 'hidden' : 'block'}>
              <Image
                src="/assets/mobile-speak-button.svg"
                alt="speak button"
                width={32}
                height={32}
              />
            </button>
            <button type="submit" className={message ? 'block' : 'hidden'}>
              <Image
                src="/assets/mobile-send-button.svg"
                alt="send button"
                width={32}
                height={32}
              />
            </button>
          </div>
        </div>

        <div className="below-backdrop pointer-events-none absolute bottom-[56px] left-0 hidden h-12 w-full overflow-hidden md:block">
          <Image
            src="/assets/below-backdrop.png"
            alt="Backdrop"
            width={300}
            height={100}
            className="below-backdrop desktop opacity-0 transition-opacity duration-300"
          />
        </div>

        <div className="shortcut-line mt-2 mb-1 h-px w-full bg-white/10"></div>

        <div className="shortcut-info flex items-center justify-center">
          <div className="shortcut-block flex items-center space-x-4">
            <div className="shortcut-keys flex">
              <span className="key mr-1 rounded bg-white/20 px-2 py-0.5 text-xs">
                ⌘
              </span>
              <span className="key rounded bg-white/20 px-2 py-0.5 text-xs">
                D
              </span>
            </div>
            <span className="shortcut-title text-white/70 text-xs">
              TO DICTATE
            </span>

            <div className="shortcut-keys ml-4 flex">
              <span className="key mr-1 rounded bg-white/20 px-2 py-0.5 text-xs">
                ⌘
              </span>
              <span className="key rounded bg-white/20 px-2 py-0.5 text-xs">
                O
              </span>
            </div>
            <span className="shortcut-title text-white/70 text-xs">
              TO SPEAK
            </span>
          </div>
        </div>
      </div>
    </motion.form>
  );
}
