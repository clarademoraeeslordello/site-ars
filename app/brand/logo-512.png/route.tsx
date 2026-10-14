import { ImageResponse } from "next/og";

// 512×512 PNG of the Audit Cockpits icon, used as the Organization logo in structured data
// (search engines prefer a raster logo of at least 112px).
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <svg width="512" height="512" viewBox="0 0 1024 1024">
        <rect width="1024" height="1024" fill="#0a0907" />
        <path d="M362 302 L542 302 L392 722 L212 722 Z M632 302 L812 302 L662 722 L482 722 Z" fill="#c9a43a" />
      </svg>
    ),
    { width: 512, height: 512 }
  );
}
