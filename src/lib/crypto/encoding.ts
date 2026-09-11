export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64.trim());
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export function uint8ArrayToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function hexToUint8Array(hex: string): Uint8Array {
  const cleanHex = hex.trim();
  if (cleanHex.length % 2 !== 0) {
    throw new Error("Invalid hex string length.");
  }
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes[i / 2] = parseInt(cleanHex.substring(i, i + 2), 16);
  }
  return bytes;
}

export async function exportRawKeyToBase64(key: CryptoKey): Promise<string> {
  const cryptoObj = globalThis.crypto;
  if (!cryptoObj || !cryptoObj.subtle) {
    throw new Error("Web Crypto API is unavailable.");
  }
  const rawKey = await cryptoObj.subtle.exportKey("raw", key);
  return arrayBufferToBase64(rawKey);
}

export async function importRawKeyFromBase64(
  base64Key: string,
  algorithm: "AES-GCM" | "HMAC" = "AES-GCM"
): Promise<CryptoKey> {
  const cryptoObj = globalThis.crypto;
  if (!cryptoObj || !cryptoObj.subtle) {
    throw new Error("Web Crypto API is unavailable.");
  }
  const rawBuffer = base64ToArrayBuffer(base64Key);

  if (algorithm === "AES-GCM") {
    return cryptoObj.subtle.importKey("raw", rawBuffer, { name: "AES-GCM" }, true, [
      "encrypt",
      "decrypt",
    ]);
  } else {
    return cryptoObj.subtle.importKey(
      "raw",
      rawBuffer,
      { name: "HMAC", hash: "SHA-256" },
      true,
      ["sign", "verify"]
    );
  }
}
