import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const AuthLayout = ({ children, title = "Welcome to Heyyo" , 
  description, 
  footer }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg border-gray-200">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-2">
            <img src="/heyyo_logo.svg" alt="Chat Icon" className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-bold">Heyyo Chat </CardTitle>
            <p className="text-base font-medium text-muted-foreground">{title}</p>
            <CardDescription className="text-center">{description}</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
          {footer && <CardFooter className="flex justify-center border-t pt-4">{footer}</CardFooter>}
        </Card>
      </motion.div>
    </div>
  )
}

export default AuthLayout
