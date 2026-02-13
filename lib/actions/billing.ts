"use server"

import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"
import { getCurrentUser } from "@/lib/auth"
import { getSubscriptionByUserId } from "@/lib/services/subscription"

/**
 * Create a Stripe Checkout session for a subscription plan.
 */
export async function createCheckoutSession(priceId: string) {
  const user = await getCurrentUser()
  if (!user?.id || !user?.email) {
    redirect("/sign-in")
  }

  const sub = await getSubscriptionByUserId(user.id)
  const headersList = await headers()
  const origin = headersList.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

  // If user already has a Stripe customer, reuse it
  const customerParam = sub?.stripeCustomerId
    ? { customer: sub.stripeCustomerId }
    : { customer_email: user.email }

  const session = await stripe.checkout.sessions.create({
    ...customerParam,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/dashboard/billing?success=true`,
    cancel_url: `${origin}/dashboard/billing?canceled=true`,
    metadata: {
      userId: user.id,
    },
  })

  if (session.url) {
    redirect(session.url)
  }
}

/**
 * Create a Stripe Billing Portal session so users can manage their subscription.
 */
export async function createPortalSession() {
  const user = await getCurrentUser()
  if (!user?.id) {
    redirect("/sign-in")
  }

  const sub = await getSubscriptionByUserId(user.id)
  if (!sub?.stripeCustomerId) {
    redirect("/dashboard/billing")
  }

  const headersList = await headers()
  const origin = headersList.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

  const session = await stripe.billingPortal.sessions.create({
    customer: sub.stripeCustomerId,
    return_url: `${origin}/dashboard/billing`,
  })

  redirect(session.url)
}
