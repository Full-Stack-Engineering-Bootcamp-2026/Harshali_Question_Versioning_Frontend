import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
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

import { loginApi } from "../api/authApi"

import { setAuth } from "../authSlice"

import { Eye, EyeOff } from "lucide-react"

import { useState } from "react"

const loginSchema = z.object({
  email: z.email("Enter valid email"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password cant exceed 64 characters")
    .regex(/[A-Z]/, "Password must contain uppercase letter")
    .regex(/[a-z]/, "Password must contain lowercase letter")
    .regex(/[0-9]/, "Password must contain number")
    .regex(/[^A-Za-z0-9]/, "Password must contain special character"),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginApi(data)
      //for nested response
      const authData = response.data.data
      const user = authData.user
      dispatch(
        setAuth({
          token: authData.accessToken,
          user: authData.user,
        })
      )

      if (authData.user.mustChangePassword) {
        toast.warning("Password reset required")
        navigate("/force-reset-password")
      } else {
        toast.success("Login successful")
        if (user.role === "ADMIN") {
          navigate("/admin/dashboard")
          return
        }

        if (user.role === "STAFF") {
          navigate("/staff/dashboard")
          return
        }

        if (user.role === "MEMBER") {
          navigate("/dashboard/member")
          return
        }
      }
    } catch (error) {
      console.log(error)

      toast.error("Invalid email or password")
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

        {/*Main card*/}
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">Welcome Back</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Please enter your details to sign in
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>

                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          className="h-11"
                          {...field}
                        />
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
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>

                        <Link
                          to="/forgot-password"
                          className="text-sm text-green-700 hover:underline"
                        >
                          Forgot Password?
                        </Link>
                      </div>

                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            className="h-11 pr-10"
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

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="h-11 w-full">
                  Login
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                Dont have an account?
              </span>{" "}
              <Link
                to="/register"
                className="font-medium text-green-700 hover:underline"
              >
                Register
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
