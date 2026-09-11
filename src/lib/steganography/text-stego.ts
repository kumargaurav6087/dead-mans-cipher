const ZERO_WIDTH_ZERO = "\u200B"; // 0
const ZERO_WIDTH_ONE = "\u200C";  // 1
const PREFIX = "\uFEFF\u200B\u200C"; // Application Signature Marker
const SUFFIX = "\u200C\u200B\uFEFF";

function stringToBinary(str: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += bytes[i].toString(2).padStart(8, "0");
  }
  return binary;
}

function binaryToString(binary: string): string {
  const bytes = new Uint8Array(binary.length / 8);
  for (let i = 0; i < binary.length; i += 8) {
    bytes[i / 8] = parseInt(binary.substring(i, i + 8), 2);
  }
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
}

export function embedPayloadInText(coverText: string, payload: string): string {
  if (!coverText || coverText.trim() === "") {
    throw new Error("Cover text cannot be empty.");
  }
  if (!payload || payload.trim() === "") {
    throw new Error("Payload to hide cannot be empty.");
  }

  // 1. Convert payload to binary string
  const binary = stringToBinary(payload);

  // 2. Map binary bits to zero-width characters
  let zeroWidthPayload = "";
  for (let i = 0; i < binary.length; i++) {
    zeroWidthPayload += binary[i] === "0" ? ZERO_WIDTH_ZERO : ZERO_WIDTH_ONE;
  }

  // 3. Construct hidden zero-width string with signature markers
  const hiddenString = PREFIX + zeroWidthPayload + SUFFIX;

  // 4. Embed into cover text after the first space or word
  const spaceIndex = coverText.indexOf(" ");
  if (spaceIndex !== -1) {
    return (
      coverText.substring(0, spaceIndex + 1) +
      hiddenString +
      coverText.substring(spaceIndex + 1)
    );
  }

  return coverText + hiddenString;
}

export function extractPayloadFromText(stegoText: string): string {
  if (!stegoText || stegoText.trim() === "") {
    throw new Error("No text provided for extraction.");
  }

  // 1. Locate signature prefix and suffix
  const prefixIdx = stegoText.indexOf(PREFIX);
  const suffixIdx = stegoText.indexOf(SUFFIX, prefixIdx + PREFIX.length);

  let zeroWidthPayload = "";

  if (prefixIdx !== -1 && suffixIdx !== -1) {
    zeroWidthPayload = stegoText.substring(prefixIdx + PREFIX.length, suffixIdx);
  } else {
    // Fallback: extract all zero-width 0s and 1s
    for (let i = 0; i < stegoText.length; i++) {
      const char = stegoText[i];
      if (char === ZERO_WIDTH_ZERO || char === ZERO_WIDTH_ONE) {
        zeroWidthPayload += char;
      }
    }
  }

  if (!zeroWidthPayload || zeroWidthPayload.length % 8 !== 0) {
    throw new Error("No hidden payload detected in the provided text.");
  }

  // 2. Convert zero-width characters back to binary
  let binary = "";
  for (let i = 0; i < zeroWidthPayload.length; i++) {
    const char = zeroWidthPayload[i];
    if (char === ZERO_WIDTH_ZERO) binary += "0";
    else if (char === ZERO_WIDTH_ONE) binary += "1";
  }

  // 3. Convert binary back to original payload string
  try {
    return binaryToString(binary);
  } catch (err) {
    throw new Error("Extracted payload is corrupted or invalid.");
  }
}
