import Link from "next/link";

import { buttonVariants } from "@saasfly/ui/button";

export const metadata = {
  title: "404 Not Found",
  description: "Sorry, the page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="container flex h-[calc(100vh-200px)] flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/" className={buttonVariants()}>
          Go Home
        </Link>
        <Link href="/blog" className={buttonVariants({ variant: "outline" })}>
          Check Our Blog
        </Link>
      </div>
    </div>
  );
} 