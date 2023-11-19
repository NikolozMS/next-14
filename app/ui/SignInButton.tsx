import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "./button";

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<any>) {
  return (
    <form
      action={async () => {
        "use server";
        const url = await signIn(provider, { redirect: false });

        console.log("url", url);
        // TODO: fix in next-auth
        redirect("/login");
      }}
    >
      <Button {...props}>Sign In</Button>
    </form>
  );
}
