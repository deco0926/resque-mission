import {
  DIRECTION_UP,
  DIRECTION_DOWN,
  DIRECTION_RIGHT,
  DIRECTION_LEFT,
} from "../helpers/consts";

export class DirectionControls {
  directionKeys: any;
  heldDirections: any;
  directionKeyDownHandler: any;
  directionKeyUpHandler: any;
  windowBlurHandler: any;

  constructor() {
    this.directionKeys = {
      ArrowDown: DIRECTION_DOWN,
      ArrowUp: DIRECTION_UP,
      ArrowLeft: DIRECTION_LEFT,
      ArrowRight: DIRECTION_RIGHT,
      s: DIRECTION_DOWN,
      w: DIRECTION_UP,
      a: DIRECTION_LEFT,
      d: DIRECTION_RIGHT,
    };
    // 按住的方向鍵會在該陣列裡面
    this.heldDirections = [];

    this.directionKeyDownHandler = (e) => {
      const dir = this.directionKeys[e.key];
      if (dir && this.heldDirections.indexOf(dir) === -1) {
        this.heldDirections.unshift(dir);
      }
    };

    this.directionKeyUpHandler = (e) => {
      const dir = this.directionKeys[e.key];
      const index = this.heldDirections.indexOf(dir);
      if (index > -1) {
        this.heldDirections.splice(index, 1);
      }
    };

    // **新增 window blur 事件處理**
    this.windowBlurHandler = () => {
      this.heldDirections = []; // 清除所有方向鍵，防止卡住
    };

    // 綁定事件監聽器
    document.addEventListener("keydown", this.directionKeyDownHandler);
    document.addEventListener("keyup", this.directionKeyUpHandler);
    window.addEventListener("blur", this.windowBlurHandler);
  }

  get direction() {
    return this.heldDirections[0];
  }

  unbind() {
    document.removeEventListener("keydown", this.directionKeyDownHandler);
    document.removeEventListener("keyup", this.directionKeyUpHandler);
    window.removeEventListener("blur", this.windowBlurHandler); // 移除 blur 事件
  }
}
