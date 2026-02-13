import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { upsertSubscription, cancelSubscription } from "@/lib/services/subscription"
import { getPlanByPriceId } from "@/lib/plans"
import type Stripe from "stripe"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      if (session.mode === "subscription" && session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        )
        const priceId = subscription.items.data[0]?.price.id
        const plan = getPlanByPriceId(priceId)

        await upsertSubscription({
          userId: session.metadata?.userId ?? "",
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: subscription.id,
          stripePriceId: priceId,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
          status: subscription.status,
          plan: plan?.id ?? "pro",
        })
      }
      break
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription
      const priceId = subscription.items.data[0]?.price.id
      const plan = getPlanByPriceId(priceId)

      // Find user by customer id (metadata might not be available)
      const customerId =
        typeof subscription.customer === "string"
          ? subscription.customer
          : subscription.customer.id

      // We need the userId — retrieve from our DB via the customer ID
      const { getSubscriptionByCustomerId } = await import(
        "@/lib/services/subscription"
      )
      const existingSub = await getSubscriptionByCustomerId(customerId)
      if (existingSub) {
        await upsertSubscription({
          userId: existingSub.userId,
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscription.id,
          stripePriceId: priceId,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
          status: subscription.status,
          plan: plan?.id ?? existingSub.plan,
        })
      }
      break
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription
      const customerId =
        typeof subscription.customer === "string"
          ? subscription.customer
          : subscription.customer.id

      const { getSubscriptionByCustomerId } = await import(
        "@/lib/services/subscription"
      )
      const existingSub = await getSubscriptionByCustomerId(customerId)
      if (existingSub) {
        await cancelSubscription(existingSub.userId)
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
