import { useState } from "react"
import { format } from "date-fns"
import { Smile, Check, CheckCheck, MessageCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { c_n } from "@/lib/utils"

const MessageBubble = ({ message, isOwn, size }) => {
  const [showReaction, setShowReaction] = useState(false)

  if (size) {
    return (
      <div className="rounded-full bg-gray-200 p-4 flex items-center justify-center">
        <MessageCircle className={`h-${size / 16} w-${size / 16} text-gray-400`} />
      </div>
    )
  }

  const getStatusIcon = () => {
    switch (message.status) {
      case "sent":
        return <Check className="h-3 w-3 text-gray-400" />
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-gray-400" />
      case "read":
        return <CheckCheck className="h-3 w-3 text-primary" />
      default:
        return null
    }
  }

  return (
    <div
      className={c_n(
        "group relative max-w-[75%] px-4 py-2 shadow",
        isOwn
          ? "ml-auto bg-primary text-white rounded-2xl rounded-br-sm"
          : "bg-white text-black rounded-2xl rounded-bl-sm"
      )}
      onMouseEnter={() => setShowReaction(true)}
      onMouseLeave={() => setShowReaction(false)}
    >
      {showReaction && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={c_n(
                  "absolute -top-3 bg-white rounded-full p-1 shadow-md",
                  isOwn ? "-right-3" : "-left-3"
                )}
              >
                <Smile className="h-4 w-4 text-gray-500" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>React to message</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      <p className="mb-1 break-words">{message.text}</p>

      <div
        className={c_n(
          "flex items-center justify-end text-xs",
          isOwn ? "text-white/80" : "text-gray-500"
        )}
      >
        <span>{format(new Date(message.timestamp), "h:mm a")}</span>
        {isOwn && <span className="ml-1">{getStatusIcon()}</span>}
      </div>
    </div>
  )
}

export default MessageBubble