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
    let interval: NodeJS.Timeout | null = null;
    let isKeyDown = false; // ✅ 防止長按 Enter
    let isDialogueActive = false; // ✅ 防止同時多次觸發對話
  
    const handleNpcTalk = (event) => {
      if (isDialogueActive) return; // ✅ 避免多次觸發
      isDialogueActive = true;
  
      const fullText = event.detail?.message || "......";
      setTextMessage(fullText);
      setDisplayedText(""); // ✅ 確保對話內容從空白開始
      console.log("對話開始: ", fullText);
  
      let index = 0;
      let currentText = "";
  
      // ✅ 確保沒有其他 `interval` 在運行
      if (interval !== null) {
        clearInterval(interval);
      }
  
      interval = setInterval(() => {
        currentText += fullText[index];
        setDisplayedText(currentText);
        index++;
  
        if (index >= fullText.length) {
          if (interval !== null) {
            clearInterval(interval);
            interval = null;
          }
        }
      }, 50); // ✅ 降低間隔，減少同時執行機率
  
      const handleEnterKeyPress = (e: KeyboardEvent) => {
        if (e.code === "Enter" && !isKeyDown) {
          isKeyDown = true;
  
          if (interval !== null) {
            clearInterval(interval);
            interval = null;
            setDisplayedText(fullText);
          } else {
            setDisplayedText("");
            setTextMessage("");
            isDialogueActive = false; // ✅ 確保可以再次觸發
            console.log("對話結束");
  
            document.dispatchEvent(new CustomEvent("NpcTalkClose"));
            document.removeEventListener("keydown", handleEnterKeyPress);
            document.removeEventListener("keyup", handleEnterKeyUp);
          }
        }
      };
  
      const handleEnterKeyUp = (e: KeyboardEvent) => {
        if (e.code === "Enter") {
          isKeyDown = false;
        }
      };
  
      document.addEventListener("keydown", handleEnterKeyPress);
      document.addEventListener("keyup", handleEnterKeyUp);
    };
  
    const handleCloseNpcTalk = () => {
      if (interval !== null) {
        clearInterval(interval);
        interval = null;
      }
      isDialogueActive = false; // ✅ 讓新的對話可以正常啟動
      setDisplayedText("");
      setTextMessage("");
      document.dispatchEvent(new CustomEvent("NpcTalkClose"));
    };
  
    document.addEventListener("NpcTalk1", handleNpcTalk);
    document.addEventListener("CloseNpcTalk", handleCloseNpcTalk);
  
    return () => {
      document.removeEventListener("NpcTalk1", handleNpcTalk);
      document.removeEventListener("CloseNpcTalk", handleCloseNpcTalk);
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
              fontSize: "28px",
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
