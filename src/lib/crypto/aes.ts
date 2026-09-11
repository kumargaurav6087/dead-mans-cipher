import { generateRandomIV } from "./key-generator";

export async function encryptAESGCM(
  plaintext: string,
  key: CryptoKey,
  customIv?: Uint8Array
): Promise<{ ciphertext: ArrayBuffer; iv: Uint8Array }> {
  if (!plaintext) {
    throw new Error("Cannot encrypt an empty message.");
  }
  const cryptoObj = globalThis.crypto;
  if (!cryptoObj || !cryptoObj.subtle) {
    throw new Error("Web Crypto API is not supported in this environment.");
  }

  // Generate 96-bit (12-byte) IV for AES-GCM if not provided
  const iv = customIv || generateRandomIV(12);
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(plaintext);

  const ciphertext = await cryptoObj.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv as BufferSource,
    },
    key,
    encodedData
  );

  return { ciphertext, iv };
}

export async function decryptAESGCM(
  ciphertext: ArrayBuffer,
  key: CryptoKey,
  iv: Uint8Array
): Promise<string> {
  if (!ciphertext || ciphertext.byteLength === 0) {
    throw new Error("Cannot decrypt empty ciphertext.");
  }
  if (!iv || iv.length === 0) {
    throw new Error("Invalid or missing IV/Nonce.");
  }
  const cryptoObj = globalThis.crypto;
  if (!cryptoObj || !cryptoObj.subtle) {
    throw new Error("Web Crypto API is not supported in this environment.");
  }

  try {
    const decryptedBuffer = await cryptoObj.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv as BufferSource,
      },
      key,
      ciphertext
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
  } catch (err) {
    throw new Error("Decryption failed. The key, IV, or ciphertext may be invalid or tampered with.");
  }
}
