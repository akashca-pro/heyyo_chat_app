import { useState } from "react"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

const AuthInput = ({ form, name, label, placeholder, type = "text", description, icon: Icon, className }) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev)

  const inputType = type === "password" ? (showPassword ? "text" : "password") : type

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-1", className)}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              {Icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Icon className="h-4 w-4" />
                </div>
              )}
              <Input
                placeholder={placeholder}
                type={inputType}
                className={cn(Icon ? "pl-9" : "", type === "password" ? "pr-9" : "")}
                {...field}
              />
              {type === "password" && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default AuthInput
