import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { c_n } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"

const ChatCard = ({ chat, isSelected, onClick }) => {
  return (
    <Card
      className={c_n(
        "p-3 rounded-none border-x-0 border-t-0 border-b cursor-pointer hover:bg-gray-100 transition-colors",
        isSelected && "bg-gray-100",
      )}
      onClick={onClick}
    >
      <div className="p-3 flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
          <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-sm truncate">{chat.name}</h3>
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(chat.lastMessageTime), { addSuffix: true })}
            </span>
          </div>

          <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
        </div>
      </div>
    </Card>
  )
}

export default ChatCard
