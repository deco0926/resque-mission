"use client";
import { useEffect } from "react";
import Image from "next/image";

export default function EndingPage() {
  useEffect(() => {
    document.body.style.transform = "scale(1)";
    document.body.style.transformOrigin = "top left";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
  }, []);

  return (
    <div
      style={{
        fontFamily: "Cubic",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#030b1e",
        color: "white",
        textAlign: "center",
      }}
    >
      <Image
        src="/ending.png"
        alt="結局畫面"
        width={683}
        height={460}
        style={{ marginBottom: "20px" }}
      />
      <h2 style={{ fontSize: "36px", maxWidth: "80%" }}>
        感謝你的幫忙，最後后羿成功救下嫦娥！
      </h2>
    </div>
  );
}