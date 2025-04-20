// @ts-nocheck
import { LevelSchema } from "@/helpers/types";
import "./LevelButton.css";
import PixelNumber from "../object-graphics/PixelNumber";
import { useRecoilState } from "recoil";
import { TitleAtom } from "@/atoms/TitleAtom";
import { currentLevelIdAtom } from "@/atoms/currentLevelIdAtom";
type PropType = {
  level: LevelSchema;
  onCloseMenu?: () => void;
};

// 0 顯示回到標題，其餘 1~7 切關卡
const BUTTONS = [
  { number: 0, levelId: null },
  { number: 1, levelId: "DemoLevel1" },
  { number: 2, levelId: "DemoLevel2" },
  { number: 3, levelId: "DemoLevel3" },
  { number: 4, levelId: "DemoLevel4" },
  { number: 5, levelId: "DemoLevel5" },
  { number: 6, levelId: "DemoLevel6" },
  { number: 7, levelId: "DemoLevel7" },
];

export default function LevelButton({ level, onCloseMenu }: PropType) {
  const [setTttle, setTitleState] = useRecoilState(TitleAtom);
  const [currentId, setCurrentId] = useRecoilState(currentLevelIdAtom);
  const handleTitle = () => {
    setTitleState(true);
    document.dispatchEvent(new CustomEvent("CloseNpcTalk"));
    onCloseMenu?.();
  };

  if (!level.enableReset) {
    return null;
  }

  return (
    <div className="level-grid">
      {BUTTONS.map(({ number, levelId }) => (
        <button
          key={number}
          className="level-grid-button"
          onClick={(e) => {
            e.preventDefault();
            e.currentTarget.blur();

            if (levelId === null) {
              // 0 → 回到標題
              handleTitle();
            } else {
              // 1~7 → 切換關卡
              document.dispatchEvent(new CustomEvent("CloseNpcTalk"));
              // setCurrentId(levelId);
              level.changelevel(levelId);
              onCloseMenu?.();
            }
          }}
        >
          <div className="level-button-bg">
            <PixelNumber number={number} />
          </div>
        </button>
      ))}

      {/* 空白格子留白，保持 3×3 */}
      {Array(9 - BUTTONS.length)
        .fill(null)
        .map((_, i) => (
          <div key={`empty-${i}`} className="level-grid-empty" />
        ))}
    </div>
  );
}
