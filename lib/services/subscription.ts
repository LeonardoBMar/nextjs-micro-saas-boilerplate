import "server-only"

import { db } from "@/db"
import { subscriptions } from "@/db/schema"
import { eq } from "drizzle-orm"
import type { Subscription } from "@/db/schema"

export async function getSubscriptionByUserId(
  userId: string
): Promise<Subscription | null> {
  const rows = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1)
  return rows[0] ?? null
}

export async function getSubscriptionByCustomerId(
  stripeCustomerId: string
): Promise<Subscription | null> {
  const rows = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.stripeCustomerId, stripeCustomerId))
    .limit(1)
  return rows[0] ?? null
}

export async function upsertSubscription(data: {
  userId: string
  stripeCustomerId: string
  stripeSubscriptionId?: string | null
  stripePriceId?: string | null
  stripeCurrentPeriodEnd?: Date | null
  status: string
  plan: string
}) {
  const existing = await getSubscriptionByUserId(data.userId)

  if (existing) {
    await db
      .update(subscriptions)
      .set({
        stripeCustomerId: data.stripeCustomerId,
        stripeSubscriptionId: data.stripeSubscriptionId ?? undefined,
        stripePriceId: data.stripePriceId ?? undefined,
        stripeCurrentPeriodEnd: data.stripeCurrentPeriodEnd ?? undefined,
        status: data.status,
        plan: data.plan,
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.userId, data.userId))
    return
  }

  await db.insert(subscriptions).values({
    userId: data.userId,
    stripeCustomerId: data.stripeCustomerId,
    stripeSubscriptionId: data.stripeSubscriptionId ?? undefined,
    stripePriceId: data.stripePriceId ?? undefined,
    stripeCurrentPeriodEnd: data.stripeCurrentPeriodEnd ?? undefined,
    status: data.status,
    plan: data.plan,
  })
}

export async function cancelSubscription(userId: string) {
  await db
    .update(subscriptions)
    .set({ status: "canceled", updatedAt: new Date() })
    .where(eq(subscriptions.userId, userId))
}

/**
 * Check if a user has an active paid subscription.
 */
export async function hasActiveSubscription(userId: string): Promise<boolean> {
  const sub = await getSubscriptionByUserId(userId)
  if (!sub) return false
  return sub.status === "active" && sub.plan !== "free"
}
