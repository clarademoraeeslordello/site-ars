import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same drawing as app/icon.svg, scaled to fill the touch icon.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <svg width="180" height="180" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="#101014" />
        <path d="M4 24 A12 12 0 0 1 28 24" stroke="#3a3a40" strokeWidth="1" fill="none" />
        <line x1="19.7" y1="12.6" x2="20.4" y2="11.0" stroke="#6e6e73" strokeWidth="0.8" />
        <line x1="26.7" y1="18.5" x2="28.2" y2="17.8" stroke="#c6a44a" strokeWidth="1.2" />
        <path d="M26.7 18.5 A12 12 0 0 1 28 24" stroke="#c6a44a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <line x1="16" y1="24" x2="25.6" y2="19.8" stroke="#c6a44a" strokeWidth="1" strokeLinecap="round" />
        <circle cx="16" cy="24" r="1.8" fill="#c6a44a" />
        <circle cx="16" cy="24" r="0.7" fill="#101014" />
        <path d="M11 31 L16 24 L21 31" stroke="#faf8f4" strokeWidth="1.4" fill="none" strokeLinejoin="round" strokeLinecap="round" />
        <line x1="13" y1="28" x2="19" y2="28" stroke="#faf8f4" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    ),
    { ...size }
  );
}
