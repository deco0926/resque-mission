"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Question({ id, onClose }: { id: string; onClose: () => void }) {
  const [selectedQuestion, setSelectedQuestion] = useState({
    question: "",
    options: [],
    correctAnswer: "",
  });

  useEffect(() => {
    let questionData;

    if (id === "DemoLevel1") {
      // ✅ 第一關固定題目
      questionData = {
        question: "請問你最忠心的夥伴是誰?",
        options: ["月兔", "雉雞", "小白狗", "小猴子"],
        correctAnswer: "A",
      };
    } else if (id === "DemoLevel2") {
      // ✅ 第二關：從題庫中隨機選擇一題
      const level2Questions = [
        { question: "月亮的表面有很多坑洞，這些坑洞主要是什麼造成的？", options: ["火山爆發", "隕石撞擊", "地震", "風的侵蝕"], correctAnswer: "B" },
        { question: "月亮的表面主要由什麼組成？", options: ["水和沙子", "石頭和岩石", "金屬和冰", "樹木和土壤"], correctAnswer: "B" },
        { question: "月亮的重力是地球重力的多少倍？", options: ["1倍", "6倍", "1/6倍", "1/10倍"], correctAnswer: "C" },
        { question: "月亮有自己的光芒嗎？ ", options: ["有，月亮會發光 ", "只有在白天會發光", "有，但很微弱", "沒有，月亮反射太陽光"], correctAnswer: "D" },
      ];
      questionData = level2Questions[Math.floor(Math.random() * level2Questions.length)];
    } else if (id === "DemoLevel3") {
      // ✅ 第三關：從題庫中隨機選擇一題
      const level3Questions = [
        { question: "月亮的高度角是什麼？ ", options: ["月亮的亮度 ", "月亮與地平線的角度", "月亮的溫度", "月亮的直徑"], correctAnswer: "B" },
        { question: "如果月亮的高度角是0度，月亮會出現在？ ", options: ["地平線上", "天空正中央", "看不到月亮", "月亮在山後"], correctAnswer: "A" },
        { question: "一天中的什麼時間月亮的高度角最低？", options: ["晚上12點", "傍晚時分", "月亮剛升起時", "半夜過後"], correctAnswer: "C" },
        { question: "用拳頭測量高度角時，一個拳頭約代表幾度？ ", options: ["10度 ", "15度", "5度", "20度"], correctAnswer: "A" },
      ];
      questionData = level3Questions[Math.floor(Math.random() * level3Questions.length)];
    }

    setSelectedQuestion(questionData);
  }, [id]);

  console.log(`當前關卡 ID: ${id}`);

  const handleAnswer = (answer: string) => {
    if (answer === selectedQuestion.correctAnswer) {
      document.dispatchEvent(new CustomEvent("Answeright", { detail: { id } }));
    } else {
      document.dispatchEvent(new CustomEvent("Answerwrong", { detail: { id } }));
    }
    onClose();
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        paddingBottom: "30px",
        
      }}
    >
      {/* ✅ 問題框 */}
      <div style={{ position: "relative", marginBottom: "20px" }}>
        <Image
          src="/text-box.png"
          alt="問題框"
          width={900}
          height={180}
          style={{ objectFit: "contain" }}
        />
        <p
          style={{
            position: "absolute",
            top: "50%",
            left: "45%",
            transform: "translate(-50%, -50%)",
            fontSize: "30px",
            fontFamily: "Cubic",
            color: "white",
            maxWidth: "80%",
            padding: "5px 20px",
            lineHeight: "1.5",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          {selectedQuestion.question}
        </p>
      </div>

      {/* ✅ 選項框 */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {["A", "B", "C", "D"].map((option, index) => (
          <div key={option} style={{ position: "relative", cursor: "pointer" }} onClick={() => handleAnswer(option)}>
            <Image
              src="/text-box.png"
              alt={`選項 ${option}`}
              width={400}
              height={50}
            />
            <p
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "30px",
                fontFamily: "Cubic",
                color: "white",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              {option}. {selectedQuestion.options[index]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
