import styles from "./MapButton.module.css";
import Sprite from "../object-graphics/Sprite";
import { TILES } from "../../helpers/tiles";
import PixelNumber from "../object-graphics/PixelNumber";
import { TitleAtom } from "@/atoms/TitleAtom";
import { useRecoilState } from "recoil";

export default function MapButton({ level }) {
  const [TitleState, setTitleState] = useRecoilState(TitleAtom);
  const Mapid = level?.id || "DemoLevel2";

  // ✅ 使用正則表達式提取數字
  const nowlevel = Mapid.match(/\d+/)?.[0] || "1"; // 沒有數字時預設為 "1"

  // ✅ 點擊 MAP_BUTTON (Sprite) 設定 TitleState 為 true
  const handleClick = () => {
    setTitleState(true);
  };

  return (
    <div className={styles.MapButton}>
      {/* 只有 MAP_BUTTON 可以點擊 */}
      <div onClick={handleClick} style={{ cursor: "pointer" }}>
        <Sprite frameCoord={TILES.MAP_BUTTON} />
      </div>

      {/* PixelNumber 不受點擊影響 */}
      {/* <PixelNumber number={parseInt(nowlevel, 10) - 1} /> */}
    </div>
  );
}
