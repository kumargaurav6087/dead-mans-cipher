import React from 'react';

export function Toast({ message }: { message: string }) {
  return <div className="p-3 bg-gray-800 text-white rounded">{message}</div>;
}
