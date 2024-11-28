"use client";

import { TextGenerateEffect } from "@saasfly/ui/typewriter-effect";

export function TypewriterEffectSmooths() {
  const words = [
    {
      text: "Your",
    },
    {
      text: "partner",
    },
    {
      text: "in",
    },
    {
      text: "spotting",
    },
    {
      text: "challenges",
    },
    {
      text: "and",
    },
    {
      text: "accelerating",
    },
    {
      text: "delivery",
    },
    {
      text: "timelines",
    },

    {
      text: "Saasfly.",
      className: "text-blue-500",
    },
  ];
  return (
    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
      <TextGenerateEffect words={words} />
    </p>
  );
}
