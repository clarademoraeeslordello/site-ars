import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same symbol as app/icon.svg (brand kit favicon), scaled to fill the touch icon.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <svg width="180" height="180" viewBox="0 0 1024 1024">
        <rect width="1024" height="1024" fill="#0a0907" />
        <path d="M362 302 L542 302 L392 722 L212 722 Z M632 302 L812 302 L662 722 L482 722 Z" fill="#c9a43a" />
      </svg>
    ),
    { ...size }
  );
}
