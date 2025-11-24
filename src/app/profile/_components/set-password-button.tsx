"use client";

import { BetterAuthActionButton } from "@/components/auth/better-auth-action-button";
import { authClient } from "@/lib/auth-client";

export default function SetPasswordButton({ email }: { email: string }) {
  return (
    <BetterAuthActionButton
      variant="outline"
      action={() => {
        return authClient.requestPasswordReset({
          email,
          redirectTo: "/auth/resset-password",
        });
      }}
    >
      Send password reset email
    </BetterAuthActionButton>
  );
}
