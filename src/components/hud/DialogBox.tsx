import React from "react";

interface DialogBoxProps {
    message: string;
    onClose: () => void;
}

const DialogBox: React.FC<DialogBoxProps> = ({ message, onClose }) => {
    return (
        <div
            style={{
                position: "absolute", // 確保位置可控
                bottom: "10%", // 位置調整到畫面底部
                left: "50%", // 水平居中
                transform: "translateX(-50%)", // 水平居中對齊
                width: "400px", // 對話框寬度
                height: "100px", // 對話框高度
                backgroundColor: "#1a2431", // 背景顏色
                border: "2px solid #fff", // 邊框樣式
                borderRadius: "8px", // 圓角
                display: "flex", // 文字居中
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "16px",
                textAlign: "center",
                padding: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // 陰影
                zIndex: 1000, // 提高 z-index，確保不被遮蓋
            }}
        >
            <p>{message}</p>
            <button
                onClick={onClose}
                style={{
                    position: "absolute",
                    top: "5px",
                    right: "10px",
                    background: "transparent",
                    color: "#fff",
                    border: "none",
                    fontSize: "16px",
                    cursor: "pointer",
                }}
            >
                ×
            </button>
        </div>
    );
};

export default DialogBox;
