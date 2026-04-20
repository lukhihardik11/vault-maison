// Source: 21st.dev - GlassCheckoutCard (shadcn variant)
// Adapted: monochrome palette (#050505/#FFFFFF/#6B6B6B/#9B9B9B/#E5E5E5),
//          sharp edges (no rounded corners), reduced-motion safe

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, CreditCard, Lock } from "lucide-react";
import { useState } from "react";

interface GlassCheckoutCardProps {
  amount?: number;
  currency?: string;
  onSubmit?: () => void;
  className?: string;
}

export function GlassCheckoutCard({
  amount = 85.8,
  currency = "$",
  onSubmit,
  className,
}: GlassCheckoutCardProps) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: prefersReducedMotion ? 1 : 0.01, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("w-full max-w-[400px]", className)}
    >
      <Card className="group relative overflow-hidden border-[#E5E5E5] bg-[#FFFFFF]/95 backdrop-blur-md transition-all duration-300 hover:border-[#050505]/30 hover:shadow-xl">
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#050505]">
              Payment Details
            </h3>
            <p className="text-sm text-[#6B6B6B]">
              Complete your purchase securely
            </p>
          </div>

          {/* Payment Methods */}
          <div className="mb-6 grid grid-cols-3 gap-2">
            {["card", "paypal", "apple"].map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={cn(
                  "flex h-12 items-center justify-center border border-[#E5E5E5] bg-[#FFFFFF]/50 transition-all hover:bg-[#E5E5E5]/50",
                  paymentMethod === method &&
                    "border-[#050505] bg-[#050505]/5 text-[#050505]"
                )}
              >
                {method === "card" && <CreditCard className="h-5 w-5" />}
                {method === "paypal" && (
                  <span className="font-bold italic text-[#050505]">Pay</span>
                )}
                {method === "apple" && (
                  <span className="font-semibold text-[#050505]">Pay</span>
                )}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  className="border-[#E5E5E5] bg-[#FFFFFF]/50 pl-10 backdrop-blur-sm focus:border-[#050505]/50 focus:bg-[#FFFFFF]/80"
                />
                <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-[#9B9B9B]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <div className="relative">
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    className="border-[#E5E5E5] bg-[#FFFFFF]/50 pl-10 backdrop-blur-sm focus:border-[#050505]/50 focus:bg-[#FFFFFF]/80"
                  />
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-[#9B9B9B]" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <div className="relative">
                  <Input
                    id="cvc"
                    placeholder="123"
                    className="border-[#E5E5E5] bg-[#FFFFFF]/50 pl-10 backdrop-blur-sm focus:border-[#050505]/50 focus:bg-[#FFFFFF]/80"
                  />
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-[#9B9B9B]" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Cardholder Name</Label>
              <Input
                id="name"
                placeholder="Full Name"
                className="border-[#E5E5E5] bg-[#FFFFFF]/50 backdrop-blur-sm focus:border-[#050505]/50 focus:bg-[#FFFFFF]/80"
              />
            </div>
          </div>

          <Button
            onClick={onSubmit}
            className="mt-6 w-full bg-[#050505] text-[#FFFFFF] shadow-lg transition-all hover:bg-[#050505]/90"
          >
            Pay {currency}{amount.toFixed(2)}
          </Button>

          <p className="mt-4 text-center text-xs text-[#9B9B9B]">
            <Lock className="inline-block h-3 w-3 mr-1" />
            Payments are secure and encrypted
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
