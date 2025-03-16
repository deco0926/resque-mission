// @ts-nocheck
import { Placement } from "./Placement";
import Body from "../components/object-graphics/Body";
import { TILES } from "../helpers/tiles";
import Sprite from "../components/object-graphics/Sprite";

export class BoardPlacement extends Placement {
    Talking: any;
    alreadyTalk: any;
    constructor(properties, level) {
        super(properties, level);
        this.Talking = properties.Talking ?? "Hi";
        this.alreadyTalk = properties.alreadyTalk ?? false ;
      }
    canbeTalked() {
        return true;
    }
    isSolidForBody(_body) {
        return true;
    }
    tick() {
        if (this.alreadyTalk === true) {
            console.log("移除告示牌", this);
            this.level.deletePlacement(this);
        }
      }
    NpcTalk() {
        this.alreadyTalk = true;
        const event = new CustomEvent("NpcTalk1", {
            detail: { message: this.Talking } // ✅ 傳遞 Talking 內容
        });
        document.dispatchEvent(event);
        console.log("NpcTalk1 事件已觸發，對話內容：", this.Talking); // ✅ Debug 訊息
    }
    zIndex() {
        return 2;
    }
    renderComponent() {
        return <Sprite frameCoord={TILES.BOARD}/>;
    }
}
