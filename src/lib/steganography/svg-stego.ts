const SVG_MARKER_ATTR = 'data-dead-mans-cipher';
const SVG_METADATA_REGEX = /<metadata\s+id="dead-mans-cipher">([^<]+)<\/metadata>/i;
const SVG_ATTR_REGEX = /data-dead-mans-cipher="([^"]+)"/i;

export function embedPayloadInSvg(svgContent: string, payload: string): string {
  if (!svgContent || svgContent.trim() === "") {
    throw new Error("SVG content cannot be empty.");
  }
  if (!payload || payload.trim() === "") {
    throw new Error("Payload to embed cannot be empty.");
  }

  // Base64 encode the payload to ensure safe attribute/metadata insertion
  const encodedPayload = btoa(unescape(encodeURIComponent(payload)));

  // Option 1: Insert custom data attribute into <svg> tag if <svg> tag exists
  if (svgContent.includes("<svg")) {
    const svgTagIndex = svgContent.indexOf("<svg");
    const closingAngleIndex = svgContent.indexOf(">", svgTagIndex);

    if (closingAngleIndex !== -1) {
      const attributeString = ` ${SVG_MARKER_ATTR}="${encodedPayload}"`;
      const modifiedSvgTag =
        svgContent.substring(0, closingAngleIndex) +
        attributeString +
        svgContent.substring(closingAngleIndex);

      // Also add <metadata> element inside <svg>
      const metadataElement = `\n  <metadata id="dead-mans-cipher">${encodedPayload}</metadata>`;
      return modifiedSvgTag.replace(">", `>${metadataElement}`);
    }
  }

  throw new Error("Invalid SVG content: missing <svg> root element.");
}

export function extractPayloadFromSvg(svgContent: string): string {
  if (!svgContent || svgContent.trim() === "") {
    throw new Error("SVG content cannot be empty.");
  }

  let base64Payload: string | null = null;

  // 1. Try finding in <metadata id="dead-mans-cipher"> tag
  const metaMatch = svgContent.match(SVG_METADATA_REGEX);
  if (metaMatch && metaMatch[1]) {
    base64Payload = metaMatch[1];
  } else {
    // 2. Try finding in data-dead-mans-cipher="..." attribute
    const attrMatch = svgContent.match(SVG_ATTR_REGEX);
    if (attrMatch && attrMatch[1]) {
      base64Payload = attrMatch[1];
    }
  }

  if (!base64Payload) {
    throw new Error("No hidden payload detected in SVG ship flag.");
  }

  try {
    return decodeURIComponent(escape(atob(base64Payload)));
  } catch (err) {
    throw new Error("Failed to decode hidden SVG payload.");
  }
}
