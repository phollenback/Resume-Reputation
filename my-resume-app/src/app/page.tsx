import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaderboard } from "@/components/Leaderboard";

export default function Home() {
  return (
    <div className="container mx-auto p-8 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Resume Manager</h1>

      {/* Signed Out State */}
      <SignedOut>
        <div className="flex gap-2">
          <Button asChild>
            <SignInButton mode="modal" />
          </Button>
          <Button variant="outline" asChild>
            <SignUpButton mode="modal" />
          </Button>
        </div>
      </SignedOut>

      {/* Signed In State */}
      <SignedIn>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/create">Add Resume</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/resumes">View Resumes</Link>
          </Button>
        </div>
        <div className="mt-4">
          <UserButton afterSignOutUrl="http://localhost:3000/" />
        </div>
      </SignedIn>

      <div className="md:col-span-1 mt-8">
        <Leaderboard />
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-center py-4 mt-8 font-serif" style={{ fontFamily: 'Times New Roman' }}>
        <p>&copy; {new Date().getFullYear()} Digital Rev Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
}
