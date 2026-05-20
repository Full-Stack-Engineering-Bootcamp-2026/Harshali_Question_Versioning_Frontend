import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { resetPasswordApi } from "../api/authApi"

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain uppercase letter")
      .regex(/[^A-Za-z0-9]/, "Password must contain symbol"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const resetToken = searchParams.get("token")

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const password = form.watch("password")

  const getStrength = () => {
    let points = 0

    if (password.length >= 8) points += 25
    if (/[A-Z]/.test(password)) points += 25
    if (/[^A-Za-z0-9]/.test(password)) points += 25
    if (/[0-9]/.test(password)) points += 25

    return Math.min(points, 100)
  }

  const strength = getStrength()

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!resetToken) {
      toast.error("Reset token missing")
      return
    }

    try {
      await resetPasswordApi({
        resetToken,
        password: data.password,
        confirmPassword: data.confirmPassword,
      })

      toast.success("Password reset successfully")
    } catch (error) {
      console.log(error)
      toast.error("Failed to reset password")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-700 sm:text-4xl">
            VitalLog
          </h1>

          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Active Calm Health Companion
          </p>
        </div>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">Reset Password</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Please choose a strong password to secure your health data.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>

                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            className="h-11 pr-10"
                            placeholder="Enter new password"
                            {...field}
                          />

                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </FormControl>

                      <div className="mt-2">
                        <div className="flex justify-between text-xs font-medium text-green-700">
                          <span>
                            Password Strength:{" "}
                            {strength >= 80
                              ? "Strong"
                              : strength >= 50
                                ? "Medium"
                                : "Weak"}
                          </span>
                          <span>{strength}%</span>
                        </div>

                        <div className="mt-1 h-1.5 rounded-full bg-muted">
                          <div
                            className="h-1.5 rounded-full bg-green-600"
                            style={{ width: `${strength}%` }}
                          />
                        </div>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>

                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            className="h-11 pr-10"
                            placeholder="Confirm new password"
                            {...field}
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
                    8+ Characters
                  </span>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
                    Uppercase & Symbol
                  </span>
                </div>

                <Button
                  type="submit"
                  className="h-11 w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? "Resetting..."
                    : "Reset Password"}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm">
              <Link
                to="/login"
                className="font-medium text-green-700 hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
