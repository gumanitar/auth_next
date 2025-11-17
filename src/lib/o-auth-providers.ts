import { GithubIcon } from "lucide-react";
import { ComponentProps, ElementType } from "react";
import {GitHubIcon, GoogleIcon} from "../components/auth/o-auth-icons"

export const SUPPORTED_OAUTH_PROVIDERS = ["github", "google"] as const;
export type SuportedOAuthProviderType =
  (typeof SUPPORTED_OAUTH_PROVIDERS)[number];

export const SUPPORTED_OAUTH_PROVIDER_DETAILS: Record<
  SuportedOAuthProviderType,
  { name: string; Icon: ElementType<ComponentProps<"svg">> }
> = {
    github: {name: "GitHub", Icon: GitHubIcon },
    google: {name: "Google", Icon: GoogleIcon },
};
