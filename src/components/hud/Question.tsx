"use client";
import React from "react";
import Image from "next/image";

export default function Question({ id, onClose }: { id: string; onClose: () => void }) {
  let question = "";
  let options: string[] = [];
  let correctAnswer = "";

  if (id === "DemoLevel1") {
    question = "請問你最忠心的夥伴是誰?";
    options = ["月兔", "雉雞", "小白狗", "小猴子"];
    correctAnswer = "A";
  } else if (id === "DemoLevel2") {
    question = "月亮的表面主要由甚麼組成?";
    options = ["水和沙子", "石頭和岩石", "金屬和冰", "樹木和土壤"];
    correctAnswer = "B";
  } else if (id === "DemoLevel3") {
    question = "請問月亮的高度角是什麼？";
    options = ["月亮的亮度", "月亮的溫度", "月亮與地平線的角度", "月亮的直徑"];
    correctAnswer = "C";
  }

  console.log(`當前關卡 ID: ${id}`);

  const handleAnswer = (answer: string) => {
    if (answer === correctAnswer) {
      document.dispatchEvent(new CustomEvent("Answeright", { detail: { id } })); // ✅ 傳遞 id
    } else {
      document.dispatchEvent(new CustomEvent("Answerwrong", { detail: { id } })); // ✅ 傳遞 id
    }
    onClose(); // ✅ 隱藏問題 UI
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
          width={600} // ✅ 明確指定寬度
          height={150} // ✅ 明確指定高度
          style={{ objectFit: "contain" }}
        />
        <p
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "28px",
            // fontWeight: "bold",
            fontFamily: "Cubic",
            color: "white",
            maxWidth: "80%",
            padding: "5px 20px",
            lineHeight: "1.5",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          {question}
        </p>
      </div>

      {/* ✅ 選項框 */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {["A", "B", "C", "D"].map((option) => (
          <div key={option} style={{ position: "relative", cursor: "pointer" }} onClick={() => handleAnswer(option)}>
            <Image
              src="/text-box.png"
              alt={`選項 ${option}`}
              width={350} // ✅ 明確指定寬度
              height={70} // ✅ 明確指定高度
            />
            <p
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "28px",
                // fontWeight: "bold",
                fontFamily: "Cubic",
                color: "white",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              {option}. {options[["A", "B", "C", "D"].indexOf(option)]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
