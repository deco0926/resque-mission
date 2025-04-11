import styles from "./HeartCount.module.css";
import Sprite from "../object-graphics/Sprite";
import { TILES } from "../../helpers/tiles";

export default function HeartCount({ level }) {
  const hearts = Array(level.hpRemaining).fill(null);

  return (
    <div className={styles.heartCount}>
      {hearts.map((_, index) => (
        <Sprite key={index} frameCoord={TILES.HEART} />
      ))}
    </div>
  );
}
