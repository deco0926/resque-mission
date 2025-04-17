// @ts-nocheck
import { useState } from "react";
import { LevelSchema } from "@/helpers/types";
import styles from "./MapButton.module.css";
import Sprite from "../object-graphics/Sprite";
import { TILES } from "../../helpers/tiles";
import LevelButton from "./LevelButton";

type PropType = {
  level: LevelSchema;
};

export default function MapButton({ level }: PropType) {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu((prev) => !prev);

  if (!level.enableReset) {
    return null;
  }

  return (
    <div className={styles.MapButton} style={{ position: "relative" }}>
      {/* 地圖按鈕 */}
      <div onClick={toggleMenu} style={{ cursor: "pointer" }}>
        <Sprite frameCoord={TILES.MAP_BUTTON} />
      </div>

      {/* LevelButton 九宮格選單 */}
      {showMenu && (
        <div style={{ position: "absolute", top: "100%", right: 0, zIndex: 100 }}>
          <LevelButton
            level={level}
            onCloseMenu={() => setShowMenu(false)}
          />
        </div>
      )}
    </div>
  );
}
