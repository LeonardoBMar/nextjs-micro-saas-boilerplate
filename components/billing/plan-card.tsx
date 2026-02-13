"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { createCheckoutSession } from "@/lib/actions/billing"
import type { Plan } from "@/lib/plans"

interface PlanCardProps {
  plan: Plan
  currentPlan: string
}

export function PlanCard({ plan, currentPlan }: PlanCardProps) {
  const isCurrent = plan.id === currentPlan
  const isUpgrade = !isCurrent && plan.priceMonthly > 0

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-lg border bg-card p-6",
        plan.popular && "border-primary shadow-md",
        isCurrent && "ring-2 ring-primary"
      )}
    >
      {isCurrent && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          Current plan
        </div>
      )}

      <div className="mb-4">
        <h3 className="font-semibold">{plan.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
      </div>

      <div className="mb-4">
        <span className="text-3xl font-bold">${plan.priceMonthly}</span>
        {plan.priceMonthly > 0 && (
          <span className="text-muted-foreground">/mo</span>
        )}
      </div>

      <ul className="mb-6 flex flex-1 flex-col gap-2">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {isCurrent ? (
        <Button variant="secondary" disabled className="w-full">
          Current plan
        </Button>
      ) : isUpgrade ? (
        <form action={createCheckoutSession.bind(null, plan.stripePriceId)}>
          <Button
            type="submit"
            variant={plan.popular ? "default" : "outline"}
            className="w-full"
          >
            Upgrade to {plan.name}
          </Button>
        </form>
      ) : (
        <Button variant="outline" disabled className="w-full">
          {plan.priceMonthly === 0 ? "Free tier" : "Downgrade"}
        </Button>
      )}
    </div>
  )
}
