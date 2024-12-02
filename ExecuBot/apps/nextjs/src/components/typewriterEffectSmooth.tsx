"use client";

import { TextGenerateEffect } from "@saasfly/ui/typewriter-effect";

export function TypewriterEffectSmooths() {
  const words = [
    {
      text: "Find",
    },
    {
      text: "out",
    },
    {
      text: "who’s",
    },
    {
      text: "driving",
    },
    {
      text: "the",
    },
    {
      text: "mission—and",
    },
    {
      text: "who’s",
    },
    {
      text: "just",
    },
    {
      text: "along",
    },
    {
      text: "fot",
    },
    {
      text: "the",
    },

    {
      text: "ride.",
    },
    {
      text: "ExecEfficiency AI.",
      className: "text-blue-500",
    },
  ];
  return (
    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
      <TextGenerateEffect words={words} />
    </p>
  );
}
