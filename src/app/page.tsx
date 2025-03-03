"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // ✅ 引入 js-cookie
import { SPRITE_SHEET_SRC } from "../helpers/consts";
import RenderLevel from "../components/level-layout/RenderLevel";
import { useRecoilState } from "recoil";
import { spriteSheetImageAtom } from "../atoms/spriteSheetImageAtom";
import soundsManager from "@/classes/Sounds";
import HomePage from "./homepage";
import Question from "@/components/hud/Question";
import Image from "next/image"; // ✅ 用於 <Image /> 標籤

soundsManager.init();

export default function Home() {
  const [spriteSheetImage, setSpriteSheetImage] = useRecoilState(spriteSheetImageAtom);
  const [textMessage, setTextMessage] = useState<string>("");
  const [displayedText, setDisplayedText] = useState<string>("");
  const [gameStarted, setGameStarted] = useState<boolean | null>(null); // ✅ 初始值為 `null`
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [questionId, setQuestionId] = useState<string | null>(null);

  // ✅ 讀取 Cookie，判斷是否已經進入遊戲
  useEffect(() => {
    const hasVisited = Cookies.get("hasVisited");
    if (hasVisited) {
      setGameStarted(true); // ✅ 直接進入遊戲
    } else {
      setGameStarted(false); // ✅ 顯示 `homepage.tsx`
    }
  }, []);

  // ✅ 設置 Cookie 並開始遊戲
  const handleGameStart = () => {
    Cookies.set("hasVisited", "true", { expires: 7 }); // ✅ 7 天內不再顯示 `homepage.tsx`
    setGameStarted(true);
  };

  useEffect(() => {
    const spriteImage = new window.Image(); // ✅ 改名，避免與 next/image 衝突
    spriteImage.src = SPRITE_SHEET_SRC;
    spriteImage.onload = () => {
      setSpriteSheetImage(spriteImage);
    };
  }, [setSpriteSheetImage]);

  useEffect(() => {
    const handleShowQuestion = (event: CustomEvent) => {
      console.log("收到 Question 事件，id:", event.detail.id);
      setQuestionId(event.detail.id);
      setShowQuestion(true);
    };

    document.addEventListener("Question", handleShowQuestion as EventListener);
    return () => {
      document.removeEventListener("Question", handleShowQuestion as EventListener);
    };
  }, []);

  useEffect(() => {
    const handleNpcTalk = (event) => {
      const fullText = event.detail?.message || "......";
      setTextMessage(fullText);

      let index = 0;
      let currentText = "";
      let interval = setInterval(() => {
        currentText += fullText[index];
        setDisplayedText(currentText);
        index++;
        if (index >= fullText.length) {
          clearInterval(interval);
          interval = null;
        }
      }, 100);

      const handleEnterKeyPress = (e) => {
        if (e.code === "Enter") {
          if (interval) {
            clearInterval(interval);
            setDisplayedText(fullText);
            interval = null;
          } else {
            setDisplayedText("");
            setTextMessage("");
            document.dispatchEvent(new CustomEvent("NpcTalkClose"));
            document.removeEventListener("keydown", handleEnterKeyPress);
          }
        }
      };

      document.addEventListener("keydown", handleEnterKeyPress);
    };

    document.addEventListener("NpcTalk1", handleNpcTalk);
    return () => {
      document.removeEventListener("NpcTalk1", handleNpcTalk);
    };
  }, []);

  // ✅ **避免 `homepage.tsx` 被短暫渲染**
  if (gameStarted === null) {
    return null; // ✅ **等待 cookie 檢查完畢**
  }

  if (!gameStarted) {
    return <HomePage onGameStart={handleGameStart} />;
  }

  if (!spriteSheetImage) {
    return null;
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <RenderLevel />

      {/* ✅ NPC 對話框 */}
      {displayedText && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "top",
            justifyContent: "left",
            flexDirection: "column",
          }}
        >
          <Image
            src="/text-box.png"
            alt="Text Box"
            width={1250}
            height={250}
            style={{ objectFit: "contain" }}
          />
          <div
            style={{
              position: "absolute",
              color: "#fff",
              fontFamily: "Cubic",
              fontSize: "30px",
              textAlign: "left",
              padding: "20px",
              maxWidth: "1000px",
              wordWrap: "break-word",
            }}
          >
            {displayedText}
          </div>
          {/* ✅ 右下角提示文字 */}
          <p
            style={{
              position: "absolute",
              bottom: "15px",
              right: "20px",
              fontSize: "18px",
              color: "rgba(255, 255, 255, 0.7)", // 半透明白色
              fontFamily: "Cubic",
            }}
          >
            按下 Enter 鍵繼續...
          </p>
        </div>
      )}

      {/* ✅ 顯示問題 UI，並傳遞 `id` */}
      {showQuestion && questionId && <Question id={questionId} onClose={() => setShowQuestion(false)} />}
    </div>
  );
}
