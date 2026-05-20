import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form"

import { registerApi } from "../api/authApi"
import { Progress } from "@/components/ui/progress"

const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),

    email: z.email("Enter valid email"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password cant exceed 64 characters")
      .regex(/[A-Z]/, "Password must contain uppercase letter")
      .regex(/[a-z]/, "Password must contain lowercase letter")
      .regex(/[0-9]/, "Password must contain number")
      .regex(/[^A-Za-z0-9]/, "Password must contain special character"),

    confirmPassword: z.string().min(8, "Confirm password is required"),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })
  //watch() from react hook form like live observer instead of onchange
  const password = form.watch("password")
  //.test()=>pattern matching
  const PasswordStrengthFunction = (password: string) => {
    let points = 0

    // Min length
    if (password.length >= 8) points = points + 20

    // Upper case
    if (/[A-Z]/.test(password)) points = points + 20

    // Lower case
    if (/[a-z]/.test(password)) points = points + 20

    // Number
    if (/[0-9]/.test(password)) points = points + 20

    // Special char
    if (/[^A-Za-z0-9]/.test(password)) points = points + 20

    return points
  }

  const strength = PasswordStrengthFunction(password)

  const strengthText =
    strength < 40
      ? "Weak password"
      : strength < 80
        ? "Medium password"
        : "Strong password"

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerApi(data)

      toast.success("Account created successfully")

      navigate("/login")
    } catch (error) {
      console.log(error)

      toast.error("Something went wrong")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md">
        <Card className="rounded-xl border-border bg-card shadow-sm">
          <CardContent className="p-8">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-foreground">VitalLog</h1>

              <p className="mt-2 text-sm text-muted-foreground">
                Empower your health journey today.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>FULL NAME</FormLabel>

                      <FormControl>
                        <div className="relative">
                          <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                          <Input
                            placeholder="John Doe"
                            className="h-12 bg-input pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>EMAIL ADDRESS</FormLabel>

                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                          <Input
                            type="email"
                            placeholder="name@example.com"
                            className="h-12 bg-input pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PASSWORD</FormLabel>

                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            className="h-12 bg-input pr-10 pl-10"
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

                      {/* Password Strength */}
                      <div className="space-y-2">
                        <Progress value={strength} className="h-2" />

                        <div className="flex justify-between text-xs">
                          <span className="text-primary">{strengthText}</span>

                          <span className="text-muted-foreground">
                            {strength}%
                          </span>
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
                      <FormLabel>CONFIRM PASSWORD</FormLabel>

                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            className="h-12 bg-input pr-10 pl-10"
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

                <Button
                  type="submit"
                  className="h-12 w-full text-base font-medium"
                >
                  Create Account
                </Button>
              </form>
            </Form>

            {/* Footer */}
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                Already have an account?
              </span>{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:underline"
              >
                Login
              </Link>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <span>Secured by VitalShield</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
