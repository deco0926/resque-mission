import { DEATH_TYPE_HEART } from "../helpers/consts";
const TIME_PER_TICK = 16.6;
const WARNING_SOUND_SECONDS = 10;

export class Heart {
  hpRemaining: any;
  level: any;
  msRemainingInSecond: any;
  constructor(hpRemaining, level) {
    this.hpRemaining = hpRemaining;
    this.level = level;
    this.msRemainingInSecond = 1000;
  }
  damage(){
    this.hpRemaining -= 1 ;
  }
  tick() {
    this.msRemainingInSecond -= TIME_PER_TICK;
    if (this.msRemainingInSecond <= 0) {
      this.msRemainingInSecond = 1000;

      //Trigger things based on second change
      // Lose if the clock hits 0
      if (this.hpRemaining <= 0) {
        this.level.setDeathOutcome(DEATH_TYPE_HEART);
        return;
      }

      // Warning sound effects!
      if (this.hpRemaining <= WARNING_SOUND_SECONDS) {
        // SFX Goes here...
        console.log("BINK!");
      }
    }
  }
}
