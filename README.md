# 🚀 Next.js Micro-SaaS Boilerplate

This is a comprehensive, production-ready boilerplate for building modern SaaS applications with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **Drizzle ORM**. It includes authentication, subscription management with Stripe, and a robust database setup.

## ✨ Features

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Actions)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/) (Radix UI + Lucide Icons)
- **Database**: [Postgres](https://www.postgresql.org/) (via [Neon](https://neon.tech/))
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [NextAuth.js v5](https://authjs.dev/) (Auth.js)
- **Payments**: [Stripe](https://stripe.com/) Integration (Subscriptions & Webhooks)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Dark Mode**: Built-in generic theme support

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Lucide React
- **Backend**: Next.js Server Actions, NextAuth.js
- **Database**: Drizzle ORM, PostgreSQL
- **Infrastructure**: Vercel (recommended)

## 🚀 Getting Started

Follow these steps to get the project up and running locally.

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd nextjs-micro-saas-boilerplate
```

### 2. Install dependencies

This project uses `pnpm`.

```bash
pnpm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Database (Neon / Postgres)
DATABASE_URL="postgresql://..."

# Authentication (NextAuth.js)
AUTH_SECRET="your-super-secret-key" # Generate with: openssl rand -base64 32
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Auth Providers
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Payments (Stripe)
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="" # If needed for client-side Stripe
```

### 4. Database Setup

Push the schema to your database:

```bash
npx drizzle-kit push
```

### 5. Run the development server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```bash
.
├── app/                  # Next.js App Router
│   ├── (auth)/           # Authentication routes (sign-in, etc.)
│   ├── (dashboard)/      # Protected dashboard routes
│   ├── (public)/         # Public routes (landing page)
│   ├── api/              # API routes (webhooks, auth)
│   └── layout.tsx        # Root layout
├── components/           # React components (ui, forms, etc.)
├── db/                   # Database schema and config
├── lib/                  # Utilities and shared logic
├── public/               # Static assets
└── ...
```

## 📜 Scripts

- `dev`: Run the development server.
- `build`: Build the application for production.
- `start`: Start the production server.
- `lint`: Run ESLint.
- `db:push`: (Recommended) Alias for `drizzle-kit push`.
- `db:studio`: (Recommended) Alias for `drizzle-kit studio`.

## 📄 License

This project is licensed under the MIT License.
