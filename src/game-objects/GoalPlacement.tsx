// @ts-nocheck
import { Placement } from "./Placement";
import Sprite from "../components/object-graphics/Sprite";
import { TILES } from "../helpers/tiles";
import { PLACEMENT_TYPE_FLOUR } from "../helpers/consts";
import { PLACEMENT_TYPE_RABBIT } from "../helpers/consts";
export class GoalPlacement extends Placement {
  // get isDisabled() {
  //   // level 中剩餘的 flour 數量
  //   const nonCollectedFlour = this.level.placements.find((p) => {
  //     return p.type === PLACEMENT_TYPE_FLOUR && !p.hasBeenCollected;
  //   });
  //   return Boolean(nonCollectedFlour);
  // }
  get isDisabled() {
    // level 中剩餘的 兔子 數量
    const nonCollectedFlour = this.level.placements.find((p) => {
      return p.type === PLACEMENT_TYPE_RABBIT && !p.alreadyTalk;
    });
    return Boolean(nonCollectedFlour);
  }

  completesLevelOnCollide() {
    return !this.isDisabled;
  }

  canBeDeleted() {
    return false;
  }

  renderComponent() {
    return (
      <Sprite
        frameCoord={this.isDisabled ? TILES.GOAL_DISABLED : TILES.GOAL_ENABLED}
      />
    );
  }
}
