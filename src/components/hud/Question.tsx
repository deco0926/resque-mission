"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getPlayerId } from "@/utils/getPlayerId";
import { recordAnswer } from "@/utils/answerCache";



// ✅ 題目循環索引記錄器（記得不會跨頁保存）
const questionIndexMap: Record<string, number> = {};

export default function Question({ id, onClose }: { id: string; onClose: () => void }) {
 

  const [selectedQuestion, setSelectedQuestion] = useState({
    question: "",
    options: [],
    correctAnswer: "",
  });

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const optionKeys = ["A", "B", "C", "D"];

  useEffect(() => {
    let questionData;

    const questionPools: Record<string, { question: string; options: string[]; correctAnswer: string }[]> = {
      DemoLevel1: [
        { question: "請問你最忠心的夥伴是誰?", options: ["月兔", "雉雞", "小白狗", "小猴子"], correctAnswer: "A" },
      ],
      DemoLevel2: [
        { question: "月亮的表面有很多坑洞，這些坑洞主要是什麼造成的？", options: ["火山爆發", "隕石撞擊", "地震", "風的侵蝕"], correctAnswer: "B" },
        { question: "月亮的表面主要由什麼組成？", options: ["水和沙子", "石頭和岩石", "金屬和冰", "樹木和土壤"], correctAnswer: "B" },
        { question: "月亮的重力是地球重力的多少倍？", options: ["1倍", "6倍", "1/6倍", "1/10倍"], correctAnswer: "C" },
        { question: "月亮有自己的光芒嗎？", options: ["有，月亮會發光", "只有在白天會發光", "有，但很微弱", "沒有，月亮反射太陽光"], correctAnswer: "D" },
      ],
      DemoLevel3: [
        { question: "月亮的高度角是什麼？", options: ["月亮的亮度", "月亮與地平線的角度", "月亮的溫度", "月亮的直徑"], correctAnswer: "B" },
        { question: "高度角是用什麼單位來表示的？", options: ["公分", "度", "公里", "秒"], correctAnswer: "B" },
        { question: "一天中的什麼時間月亮的高度角最低？", options: ["晚上12點", "傍晚時分", "月亮剛升起時", "半夜過後"], correctAnswer: "C" },
        { question: "用拳頭測量高度角時，一個拳頭約代表幾度？", options: ["15度", "5度", "10度", "20度"], correctAnswer: "C" },
      ],
      DemoLevel4: [
        { question: "製作高度角量角器時需要什麼材料？", options: ["紙板、量角器、繩子和吸管", "木材、膠水和沙子", "電腦和軟體", "石頭和塑膠管"], correctAnswer: "A" },
        { question: "當用高度角量角器測量月亮時，需要指向哪裡？", options: ["地平線", "月亮", "太陽", "星星"], correctAnswer: "B" },
        { question: "高度角量角器上的繩子指向90度，代表什麼？", options: ["月亮在地平線上", "月亮在天空正上方", "看不到月亮", "月亮在西方"], correctAnswer: "B" },
        { question: "月亮高度角可以用什麼儀器來測量？", options: ["望遠鏡", "高度角量角器", "地圖", "照相機"], correctAnswer: "B" },
      ],
      DemoLevel5: [
        { question: "月亮一天中主要是什麼原因導致位置改變？", options: ["地球自轉", "月亮自轉", "太陽的移動", "星星的引力"], correctAnswer: "A" },
        {
          question: "一天中月亮從哪裡升起？",
          options: ["東方", "西方", "北方", "南方"],
          correctAnswer: "A",
        },
        {
          question: "當我們看到月亮完全是圓的，這叫什麼？",
          options: ["半月", "滿月", "新月", "彎月"],
          correctAnswer: "B",
        },
        {
          question: "當月亮看起來像一條細弧線時，我們稱為？",
          options: ["半月", "滿月", "弦月", "新月"],
          correctAnswer: "D",
        }
      ],
      DemoLevel6: [
        { question: "月亮從彎月變圓月的階段叫什麼？", options: ["新月", "滿月", "虧月", "盈月"], correctAnswer: "D" },
        {
          question: "月亮從圓變成細弧形的階段叫什麼？",
          options: ["盈月", "虧月", "新月", "上弦月"],
          correctAnswer: "B", // 虧月 ✅
        },
        {
          question: "月相的變化順序正確的是？",
          options: [
            "新月 → 滿月 → 上弦月 → 下弦月",
            "新月 → 上弦月 → 滿月 → 下弦月",
            "滿月 → 新月 → 下弦月 → 上弦月",
            "滿月 → 上弦月 → 新月 → 下弦月",
          ],
          correctAnswer: "B", // 新月 → 上弦月 → 滿月 → 下弦月 ✅
        },
        {
          question: "下列哪個形狀不是月亮會出現的形狀？",
          options: ["圓形", "半圓形", "三角形", "彎月形"],
          correctAnswer: "C", // 三角形 ✅
        },
      ],
      DemoLevel7: [
        {
          question: "為什麼月亮的形狀每天都不一樣？",
          options: ["月亮轉動太快", "地球和月亮的位置改變", "月亮自己變形", "天空的雲太多"],
          correctAnswer: "B", // 地球和月亮的位置改變 ✅
        },
        {
          question: "月亮位於地球和太陽之間時，我們看到的是？",
          options: ["滿月", "新月", "上弦月", "下弦月"],
          correctAnswer: "B", // 新月 ✅
        },
        {
          question: "月亮的盈虧變化多久重複一次？",
          options: ["每週", "每月", "每年", "每天"],
          correctAnswer: "B", // 每月 ✅
        },
        {
          question: "月亮每天比前一天晚升起時，為什麼？",
          options: ["月亮持續在公轉", "地球停止轉動", "月亮在變小", "太陽在移動"],
          correctAnswer: "A", // 月亮持續在公轉 ✅
        },
      ],
    };

    if (questionPools[id]) {
      const questions = questionPools[id];
    
      if (!questionIndexMap.hasOwnProperty(id)) {
        questionIndexMap[id] = 0;
      }
    
      const currentIndex = Math.floor(questionIndexMap[id]);
      const original = questions[currentIndex];
    
      questionIndexMap[id] = (questionIndexMap[id] + 0.5) % questions.length;
    
      // ✅ 原始正確答案內容
      const originalCorrectText = original.options[["A", "B", "C", "D"].indexOf(original.correctAnswer)];
    
      // ✅ 打亂選項 (Fisher-Yates 洗牌)
      const shuffledOptions = [...original.options];
      for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
      }
    
      // ✅ 找出打亂後正確答案的新索引
      const newCorrectIndex = shuffledOptions.indexOf(originalCorrectText);
      const newCorrectAnswer = ["A", "B", "C", "D"][newCorrectIndex];
    
      // ✅ 更新選擇的題目
      setSelectedQuestion({
        question: original.question,
        options: shuffledOptions,
        correctAnswer: newCorrectAnswer,
      });
    }        
  }, [id]);

  useEffect(() => {
    if (selectedQuestion.question !== "") {
      setSelectedOption(0);
    }
  }, [selectedQuestion]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedOption === null) return;
  
      const key = event.key.toLowerCase();
  
      if (event.key === "ArrowLeft" || key === "a") {
        setSelectedOption((prev) => (prev === 0 ? 3 : prev - 1));
      } else if (event.key === "ArrowRight" || key === "d") {
        setSelectedOption((prev) => (prev === 3 ? 0 : prev + 1));
      } else if (event.key === "Enter") {
        if (selectedOption !== null) {
          handleAnswer(optionKeys[selectedOption]);
        }
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedOption, selectedQuestion]);
  

  
  const handleAnswer = async (answer: string) => {
    if (!selectedQuestion.correctAnswer) return;

    const isCorrect = answer === selectedQuestion.correctAnswer;

    // ✅ 把這次答題記錄進緩存，不直接送到 Firebase
    recordAnswer(id, {
      question: selectedQuestion.question,
      options: selectedQuestion.options,
      selected: answer,
      correct: selectedQuestion.correctAnswer,
      isCorrect,
      timestamp: new Date().toISOString(),
    });

    // ✅ 根據答對或答錯，發送對應的事件（控制劇情與回合流程）
    document.dispatchEvent(
      new CustomEvent(isCorrect ? "Answeright" : "Answerwrong", { detail: { id } })
    );

    // ✅ 關閉題目介面
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
      <div style={{ position: "relative", marginBottom: "20px" }}>
        <Image src="/text-box.png" alt="問題框" width={1000} height={200} style={{ objectFit: "contain" }} />
        <p style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          fontSize: "33px", fontFamily: "Cubic", color: "white", textAlign: "center", whiteSpace: "nowrap"
        }}>
          {selectedQuestion.question}
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {optionKeys.map((option, index) => (
          <div key={option} style={{ position: "relative", cursor: "pointer" }} onClick={() => handleAnswer(option)}>
            <Image src={selectedOption === index ? "/glowing-text-box.png" : "/text-box.png"} alt={`選項 ${option}`} width={600} height={50} />
            <p style={{
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              fontSize: "33px", fontFamily: "Cubic", color: "white", textAlign: "center", whiteSpace: "nowrap"
            }}>
              {option}. {selectedQuestion.options[index]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
