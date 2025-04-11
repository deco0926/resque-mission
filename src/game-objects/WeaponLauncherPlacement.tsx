import { Placement } from "./Placement";
import { TILES } from "../helpers/tiles";
import Sprite from "../components/object-graphics/Sprite";
import { PLACEMENT_TYPE_WEAPON_PICKUP } from "@/helpers/consts";

export class WeaponLauncherPlacement extends Placement {
  level: any;

  isSolidForBody(_body) {
    // 是否是實體無法讓角色穿過?
    return false;
  }
  canBeLaunched() {
    return this.level.inventory.has(PLACEMENT_TYPE_WEAPON_PICKUP);
  }
  renderComponent() {
    return <Sprite frameCoord={TILES.WEAPON_LAUNCHER} />;
  }
}
