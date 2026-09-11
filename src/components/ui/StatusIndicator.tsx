import React from 'react';

export function StatusIndicator({ status }: { status: 'idle' | 'loading' | 'success' | 'error' }) {
  return <span>Status: {status}</span>;
}
