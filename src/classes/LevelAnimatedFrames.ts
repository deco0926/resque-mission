import { TILES } from "../helpers/tiles";
import { PlacementTypeAnimationFrames } from "./PlacementTypeAnimationFrames";

const WATER_SEQUENCE = [TILES.WATER1, TILES.WATER2];
const WATER_ANIMATION_SPEED = 30;

const FIRE_SEQUENCE = [TILES.FIRE1, TILES.FIRE2, TILES.FIRE3];
const FIRE_ANIMATION_SPEED = 30;

const RABBIT_SEQUENCE = [TILES.Rabbit1,TILES.Rabbit2];
const RABBIT_ANIMATION_SPEED = 30;

const RABBIT_NOMOON_SEQUENCE = [TILES.Rabbit3,TILES.Rabbit4];
const RABBIT_NOMOON_ANIMATION_SPEED = 30;

const PRINCESS_SEQUENCE = [TILES.Princess1,TILES.Princess2];
const PRINCESS_ANIMATION_SPEED = 30;

export class LevelAnimatedFrames {
  waterFrames: any;
  fireFrames: any;
  rabbitFrames: any;
  princessFrames: any;
  rabbitnomoonFrames: any;
  constructor() {
    this.waterFrames = new PlacementTypeAnimationFrames(
      WATER_SEQUENCE,
      WATER_ANIMATION_SPEED
    );
    this.fireFrames = new PlacementTypeAnimationFrames(
      FIRE_SEQUENCE,
      FIRE_ANIMATION_SPEED
    );
    this.rabbitFrames = new PlacementTypeAnimationFrames(
      RABBIT_SEQUENCE,
      RABBIT_ANIMATION_SPEED
    )
    this.rabbitnomoonFrames = new PlacementTypeAnimationFrames(
      RABBIT_NOMOON_SEQUENCE,
      RABBIT_NOMOON_ANIMATION_SPEED
    )
    this.princessFrames = new PlacementTypeAnimationFrames(
      PRINCESS_SEQUENCE,
      PRINCESS_ANIMATION_SPEED
    )
  }

  // Public method for progressing in animation
  tick() {
    this.waterFrames.tick();
    this.fireFrames.tick();
    this.rabbitFrames.tick();
    this.princessFrames.tick();
    this.rabbitnomoonFrames.tick();
  }

  // Public getters for knowing which frame is current
  get waterFrame() {
    return this.waterFrames.activeFrame;
  }

  get fireFrame() {
    return this.fireFrames.activeFrame;
  }

  get rabbitFrame() {
    return this.rabbitFrames.activeFrame;
  }
  get rabbitnomoonFrame(){
    return this.rabbitnomoonFrames.activeFrame;
  }
  get princessFrame() {
    return this.princessFrames.activeFrame;
  }
}
