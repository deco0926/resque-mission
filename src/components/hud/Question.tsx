"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Question({ id, onClose }: { id: string; onClose: () => void }) {
  const [selectedQuestion, setSelectedQuestion] = useState({
    question: "",
    options: [],
    correctAnswer: "",
  });

  const [selectedOption, setSelectedOption] = useState<number | null>(null); // ✅ 初始為 null，避免誤判
  const optionKeys = ["A", "B", "C", "D"];

  useEffect(() => {
    let questionData;

    // ✅ 完整題庫
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
      ],
      DemoLevel4: [
        { question: "製作高度角量角器時需要什麼材料？", options: ["紙板、量角器、繩子和吸管", "木材、膠水和沙子", "電腦和軟體", "石頭和塑膠管"], correctAnswer: "A" },
      ],
      DemoLevel5: [
        { question: "月亮一天中主要是什麼原因導致位置改變？", options: ["地球自轉", "月亮自轉", "太陽的移動", "星星的引力"], correctAnswer: "A" },
      ],
      DemoLevel6: [
        { question: "月亮從彎月變圓月的階段叫什麼？", options: ["新月", "滿月", "虧月", "盈月"], correctAnswer: "D" },
      ],
      DemoLevel7: [
        { question: "為什麼月亮的形狀每天都不一樣？", options: ["月亮轉動太快", "地球和月亮的位置改變", "月亮自己變形", "天空的雲太多"], correctAnswer: "B" },
      ],
    };

    if (questionPools[id]) {
      const questions = questionPools[id];
      questionData = questions[Math.floor(Math.random() * questions.length)];
      setSelectedQuestion(questionData);
    }
  }, [id]);

  // ✅ 確保選項初始化後才設 `selectedOption = 0`
  useEffect(() => {
    if (selectedQuestion.question !== "") {
      setSelectedOption(0);
    }
  }, [selectedQuestion]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedOption === null) return;

      if (event.key === "ArrowLeft") {
        setSelectedOption((prev) => (prev === 0 ? 3 : prev - 1)); // ✅ 往左循環
      } else if (event.key === "ArrowRight") {
        setSelectedOption((prev) => (prev === 3 ? 0 : prev + 1)); // ✅ 往右循環
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

  const handleAnswer = (answer: string) => {
    if (!selectedQuestion.correctAnswer) return; // ✅ 避免未載入時回答錯誤
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
      <div style={{ position: "relative", marginBottom: "20px" }}>
        <Image src="/text-box.png" alt="問題框" width={1000} height={180} style={{ objectFit: "contain" }} />
        <p style={{
          position: "absolute", top: "50%", left: "45%", transform: "translate(-50%, -50%)",
          fontSize: "33px", fontFamily: "Cubic", color: "white", textAlign: "center", whiteSpace: "nowrap"
        }}>
          {selectedQuestion.question}
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {optionKeys.map((option, index) => (
          <div key={option} style={{ position: "relative", cursor: "pointer" }} onClick={() => handleAnswer(option)}>
            <Image src={selectedOption === index ? "/glowing-text-box.png" : "/text-box.png"} alt={`選項 ${option}`} width={550} height={50} />
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
