import styles from "./InventoryList.module.css";
import { TILES } from "../../helpers/tiles";
import Sprite from "../object-graphics/Sprite";
import {
  PLACEMENT_TYPE_FIRE_PICKUP,
  PLACEMENT_TYPE_ICE_PICKUP,
  PLACEMENT_TYPE_WATER_PICKUP,
  PLACEMENT_TYPE_WEAPON_PICKUP,
} from "../../helpers/consts";

const showInventory = [
  {
    key: PLACEMENT_TYPE_FIRE_PICKUP,
    tile: TILES.FIRE_PICKUP,
  },
  {
    key: PLACEMENT_TYPE_ICE_PICKUP,
    tile: TILES.ICE_PICKUP,
  },
  {
    key: PLACEMENT_TYPE_WATER_PICKUP,
    tile: TILES.WATER_PICKUP,
  },
  {
    key: "KEY_BLUE",
    tile: TILES.BLUE_KEY,
  },
  {
    key: "KEY_GREEN",
    tile: TILES.GREEN_KEY,
  },
  {
    key: PLACEMENT_TYPE_WEAPON_PICKUP,
    tile: TILES.WEAPON_PICKUP,
  },
];

export default function InventoryList({ level }) {
  return (
    <div className={styles.inventory}>
      {showInventory
        .filter((i) => {
          return level.inventory.has(i.key);
        })
        .map((i) => {
          return (
            <div key={i.key} className={styles.inventoryEntry}>
              <Sprite frameCoord={i.tile} />
            </div>
          );
        })}
    </div>
  );
}
