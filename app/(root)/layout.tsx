// components/layouts/AuthenticatedLayout.tsx
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SignedIn>
      <div className="flex h-screen flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </SignedIn>
  )
}
