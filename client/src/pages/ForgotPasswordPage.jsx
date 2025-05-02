import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, ArrowLeft } from "lucide-react"

import AuthLayout from "@/components/Auth/AuthLayout"
import AuthInput from "@/components/Auth/AuthInput"
import PrimaryButton from "@/components/Auth/PrimaryButton"
import { forgotPasswordSchema, otpSchema } from "../lib/validation"
import { Input } from "@/components/ui/input"

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState("email") // email, otp

  const emailForm = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  })

  const onSubmitEmail = async (data) => {
    setIsLoading(true)
    try {
      // Simulate API call
      console.log("Forgot password data:", data)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStep("otp")
    } catch (error) {
      console.error("Forgot password error:", error)
      emailForm.setError("root", {
        message: "There was a problem sending the reset email. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmitOtp = async (data) => {
    setIsLoading(true)
    try {
      // Simulate API call
      console.log("OTP data:", data)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // Navigate to reset password page or show success
      alert("Password reset successful!")
    } catch (error) {
      console.error("OTP verification error:", error)
      otpForm.setError("root", {
        message: "Invalid OTP. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const footer = (
    <p className="text-sm text-gray-600">
      <Link to="/login" className="text-primary font-medium hover:underline flex items-center">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to login
      </Link>
    </p>
  )

  return (
    <AuthLayout
      title="Forgot Password"
      description={
        step === "email"
          ? "Enter your email to receive a password reset code"
          : "Enter the 6-digit code sent to your email"
      }
      footer={footer}
    >
      <AnimatePresence mode="wait">
        {step === "email" ? (
          <motion.div
            key="email-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(onSubmitEmail)} className="space-y-4">
                <AuthInput
                  form={emailForm}
                  name="email"
                  label="Email"
                  placeholder="john@example.com"
                  type="email"
                  icon={Mail}
                />

                {emailForm.formState.errors.root && (
                  <div className="text-sm font-medium text-destructive">{emailForm.formState.errors.root.message}</div>
                )}

                <div className="pt-2">
                  <PrimaryButton isLoading={isLoading}>Send Reset Code</PrimaryButton>
                </div>
              </form>
            </Form>
          </motion.div>
        ) : (
          <motion.div
            key="otp-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(onSubmitOtp)} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="otp" className="text-sm font-medium">
                    Verification Code
                  </label>
                  <div className="flex justify-center">
                    <Input
                      id="otp"
                      placeholder="123456"
                      className="text-center text-lg tracking-widest max-w-[200px]"
                      maxLength={6}
                      {...otpForm.register("otp")}
                    />
                  </div>
                  {otpForm.formState.errors.otp && (
                    <p className="text-sm font-medium text-destructive text-center">
                      {otpForm.formState.errors.otp.message}
                    </p>
                  )}
                </div>

                {otpForm.formState.errors.root && (
                  <div className="text-sm font-medium text-destructive">{otpForm.formState.errors.root.message}</div>
                )}

                <div className="pt-2">
                  <PrimaryButton isLoading={isLoading}>Verify Code</PrimaryButton>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("email")
                      otpForm.reset()
                    }}
                    className="text-sm text-primary hover:underline"
                  >
                    Didn't receive a code? Send again
                  </button>
                </div>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  )
}

export default ForgotPasswordPage
