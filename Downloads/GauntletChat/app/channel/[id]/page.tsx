"use client"

import { useState, useEffect } from 'react'
import { MessageTable } from '@/components/messages/message-table'
import { initialChannels } from '@/lib/mock-data'
import { Message } from '@/components/messages/columns'
import { Channel } from '@/components/sidebar'
import { useMessages } from '@/components/messages/messages-context'

export default function ChannelPage({ params }: { params: { id: string } }) {
  const [channel, setChannel] = useState<Channel | null>(null)
  const { messages, addMessage } = useMessages()

  useEffect(() => {
    const fetchedChannel = initialChannels.find(c => c.id === params.id) || { id: params.id, name: `Unknown Channel` }
    setChannel(fetchedChannel)
  }, [params.id])

  if (!channel) {
    return <div>Loading...</div>
  }

  const handleSendMessage = (newMessage: Omit<Message, 'id'>) => {
    const messageWithId: Message = {
      ...newMessage,
      id: Date.now().toString(), // Use timestamp as a simple unique id
    }
    addMessage(channel.id, messageWithId)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <MessageTable 
        data={messages[channel.id] || []}
        channelName={channel.name} 
        onSendMessage={handleSendMessage}
      />
    </div>
  )
}

