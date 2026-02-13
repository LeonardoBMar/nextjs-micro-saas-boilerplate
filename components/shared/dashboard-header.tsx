import Link from "next/link"
import { Zap } from "lucide-react"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { UserButton } from "@/components/shared/user-button"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function DashboardHeader() {
  const session = await auth()
  if (!session?.user) redirect("/sign-in")

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Zap className="h-5 w-5 text-primary" />
            <span>SaaS Kit</span>
          </Link>
          <nav className="hidden items-center gap-4 md:flex">
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Overview
            </Link>
            <Link
              href="/dashboard/billing"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Billing
            </Link>
            <Link
              href="/dashboard/settings"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Settings
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserButton user={session.user} />
        </div>
      </div>
    </header>
  )
}
