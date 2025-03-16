import styles from "./MapButton.module.css";
import Sprite from "../object-graphics/Sprite";
import { TILES } from "../../helpers/tiles";
import PixelNumber from "../object-graphics/PixelNumber";
import PixelText from "../object-graphics/PixelText";
export default function MapButton({ level }) {
  // ✅ 確保 `level` 和 `level.id` 存在
  const Mapid = level?.id || "DemoLevel2"; 

  // ✅ 使用正則表達式提取數字
  const nowlevel = Mapid.match(/\d+/)?.[0] || "1"; // 沒有數字時預設為 "0"
  

  return (
    <div className={styles.MapButton}>
        <Sprite frameCoord={TILES.MAP_BUTTON} />
        {/* <PixelText text="FLOOR" /> */}
        <PixelNumber number={parseInt(nowlevel, 10)- 1 } /> {/* ✅ 確保傳入的是數字 */}
    </div>
  );
}
