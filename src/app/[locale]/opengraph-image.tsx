import { ImageResponse } from "next/og";

export const alt = "Azamat Satullaev — Hospitality & Management";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#050506",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 600,
            color: "#fafafa",
            letterSpacing: "-0.02em",
            marginBottom: 12,
          }}
        >
          Azamat Satullaev
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#c9a227",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Hospitality & Management
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#71717a",
            marginTop: 24,
          }}
        >
          Strategy · Analytics · Technology
        </div>
      </div>
    ),
    { ...size }
  );
}
