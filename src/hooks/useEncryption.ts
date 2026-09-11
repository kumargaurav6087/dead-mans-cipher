"use client";

import { useState, useCallback } from "react";
import { generateAESKey, generateRandomIV } from "@/lib/crypto/key-generator";
import { encryptAESGCM, decryptAESGCM } from "@/lib/crypto/aes";
import {
  arrayBufferToBase64,
  base64ToArrayBuffer,
  exportRawKeyToBase64,
  importRawKeyFromBase64,
  uint8ArrayToHex,
} from "@/lib/crypto/encoding";
import { computeSHA256 } from "@/lib/integrity/sha256";
import { generateHMACKey, computeHMAC } from "@/lib/integrity/hmac";
import { SecureCipherPayload } from "@/types/crypto";
import { incrementStat } from "@/lib/storage/local-storage";

export function useEncryption() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const encrypt = useCallback(
    async (
      plaintext: string,
      lat?: string,
      lng?: string
    ): Promise<{
      payload: SecureCipherPayload;
      payloadJson: string;
      rawKeyBase64: string;
      rawIvHex: string;
    }> => {
      setLoading(true);
      setError(null);

      try {
        if (!plaintext || plaintext.trim() === "") {
          throw new Error("Secret message cannot be empty.");
        }

        // Construct payload object containing plaintext and coordinates
        const dataToEncrypt = JSON.stringify({
          message: plaintext,
          lat: lat || null,
          lng: lng || null,
          timestamp: new Date().toISOString(),
        });

        // 1. Generate 256-bit AES-GCM Key & HMAC Key
        const aesKey = await generateAESKey(256);
        const hmacKey = await generateHMACKey();

        // 2. Perform AES-GCM Encryption
        const { ciphertext, iv } = await encryptAESGCM(dataToEncrypt, aesKey);

        // 3. Encode to Base64
        const ciphertextBase64 = arrayBufferToBase64(ciphertext);
        const ivBase64 = arrayBufferToBase64(iv.buffer as ArrayBuffer);

        // 4. Compute SHA-256 Hash of ciphertext
        const integrityHash = await computeSHA256(ciphertextBase64);

        // 5. Compute HMAC-SHA256 signature
        const hmacSignature = await computeHMAC(ciphertextBase64, hmacKey);

        // 6. Export raw key & IV to Base64/Hex
        const rawKeyBase64 = await exportRawKeyToBase64(aesKey);
        const rawIvHex = uint8ArrayToHex(iv);

        const payload: SecureCipherPayload = {
          version: "1.0",
          algorithm: "AES-GCM",
          ciphertext: ciphertextBase64,
          iv: ivBase64,
          integrityHash,
          hmac: hmacSignature,
          createdAt: new Date().toISOString(),
        };

        const payloadJson = JSON.stringify(payload, null, 2);

        incrementStat("encrypted");

        // Safe background sync to Express backend (non-blocking, fallback resilient)
        if (typeof window !== "undefined") {
          fetch("http://localhost:5000/api/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              cipher: "AES-GCM",
              encryptedPayload: ciphertextBase64,
              iv: ivBase64,
              integrityHash,
              hmac: hmacSignature,
              steganographyType: "none",
            }),
          }).catch(() => {
            // Backend offline fallback - client continues seamlessly
          });
        }

        setLoading(false);
        return { payload, payloadJson, rawKeyBase64, rawIvHex };
      } catch (err: any) {
        setLoading(false);
        const userMsg = err.message || "Encryption failed.";
        setError(userMsg);
        throw new Error(userMsg);
      }
    },
    []
  );

  const decrypt = useCallback(
    async (
      payloadInput: string,
      rawKeyBase64: string,
      customIvBase64?: string
    ): Promise<{ message: string; lat: string | null; lng: string | null }> => {
      setLoading(true);
      setError(null);

      try {
        if (!payloadInput || payloadInput.trim() === "") {
          throw new Error("Encrypted payload input cannot be empty.");
        }
        if (!rawKeyBase64 || rawKeyBase64.trim() === "") {
          throw new Error("Encryption key is required for decryption.");
        }

        // Parse payload input (JSON SecureCipherPayload or raw Base64)
        let ciphertextBase64 = "";
        let ivBase64 = customIvBase64 || "";

        try {
          const parsed: SecureCipherPayload = JSON.parse(payloadInput);
          ciphertextBase64 = parsed.ciphertext;
          if (parsed.iv) ivBase64 = parsed.iv;
        } catch {
          // If raw ciphertext input string
          ciphertextBase64 = payloadInput.trim();
        }

        if (!ciphertextBase64) {
          throw new Error("Invalid payload format: missing ciphertext.");
        }
        if (!ivBase64) {
          throw new Error("Missing IV/Nonce required for AES-GCM decryption.");
        }

        // Import AES Key
        const aesKey = await importRawKeyFromBase64(rawKeyBase64.trim(), "AES-GCM");

        // Convert Base64 back to ArrayBuffer / Uint8Array
        const ciphertextBuffer = base64ToArrayBuffer(ciphertextBase64);
        const ivBuffer = new Uint8Array(base64ToArrayBuffer(ivBase64));

        // Perform AES-GCM Decryption
        const decryptedText = await decryptAESGCM(ciphertextBuffer, aesKey, ivBuffer);

        // Try parsing JSON payload if coordinates were included
        try {
          const parsedMsg = JSON.parse(decryptedText);
          setLoading(false);
          return {
            message: parsedMsg.message || decryptedText,
            lat: parsedMsg.lat || null,
            lng: parsedMsg.lng || null,
          };
        } catch {
          setLoading(false);
          return { message: decryptedText, lat: null, lng: null };
        }
      } catch (err: any) {
        setLoading(false);
        const userMsg = err.message || "Decryption failed. Invalid payload or key.";
        setError(userMsg);
        throw new Error(userMsg);
      }
    },
    []
  );

  return { encrypt, decrypt, loading, error };
}
