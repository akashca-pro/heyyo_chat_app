import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import ChatCard from "./ChatCard"

const ChatList = ({ chats, selectedChatId, onSelectChat }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search chats"
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <ChatCard
              key={chat.id}
              chat={chat}
              isSelected={chat.id === selectedChatId}
              onClick={() => onSelectChat(chat)}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">No chats found</div>
        )}
      </div>
    </div>
  )
}

export default ChatList
