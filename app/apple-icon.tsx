import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#101014",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 32 32">
          <g fill="none" stroke="#c6a44a" strokeWidth="1.1">
            <circle cx="16" cy="16" r="10.5" />
            <ellipse cx="16" cy="16" rx="4.6" ry="10.5" />
            <path d="M5.5 16h21" />
            <path d="M7.1 10.5h17.8" />
            <path d="M7.1 21.5h17.8" />
          </g>
          <path
            d="M16 5.5a10.5 10.5 0 0 1 8.6 16.5"
            fill="none"
            stroke="#8a6d1f"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
