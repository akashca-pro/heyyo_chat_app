import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const PrimaryButton = ({
  children,
  isLoading = false,
  className,
  type = "submit",
  onClick,
  disabled,
  variant = "default",
}) => {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
      <Button
        type={type}
        className={cn("w-full", className)}
        disabled={isLoading || disabled}
        onClick={onClick}
        variant={variant}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          children
        )}
      </Button>
    </motion.div>
  )
}

export default PrimaryButton
