import { useState } from "react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock, Smartphone } from "lucide-react"

const securitySettingsSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters."),
    confirmNewPassword: z.string().min(1, "Please confirm your new password."),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match.",
    path: ["confirmNewPassword"],
  })

type SecuritySettingsFormValues = z.infer<typeof securitySettingsSchema>

export function SecuritySettingsTab() {
  //   const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(true)
  const [activeSessions, setActiveSessions] = useState(2)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SecuritySettingsFormValues>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  })

  const onSubmit = (values: SecuritySettingsFormValues) => {
    // TODO: Hook this up to your backend.
    console.log("Updating password", values)
    reset({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    })
  }

  return (
    <Card className="mt-6">
      <CardHeader className="border-b">
        <CardTitle className="font-display text-3xl font-semibold text-slate-900">
          Password & Security
        </CardTitle>
        <CardDescription className="text-slate-500">
          Manage your account security settings.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <div className="">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 font-display text-lg font-semibold text-slate-900">
                    <Lock className="size-4 text-emerald-600" /> Change Password
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Update your password regularly to keep your account secure.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 space-y-4"
              >
                <Field>
                  <FieldLabel htmlFor="currentPassword">
                    Current Password
                  </FieldLabel>
                  <Input
                    id="currentPassword"
                    type="password"
                    {...register("currentPassword")}
                  />
                  <FieldError errors={[errors.currentPassword]} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                  <Input
                    id="newPassword"
                    type="password"
                    {...register("newPassword")}
                  />
                  <FieldError errors={[errors.newPassword]} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirmNewPassword">
                    Confirm New Password
                  </FieldLabel>
                  <Input
                    id="confirmNewPassword"
                    type="password"
                    {...register("confirmNewPassword")}
                  />
                  <FieldError errors={[errors.confirmNewPassword]} />
                </Field>

                <Button
                  type="submit"
                  size="lg"
                  className="h-11 w-full bg-slate-900 text-white hover:bg-slate-800"
                  disabled={isSubmitting}
                >
                  Update Password
                </Button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="flex items-center gap-2 font-display text-lg font-semibold text-slate-900">
                  <Smartphone className="size-4 text-emerald-600" /> Two-Factor
                  Authentication
                </p>
              </div>
            </div>

            <div className="rounded-md bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-700">
                SMS Authentication
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Secure your account by requiring a code sent to your phone.
              </p>

              <div className="mt-4 border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-500">
                  Verified Phone:{" "}
                  <span className="font-medium">+1 (555) ***-4567</span>
                </p>
              </div>
            </div>

            <div className="rounded-md bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 text-lg font-medium text-slate-900">
                    Active Sessions
                  </p>
                  <p className="text-sm text-slate-500">
                    You are logged in on {activeSessions} device
                    {activeSessions === 1 ? "" : "s"}.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="h-9 text-red-600 hover:bg-slate-100"
                  onClick={() => setActiveSessions(1)}
                >
                  Log out all
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
