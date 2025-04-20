// @ts-nocheck
import { useSetRecoilState } from "recoil";
import { currentLevelIdAtom } from "../../atoms/currentLevelIdAtom";
import { endingAtom } from "@/atoms/endingAtom";
import LevelsMap from "../../levels/levelsMap";
import { LevelSchema } from "@/helpers/types";
import { useKeyPress } from "@/hooks/useKeyPress";
import LevelCompletedSvg from "../object-graphics/LevelCompletedSvg";
import styles from "./PopupMessage.module.css";

type PropType = {
  level: LevelSchema;
};

export default function LevelCompleteMessage({ level }: PropType) {
  const setCurrentId = useSetRecoilState(currentLevelIdAtom);
  const setEnding    = useSetRecoilState(endingAtom);

  const handleGoToNextLevel = () => {
    const levelsArray  = Object.keys(LevelsMap);
    const currentIndex = levelsArray.findIndex((id) => id === level.id);

    // 最後一關，切到結尾畫面
    if (level.id === "DemoLevel7") {
      setEnding(true);
      return;
    }

    const nextLevelId = levelsArray[currentIndex + 1] ?? levelsArray[0];
    setCurrentId(nextLevelId);
  };

  // 監聽 Enter 鍵
  useKeyPress("Enter", handleGoToNextLevel);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.popupContainer}>
        <button className={styles.quietButton} onClick={handleGoToNextLevel}>
          <LevelCompletedSvg />
        </button>
      </div>
    </div>
  );
}
