import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { getSubscriptionByUserId } from "@/lib/services/subscription"
import { PLANS } from "@/lib/plans"
import { BillingCard } from "@/components/billing/billing-card"
import { PlanCard } from "@/components/billing/plan-card"

export const metadata: Metadata = {
  title: "Billing - SaaS Kit",
}

export default async function BillingPage() {
  const user = await getCurrentUser()
  if (!user?.id) redirect("/sign-in")

  const subscription = await getSubscriptionByUserId(user.id)

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your subscription and billing details.
        </p>
      </div>

      {subscription && subscription.status === "active" && subscription.plan !== "free" ? (
        <BillingCard subscription={subscription} />
      ) : null}

      <div>
        <h2 className="mb-4 text-xl font-semibold">
          {subscription?.status === "active" && subscription?.plan !== "free"
            ? "Change plan"
            : "Choose a plan"}
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              currentPlan={subscription?.plan ?? "free"}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
