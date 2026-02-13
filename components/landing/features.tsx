import {
  Shield,
  CreditCard,
  Database,
  Palette,
  Lock,
  Rocket,
} from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Authentication",
    description:
      "OAuth with GitHub and Google via Auth.js. Session management, protected routes, and middleware built in.",
  },
  {
    icon: CreditCard,
    title: "Stripe Billing",
    description:
      "Subscription checkout, webhook handling, and billing portal. Plans are configured and ready to customize.",
  },
  {
    icon: Database,
    title: "Database Ready",
    description:
      "Drizzle ORM with NeonDB serverless Postgres. Type-safe schemas, relations, and migrations.",
  },
  {
    icon: Palette,
    title: "Beautiful UI",
    description:
      "shadcn/ui components with light and dark themes. Responsive layouts and accessible components.",
  },
  {
    icon: Lock,
    title: "Security First",
    description:
      "Protected routes with middleware, input validation with Zod, and parameterized queries throughout.",
  },
  {
    icon: Rocket,
    title: "Deploy Ready",
    description:
      "Optimized for Vercel deployment. Serverless-first architecture that scales automatically.",
  },
]

export function Features() {
  return (
    <section id="features" className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Everything you need to launch
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Skip the boilerplate. Start with a production-grade foundation.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-3 rounded-lg border bg-card p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
