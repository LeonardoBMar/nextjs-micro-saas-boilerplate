export interface Plan {
  id: string
  name: string
  description: string
  priceMonthly: number
  stripePriceId: string
  features: string[]
  popular?: boolean
}

// Replace these Stripe Price IDs with your real ones from the Stripe Dashboard.
// Create Products + Prices in Stripe, then paste the price_xxx IDs here.
export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "For individuals getting started",
    priceMonthly: 0,
    stripePriceId: "",
    features: [
      "Up to 100 requests/month",
      "Basic support",
      "1 project",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professionals who need more",
    priceMonthly: 19,
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID ?? "",
    features: [
      "Unlimited requests",
      "Priority support",
      "10 projects",
      "Advanced analytics",
      "Custom domain",
    ],
    popular: true,
  },
  {
    id: "business",
    name: "Business",
    description: "For teams and organizations",
    priceMonthly: 49,
    stripePriceId: process.env.STRIPE_BUSINESS_PRICE_ID ?? "",
    features: [
      "Everything in Pro",
      "Unlimited projects",
      "Team collaboration",
      "Dedicated support",
      "SLA guarantee",
      "SSO integration",
    ],
  },
]

export function getPlanById(planId: string): Plan | undefined {
  return PLANS.find((p) => p.id === planId)
}

export function getPlanByPriceId(priceId: string): Plan | undefined {
  return PLANS.find((p) => p.stripePriceId === priceId)
}
