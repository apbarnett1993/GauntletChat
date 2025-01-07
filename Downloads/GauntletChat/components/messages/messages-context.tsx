"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Message } from './columns'
import { getMessages, saveMessages } from '@/lib/mock-data'

type MessagesContextType = {
  messages: Record<string, Message[]>
  addMessage: (channelId: string, message: Message) => void
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined)

export function MessagesProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Record<string, Message[]>>({})

  useEffect(() => {
    setMessages(getMessages())
  }, [])

  const addMessage = (channelId: string, message: Message) => {
    setMessages(prevMessages => {
      const updatedMessages = {
        ...prevMessages,
        [channelId]: [...(prevMessages[channelId] || []), message]
      }
      saveMessages(updatedMessages)
      return updatedMessages
    })
  }

  return (
    <MessagesContext.Provider value={{ messages, addMessage }}>
      {children}
    </MessagesContext.Provider>
  )
}

export function useMessages() {
  const context = useContext(MessagesContext)
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessagesProvider')
  }
  return context
}

