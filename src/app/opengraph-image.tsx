import { ImageResponse } from "next/og";
import { Brand, C, OG_SIZE, OG_TYPE, asJpeg, ogDomain, ogFonts, ogImages, ogPhoto } from "@/lib/og";

export const alt = "Aamahata — Mati Odisha rice, dali and homemade badi from Odisha";
export const size = OG_SIZE;
export const contentType = OG_TYPE;

// Three polaroids fanned on the right: [photo folder, rotation, x, y]
const FAN: [string, number, number, number][] = [
  ["niti-usuna", -9, 0, 70],
  ["biri-badi", 7, 230, 20],
  ["kolatha-dali", -3, 120, 250],
];

export default async function Image() {
  const photos = await Promise.all(FAN.map(([f]) => ogPhoto(f)));

  const image = new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: C.chilli, position: "relative", overflow: "hidden" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 0 52px 64px", width: 640 }}>
          <Brand />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontFamily: "Shrikhand", fontSize: 96, lineHeight: 0.98, color: C.cream }}>Taste the</div>
            <div style={{ display: "flex", fontFamily: "Shrikhand", fontSize: 96, lineHeight: 0.98, color: C.sand }}>soil of Odisha</div>
            <div style={{ display: "flex", marginTop: 26, fontFamily: "Bricolage", fontWeight: 500, fontSize: 30, lineHeight: 1.3, color: C.cream, maxWidth: 540 }}>
              Desi usuna rice, dali and homemade badi from Mati Odisha, delivered across India.
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", padding: "10px 22px", borderRadius: 999, border: `3px solid ${C.ink}`, background: C.sand, color: C.ink, fontFamily: "Bricolage", fontWeight: 800, fontSize: 24, boxShadow: `5px 5px 0 ${C.ink}` }}>
              {ogDomain}
            </div>
            <div style={{ display: "flex", fontFamily: "Bricolage", fontWeight: 800, fontSize: 22, letterSpacing: 3, color: C.cream, textTransform: "uppercase" }}>Ethi sabu miliba</div>
          </div>
        </div>

        <div style={{ display: "flex", position: "relative", flex: 1 }}>
          {photos.map((src, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: FAN[i][2],
                top: FAN[i][3],
                display: "flex",
                padding: "12px 12px 40px",
                background: C.paper,
                border: `3px solid ${C.ink}`,
                borderRadius: 14,
                boxShadow: `8px 8px 0 ${C.ink}`,
                transform: `rotate(${FAN[i][1]}deg)`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain img only */}
              <img src={src} width={250} height={250} alt="" style={{ borderRadius: 8, objectFit: "cover" }} />
            </div>
          ))}
          <div style={{ position: "absolute", right: 40, bottom: 34, display: "flex", width: 150, height: 150, borderRadius: 999, background: C.ink, border: `3px solid ${C.ink}`, alignItems: "center", justifyContent: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain img only */}
            <img src={ogImages.seal} width={136} height={136} alt="" />
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: ogFonts },
  );
  return asJpeg(image);
}
