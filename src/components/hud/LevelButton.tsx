// @ts-nocheck
import { LevelSchema } from "@/helpers/types";
import "./LevelButton.css";
import PixelNumber from "../object-graphics/PixelNumber";

type PropType = {
  level: LevelSchema;
};

const LEVEL_IDS = [
  "DemoLevel1",
  "DemoLevel2",
  "DemoLevel3",
  "DemoLevel4",
  "DemoLevel5",
  "DemoLevel6",
  "DemoLevel7",
];

export default function LevelButton({ level }: PropType) {
  if (!level.enableReset) {
    return null;
  }

  return (
    <div className="level-grid">
      {LEVEL_IDS.map((lvlId, idx) => (
        <button
          key={lvlId}
          className="level-grid-button"
          onClick={(e) => {
            e.preventDefault();
            e.currentTarget.blur();
            // 關閉 NPC 對話框
            document.dispatchEvent(new CustomEvent("CloseNpcTalk"));
            // 切換關卡
            level.changelevel(lvlId);
          }}
        >
          <div className="level-button-bg">
            <PixelNumber number={idx + 1} />
          </div>
        </button>
      ))}

      {/* 空白格子填滿至 3×3 */}
      {Array(9 - LEVEL_IDS.length)
        .fill(null)
        .map((_, i) => (
          <div key={`empty-${i}`} className="level-grid-empty" />
        ))}
    </div>
  );
}
