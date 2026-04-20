// Source: 21st.dev - PaymentSummary
// Adapted: monochrome palette, sharp edges, reduced-motion safe

"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface PaymentSummaryProps {
  title: string;
  paymentMethod: {
    icon: React.ReactNode;
    name: string;
  };
  items: {
    label: string;
    value: React.ReactNode;
    valueClassName?: string;
  }[];
  total: {
    label: string;
    value: string;
  };
  className?: string;
}

export function PaymentSummary({
  title,
  paymentMethod,
  items,
  total,
  className,
}: PaymentSummaryProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0.01 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 },
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
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <div
      className={`w-full max-w-md border border-[#E5E5E5] bg-[#FFFFFF] text-[#050505] shadow-sm ${className || ""}`}
    >
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight text-[#050505]">
          {title}
        </h3>
      </div>
      <div className="p-6 pt-0">
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Payment Method Row */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between"
          >
            <span className="text-sm text-[#6B6B6B]">Payment Method</span>
            <div className="flex items-center gap-2">
              {paymentMethod.icon}
              <span className="font-medium text-[#050505]">
                {paymentMethod.name}
              </span>
            </div>
          </motion.div>

          {/* Dynamic Line Items */}
          {items.map((item, index) => (
            <motion.div
              variants={itemVariants}
              key={index}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-[#6B6B6B]">{item.label}</span>
              <span
                className={`font-medium text-[#050505] ${item.valueClassName || ""}`}
              >
                {item.value}
              </span>
            </motion.div>
          ))}

          {/* Separator */}
          <motion.div variants={itemVariants}>
            <div className="border-t border-dashed border-[#E5E5E5]" />
          </motion.div>

          {/* Total Row */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between pt-2"
          >
            <span className="text-lg font-bold text-[#050505]">
              {total.label}
            </span>
            <span className="text-lg font-bold text-[#050505]">
              {total.value}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
