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
import { DirectionControls } from "@/classes/DirectionControls";
import { useRecoilValue } from "recoil";
import { TitleAtom } from "@/atoms/TitleAtom";

soundsManager.init();

export default function Home() {
  const [titlestate, settitlestate] = useRecoilState(TitleAtom);
  const [spriteSheetImage, setSpriteSheetImage] = useRecoilState(spriteSheetImageAtom);
  const [textMessage, setTextMessage] = useState<string>("");
  const [displayedText, setDisplayedText] = useState<string>("");
  const [highlightWord, setHighlightWord] = useState<string>(""); // ✅ 儲存要標紅的關鍵字
  const [gameStarted, setGameStarted] = useState<boolean | null>(null);
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [questionId, setQuestionId] = useState<string | null>(null);

  useEffect(() => {
    const audio = new Audio("sfx/music.mp3");
    audio.loop = true;
    audio.volume = 0.2;
  
    const tryPlay = () => {
      if (gameStarted && titlestate === false) {
        audio.play().catch((e) => {
          console.warn("音樂播放失敗：", e);
        });
      } else {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  
    // ✅ 使用者互動後嘗試播放音樂
    const handleUserInteraction = () => {
      tryPlay();
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  
    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);
  
    // ✅ 監控 titlestate/gameStarted 變化時切換播放狀態
    tryPlay();
  
    return () => {
      audio.pause();
      audio.currentTime = 0;
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  }, [gameStarted, titlestate]);
  
  
  
  
  useEffect(() => {
    const hasVisited = Cookies.get("hasVisited");
    setGameStarted(hasVisited ? true : false);
  }, []);

  const handleGameStart = () => {
    Cookies.set("hasVisited", "true", { expires: 7 });
    settitlestate(false);
    setGameStarted(true);
    setShowQuestion(false);
  };

  useEffect(() => {
    const spriteImage = new window.Image();
    spriteImage.src = SPRITE_SHEET_SRC;
    spriteImage.onload = () => {
      setSpriteSheetImage(spriteImage);
    };
  }, [setSpriteSheetImage]);

  useEffect(() => {
    const handleShowQuestion = (event: CustomEvent) => {
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
    let isKeyDown = false;
    let isDialogueActive = false;
    const directionControls = new DirectionControls();

    const handleNpcTalk = (event: CustomEvent) => {
      if (isDialogueActive) return;
      isDialogueActive = true;

      const fullText = event.detail?.message || "......";
      const keyword = event.detail?.point || ""; // ✅ 取得要標紅的關鍵字
      setTextMessage(fullText);
      setHighlightWord(keyword);
      setDisplayedText("");

      let index = 0;
      let currentText = "";

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
      }, 50);

      const handleKeyPress = (e: KeyboardEvent) => {
        if ((e.code === "Enter" || directionControls.directionKeys[e.key]) && !isKeyDown) {
          isKeyDown = true;

          if (interval !== null) {
            clearInterval(interval);
            interval = null;
            setDisplayedText(fullText);
          } else {
            setDisplayedText("");
            setTextMessage("");
            isDialogueActive = false;

            document.dispatchEvent(new CustomEvent("NpcTalkClose"));
            document.removeEventListener("keydown", handleKeyPress);
            document.removeEventListener("keyup", handleKeyUp);
          }
        }
      };

      const handleKeyUp = (e: KeyboardEvent) => {
        if (e.code === "Enter" || directionControls.directionKeys[e.key]) {
          isKeyDown = false;
        }
      };

      document.addEventListener("keydown", handleKeyPress);
      document.addEventListener("keyup", handleKeyUp);
    };

    const handleCloseNpcTalk = () => {
      if (interval !== null) {
        clearInterval(interval);
        interval = null;
      }
      isDialogueActive = false;
      setDisplayedText("");
      setTextMessage("");
      document.dispatchEvent(new CustomEvent("NpcTalkClose"));
    };

    document.addEventListener("NpcTalk1", handleNpcTalk as EventListener);
    document.addEventListener("CloseNpcTalk", handleCloseNpcTalk);

    return () => {
      document.removeEventListener("NpcTalk1", handleNpcTalk as EventListener);
      document.removeEventListener("CloseNpcTalk", handleCloseNpcTalk);
    };
  }, []);

  // ✅ 讓 `highlightWord` 在 `displayedText` 內變成紅色
  const highlightText = (text: string, keyword: string) => {
    if (!keyword || !text.includes(keyword)) return text;
    const parts = text.split(keyword);
    return parts
      .map((part, index) =>
        index === parts.length - 1 ? part : part + `<span style="color: red">${keyword}</span>`
      )
      .join("");
  };

  if (gameStarted === null) {
    return null;
  }

  if (!gameStarted) {
    return <HomePage onGameStart={handleGameStart} />;
  }

  if (!spriteSheetImage) {
    return null;
  }

  if (titlestate === true) {
    return <HomePage onGameStart={handleGameStart} />;
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
              fontSize: "33px",
              textAlign: "left",
              padding: "20px",
              maxWidth: "1250px",
              wordWrap: "break-word",
            }}
            dangerouslySetInnerHTML={{ __html: highlightText(displayedText, highlightWord) }} // ✅ 標紅關鍵字
          ></div>

          {/* ✅ 右下角提示文字 */}
          <p
            style={{
              position: "absolute",
              bottom: "15px",
              right: "20px",
              fontSize: "20px",
              color: "rgba(255, 255, 255, 0.7)",
              fontFamily: "Cubic",
            }}
          >
            按下 Enter 或 方向鍵 繼續...
          </p>
        </div>
      )}

      {/* ✅ 顯示問題 UI，並傳遞 `id` */}
      {showQuestion && questionId && <Question id={questionId} onClose={() => setShowQuestion(false)} />}
    </div>
  );
}
