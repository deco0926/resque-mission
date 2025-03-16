"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function HomePage({ onGameStart }: { onGameStart: () => void }) {
  const [page, setPage] = useState<number>(-1); // ✅ 預設為 -1，顯示開始遊戲畫面
  const [isKeyDown, setIsKeyDown] = useState<boolean>(false); // ✅ 防止長按 Enter 跳過多頁
  useEffect(() => {
    document.body.style.transform = "scale(1)";
    document.body.style.transformOrigin = "top left";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
  }, []);
  // ✅ 切換到下一頁
  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // 監聽 ENTER 鍵來切換頁面
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Enter" && !isKeyDown) {
        setIsKeyDown(true);
        nextPage();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "Enter") {
        setIsKeyDown(false); // ✅ 釋放按鍵，允許下一次輸入
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isKeyDown]);

  // ✅ 1️⃣ **開始遊戲畫面（第 -1 頁）**
  if (page === -1) {
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
        <h1 style={{ fontSize: "80px", marginBottom: "20px" }}>拯救嫦娥大作戰</h1>

        {/* ✅ 加入 `started.png` (圖片變大) */}
        <Image 
          src="/started.png" 
          alt="開始遊戲畫面" 
          width={750} 
          height={276} 
          style={{ marginBottom: "50px" }}
        />

        <button
          onClick={() => setPage(0)}
          style={{
            fontFamily: "Cubic",
            padding: "10px 20px",
            fontSize: "36px",
            cursor: "pointer",
            letterSpacing: "4px",
            fontWeight:'bold',
            // backgroundColor: "#fff",
            color: "white",
            border: "none",
            borderRadius: "10px",
            transition: "0.3s",
          }}
        >
          開始遊戲
        </button>
      </div>
    );
  }

  // ✅ 劇情文本
  const storyTexts = [
    "后羿和嫦娥是一對很恩愛的夫妻，他們一直生活在月球上",
    "有一天，后羿一如往常要跟嫦娥出門",
    "突然間，一群外星生物出現把嫦娥抓走了！",
    "請你扮演后羿拯救嫦娥吧！"
  ];

  // ✅ 劇情對應的圖片
  const storyImages = [
    "/first.png",
    "/secondfinal.png",
    "/cage.png",
    "/fourthfinal.png"
  ];

  // ✅ 2️⃣ **劇情介紹頁面（第 0~3 頁）**
  if (page < storyTexts.length) {
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
          src={storyImages[page]}
          alt={`劇情第 ${page + 1} 頁`}
          width={500} // ✅ 設定固定寬度
          height={300} // ✅ 設定固定高度
          style={{ marginBottom: "20px" }}
        />
        <h2 style={{ fontSize: "36px", marginBottom: "20px", maxWidth: "80%" }}>{storyTexts[page]}</h2>
        <p style={{ fontSize: "18px", opacity: 0.7, cursor: "pointer" }} onClick={nextPage}>
          按下Enter鍵繼續
        </p>
      </div>
    );
  }

  // ✅ 3️⃣ **月兔介紹頁面（第 4 頁）**
  if (page === storyTexts.length) {
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
        <Image src="/rabbit.png" alt="月兔" width={150} height={150} />
        <h2 style={{ fontSize: "36px", marginBottom: "20px", maxWidth: "80%" }}>
          月兔將是你最忠心的夥伴，碰撞他即可觸發對話，並給予你月亮寶石
        </h2>
        <p style={{ fontSize: "18px", opacity: 0.7, cursor: "pointer" }} onClick={nextPage}>
          按下Enter鍵繼續
        </p>
      </div>
    );
  }

  // ✅ 4️⃣ **月亮寶石介紹頁面（第 5 頁）**
  if (page === storyTexts.length + 1) {
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
        {/* ✅ 月亮寶石未收集完 */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "50px", marginBottom: "20px" }}>
          <div style={{ textAlign: "center" }}>
            <Image src="/moon1.png" alt="未收集完" width={150} height={150} />
            <p style={{ fontSize: "20px", marginTop: "10px" }}>未收集完</p>
          </div>

          {/* ✅ 月亮寶石已收集完 */}
          <div style={{ textAlign: "center" }}>
            <Image src="/moon2.png" alt="已收集完" width={150} height={150} />
            <p style={{ fontSize: "20px", marginTop: "10px" }}>已收集完</p>
          </div>
        </div>

        {/* ✅ 主要描述文字 */}
        <h2 style={{ fontSize: "36px", marginBottom: "20px", maxWidth: "80%" }}>
          此為終點，從月兔那收集到所有的月亮寶石吧!
        </h2>

        <p style={{ fontSize: "18px", opacity: 0.7, cursor: "pointer" }} onClick={nextPage}>
          按下Enter鍵繼續
        </p>
      </div>
    );
  }

  // ✅ 進入遊戲
  onGameStart();
  return null;
}
