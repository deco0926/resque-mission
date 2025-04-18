export class PlacementTypeAnimationFrames {
  framesSequence: any;
  changeOnFrameCount: any;
  showFrame: any;
  tickCounter: any;
  constructor(framesSequence = ["0x1"], changeOnFrameCount = 30) {
    this.framesSequence = framesSequence; // eg. [TILES.FIRE1, TILES.FIRE2, TILES.FIRE3]
    this.changeOnFrameCount = changeOnFrameCount; //Speed. Higher = slow
    this.showFrame = 0;
    this.tickCounter = 0;
  }

  get activeFrame() {
    return this.framesSequence[this.showFrame];
  }

  tick() {
    // Progress through animation
    this.tickCounter += 1;

    //When hitting the limit, change which frame is showing
    if (this.tickCounter > this.changeOnFrameCount) {
      this.tickCounter = 0;
      this.showFrame += 1;
      // Go back to beginning if we pass the final frame
      if (this.showFrame === this.framesSequence.length) {
        this.showFrame = 0;
      }
    }
  }


}
