import React, { useState } from "react";
import DialogBox from "./DialogBox"; // 使用之前設計的對話框元件

const RabbitDialog: React.FC = () => {
    const [isTalking, setIsTalking] = useState(false);
    const [message, setMessage] = useState("你好！我是兔子！歡迎來到這裡！");

    const startConversation = () => {
        setIsTalking(true);
    };

    const closeDialog = () => {
        setIsTalking(false);
    };

    return (
        <>
            <button
                onClick={startConversation}
                style={{
                    position: "absolute",
                    bottom: "20%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "10px 20px",
                    backgroundColor: "#1a2431",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                }}
            >
                與兔子交談
            </button>
            {isTalking && <DialogBox message={message} onClose={closeDialog} />}
        </>
    );
};

export default RabbitDialog;
