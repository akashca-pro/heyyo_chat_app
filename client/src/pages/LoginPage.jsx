import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Lock } from "lucide-react"

import AuthLayout from "@/components/Auth/AuthLayout"
import AuthInput from "@/components/Auth/AuthInput"
import PrimaryButton from "@/components/Auth/PrimaryButton"

import { useAuth } from "@/context/AuthContextApi"

import { loginSchema } from "../lib/validation"

import { useLoginMutation } from '@/services/authSlice.js'
import { toast } from "sonner"

const LoginPage = () => {
  const { login : loginData} = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [login] = useLoginMutation()
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    const toastId = toast.loading('Please wait...')
    try {
      const credentials = {
        email : data.email,
        password : data.password
      }
      const res = await login(credentials).unwrap()
      loginData(res?.data?.userId);
      toast.success('Login success',{id : toastId})
      navigate('/')
    } catch (error) {
      console.error("Login error:", error)
      if(error?.data?.error){
        error?.data?.error?.forEach(err=>toast.error(err?.msg,{duration : 4000,id : toastId}))
      }else{
        
        toast.error('Login Failed',{
          description : `${error?.data?.message}`,
          id : toastId
        })

        form.setError("root", {
          message: `${error?.data?.message}` ||  "Invalid email or password. Please try again.",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const footer = (
    <p className="text-sm text-gray-600">
      Don't have an account?{" "}
      <Link to="/signup" className="text-primary font-medium hover:underline">
        Sign up
      </Link>
    </p>
  )

  return (
    <AuthLayout title="Welcome back" description="Log in to your account to continue" footer={footer}>
      <AnimatePresence mode="wait">
        <motion.div
          key="login-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <AuthInput
                form={form}
                name="email"
                label="Email"
                placeholder="john@example.com"
                type="email"
                icon={Mail}
              />

              <AuthInput
                form={form}
                name="password"
                label="Password"
                placeholder="••••••••"
                type="password"
                icon={Lock}
              />

              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              {form.formState.errors.root && (
                <div className="text-sm font-medium text-destructive">{form.formState.errors.root.message}</div>
              )}

              <div className="pt-2">
                <PrimaryButton isLoading={isLoading}>Log in</PrimaryButton>
              </div>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <PrimaryButton type="button" variant="outline" onClick={() => console.log("Google login")}>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Continue with Google
              </PrimaryButton>
            </form>
          </Form>
        </motion.div>
      </AnimatePresence>
    </AuthLayout>
  )
}

export default LoginPage
