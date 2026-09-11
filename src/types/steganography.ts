export type StegoMedium = 'text-shanty' | 'nautical-svg';

export interface StegoEncodeOptions {
  medium: StegoMedium;
  coverContent: string;
  payload: string;
}

export interface StegoDecodeResult {
  extractedPayload: string;
  medium: StegoMedium;
  success: boolean;
}
