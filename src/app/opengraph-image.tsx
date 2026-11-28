import { ImageResponse } from "next/og";

export const alt = "ROOMA — Find the room. Meet the people. Live the city.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 64,
        backgroundColor: "#F1F0EA",
        color: "#151515",
        fontFamily: "sans-serif",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 800, letterSpacing: -4 }}>
            rooma<span style={{ color: "#151515", backgroundColor: "#C7FF35", padding: "0 8px" }}>.</span>
          </div>
          <div style={{ fontSize: 21, fontWeight: 700 }}>STUDENT LIFE / ISTANBUL</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 83, fontWeight: 800, lineHeight: 1.08, letterSpacing: -5 }}>
          <div>Find the room.</div>
          <div>Meet the people.</div>
          <div style={{ display: "flex", alignSelf: "flex-start", backgroundColor: "#C7FF35", padding: "0 12px 8px" }}>Live the city.</div>
        </div>
        <div style={{ display: "flex", fontSize: 25, color: "#52524E" }}>
          Student accommodation &amp; roommate matching in Istanbul.
        </div>
      </div>
    ),
    size
  );
}
