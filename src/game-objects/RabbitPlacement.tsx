// @ts-nocheck
import { Placement } from "./Placement";
import Body from "../components/object-graphics/Body";
import { PLACEMENT_TYPE_FLOUR } from "@/helpers/consts";

export class RabbitPlacement extends Placement {
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
    renderComponent() {
        const rabbitFrame = this.level.animatedFrames.rabbitFrame;
        return <Body frameCoord={rabbitFrame} yTranslate={0} showShadow={true} />;
    }
    NpcTalk() {
        this.alreadyTalk = true ;
        const event = new CustomEvent("NpcTalk1", {
            detail: { message: this.Talking } // ✅ 傳遞 Talking 內容
        });
        document.dispatchEvent(event);
        console.log("NpcTalk1 事件已觸發，對話內容：", this.Talking); // ✅ Debug 訊息
    }
    zIndex() {
        return 2;
    }
}
