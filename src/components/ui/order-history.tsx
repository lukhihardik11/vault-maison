// Source: 21st.dev - TrackingTimeline (order-history)
// Adapted: monochrome palette (#050505/#FFFFFF/#6B6B6B/#9B9B9B/#E5E5E5),
//          sharp edges (no rounded corners), reduced-motion safe

"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Circle, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: string | number;
  title: string;
  date: string;
  status: "completed" | "in-progress" | "pending";
  icon?: React.ReactNode;
}

interface TrackingTimelineProps {
  items: TimelineItem[];
  className?: string;
}

const StatusIcon = ({
  status,
  customIcon,
}: {
  status: TimelineItem["status"];
  customIcon?: React.ReactNode;
}) => {
  if (customIcon) {
    return <>{customIcon}</>;
  }

  switch (status) {
    case "completed":
      return <Check className="h-4 w-4 text-[#FFFFFF]" />;
    case "in-progress":
      return <CircleDot className="h-4 w-4 text-[#050505]" />;
    default:
      return <Circle className="h-4 w-4 text-[#9B9B9B]" />;
  }
};

const TrackingTimeline = ({ items, className }: TrackingTimelineProps) => {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0.01 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: prefersReducedMotion ? 0 : 20,
      opacity: prefersReducedMotion ? 1 : 0.01,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.ol
      className={cn("relative border-l border-[#E5E5E5] ml-4", className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {items.map((item) => (
        <motion.li
          key={item.id}
          className="mb-8 ml-8"
          variants={itemVariants}
          aria-current={item.status === "in-progress" ? "step" : undefined}
        >
          {/* The icon indicator */}
          <span
            className={cn(
              "absolute -left-4 flex h-8 w-8 items-center justify-center ring-8 ring-[#FFFFFF]",
              {
                "bg-[#050505]": item.status === "completed",
                "bg-[#E5E5E5]": item.status === "in-progress",
                "bg-[#F5F5F5]": item.status === "pending",
              }
            )}
          >
            {/* Pulsing animation for in-progress state */}
            {item.status === "in-progress" && !prefersReducedMotion && (
              <span className="absolute h-full w-full animate-ping bg-[#050505]/20 opacity-75" />
            )}
            <StatusIcon status={item.status} customIcon={item.icon} />
          </span>

          {/* Content */}
          <div className="flex flex-col">
            <h3
              className={cn("font-semibold", {
                "text-[#050505]": item.status !== "pending",
                "text-[#9B9B9B]": item.status === "pending",
              })}
            >
              {item.title}
            </h3>
            <time
              className={cn("text-sm text-[#6B6B6B]", {
                "font-medium text-[#050505]": item.status === "in-progress",
              })}
            >
              {item.date}
            </time>
          </div>
        </motion.li>
      ))}
    </motion.ol>
  );
};

export default TrackingTimeline;
export { TrackingTimeline };
export type { TrackingTimelineProps };
