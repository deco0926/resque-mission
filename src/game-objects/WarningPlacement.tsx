import { Placement } from "./Placement";
import Sprite from "../components/object-graphics/Sprite";
import { TILES } from "../helpers/tiles";

export class WarningPlacement extends Placement {
  renderComponent() {
    return <Sprite frameCoord={TILES.WARNING} />;
  }
  zIndex() {
    return 1;
  }
}
