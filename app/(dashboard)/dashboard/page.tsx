import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { getSubscriptionByUserId } from "@/lib/services/subscription"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, User, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard - SaaS Kit",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user?.id) redirect("/sign-in")

  const subscription = await getSubscriptionByUserId(user.id)

  const plan = subscription?.plan ?? "free"
  const status = subscription?.status ?? "inactive"
  const periodEnd = subscription?.stripeCurrentPeriodEnd

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          {"Welcome back, "}
          {user.name ?? user.email}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardDescription>Account</CardDescription>
              <CardTitle className="text-base">{user.email}</CardTitle>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardDescription>Plan</CardDescription>
              <CardTitle className="flex items-center gap-2 text-base">
                <span className="capitalize">{plan}</span>
                <Badge
                  variant={status === "active" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {status}
                </Badge>
              </CardTitle>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardDescription>Renewal</CardDescription>
              <CardTitle className="text-base">
                {periodEnd
                  ? new Intl.DateTimeFormat("en-US", {
                      dateStyle: "medium",
                    }).format(periodEnd)
                  : "No active subscription"}
              </CardTitle>
            </div>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting started</CardTitle>
          <CardDescription>
            This is your dashboard. Replace this content with your actual product features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border-2 border-dashed p-12 text-center text-muted-foreground">
            <p className="text-sm">
              Your product content goes here. Build your features on top of this boilerplate.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
