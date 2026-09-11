import React from 'react';

export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="px-2 py-1 text-xs rounded bg-gray-700">{children}</span>;
}
