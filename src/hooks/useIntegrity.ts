"use client";

import { useState, useCallback } from "react";
import { computeSHA256 } from "@/lib/integrity/sha256";
import { generateHMACKey, computeHMAC, verifyHMAC } from "@/lib/integrity/hmac";

export function useIntegrity() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateHash = useCallback(async (data: string): Promise<string> => {
    return computeSHA256(data);
  }, []);

  const calculateHmac = useCallback(
    async (data: string, secretKey?: CryptoKey): Promise<{ signature: string; key: CryptoKey }> => {
      const key = secretKey || (await generateHMACKey());
      const signature = await computeHMAC(data, key);
      return { signature, key };
    },
    []
  );

  const verifySignature = useCallback(
    async (data: string, signatureHex: string, secretKey: CryptoKey): Promise<boolean> => {
      return verifyHMAC(data, signatureHex, secretKey);
    },
    []
  );

  return { calculateHash, calculateHmac, verifySignature, loading, error };
}
