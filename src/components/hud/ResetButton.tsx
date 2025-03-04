// @ts-nocheck
import { LevelSchema } from "@/helpers/types";
import "./ResetButton.css";
import Image from "next/image";
import Sprite from "../object-graphics/Sprite";
import { TILES } from "../../helpers/tiles";
type PropType = {
  level: LevelSchema;
};

export default function ResetButton({ level }: PropType) {
  if (!level.enableReset) {
    return null;
  }

  return (
    <div className="reset-button">
      <button
        onClick={(event) => {
          event.preventDefault(); // 避免 Enter 影響
          event.currentTarget.blur(); // ✅ 讓按鈕失去焦點，防止 Enter 觸發
          
          // ✅ 發送關閉對話框的事件
          document.dispatchEvent(new CustomEvent("CloseNpcTalk"));

          level.restart(); // ✅ 重置遊戲
        }}
      >
        <Sprite frameCoord={TILES.RESTART_BUTTON}/>
      </button>
    </div>
  );
}
