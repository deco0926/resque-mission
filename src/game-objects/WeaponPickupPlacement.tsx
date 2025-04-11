import { Placement } from "./Placement";
import Sprite from "../components/object-graphics/Sprite";
import { TILES } from "../helpers/tiles";

export class WeaponPickupPlacement extends Placement {
  addsItemToInventoryOnCollide() {
    return this.type;
  }

  renderComponent() {
    return <Sprite frameCoord={TILES.WEAPON_PICKUP} />;
  }
  zIndex() {
    return 2;
  }
}
