import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import ProfilePicture from "@/components/profile/ProfilePicture"
import ProfileName from "./ProfileName"
import ProfileStatus from "./ProfileStatus"
import Navbar from "../Home/Navbar"

const ProfilePage = ({ initialUser = {} }) => {
  const [user, setUser] = useState({
    name: initialUser.name || "Mark",
    status: initialUser.status || "Hey 👋",
    avatar: initialUser.avatar || "/male.jpg",
  })

  const updateUser = async (field, value) => {
    try {
      // Simulate API call to update user data
      await new Promise((resolve) => setTimeout(resolve, 500))

      setUser((prev) => ({ ...prev, [field]: value }))


      // In a real app, you would make an API call here
      // await fetch('/api/user/profile', {
      //   method: 'PATCH',
      //   body: JSON.stringify({ [field]: value }),
      //   headers: { 'Content-Type': 'application/json' }
      // })

      return true
    } catch (error) {
      console.error(`Error updating ${field}:`, error)

      return false
    }
  }

  return (
    <>
    <Navbar/>
<div className="md:h-[calc(100vh-64px)] md:flex md:items-center md:justify-center">
<div className="container max-w-4xl py-6 px-4 md:py-0 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold mb-6">Profile Details</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Left column - Profile Picture */}
                  <div className="w-full md:w-1/3">
                    <ProfilePicture avatar={user.avatar} onUpdate={(value) => updateUser("avatar", value)} />
                  </div>

                  {/* Right column - Name and Status */}
                  <div className="w-full md:w-2/3 space-y-6">
                    <ProfileName name={user.name} onUpdate={(value) => updateUser("name", value)} />

                    <Separator />

                    <ProfileStatus status={user.status} onUpdate={(value) => updateUser("status", value)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Account settings will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
    </div>
    </>
  )
}

export default ProfilePage
