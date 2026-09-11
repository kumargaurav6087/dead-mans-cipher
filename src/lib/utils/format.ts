export function truncateHash(hash: string, length = 8): string {
  if (!hash) return '';
  return `${hash.slice(0, length)}...${hash.slice(-length)}`;
}
