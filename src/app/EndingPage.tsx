// @ts-nocheck
"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { LevelSchema } from "@/helpers/types";
import { useSetRecoilState } from "recoil";
import { endingAtom } from "@/atoms/endingAtom";

type PropType = {
  level: LevelSchema;
};

export default function EndingPage({ level }: PropType) {
  const setEnding = useSetRecoilState(endingAtom);
  const [hasReleasedEnter, setHasReleasedEnter] = useState(false);

  const returnToStart = useCallback(() => {
    setEnding(false);
    level.changelevel("DemoLevel8");
  }, [level, setEnding]);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        setHasReleasedEnter(true); // 標記為已經放開
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && hasReleasedEnter) {
        returnToStart();
      }
    };

    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [returnToStart, hasReleasedEnter]);

  return (
    <div
      onClick={returnToStart}
      style={{
        fontFamily: "Cubic",
        width: "134vw",
        height: "134vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#030b1e",
        color: "white",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <Image
        src="/ending.png"
        alt="結局畫面"
        width={683}
        height={460}
        style={{ marginBottom: 20 }}
      />
      <h2 style={{ fontSize: 36, maxWidth: "80%" }}>
        感謝你的幫忙，最後后羿成功救下嫦娥！
      </h2>
      <p style={{ marginTop: 24, fontSize: 24, opacity: 0.8 }}>
        按下 Enter 鍵或點擊此處可遊玩挑戰關卡!
      </p>
    </div>
  );
}
