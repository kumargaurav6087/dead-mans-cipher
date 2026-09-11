"use client";

import React, { useEffect, useState } from "react";
import { Lock, Eye, ShieldCheck, AlertTriangle } from "lucide-react";
import { getDashboardStats, DashboardStats } from "@/lib/storage/local-storage";

export function StatsCards() {
  const [stats, setStats] = useState<DashboardStats>({
    encrypted: 12,
    hidden: 8,
    verified: 10,
    threats: 1,
  });

  useEffect(() => {
    setStats(getDashboardStats());
  }, []);

  const statsList = [
    {
      label: "Messages Encrypted",
      value: stats.encrypted.toString(),
      icon: Lock,
      color: "text-[#D9A036]",
      bg: "bg-[#D9A036]/10",
      border: "border-[#D9A036]/30",
    },
    {
      label: "Payloads Hidden",
      value: stats.hidden.toString(),
      icon: Eye,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30",
    },
    {
      label: "Verified",
      value: stats.verified.toString(),
      icon: ShieldCheck,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
    },
    {
      label: "Threat Detected",
      value: stats.threats.toString(),
      icon: AlertTriangle,
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsList.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className={`p-5 rounded-xl bg-[#131B2E] border ${stat.border} flex items-center gap-4 shadow-md transition-all hover:translate-y-[-2px]`}
          >
            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-gray-100 font-mono">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-gray-400">
                {stat.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

