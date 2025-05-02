import { useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Info, MessageSquarePlus } from "lucide-react"
import MessageBubble from "./MessageBubble"
import ChatInput from "./ChatInput"
import { motion } from "framer-motion"

const ChatWindow = ({ selectedChat, messages, onSendMessage }) => {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  if (!selectedChat) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 relative">
        <MessageBubble size={64} />
        <p className="mt-4 text-lg">Select a chat to start messaging</p>

        {/* Floating new chat button */}
        <div className="absolute bottom-6 right-6">
          <Button
            className="h-14 w-14 rounded-full shadow-lg"
            size="icon"
            onClick={() => console.log("New chat clicked")}
          >
            <MessageSquarePlus className="h-6 w-6" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full relative">
      {/* Chat header */}
      <div className="p-3 border-b flex items-center justify-between bg-white">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} alt={selectedChat.name} />
            <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-medium">{selectedChat.name}</h2>
            <p className="text-xs text-gray-500">{selectedChat.status}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <Info className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-3">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <MessageBubble message={message} isOwn={message.senderId === "current-user"} />
              </motion.div>
            ))
          ) : (
            <Card className="p-3 text-center text-gray-500 bg-white">No messages yet. Start the conversation!</Card>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      

      {/* Input area */}
      <ChatInput onSendMessage={onSendMessage} />

      {/* Floating new chat button */}
      <div className="absolute bottom-20 right-6">
        <Button
          className="h-14 w-14 rounded-full shadow-lg"
          size="icon"
          onClick={() => console.log("New chat clicked")}
        >
          <MessageSquarePlus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

export default ChatWindow
