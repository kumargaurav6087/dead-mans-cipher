import { uint8ArrayToHex } from "../crypto/encoding";

export async function computeSHA256(data: string): Promise<string> {
  const cryptoObj = globalThis.crypto;
  if (!cryptoObj || !cryptoObj.subtle) {
    throw new Error("Web Crypto API is not supported in this environment.");
  }
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(data || "");
  const hashBuffer = await cryptoObj.subtle.digest("SHA-256", encodedData);
  return uint8ArrayToHex(new Uint8Array(hashBuffer));
}
