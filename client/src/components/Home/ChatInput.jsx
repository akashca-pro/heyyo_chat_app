import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Smile, Send, Paperclip, Mic } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const EMOJI_LIST = ["😊", "😂", "❤️", "👍", "🙏", "😍", "🔥", "👏", "🎉", "🤔"]

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const insertEmoji = (emoji) => {
    setMessage((prev) => prev + emoji)
  }

  return (
    <div className="p-3 border-t bg-white flex items-center space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
            <Smile className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-2">
          <div className="grid grid-cols-5 gap-2">
            {EMOJI_LIST.map((emoji) => (
              <Button key={emoji} variant="ghost" className="h-8 w-8 p-0" onClick={() => insertEmoji(emoji)}>
                {emoji}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
        <Paperclip className="h-5 w-5" />
      </Button>

      <Input
        placeholder="Type a message"
        className="flex-1"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {message.trim() ? (
        <Button variant="primary" size="icon" className="rounded-full" onClick={handleSend}>
          <Send className="h-4 w-4" />
        </Button>
      ) : (
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
          <Mic className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}

export default ChatInput
