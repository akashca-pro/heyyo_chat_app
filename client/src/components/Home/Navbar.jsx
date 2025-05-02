import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, LogOut, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const Navbar = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <MessageCircle className="h-6 w-6 text-primary mr-2" />
        <h1 className="text-xl font-bold text-gray-800">ChatApp</h1>
      </div>

      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Navbar
