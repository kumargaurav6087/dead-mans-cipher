"use client";

import { useState, useCallback } from "react";
import { embedPayloadInText, extractPayloadFromText } from "@/lib/steganography/text-stego";
import { embedPayloadInSvg, extractPayloadFromSvg } from "@/lib/steganography/svg-stego";
import { incrementStat, addHistoryRecord } from "@/lib/storage/local-storage";

export function useSteganography() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const embedText = useCallback(
    (coverText: string, payload: string): string => {
      setLoading(true);
      setError(null);
      try {
        const result = embedPayloadInText(coverText, payload);
        incrementStat("hidden");

        // Record in history
        try {
          const parsed = JSON.parse(payload);
          addHistoryRecord({
            encryptedPayload: parsed.ciphertext || payload,
            cipher: parsed.algorithm || "AES-GCM",
            iv: parsed.iv || "",
            integrityHash: parsed.integrityHash || "",
            hmac: parsed.hmac || "",
            steganographyType: "text",
          });
        } catch {
          addHistoryRecord({
            encryptedPayload: payload.slice(0, 30),
            cipher: "AES-GCM",
            iv: "",
            integrityHash: "",
            hmac: "",
            steganographyType: "text",
          });
        }

        setLoading(false);
        return result;
      } catch (err: any) {
        setLoading(false);
        const msg = err.message || "Failed to embed payload in text.";
        setError(msg);
        throw new Error(msg);
      }
    },
    []
  );

  const extractText = useCallback((stegoText: string): string => {
    setLoading(true);
    setError(null);
    try {
      const result = extractPayloadFromText(stegoText);
      setLoading(false);
      return result;
    } catch (err: any) {
      setLoading(false);
      const msg = err.message || "No hidden payload detected.";
      setError(msg);
      throw new Error(msg);
    }
  }, []);

  const embedSvg = useCallback((svgContent: string, payload: string): string => {
    setLoading(true);
    setError(null);
    try {
      const result = embedPayloadInSvg(svgContent, payload);
      incrementStat("hidden");

      try {
        const parsed = JSON.parse(payload);
        addHistoryRecord({
          encryptedPayload: parsed.ciphertext || payload,
          cipher: parsed.algorithm || "AES-GCM",
          iv: parsed.iv || "",
          integrityHash: parsed.integrityHash || "",
          hmac: parsed.hmac || "",
          steganographyType: "svg",
        });
      } catch {
        // fallback
      }

      setLoading(false);
      return result;
    } catch (err: any) {
      setLoading(false);
      const msg = err.message || "Failed to embed payload in SVG.";
      setError(msg);
      throw new Error(msg);
    }
  }, []);

  const extractSvg = useCallback((svgContent: string): string => {
    setLoading(true);
    setError(null);
    try {
      const result = extractPayloadFromSvg(svgContent);
      setLoading(false);
      return result;
    } catch (err: any) {
      setLoading(false);
      const msg = err.message || "No hidden payload detected in SVG.";
      setError(msg);
      throw new Error(msg);
    }
  }, []);

  return { embedText, extractText, embedSvg, extractSvg, loading, error };
}
