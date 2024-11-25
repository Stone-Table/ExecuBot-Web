"use client";

import React from "react";

import { InfiniteMovingCards } from "@Saasfly/ui/infinite-moving-cards";

export function InfiniteMovingCardss() {
  return (
    <div className=" relative flex flex-col items-center justify-center overflow-hidden rounded-md antialiased">
      <InfiniteMovingCards items={reviews} direction="right" speed="slow" />
    </div>
  );
}

const reviews = [
  {
    quote: "Saasfly helped us identify productivity bottlenecks we never knew existed. It's transformed how we manage our engineering teams.",
    name: "Sarah Chen",
    title: "CTO, TechCorp",
  },
  {
    quote: "The multi-platform integration is a game-changer. We finally have a single source of truth for developer productivity.",
    name: "Michael Rodriguez",
    title: "Engineering Director",
  },
  {
    quote: "As a non-technical executive, Saasfly gives me the insights I need to make informed decisions about our engineering resources.",
    name: "David Kim",
    title: "CEO, StartupCo",
  },
  {
    quote: "The AI-powered recommendations have helped us optimize team composition and improve overall productivity by 40%.",
    name: "Emily Thompson",
    title: "VP of Engineering",
  },
  {
    quote: "Saasfly's analytics helped us identify and address productivity issues before they became major problems.",
    name: "James Wilson",
    title: "Engineering Manager",
  }
];
