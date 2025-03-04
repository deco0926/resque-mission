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
  animatedFrames
  gameLoop: any;
  constructor(levelId: string, onEmit: OnEmitType) {
    // publisher-subscriber pattern
    // onEmit 函數在這裡被用作一種回調機制，允許外部程式碼 "訂閱" LevelState 的狀態變化。
    this.id = levelId;
    this.onEmit = onEmit;
    this.directionControls = new DirectionControls();
    this.isCompleted = false;

    this.editModePlacementType = PLACEMENT_TYPE_WALL;

    //Start the level!
    this.start();
  }

  start() {
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
    this.clock = new Clock(60, this);

    // Create a frame animation manager
    this.animatedFrames = new LevelAnimatedFrames();

    this.startGameLoop();
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
    // this.clock.tick();

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
      // 重新開始
      
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
    };
  }
  restart() {
    this.gameLoop.stop();
    this.start();
  }
  stealInventory() {
    this.placements.forEach((p) => {
      p.resetHasBeenCollected();
    });
    this.inventory.clear();
  }

  setDeathOutcome(causeOfDeath) {
    this.deathOutcome = causeOfDeath;
    this.gameLoop.stop();
  }

  completeLevel() {
    this.isCompleted = true;
    // ✅ 等待 1 Tick（16.67 毫秒）後才停止遊戲循環
    setTimeout(() => {
        this.gameLoop.stop();
    }, 30);
  }


  npctalk() {
    this.gameLoop.stop(); // ✅ 停止遊戲循環

    const handleNpcTalkClose = () => {
        this.gameLoop.start(); // ✅ 重新啟動遊戲循環
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
