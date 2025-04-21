// @ts-nocheck
import { Placement } from "./Placement";
import Body from "../components/object-graphics/Body";
import { PLACEMENT_TYPE_FLOUR } from "@/helpers/consts";
import { PLACEMENT_TYPE_RABBIT } from "@/helpers/consts";
export class RabbitPlacement extends Placement {
    Talking: any;
    alreadyTalk: any;
    MoonGet : any;
    point: any;
    constructor(properties, level) {
        super(properties, level);
        this.Talking = properties.Talking ?? "Hi";
        this.alreadyTalk = properties.alreadyTalk ?? false ;
        this.MoonGet = properties.MoonGet ?? false ;
        this.point = properties.point ?? "Hi";
      }
    canbeTalked() {
        return true;
    }
    isSolidForBody(_body) {
        return true;
    }
    renderComponent() {
        const rabbitFrame = this.level.animatedFrames.rabbitFrame;
        const rabbitnomoonFrame = this.level.animatedFrames.rabbitnomoonFrame;

        if (this.alreadyTalk === false){ 
            return <Body frameCoord={rabbitFrame} yTranslate={0} showShadow={true} />;
        } else {
            return <Body frameCoord={rabbitnomoonFrame} yTranslate={0} showShadow={true} />;
        }
    }
    NpcTalk() {
        this.alreadyTalk = true;
      
        const event = new CustomEvent("NpcTalk1", {
          detail: {
            message: this.Talking,
            point: this.point,
          },
        });
        document.dispatchEvent(event);
      
        // ✅ 將對話內容傳遞給 level 儲存（用於後續紀錄）
        this.level.latestNpcMessage = this.Talking;
      
        console.log("NpcTalk1 事件已觸發，對話內容：", this.Talking, "重點：", this.point);
    }          
    zIndex() {
        return 2;
    }
}
