import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit2, Save, X } from "lucide-react"

const ProfileName = ({ name, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [nameValue, setNameValue] = useState(name)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setNameValue(name)
    setIsEditing(false)
  }

  const handleSave = async () => {
    if (nameValue.trim() === "") return
    if (nameValue === name) {
      setIsEditing(false)
      return
    }

    setIsUpdating(true)
    const success = await onUpdate(nameValue)
    setIsUpdating(false)

    if (success) {
      setIsEditing(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-gray-500">Name</Label>

        {!isEditing && (
          <Button variant="ghost" size="sm" onClick={handleEdit}>
            <Edit2 className="h-4 w-4 mr-1" />
            <span className="text-xs">Edit</span>
          </Button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            key="editing"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-2"
          >
            <Input
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your name"
              autoFocus
            />

            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={handleCancel} disabled={isUpdating}>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>

              <Button
                size="sm"
                onClick={handleSave}
                disabled={isUpdating || nameValue.trim() === "" || nameValue === name}
              >
                {isUpdating ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="mr-1"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray="30 60"
                      />
                    </svg>
                  </motion.div>
                ) : (
                  <Save className="h-4 w-4 mr-1" />
                )}
                Save
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="display"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center"
          >
            <h2 className="text-2xl font-bold">{name}</h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProfileName
