import styles from "./HeartCount.module.css";
import Sprite from "../object-graphics/Sprite";
import { TILES } from "../../helpers/tiles";
import PixelNumber from "../object-graphics/PixelNumber";

export default function HeartCount({ level }) {
  return (
    <div className={styles.heartCount}>
      <Sprite frameCoord={TILES.HEART} />
      <PixelNumber number={level.hpRemaining} />
    </div>
  );
}
