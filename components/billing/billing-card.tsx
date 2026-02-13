"use client"

import { CreditCard } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createPortalSession } from "@/lib/actions/billing"
import type { Subscription } from "@/db/schema"

interface BillingCardProps {
  subscription: Subscription
}

export function BillingCard({ subscription }: BillingCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">Current subscription</CardTitle>
              <CardDescription>
                <span className="capitalize">{subscription.plan}</span> plan
              </CardDescription>
            </div>
          </div>
          <Badge
            variant={subscription.status === "active" ? "default" : "secondary"}
          >
            {subscription.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            {subscription.stripeCurrentPeriodEnd ? (
              <span>
                {"Renews on "}
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "long",
                }).format(subscription.stripeCurrentPeriodEnd)}
              </span>
            ) : (
              <span>No renewal date</span>
            )}
          </div>
          <form action={createPortalSession}>
            <Button variant="outline" size="sm" type="submit">
              Manage subscription
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
