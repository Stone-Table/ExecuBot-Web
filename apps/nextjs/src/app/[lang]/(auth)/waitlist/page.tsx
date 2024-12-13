import { Waitlist } from "@clerk/nextjs";

import { NavBar } from "~/components/navbar";

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center"
      <Waitlist />
    </div>
  );
}
