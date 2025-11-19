"use client";

import { BetterAuthActionButton } from "@/components/auth/better-auth-action-button";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function Home() {
  const { data: session, isPending: loading } = authClient.useSession();

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] ">
        <div className="text-center space-y-6">
          {session == null ? (
            <>
              <h1 className="text-3xl font-bold">Welcome</h1>
              <Button asChild size="lg">
                <Link href="/auth/login">Sign in / Sign up</Link>
              </Button>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold">
                Welcome {session.user.name}
              </h1>
              <div className="flex gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/profile">Profile</Link>
                </Button>

                <BetterAuthActionButton
                  size="lg"
                  variant="destructive"
                  action={() => authClient.signOut()}
                >
                  Sign out
                </BetterAuthActionButton>
              </div>
            </>
          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
