import { getMessages } from '@/actions/messageActions'
import { MessageList } from './MessageList'

export default async function MessagesPage() {
  const messages = await getMessages()
  const unreadCount = messages.filter(m => !m.isRead).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-base-content/70">
            {messages.length} message{messages.length > 1 ? 's' : ''}
            {unreadCount > 0 && (
              <span className="ml-2 badge badge-primary">{unreadCount} non lu{unreadCount > 1 ? 's' : ''}</span>
            )}
          </p>
        </div>
      </div>

      <MessageList messages={messages} />
    </div>
  )
}

