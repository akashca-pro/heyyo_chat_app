import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Camera, Upload, X } from "lucide-react"

const ProfilePicture = ({ avatar, onUpdate }) => {
  const [dragActive, setDragActive] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e) => {
    e.preventDefault()

    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file) => {
    // Check if file is an image
    if (!file.type.match("image.*")) {
      alert("Please select an image file")
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewImage(e.target.result)
    }
    reader.readAsDataURL(file)

    // In a real app, you would upload the file to your server here
    // For this example, we'll just simulate an upload
    simulateUpload(file)
  }

  const simulateUpload = async (file) => {
    setIsUploading(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would get the URL from your server response
      const uploadedImageUrl = previewImage

      // Update the parent component
      await onUpdate(uploadedImageUrl)

      // Reset the preview
      setPreviewImage(null)
    } catch (error) {
      console.error("Upload error:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const cancelPreview = () => {
    setPreviewImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
        <Avatar className="h-40 w-40 border-4 border-primary/20">
          <AvatarImage src={previewImage || avatar} alt="Profile" />
          <AvatarFallback className="text-4xl">{avatar ? avatar.charAt(0).toUpperCase() : "U"}</AvatarFallback>
        </Avatar>

        <motion.div
          className="absolute -bottom-2 -right-2 rounded-full bg-primary p-2 text-white shadow-lg cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera className="h-5 w-5" />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full"
          >
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <span className="text-sm font-medium">Preview</span>
                <Button variant="ghost" size="icon" onClick={cancelPreview} disabled={isUploading}>
                  <X className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Card
        className={`w-full border-2 border-dashed transition-colors ${
          dragActive ? "border-primary bg-primary/5" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="p-4 flex flex-col items-center justify-center space-y-2 text-center">
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
          <Label htmlFor="profile-picture" className="font-medium cursor-pointer">
            {dragActive ? "Drop image here" : "Upload new picture"}
          </Label>
          <p className="text-xs text-gray-500">Drag and drop or click to browse</p>
          <input
            ref={fileInputRef}
            id="profile-picture"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
            disabled={isUploading}
          />

          {isUploading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full mt-2">
              <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5 }}
                />
              </div>
              <p className="text-xs text-center mt-1">Uploading...</p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilePicture
