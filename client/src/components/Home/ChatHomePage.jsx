import { useState, useEffect } from "react"
import Navbar from "./Navbar"
import ChatList from "./ChatList"
import ChatWindow from "./ChatWindow"
import { placeholderChats, placeholderMessages } from "@/lib/placeholder-data"

const ChatHomePage = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState(placeholderMessages)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Handle window resize to detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


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
  
    const handleBack = () => {
    setSelectedChat(null);
    setMessages(null);
  };


  return (
    <div className="flex flex-col h-screen bg-gray-50 ">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className={`w-full md:w-1/3 ${isMobile && selectedChat ? "hidden" : "block"} border-r border-gray-200`}>
          <ChatList chats={placeholderChats} selectedChatId={selectedChat?.id} onSelectChat={handleSelectChat} />
        </div>
    {/* Show ChatWindow on mobile when a chat is selected, or always on medium+ */}
        <div
          className={`w-full md:w-2/3 ${isMobile && !selectedChat ? "hidden" : "block"}`}
        >
          {selectedChat ? (
            <ChatWindow
              selectedChat={selectedChat}
            messages={messages.filter(
              (msg) => selectedChat && (msg.senderId === selectedChat.id || msg.senderId === "current-user"),
            )}
              onSendMessage={handleSendMessage}
              onBack={isMobile ? handleBack : undefined} // Pass back handler only on mobile
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatHomePage
