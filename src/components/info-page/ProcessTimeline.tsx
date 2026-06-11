"use client";

import { Stagger, StaggerItem } from "@/components/motion/Stagger";

interface Step {
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  steps: Step[];
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <Stagger className="relative max-w-2xl mx-auto">
      <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-primary/20 hidden sm:block" aria-hidden />
      <ol className="space-y-8">
        {steps.map((step, i) => (
          <StaggerItem key={step.title}>
            <li className="relative flex gap-6 sm:gap-8">
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold text-sm shadow-md ring-4 ring-cream">
                {i + 1}
              </span>
              <div className="flex-1 rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-300">
                <h3 className="font-bold text-lg text-primary-dark">{step.title}</h3>
                <p className="mt-2 text-muted leading-relaxed text-sm">{step.description}</p>
              </div>
            </li>
          </StaggerItem>
        ))}
      </ol>
    </Stagger>
  );
}
