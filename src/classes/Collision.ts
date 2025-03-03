import { PLACEMENT_TYPE_ICE } from "@/helpers/consts";
import { LevelSchema, PlacementSchema } from "@/helpers/types";

type PositionType = {
  x: number;
  y: number;
} | null;

export class Collision {
  forBody: PlacementSchema;
  level: LevelSchema;
  placementsAtPosition: PlacementSchema[];
  x: number;
  y: number;

  constructor(forBody: PlacementSchema, level: LevelSchema, position: PositionType) {
    this.forBody = forBody;
    this.level = level;
    this.placementsAtPosition = []; // ✅ 確保是 `PlacementSchema[]`

    // 檢查是否有自定義座標
    this.x = position ? position.x : forBody.x;
    this.y = position ? position.y : forBody.y;
    this.scanPlacementsAtPosition();
  }

  scanPlacementsAtPosition() {
    // ✅ 強制讓 TypeScript 確保 `p` 是 `PlacementSchema`
    this.placementsAtPosition = this.level.placements.filter((p): p is PlacementSchema => {
      return p.id !== this.forBody.id && p.x === this.x && p.y === this.y;
    });

    if (this.placementsAtPosition.length !== 0) {
      console.log(this.forBody.type, "下一步會遇到 -> ", this.placementsAtPosition);
    }
  }

  withSolidPlacement() {
    return this.placementsAtPosition.find((p) => (p as PlacementSchema).isSolidForBody?.(this.forBody));
  }

  withCompletesLevel() {
    return this.forBody.canCompleteLevel
      ? this.placementsAtPosition.find((p) => (p as PlacementSchema).completesLevelOnCollide?.())
      : null;
  }

  withLock() {
    return this.placementsAtPosition.find((p) => (p as PlacementSchema).canBeUnlocked?.());
  }

  withNpc() {
    return this.placementsAtPosition.find((p) => (p as PlacementSchema).canbeTalked?.());
  }

  withSelfGetsDamaged() {
    return this.placementsAtPosition.find((p) => (p as PlacementSchema).damagesBodyOnCollide?.(this.forBody));
  }

  withPlacementAddsToInventory() {
    return this.forBody.canCollectItems
      ? this.placementsAtPosition.find((p) => !p.hasBeenCollected && (p as PlacementSchema).addsItemToInventoryOnCollide?.(this.forBody))
      : null;
  }

  withChangesHeroSkin() {
    return this.placementsAtPosition.find((p) => (p as PlacementSchema).changesHeroSkinOnCollide?.());
  }

  withPlacementMovesBody() {
    return this.forBody.interactsWithGround
      ? this.placementsAtPosition.find((p) => (p as PlacementSchema).autoMovesBodyOnCollide?.(this.forBody))
      : null;
  }

  withIceCorner() {
    return this.placementsAtPosition.find((p) => (p as PlacementSchema).type === PLACEMENT_TYPE_ICE && (p as PlacementSchema).corner);
  }

  withDoorSwitch() {
    return this.placementsAtPosition.find((p) => (p as PlacementSchema).switchesDoorsOnCollide?.(this.forBody));
  }

  withTeleport() {
    return this.placementsAtPosition.find((p) => Boolean((p as PlacementSchema).teleportsToPositionOnCollide?.(this.forBody)));
  }

  withStealsInventory() {
    return this.placementsAtPosition.find((p) => (p as PlacementSchema).stealsInventoryOnCollide?.(this.forBody));
  }
}
