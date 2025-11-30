'use client'

import { useTransition } from 'react'
import { Mail, MailOpen, Trash2, Phone, AtSign, CheckCheck } from 'lucide-react'
import { markMessageAsRead, markAllMessagesAsRead, deleteMessage } from '@/actions/messageActions'
import type { Message } from '@/types'

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  const [isPending, startTransition] = useTransition()

  const handleMarkAsRead = (id: string) => {
    startTransition(async () => {
      await markMessageAsRead(id)
    })
  }

  const handleMarkAllAsRead = () => {
    startTransition(async () => {
      await markAllMessagesAsRead()
    })
  }

  const handleDelete = (id: string) => {
    if (confirm('Supprimer ce message ?')) {
      startTransition(async () => {
        await deleteMessage(id)
      })
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }

  const isEmail = (contact: string) => contact.includes('@')
  const unreadCount = messages.filter(m => !m.isRead).length

  if (messages.length === 0) {
    return (
      <div className="card bg-base-100 p-12 text-center">
        <Mail className="w-16 h-16 text-base-content/20 mx-auto mb-4" />
        <p className="text-base-content/70">Aucun message reçu</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {unreadCount > 0 && (
        <div className="flex justify-end">
          <button
            onClick={handleMarkAllAsRead}
            disabled={isPending}
            className="btn btn-ghost btn-sm gap-2"
          >
            <CheckCheck className="w-4 h-4" />
            Tout marquer comme lu
          </button>
        </div>
      )}

      {messages.map((message) => (
        <div
          key={message.id}
          className={`card bg-base-100 shadow-sm ${!message.isRead ? 'border-l-4 border-primary' : ''}`}
        >
          <div className="card-body p-4">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.isRead ? 'bg-base-200' : 'bg-primary/10'
              }`}>
                {message.isRead ? (
                  <MailOpen className="w-5 h-5 text-base-content/50" />
                ) : (
                  <Mail className="w-5 h-5 text-primary" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{message.name}</span>
                  {!message.isRead && (
                    <span className="badge badge-primary badge-xs">Nouveau</span>
                  )}
                </div>
                
                <p className="text-base-content/70 mb-3">{message.message}</p>
                
                <div className="flex items-center gap-4 text-sm">
                  <a
                    href={isEmail(message.contact) ? `mailto:${message.contact}` : `tel:${message.contact}`}
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    {isEmail(message.contact) ? (
                      <AtSign className="w-4 h-4" />
                    ) : (
                      <Phone className="w-4 h-4" />
                    )}
                    {message.contact}
                  </a>
                  <span className="text-base-content/50">{formatDate(message.createdAt)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-1">
                {!message.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(message.id)}
                    disabled={isPending}
                    className="btn btn-ghost btn-sm"
                    title="Marquer comme lu"
                  >
                    <MailOpen className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(message.id)}
                  disabled={isPending}
                  className="btn btn-ghost btn-sm text-error"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

