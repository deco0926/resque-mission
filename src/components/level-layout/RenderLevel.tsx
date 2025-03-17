// @ts-nocheck
import React, { CSSProperties, useEffect, useState } from "react";
import styles from "./RenderLevel.module.css";
import { THEME_BACKGROUNDS } from "../../helpers/consts";
import LevelBackgroundTilesLayer from "./LevelBackgroundTilesLayer";
import LevelPlacementsLayer from "./LevelPlacementsLayer";
import { LevelState } from "../../classes/LevelState";
import { LevelSchema } from "@/helpers/types";
import LevelCompleteMessage from "../hud/LevelCompleteMessage";
import { useRecoilValue } from "recoil";
import { currentLevelIdAtom } from "../../atoms/currentLevelIdAtom";
import DeathMessage from "../hud/DeathMessage";
import TopHud from "../hud/TopHud";
import EndingPage from "@/app/EndingPage";
import { endingAtom } from "@/atoms/endingAtom";
import Image from "next/image";
export default function RenderLevel() {
  const endingstate = useRecoilValue(endingAtom);
  const [level, setLevel] = useState<LevelSchema | null>(null);
  const currentLevelId = useRecoilValue(currentLevelIdAtom);
  useEffect(() => {
    document.body.style.transform = "scale(0.75)";
    document.body.style.transformOrigin = "top left";
    document.body.style.width = "133.33%"; // 避免畫面變小
    document.body.style.height = "133.33%"; // 避免畫面變小
  }, []);
  useEffect(() => {
    // Create and subscribe to state changes
    const levelState = new LevelState(currentLevelId, (newState) => {
      setLevel(newState);
    });

    //Get initial state
    setLevel(levelState.getState());

    //Destroy method when this component unmounts for cleanup
    return () => {
      levelState.destroy();
    };
  }, [currentLevelId]);

  if (!level) {
    return null;
  }
  const cameraTranslate = `translate3d(${level.cameraTransformX}, ${level.cameraTransformY}, 0)`;
  if (endingstate === true){
    return <EndingPage />
  } else {
    return (
      <div
        className={styles.fullScreenContainer}
        style={{
          background: THEME_BACKGROUNDS[level.theme],
        }}
      > 
        <p
          style={{
            position: "absolute",
            fontFamily: "Cubic",
            fontSize: "36px",
            color: "black",
            textAlign: "left",
            top: "40%",
            left: "20%",
            transform: "translateX(-50%)",
            whiteSpace: "norwap", // ✅ 讓 \n 換行生效
          }}
        ><span>
          碰撞月兔即可觸發對話，並給予你月亮寶石
          <Image
            src="/moon.png" // ✅ 確保路徑正確
            alt="月亮寶石"
            width={36} // ✅ 設定寬度
            height={36} // ✅ 設定高度
            style={{
              display: "inline-block",
              verticalAlign: "middle", // ✅ 讓圖片和文字對齊
              marginLeft: "5px", // ✅ 增加間距
            }}
          />
          </span>
          <br/>
          收集到所有的月亮寶石並到終點
          <Image
            src="/moon2.png" // ✅ 確保路徑正確
            alt="月亮寶石"
            width={36} // ✅ 設定寬度
            height={36} // ✅ 設定高度
            style={{
              display: "inline-block",
              verticalAlign: "middle", // ✅ 讓圖片和文字對齊
              marginLeft: "5px", // ✅ 增加間距
            }}
          />回答問題!<br/>
          使用方向鍵選擇選項並按下Enter即可回答問題~<br/>
          若卡關了按下
          <Image
          src="/reset.png" // ✅ 確保路徑正確
          alt="月亮寶石"
          width={36} // ✅ 設定寬度
          height={36} // ✅ 設定高度
          style={{
            display: "inline-block",
            verticalAlign: "middle", // ✅ 讓圖片和文字對齊
            marginLeft: "5px", // ✅ 增加間距
          }}
        />此按鈕會重製關卡喔~<br/>
        想重新觀看開頭劇情可以按
        <Image
          src="/map.png" // ✅ 確保路徑正確
          alt="月亮寶石"
          width={36} // ✅ 設定寬度
          height={36} // ✅ 設定高度
          style={{
            display: "inline-block",
            verticalAlign: "middle", // ✅ 讓圖片和文字對齊
            marginLeft: "5px", // ✅ 增加間距
          }}
        />
        此按鈕
        </p>
        <div className={styles.gameScreen}>
          <div
            style={{
              transform: cameraTranslate,
            }}
          >
            {/* 遊戲場景層 */}
            <LevelBackgroundTilesLayer level={level} />
            {/* 遊戲物體層 */}
            <LevelPlacementsLayer level={level} />
          </div>
          
          {level.isCompleted && <LevelCompleteMessage />}
          {level.deathOutcome && <DeathMessage level={level} />}
        </div>
        <TopHud level={level} />
      </div>
    );
  }
}
