"use client";

import React from "react";

import { HoverEffect } from "@Saasfly/ui/card-hover-effect";

export const projects = [
  {
    title: "Multi-Platform Analytics",
    description: "Aggregate and analyze developer activity across GitHub, GitLab, Jira, and major cloud platforms to get a complete picture of productivity.",
    link: "/features/analytics",
  },
  {
    title: "AI-Powered Insights",
    description: "Let our AI analyze patterns in developer activity to identify both top performers and potential productivity issues.",
    link: "/features/ai",
  },
  {
    title: "Executive Dashboard",
    description: "Get clear, actionable insights about your engineering team's performance without getting lost in technical details.",
    link: "/features/dashboard",
  },
  {
    title: "Performance Optimization",
    description: "Receive AI-driven recommendations for team composition and resource allocation to maximize productivity.",
    link: "/features/optimization",
  }
];
export function HoverEffects() {
  return <HoverEffect items={projects} />;
}
