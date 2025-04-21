// @ts-nocheck
"use client";
import { useEffect, useCallback } from "react";
import Image from "next/image";
import { LevelSchema } from "@/helpers/types";
import { useSetRecoilState } from "recoil";
import { endingAtom } from "@/atoms/endingAtom";

type PropType = {
  level: LevelSchema;
};

export default function EndingPage({ level }: PropType) {
  const setEnding = useSetRecoilState(endingAtom);

  // 自動開表單並搶回焦點
  // useEffect(() => {
  //   const url =
  //     "https://docs.google.com/forms/d/e/1FAIpQLSeediRtVQj7hDdJmvMozohPBlbi4UYKTXDq3W5_LJCHP-LFpg/viewform";
  //   const newTab = window.open(url, "_blank", "noopener,noreferrer");
  //   if (newTab) newTab.blur();
  //   window.focus();
  // }, []);

  const returnToStart = useCallback(() => {
    setEnding(false);
    level.changelevel("DemoLevel1");
  }, [level, setEnding]);
  // 監聽 Enter 鍵放開（keyup），必須先放開再按才會觸發
  useEffect(() => {
   const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        returnToStart();
      }
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [returnToStart]);

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
        按下Enter鍵或點擊此處回到遊戲第一關
      </p>
    </div>
  );
}
