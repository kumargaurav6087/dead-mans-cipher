import { EncryptedMessageRecord } from "@/types/message";

export interface DashboardStats {
  encrypted: number;
  hidden: number;
  verified: number;
  threats: number;
}

const STATS_STORAGE_KEY = "DMC_STATS";
const HISTORY_STORAGE_KEY = "DMC_HISTORY";

const DEFAULT_STATS: DashboardStats = {
  encrypted: 12,
  hidden: 8,
  verified: 10,
  threats: 1,
};

const DEFAULT_HISTORY: EncryptedMessageRecord[] = [
  {
    id: "#001",
    userId: "usr_101",
    encryptedPayload: "U2FsdGVkX19xVzV4...",
    cipher: "AES-GCM",
    iv: "9a8b7c6d5e4f3a2b1c0d9e8f",
    integrityHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    hmac: "9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b",
    steganographyType: "text",
    createdAt: "Sep 11, 2026",
    updatedAt: "Sep 11, 2026",
  },
  {
    id: "#002",
    userId: "usr_101",
    encryptedPayload: "U2FsdGVkX19xVzV4...",
    cipher: "AES-GCM",
    iv: "1a2b3c4d5e6f7a8b9c0d1e2f",
    integrityHash: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
    hmac: "b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3",
    steganographyType: "svg",
    createdAt: "Sep 10, 2026",
    updatedAt: "Sep 10, 2026",
  },
];

export function getStoredItem<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (err) {
    return null;
  }
}

export function setStoredItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("LocalStorage write error:", err);
  }
}

export function getDashboardStats(): DashboardStats {
  const stats = getStoredItem<DashboardStats>(STATS_STORAGE_KEY);
  if (!stats) {
    setStoredItem(STATS_STORAGE_KEY, DEFAULT_STATS);
    return DEFAULT_STATS;
  }
  return stats;
}

export function incrementStat(type: keyof DashboardStats): DashboardStats {
  const current = getDashboardStats();
  const updated = {
    ...current,
    [type]: current[type] + 1,
  };
  setStoredItem(STATS_STORAGE_KEY, updated);
  return updated;
}

export function getHistoryRecords(): EncryptedMessageRecord[] {
  const history = getStoredItem<EncryptedMessageRecord[]>(HISTORY_STORAGE_KEY);
  if (!history || history.length === 0) {
    setStoredItem(HISTORY_STORAGE_KEY, DEFAULT_HISTORY);
    return DEFAULT_HISTORY;
  }
  return history;
}

export function addHistoryRecord(
  item: Omit<EncryptedMessageRecord, "id" | "userId" | "createdAt" | "updatedAt">
): EncryptedMessageRecord[] {
  const current = getHistoryRecords();
  const nextId = `#${String(current.length + 1).padStart(3, "0")}`;
  const nowStr = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const newRecord: EncryptedMessageRecord = {
    id: nextId,
    userId: "usr_101",
    encryptedPayload: item.encryptedPayload,
    cipher: item.cipher || "AES-GCM",
    iv: item.iv,
    integrityHash: item.integrityHash,
    hmac: item.hmac,
    steganographyType: item.steganographyType || "none",
    createdAt: nowStr,
    updatedAt: nowStr,
  };

  const updated = [newRecord, ...current];
  setStoredItem(HISTORY_STORAGE_KEY, updated);
  return updated;
}
