import { useState } from "react"
import Navbar from "./Navbar"
import ChatList from "./ChatList"
import ChatWindow from "./ChatWindow"
import { placeholderChats, placeholderMessages } from "@/lib/placeholder-data"

const ChatHomePage = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState(placeholderMessages)

  const handleSelectChat = (chat) => {
    setSelectedChat(chat)
  }

  const handleSendMessage = (text) => {
    if (!text.trim() || !selectedChat) return

    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: "current-user",
      text,
      timestamp: new Date().toISOString(),
      status: "sent",
    }

    setMessages((prevMessages) => [...prevMessages, newMessage])
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 ">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-full md:w-1/3 border-r border-gray-200">
          <ChatList chats={placeholderChats} selectedChatId={selectedChat?.id} onSelectChat={handleSelectChat} />
        </div>
        <div className="hidden md:block md:w-2/3">
          <ChatWindow
            selectedChat={selectedChat}
            messages={messages.filter(
              (msg) => selectedChat && (msg.senderId === selectedChat.id || msg.senderId === "current-user"),
            )}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  )
}

export default ChatHomePage
