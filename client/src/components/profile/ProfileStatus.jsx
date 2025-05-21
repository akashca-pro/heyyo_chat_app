import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit2, Save, X } from "lucide-react"

const ProfileStatus = ({ status, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [statusValue, setStatusValue] = useState(status)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setStatusValue(status)
    setIsEditing(false)
  }

  const handleSave = async () => {
    if (statusValue === status) {
      setIsEditing(false)
      return
    }

    setIsUpdating(true)
    const success = await onUpdate(statusValue)
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

  // List of quick status options
  const quickStatuses = [
    "Hey 👋",
    "Available 🟢",
    "Busy 🔴",
    "In a meeting 📅",
    "Working from home 🏠",
    "On vacation 🏝️",
  ]

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-gray-500">Status</Label>

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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <Input
              value={statusValue}
              onChange={(e) => setStatusValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What's on your mind?"
              autoFocus
            />

            <div className="space-y-2">
              <Label className="text-xs text-gray-500">Quick status</Label>
              <div className="flex flex-wrap gap-2">
                {quickStatuses.map((quickStatus) => (
                  <motion.div key={quickStatus} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="sm" className="text-xs" onClick={() => setStatusValue(quickStatus)}>
                      {quickStatus}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={handleCancel} disabled={isUpdating}>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>

              <Button size="sm" onClick={handleSave} disabled={isUpdating || statusValue === status}>
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
          >
            <motion.div
              className="bg-gray-50 p-4 rounded-lg"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <p className="text-lg">{status}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProfileStatus
