"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Message } from './columns'

interface MessageInputProps {
  onSendMessage: (message: Omit<Message, 'id'>) => void
  userId: string
  userName: string
  userAvatar: string
}

export function MessageInput({ onSendMessage, userId, userName, userAvatar }: MessageInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage({
        content: message,
        userId,
        userName,
        userAvatar,
        timePosted: Date.now()
      })
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <Input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit">Send</Button>
    </form>
  )
}

