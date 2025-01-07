"use client"

import { useState, useEffect } from 'react'
import { DirectMessageTable } from '@/components/messages/direct-message-table'
import { mockDirectMessages, users } from '@/lib/mock-data'
import { Message } from '@/components/messages/columns'
import { User } from '@/components/sidebar'

export default function DirectMessagePage({ params }: { params: { id: string } }) {
  const [otherUser, setOtherUser] = useState<User | null>(null)
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    // In a real app, you'd fetch the user and messages from an API
    const fetchedUser = users.find(user => user.id === params.id) || null
    const fetchedMessages = mockDirectMessages[params.id] || []
    
    setOtherUser(fetchedUser)
    setMessages(fetchedMessages)
  }, [params.id])

  if (!otherUser) {
    return <div>Loading...</div>
  }

  const handleSendMessage = (newMessage: Omit<Message, 'id'>) => {
    const messageWithId: Message = {
      ...newMessage,
      id: Date.now().toString(), // Use timestamp as a simple unique id
    }
    setMessages(prevMessages => [...prevMessages, messageWithId])
  }

  return (
    <div className="max-w-6xl mx-auto">
      <DirectMessageTable 
        data={messages} 
        otherUserName={otherUser.name} 
        onSendMessage={handleSendMessage}
      />
    </div>
  )
}

