import { uint8ArrayToHex, hexToUint8Array } from "../crypto/encoding";

export async function generateHMACKey(): Promise<CryptoKey> {
  const cryptoObj = globalThis.crypto;
  if (!cryptoObj || !cryptoObj.subtle) {
    throw new Error("Web Crypto API is not supported in this environment.");
  }
  return cryptoObj.subtle.generateKey(
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"]
  );
}

export async function computeHMAC(data: string, secretKey: CryptoKey): Promise<string> {
  const cryptoObj = globalThis.crypto;
  if (!cryptoObj || !cryptoObj.subtle) {
    throw new Error("Web Crypto API is not supported in this environment.");
  }
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(data || "");

  const signatureBuffer = await cryptoObj.subtle.sign(
    "HMAC",
    secretKey,
    encodedData
  );

  return uint8ArrayToHex(new Uint8Array(signatureBuffer));
}

export async function verifyHMAC(
  data: string,
  signatureHex: string,
  secretKey: CryptoKey
): Promise<boolean> {
  const cryptoObj = globalThis.crypto;
  if (!cryptoObj || !cryptoObj.subtle) {
    throw new Error("Web Crypto API is not supported in this environment.");
  }
  if (!signatureHex) return false;

  try {
    const signatureBytes = hexToUint8Array(signatureHex);
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data || "");

    return await cryptoObj.subtle.verify(
      "HMAC",
      secretKey,
      signatureBytes.buffer as ArrayBuffer,
      encodedData
    );
  } catch (err) {
    return false;
  }
}
