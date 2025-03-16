import { useRecoilState } from "recoil";
import { currentLevelIdAtom } from "../../atoms/currentLevelIdAtom";
import LevelsMap from "../../levels/levelsMap";
import styles from "./PopupMessage.module.css";
import LevelCompletedSvg from "../object-graphics/LevelCompletedSvg";
import { useKeyPress } from "@/hooks/useKeyPress";

export default function LevelCompleteMessage() {
  const [currentId, setCurrentId] = useRecoilState(currentLevelIdAtom);

  const handleGoToNextLevel = () => {
    const levelsArray = Object.keys(LevelsMap);
    const currentIndex = levelsArray.findIndex((id) => {
      return id === currentId;
    });
    if (currentId === 'DemoLevel1') {
      console.log('Ending');
    }
    const nextLevelId = levelsArray[currentIndex + 1] ?? levelsArray[0];
    setCurrentId(nextLevelId);
  };

  useKeyPress("Enter", () => {
    handleGoToNextLevel();
  });

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
