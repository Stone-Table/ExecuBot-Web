"use client";

import Link from "next/link";

import { cn } from "@Saasfly/ui";
import { buttonVariants } from "@Saasfly/ui/button";

export function SubscriptionForm(props: {
  hasSubscription: boolean;
  dict: Record<string, string>;
}) {
  return (
    <Link href="/pricing" className={cn(buttonVariants())}>
      {props.hasSubscription
        ? props.dict.manage_subscription
        : props.dict.upgrade}
    </Link>
  );
}
