"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  Lock,
  Archive,
  Send,
  FileCheck,
  ShieldCheck,
  KeyRound,
  ArrowRight
} from "lucide-react";

export function SecurityWorkflow() {
  const steps = [
    { label: "Message", icon: FileText, href: "/encryption" },
    { label: "Encrypt", icon: Lock, href: "/encryption" },
    { label: "Hide", icon: Archive, href: "/steganography" },
    { label: "Send", icon: Send, href: "/steganography" },
    { label: "Extract", icon: FileCheck, href: "/extraction" },
    { label: "Verify", icon: ShieldCheck, href: "/integrity" },
    { label: "Decrypt", icon: KeyRound, href: "/extraction" },
  ];

  return (
    <div className="p-6 rounded-2xl bg-[#131B2E] border border-[#1E2D4A] shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-gray-200">Secure Workflow Pipeline</h3>
          <p className="text-xs text-gray-400">Complete end-to-end zero-plaintext communication lifecycle</p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#D9A036]/10 border border-[#D9A036]/30 text-xs text-[#D9A036] font-medium">
          Client-Side Active
        </span>
      </div>

      {/* Workflow Horizontal Chain */}
      <div className="pt-4 overflow-x-auto pb-2">
        <div className="flex items-center justify-between min-w-[700px] px-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;

            return (
              <React.Fragment key={idx}>
                <Link
                  href={step.href}
                  className="group flex flex-col items-center gap-2 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0B101D] border border-[#2A3854] group-hover:border-[#D9A036] flex items-center justify-center text-gray-300 group-hover:text-[#D9A036] transition-all shadow-md group-hover:scale-105">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-gray-300 group-hover:text-[#D9A036] transition-colors">
                    {step.label}
                  </span>
                </Link>

                {!isLast && (
                  <div className="flex items-center justify-center text-[#D9A036] opacity-60">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
