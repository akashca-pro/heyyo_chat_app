import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { useLogoutMutation } from '@/services/authSlice.js'
import { toast } from "sonner"
import { useAuth } from "@/context/AuthContextApi"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  const { logout : removeData } = useAuth() 
  const [logout] = useLogoutMutation()
  const handleLogout = async() => {
      try {
        await logout().unwrap()
        removeData();
        toast.success('Logout success')
      } catch (error) {
        console.log('Logout error',error)
        toast.error('Logout Failed')
      }
  }

  const handleProfile = () =>{
      navigate('/profile')
  }

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between">
      <div className="flex items-center">
      <div className="h-9 w-9 text-primary mr-2">
            <img src="/heyyo_logo.svg" alt="Chat Icon" />
            </div>
        <h1 className="text-xl font-bold text-gray-800">Heyyo</h1>
      </div>

      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/male.jpg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleProfile} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
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
