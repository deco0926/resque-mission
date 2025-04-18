import { TILES } from "@/helpers/tiles";
import { GroundEnemyPlacement } from "./GroundEnemyPlacement";
import CiabattaBody from "@/components/object-graphics/CiabattaBody";
import { CELL_SIZE, PLACEMENT_TYPE_ROAMING_ENEMY,PLACEMENT_TYPE_WARNING } from "@/helpers/consts";


const ATTACKS = {
  TACKLE: "TACKLE",
  SPAWN: "SPAWN",
};
const PAIN_FRAMES_LENGTH = 20;
const DEATH_FRAMES_LENGTH = 140;
export class CiabattaPlacement extends GroundEnemyPlacement {
  tickBetweenMovesInterval: any;
  ticksUntilNextMove: any;
  turnsAroundAtWater: any;
  interactsWithGround: any;
  normalMovesRemaining: any;
  hp: any;
  painFramesRemaining: any;
  currentAttack: any;
  deathFramesUntilDisappear: any;
  teleportX: any;
  teleportY: any;
  teleport: any;
  summonhappyX: any;
  summonhappyY: any;
  constructor(properties, level) {
    super(properties, level);
    this.tickBetweenMovesInterval = 40; // 每一步之間經過的 frame 數
    this.ticksUntilNextMove = this.tickBetweenMovesInterval;
    this.turnsAroundAtWater = true;
    this.interactsWithGround = true;

    this.normalMovesRemaining = 4; // 走完四格會出招
    this.hp = 3;
    this.painFramesRemaining = 0;

    this.currentAttack = null;
    this.deathFramesUntilDisappear = 0;
    this.teleportX = 1;
    this.teleportY = 1;
    this.teleport = false;
    this.summonhappyX = 1;
    this.summonhappyY = 1;
  }

  tickAttemptAiMove() {
    // tickAttemptAiMove() 會每個 frame 呼叫
    // Phase 1: Check if we hit the hero -----------------
    this.checkForOverlapWithHero();

    // Phase 2: counters
    // death frames counter
    if (this.deathFramesUntilDisappear > 0) {
      this.deathFramesUntilDisappear -= 1;
      if (this.deathFramesUntilDisappear === 0) {
        this.level.deletePlacement(this);
      }
      return;
    }
    // pain counter
    if (this.painFramesRemaining > 0) {
      this.painFramesRemaining -= 1;
      return;
    }
    // move counter
    if (this.ticksUntilNextMove > 0) {
      this.ticksUntilNextMove -= 1;
      return;
    }

    // Phase 3: Work on behaviors
    if (this.currentAttack) {
      this.workOnAttackFrame();
      return;
    }

    //Turn if next to a wall
    const direction = this.movingPixelDirection;
    if (this.isSolidAtNextPosition(direction)) {
      this.switchDirection();
      return;
    }

    // Next spot is free, so walk there
    if (this.movingPixelsRemaining === 0) {
      // 每走完一步 重置下列屬性
      this.ticksUntilNextMove = this.tickBetweenMovesInterval;
      this.movingPixelsRemaining = CELL_SIZE;
      this.movingPixelDirection = direction;
      this.updateFacingDirection();
      this.updateWalkFrame();
    }
  }

  onPostMove() {
    // Launch new attack if we are done with normal movement
    if (this.normalMovesRemaining === 0) {
      this.normalMovesRemaining = 4;
      this.startAttack();
      return;
    }
    // Keep moving
    this.normalMovesRemaining -= 1;
  }

  startAttack() {
    // Choose a random next attack
    const possibleNextAttacks = [ATTACKS.SPAWN, ATTACKS.TACKLE];
    // const possibleNextAttacks = [ATTACKS.SPAWN];
    // const possibleNextAttacks = [ATTACKS.TACKLE];
    const next =
      possibleNextAttacks[
        Math.floor(Math.random() * possibleNextAttacks.length)
      ];

    // Populate current attack slot
    if (next === ATTACKS.TACKLE) {
      this.currentAttack = {
        type: ATTACKS.TACKLE,
        framesRemaining: 150, // 這個攻擊的持續時間
        returnToY: this.y,
      };
    }
    // if (next === ATTACKS.SPAWN) {
    //   this.currentAttack = {
    //     type: ATTACKS.SPAWN,
    //     framesRemaining: 220, // 這個攻擊的持續時間
    //   };
    // }
  }

  workOnAttackFrame() {
    // 這個 function 會經過 tick() ，每個 frame 呼叫並持續遞減
    this.currentAttack.framesRemaining -= 1;
    // 當攻擊持續時間結束
    if (this.currentAttack.framesRemaining === 0) {
      this.currentAttack = null;
      return;
    }

    if (this.currentAttack.type === ATTACKS.TACKLE) {
      this.handleTackleAttackFrame();
    }
    if (this.currentAttack.type === ATTACKS.SPAWN) {
      this.handleSpawnAttackFrame();
    }
  }

  // 捕捉攻擊
  handleTackleAttackFrame() {
    const { framesRemaining, returnToY } = this.currentAttack;
    this.teleport = true;
    // 在魔王順移前一幀生出警告標示
    if (framesRemaining === 149) { // 提前一幀生出警告
      // 設定警告位置
      this.teleportX = this.level.heroRef.x;
      this.teleportY = this.level.heroRef.y - 1;
      if (this.teleportY < 1) {
        this.teleportY = 1;
      }
      this.level.addPlacement({
        type: PLACEMENT_TYPE_WARNING,
        x: this.teleportX,
        y: this.teleportY, // 預計移動到的位置
      });
      
    }
    if(framesRemaining === 119) {
      this.x = this.teleportX;
      this.y = this.teleportY ;
      this.level.placements.forEach((p) => {
        if (p.type === PLACEMENT_TYPE_WARNING) {
          this.level.deletePlacement(p);
        }
      });
    }
  
    // 順移到主角上方一格
    if (framesRemaining === 90) {
      this.y = this.y + 1;
    }
  
    // 返回原位置
    if (framesRemaining === 50) {
      this.y = returnToY;
      this.teleport = false;
      // 當順移完成時移除警告
    }
  }
  
  

  // 召喚小丑攻擊
  handleSpawnAttackFrame() {
    const { framesRemaining } = this.currentAttack;
    if(framesRemaining === 219) {
      this.summonhappyX = this.level.heroRef.x;
      this.summonhappyY = this.level.heroRef.y;
      [
        {
          type: PLACEMENT_TYPE_WARNING,
          x: this.summonhappyX,
          y: this.summonhappyY + 2,
        },
        {
          type: PLACEMENT_TYPE_WARNING,
          x: this.summonhappyX + 2,
          y: this.summonhappyY,
        },
        {
          type: PLACEMENT_TYPE_WARNING,
          x: this.summonhappyX - 2,
          y: this.summonhappyY,
        },
      ]
        .filter((p) => {
          // Remove placements that are out of bounds
          // 若製造出來的警告超出邊界範圍則排除掉
          return (
            p.x > 0 &&
            p.x <= this.level.tilesWidth &&
            p.y < this.level.tilesHeight 
          );
        })
        .forEach((warningConfig) => {
          // Add to level
          this.level.addPlacement(warningConfig);
        });
    }
    if (framesRemaining === 189) {
      // Configure three roaming enemies around the hero
      this.level.placements.forEach((p) => {
        if (p.type === PLACEMENT_TYPE_WARNING) {
          this.level.deletePlacement(p);
        }
      });
      [
        {
          type: PLACEMENT_TYPE_ROAMING_ENEMY,
          x: this.summonhappyX,
          y: this.summonhappyY + 2,
        },
        {
          type: PLACEMENT_TYPE_ROAMING_ENEMY,
          x: this.summonhappyX + 2,
          y: this.summonhappyY,
        },
        {
          type: PLACEMENT_TYPE_ROAMING_ENEMY,
          x: this.summonhappyX - 2,
          y: this.summonhappyY,
        },
      ]
        .filter((p) => {
          // Remove placements that are out of bounds
          // 若製造出來的小丑超出邊界範圍則排除掉
          return (
            p.x > 0 &&
            p.x <= this.level.tilesWidth &&
            p.y < this.level.tilesHeight 
          );
        })
        .forEach((enemyConfig) => {
          // Add to level
          this.level.addPlacement(enemyConfig);
        });
    }

    // Remove all roaming enemies when the attack is ending
    // 此攻擊結束後收回場上所有小丑
    if (framesRemaining === 1) {
      this.level.placements.forEach((p) => {
        if (p.type === PLACEMENT_TYPE_ROAMING_ENEMY) {
          this.level.deletePlacement(p);
        }
      });
    }
  }

  takesDamage() {
    // Apply pain frames
    this.painFramesRemaining = PAIN_FRAMES_LENGTH;
    this.hp -= 1;

    if (this.hp <= 0) {
      // Start counting death frames
      this.deathFramesUntilDisappear = DEATH_FRAMES_LENGTH;
    }
  }

  getFrame() {
    // Dead skin
    if (this.hp <= 0) {
      return TILES.CIABATTA_DEAD;
    }

    //  CIABATTA 被火燒動畫 Flash in pain
    if (this.painFramesRemaining > 0) {
      return TILES.CIABATTA_PAIN;
    }

    // 若是 捕捉攻擊則更改 skin(CIABATTA_TELEPORT)
    if (this.currentAttack?.type === ATTACKS.TACKLE && this.teleport === true) {
      return TILES.CIABATTA_TELEPORT;
    }

    // Raise arms when moving or spawning
    // 若是 行走 或是 召喚小丑攻擊 則更改 skin(CIABATTA1)
    if (
      this.currentAttack?.type === ATTACKS.SPAWN ||
      this.movingPixelsRemaining > 0
    ) {
      return TILES.CIABATTA1;
    }

    return TILES.CIABATTA2;
  }

  renderComponent() {
    return <CiabattaBody frameCoord={this.getFrame()} yTranslate={0} />;
  }
}
