import React from 'react';

export function Progress({ value }: { value: number }) {
  return <div className="w-full bg-gray-700 h-2 rounded"><div style={{ width: `${value}%` }} className="bg-blue-500 h-full rounded" /></div>;
}
