import { LevelSchema, PlacementSchema } from "@/helpers/types";
import { PLACEMENT_TYPE_HERO, PLACEMENT_TYPE_WALL } from "../helpers/consts";
import { placementFactory } from "./PlacementFactory";
import { GameLoop } from "./GameLoop";
import { DirectionControls } from "./DirectionControls";
import LevelsMap from "../levels/levelsMap";
import { Inventory } from "./Inventory";
import { LevelAnimatedFrames } from "./LevelAnimatedFrames";
import { Camera } from "./Camera";
import { Clock } from "./Clock";
import { Heart } from "./Heart";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getPlayerId } from "@/utils/getPlayerId"; // 用來辨識玩家
import { getAnswers, clearAnswers } from "@/utils/answerCache";
type OnEmitType = (level: LevelSchema) => void;

export class LevelState {
  id: string;
  onEmit: OnEmitType;
  directionControls : any;
  isCompleted: any;
  editModePlacementType: any;
  deathOutcome: any;
  theme: any;
  tilesWidth: any;
  tilesHeight: any;
  placements: any;
  inventory: any;
  heroRef: any;
  camera: any;
  clock: any;
  heart: any;
  animatedFrames
  gameLoop: any;
  deathTypesMap: Record<string, number>;
  private totalElapsedTime: number = 0; // 總計時（累積時間）
  private attemptStartTime: number = Date.now(); // 每次開始的時間戳
  private deathCount: number = 0; // 死亡次數
  constructor(levelId: string, onEmit: OnEmitType) {
    // publisher-subscriber pattern
    // onEmit 函數在這裡被用作一種回調機制，允許外部程式碼 "訂閱" LevelState 的狀態變化。
    this.deathTypesMap = {}; // 記錄死法與次數，例如 { spike: 2, enemy: 3 }
    this.id = levelId;
    this.onEmit = onEmit;
    this.directionControls = new DirectionControls();
    this.isCompleted = false;

    this.editModePlacementType = PLACEMENT_TYPE_WALL;

    //Start the level!
    this.start();
  }

  start() {
    if (this.totalElapsedTime === undefined) {
      this.totalElapsedTime = 0;
      this.deathCount = 0;
    }
    this.attemptStartTime = Date.now(); // 每次 start 都要更新開始時間

    const levelData = LevelsMap[this.id];
    this.deathOutcome = null;
    this.theme = levelData.theme;
    this.tilesWidth = levelData.tilesWidth;
    this.tilesHeight = levelData.tilesHeight;
    this.placements = levelData.placements.map((config) => {
      return placementFactory.createPlacement(config, this);
    });

    this.inventory = new Inventory();

    // Cache a reference to the hero
    this.heroRef = this.placements.find((p) => p.type === PLACEMENT_TYPE_HERO);

    // Create a camera
    this.camera = new Camera(this);

    // Create a clock
    this.clock = new Clock(120, this);

    this.heart = new Heart(3,this);

    // Create a frame animation manager
    this.animatedFrames = new LevelAnimatedFrames();

    this.startGameLoop();

    this.isCompleted = false;
  }

  addPlacement(config) {
    this.placements.push(placementFactory.createPlacement(config, this));
  }

  deletePlacement(placementToRemove) {
    this.placements = this.placements.filter((p) => {
      return p.id !== placementToRemove.id;
    });
  }

  startGameLoop() {
    // 先停止，以免重複開新的 GameLoop
    this.gameLoop?.stop();
    this.gameLoop = new GameLoop(() => {
      this.tick();
    });
  }

  tick() {
    // Check for movement here...
    // 透過  get direction 取得按鍵方向
    if (this.directionControls.direction) {
      this.heroRef.controllerMoveRequested(this.directionControls.direction);
    }

    // Call 'tick' on any Placement that wants to update
    this.placements.forEach((placement) => {
      placement.tick();
    });

    // Work on animation frames
    this.animatedFrames.tick();

    // Update the camera
    this.camera.tick();

    // // Update the clock
    this.clock.tick();

    this.heart.tick();

    //Emit any changes to React
    this.onEmit(this.getState());
  }

  isPositionOutOfBounds(x: number, y: number) {
    // 確認角色是否有脫離地圖範圍
    return (
      x === 0 ||
      y === 0 ||
      x >= this.tilesWidth + 1 ||
      y >= this.tilesHeight + 1
    );
  }

  copyPlacementsToClipboard() {
    // Convert the Placements to type,x,y JSON
    // 先將 PlacementsData 轉成 json
    const placementsData = this.placements.map((p) => {
      return {
        type: p.type,
        x: p.x,
        y: p.y,
      };
    });

    // Copy the data to the clipboard for moving into map files after editing
    // 複製到剪貼簿
    navigator.clipboard.writeText(JSON.stringify(placementsData)).then(
      () => {
        console.log("Content copied to clipboard");

        // Also console log the output
        console.log(placementsData);
      },
      () => {
        console.error("Failed to copy");
      }
    );
  }

  setEditModePlacementType(newType) {
    this.editModePlacementType = newType;
  }

  getState() {
    // 讓外部使用 levelState
    return {
      theme: this.theme,
      tilesWidth: this.tilesWidth,
      tilesHeight: this.tilesHeight,
      placements: this.placements,
      deathOutcome: this.deathOutcome,
      isCompleted: this.isCompleted,
      cameraTransformX: this.camera.transformX,
      cameraTransformY: this.camera.transformY,
      secondsRemaining: this.clock.secondsRemaining,
      inventory: this.inventory,
      hpRemaining: this.heart.hpRemaining,
      // 重新開始
      id: this.id,
      // Edit Mode API
      // 將 method 傳出去供外部使用
      enableEditing: false,
      enableReset: true,
      editModePlacementType: this.editModePlacementType,
      addPlacement: this.addPlacement.bind(this),
      deletePlacement: this.deletePlacement.bind(this),
      setEditModePlacementType: this.setEditModePlacementType.bind(this),
      copyPlacementsToClipboard: this.copyPlacementsToClipboard.bind(this),
      restart: this.restart.bind(this),
      changelevel: this.changelevel.bind(this),
    };
  }
  restart() {
    // ✅ 計算這次嘗試的耗時，加入總耗時
    const now = Date.now();
    const elapsed = (now - this.attemptStartTime) / 1000; // 秒
    this.totalElapsedTime += elapsed;
    this.deathCount += 1;
    console.log(`死亡 ${this.deathCount} 次，已累積時間 ${this.totalElapsedTime} 秒`);
  
    this.gameLoop.stop();
    this.start();
  }
  
  changelevel(newLevelId: string) {
    console.log(`切換關卡: ${this.id} → ${newLevelId}`);

    // ✅ 停止當前遊戲循環
    this.gameLoop.stop();

    // ✅ 更新關卡 ID
    this.id = newLevelId;

    // ✅ 重新初始化關卡
    this.start();
  }

  stealInventory() {
    this.placements.forEach((p) => {
      p.resetHasBeenCollected();
    });
    this.inventory.clear();
  }

  setDeathOutcome(causeOfDeath: string) {
    if (this.deathOutcome) return;
  
    this.deathOutcome = causeOfDeath;
    this.gameLoop.stop();
  
    // ✅ 更新死法統計
    if (!this.deathTypesMap[causeOfDeath]) {
      this.deathTypesMap[causeOfDeath] = 1;
    } else {
      this.deathTypesMap[causeOfDeath]++;
    }
  
    // ✅ 單獨死亡紀錄仍然上傳（你可以保留這段）
    // addDoc(collection(db, "deaths"), {
    //   playerId: getPlayerId(),
    //   level: this.id,
    //   cause: causeOfDeath,
    //   timestamp: new Date().toISOString(),
    // }).then(() => {
    //   console.log("☠️ 死亡紀錄已送出：", causeOfDeath);
    // }).catch((err) => {
    //   console.error("死亡紀錄寫入失敗：", err);
    // });
  }
  
  
  async completeLevel() {
    this.isCompleted = true;
  
    const now = Date.now();
    const finalAttempt = (now - this.attemptStartTime) / 1000;
    const totalTime = this.totalElapsedTime + finalAttempt;
    const answers = getAnswers(this.id); // ✅ 拿到這關的所有答題紀錄
    clearAnswers(this.id);               // ✅ 通關後清除記憶體暫存
    try {
      await addDoc(collection(db, "levelCompletion"), {
        playerId: getPlayerId(),
        level: this.id,
        totalTime,
        deathCount: this.deathCount,
        deathTypes: this.deathTypesMap,
        answers: answers,
        timestamp: new Date().toISOString(),
      });
      console.log("✅ 通關紀錄送出！", {
        totalTime,
        deathCount: this.deathCount,
        deathTypes: this.deathTypesMap,
      });
    } catch (err) {
      console.error("❌ 通關紀錄上傳失敗", err);
    }
  
    setTimeout(() => {
      this.gameLoop.stop();
    }, 100);
  }
  
  


  npctalk() {
    this.gameLoop.stop(); // ✅ 停止遊戲循環

    const handleNpcTalkClose = () => {
        setTimeout(() => {
          this.gameLoop.start();
        }, 120);
        // this.gameLoop.start(); // ✅ 重新啟動遊戲循環
        document.removeEventListener("NpcTalkClose", handleNpcTalkClose); // 避免事件重複觸發
    };

    // ✅ 監聽 `NpcTalkClose` 事件，當對話結束時重新啟動遊戲
    document.addEventListener("NpcTalkClose", handleNpcTalkClose);
  }
  question() {
    this.gameLoop.stop();
    console.log(`發送 Question 事件，當前 id: ${this.id}`);

    // ✅ 發送 `Question` 事件，帶上 `id`
    const event = new CustomEvent("Question", {
        detail: { id: this.id } // ✅ 傳遞 `id`
    });
    document.dispatchEvent(event);

    const Nextgogo = (event: CustomEvent) => {
        if (event.detail.id === this.id) { // ✅ 確保事件 `id` 正確
            console.log(`答對，進入下一關! id: ${event.detail.id}`);
            this.gameLoop.start();
            const event2 = new CustomEvent("Nextround", { detail: { id: this.id } });
            document.dispatchEvent(event2);
            document.removeEventListener("Answeright", Nextgogo);
            document.removeEventListener("Answerwrong", Keeptry);
        }
    };

    const Keeptry = (event: CustomEvent) => {
        if (event.detail.id === this.id) { // ✅ 確保事件 `id` 正確
            console.log(`答錯，重新嘗試! id: ${event.detail.id}`);
            this.heart.damage();
            this.gameLoop.start();
            const event3 = new CustomEvent("Againround", { detail: { id: this.id } });
            document.dispatchEvent(event3);
            document.removeEventListener("Answerright", Nextgogo);
            document.removeEventListener("Answerwrong", Keeptry);
        }
    };

    document.addEventListener("Answeright", Nextgogo as EventListener);
    document.addEventListener("Answerwrong", Keeptry as EventListener);
}

  switchAllDoors() {
    this.placements.forEach((placement) => {
      if (placement.toggleIsRaised) {
        placement.toggleIsRaised();
      }
    });
  }
  destroy() {
    // Tear down the level.
    this.gameLoop.stop();
    this.directionControls.unbind();
  }
}
