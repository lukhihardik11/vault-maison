// Source: 21st.dev - OrderConfirmationCard
// Adapted: monochrome palette, sharp edges, reduced-motion safe

"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface OrderConfirmationCardProps {
  orderId: string;
  paymentMethod: string;
  dateTime: string;
  totalAmount: string;
  onGoToAccount: () => void;
  title?: string;
  buttonText?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const OrderConfirmationCard: React.FC<OrderConfirmationCardProps> = ({
  orderId,
  paymentMethod,
  dateTime,
  totalAmount,
  onGoToAccount,
  title = "Your order has been successfully submitted",
  buttonText = "Go to my account",
  icon = <CheckCircle2 className="h-12 w-12 text-[#050505]" />,
  className,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const details = [
    { label: "Order ID", value: orderId },
    { label: "Payment Method", value: paymentMethod },
    { label: "Date & Time", value: dateTime },
    { label: "Total", value: totalAmount, isBold: true },
  ];

  const containerVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0.01,
      scale: prefersReducedMotion ? 1 : 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut" as const,
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0.01,
      y: prefersReducedMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100 },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-live="polite"
        className={cn(
          "w-full max-w-sm border border-[#E5E5E5] bg-[#FFFFFF] text-[#050505] shadow-lg p-6 sm:p-8",
          className
        )}
      >
        <div className="flex flex-col items-center space-y-6 text-center">
          {/* Success Icon */}
          <motion.div variants={itemVariants}>{icon}</motion.div>

          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-semibold text-[#050505]"
          >
            {title}
          </motion.h2>

          {/* Order Details Section */}
          <motion.div variants={itemVariants} className="w-full space-y-4 pt-4">
            {details.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  "flex items-center justify-between border-b border-[#E5E5E5] pb-4 text-sm text-[#6B6B6B]",
                  {
                    "border-none pb-0": index === details.length - 1,
                    "font-bold text-[#050505]": item.isBold,
                  }
                )}
              >
                <span>{item.label}</span>
                <span className={cn({ "text-lg": item.isBold })}>
                  {item.value}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Action Button */}
          <motion.div variants={itemVariants} className="w-full pt-4">
            <Button
              onClick={onGoToAccount}
              className="w-full h-12 text-base"
              size="lg"
            >
              {buttonText}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
