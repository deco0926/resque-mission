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
        { question: "高度角是用什麼單位來表示的？ ", options: ["公分", "度", "公里", "秒"], correctAnswer: "B" },
        { question: "一天中的什麼時間月亮的高度角最低？", options: ["晚上12點", "傍晚時分", "月亮剛升起時", "半夜過後"], correctAnswer: "C" },
        { question: "用拳頭測量高度角時，一個拳頭約代表幾度？ ", options: ["10度 ", "15度", "5度", "20度"], correctAnswer: "A" },
      ];
      questionData = level3Questions[Math.floor(Math.random() * level3Questions.length)];
    } else if (id === "DemoLevel4") {
      // ✅ 第四關：從題庫中隨機選擇一題
      const level4Questions = [
        { question: "製作高度角量角器時需要什麼材料？ ", options: ["紙板、量角器、繩子和吸管", "木材、膠水和沙子", "電腦和軟體", "石頭和塑膠管"], correctAnswer: "A" },
        { question: "當用高度角量角器測量月亮時，需要指向哪裡？", options: ["地平線", "月亮", "太陽", "星星"], correctAnswer: "B" },
        { question: "高度角量角器上的繩子指向90度，代表什麼？", options: ["月亮在地平線上", "月亮在天空正上方", "看不到月亮", "月亮在西方"], correctAnswer: "B" },
        { question: "月亮高度角可以用什麼儀器來測量？", options: ["望遠鏡", "高度角量角器", "地圖", "照相機"], correctAnswer: "A" },
      ];
      questionData = level4Questions[Math.floor(Math.random() * level4Questions.length)];
    } else if (id === "DemoLevel5") {
      // ✅ 第五關：從題庫中隨機選擇一題
      const level5Questions = [
        { question: "月亮一天中主要是什麼原因導致位置改變？", options: ["地球自轉", "月亮自轉", "太陽的移動", "星星的引力"], correctAnswer: "A" },
        { question: "一天中月亮從哪裡升起？", options: ["東方", "西方", "北方", "南方"], correctAnswer: "A" },
        { question: "當我們看到月亮完全是圓的，這叫什麼？", options: ["半月", "新月", "滿月", "彎月"], correctAnswer: "C" },
        { question: "當月亮看起來像一條細弧線時，我們稱為？", options: ["半月", "新月", "滿月", "弦月"], correctAnswer: "B" },
      ];
      questionData = level5Questions[Math.floor(Math.random() * level5Questions.length)];
    } else if (id === "DemoLevel6") {
      // ✅ 第六關：從題庫中隨機選擇一題
      const level6Questions = [
        { question: "月亮從彎月變圓月的階段叫什麼？", options: ["新月", "滿月", "虧月", "盈月"], correctAnswer: "D" },
        { question: "月亮從圓變成細弧形的階段叫什麼？", options: ["上弦月", "虧月", "盈月", "新月"], correctAnswer: "B" },
        { question: "月相的變化順序正確的是？", options: ["新月→滿月→上弦月→下弦月", "新月→上弦月→滿月→下弦月 ", "滿月→新月→下弦月→上弦月", "滿月→上弦月→新月→下弦月"], correctAnswer: "B" },
        { question: "下列哪個形狀不是月亮會出現的形狀？", options: ["圓形", "半圓形", "三角形", "彎月形"], correctAnswer: "C" },
      ];
      questionData = level6Questions[Math.floor(Math.random() * level6Questions.length)];
    } else if (id === "DemoLevel7") {
      // ✅ 第七關：從題庫中隨機選擇一題
      const level7Questions = [
        { question: "為什麼月亮的形狀每天都不一樣？", options: ["月亮轉動太快", "地球和月亮的位置改變", "月亮自己變形", "天空的雲太多"], correctAnswer: "B" },
        { question: "月亮位於地球和太陽之間時，我們看到的是？", options: ["滿月", "下弦月", "上弦月", "新月"], correctAnswer: "D" },
        { question: "月亮的盈虧變化多久重複一次？", options: ["每月", "每週", "每年", "每天"], correctAnswer: "A" },
        { question: "月亮每天比前一天晚升起時，為什麼？", options: ["月亮持續在公轉", "地球停止轉動", "月亮在變小", "太陽在移動"], correctAnswer: "A" },
      ];
      questionData = level7Questions[Math.floor(Math.random() * level7Questions.length)];
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
        width: "150vw",
        height: "100vh",
        paddingBottom: "30px",
        transform: "translateX(-5%) translateY(33.33%)",
        
      }}
    >
      {/* ✅ 問題框 */}
      <div style={{ position: "relative", marginBottom: "20px" }}>
        <Image
          src="/text-box.png"
          alt="問題框"
          width={1000}
          height={180}
          style={{ objectFit: "contain" }}
        />
        <p
          style={{
            position: "absolute",
            top: "50%",
            left: "45%",
            transform: "translate(-50%, -50%)",
            fontSize: "33px",
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
              width={550}
              height={50}
            />
            <p
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "33px",
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
