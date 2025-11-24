"use client";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { xid } from "zod";
import { format } from "path";
import { is } from "drizzle-orm";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context";
import { useRouter } from "next/navigation";

const profileUpdateSchema = z.object({
  name: z.string().min(1),
  email: z.email().min(1),
});

type ProfileUpdateForm = z.infer<typeof profileUpdateSchema>;

export default function ProfileUpdateForm({
  user,
}: {
  user: {
    email: string;
    name: string;
  };
}) {
  const form = useForm<ProfileUpdateForm>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: user,
  });

  const { isSubmitting } = form.formState;
  const router = useRouter();

  async function handleProfileUpdate(data: ProfileUpdateForm) {
    const res = await authClient.updateUser({
      name: data.name,
    });
    if (res.error) {
      toast.error(res.error.message || "Failed to update profile");
    } else {
      toast.success("Profile updeted successfully");
    }
    router.refresh();
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(handleProfileUpdate)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full mt-2">
          <LoadingSwap isLoading={isSubmitting}>Update Profile </LoadingSwap>
        </Button>
      </form>
    </Form>
  );
}
