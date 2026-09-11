export async function generateAESKey(keySize: 128 | 192 | 256 = 256): Promise<CryptoKey> {
  const cryptoObj = globalThis.crypto;
  if (!cryptoObj || !cryptoObj.subtle) {
    throw new Error("Web Crypto API is not available in this environment.");
  }
  return cryptoObj.subtle.generateKey(
    {
      name: "AES-GCM",
      length: keySize,
    },
    true, // extractable for key vault export
    ["encrypt", "decrypt"]
  );
}

export function generateRandomIV(length = 12): Uint8Array {
  const cryptoObj = globalThis.crypto;
  if (!cryptoObj || !cryptoObj.getRandomValues) {
    throw new Error("Secure random generator is unavailable.");
  }
  const iv = new Uint8Array(length);
  cryptoObj.getRandomValues(iv);
  return iv;
}
