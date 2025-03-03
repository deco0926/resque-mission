import { PLACEMENT_TYPE_FLOUR } from "../../helpers/consts";
import styles from "./FlourCount.module.css";
import Sprite from "../object-graphics/Sprite";
import { TILES } from "../../helpers/tiles";
import PixelNumber from "../object-graphics/PixelNumber";
import { PLACEMENT_TYPE_RABBIT } from "../../helpers/consts";

export default function FlourCount({ level }) {
  const count = level.placements.filter((p) => {
    return p.type === PLACEMENT_TYPE_RABBIT && !p.alreadyTalk;
  }).length;

  return (
    <div className={styles.flourCount}>
      <Sprite frameCoord={TILES.FLOUR} />
      <PixelNumber number={count} />
    </div>
  );
}
