import { Link } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"

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

import { forgotPasswordApi } from "../api/authApi"

const forgotPasswordSchema = z.object({
  email: z.string().email("Enter valid email"),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPasswordApi(data)
      toast.success("Password reset email sent")
    } catch (error) {
      console.log(error)
      toast.error("Failed to send reset email")
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
              <h2 className="text-2xl font-semibold">Forgot Password</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Enter your email to receive a reset password link
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
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

                <Button
                  type="submit"
                  className="h-11 w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? "Sending..."
                    : "Send Reset Link"}
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
