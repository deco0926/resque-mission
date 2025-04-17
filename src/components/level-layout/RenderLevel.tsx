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
    whiteSpace: "nowrap", // ✅ 修正拼錯字 "norwap"
  }}
>
  <span>
    碰撞月兔即可觸發對話，並給予你月亮寶石
    <Image
      src="/moon.png"
      alt="月亮寶石"
      width={36}
      height={36}
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        marginLeft: "5px",
      }}
    />
  </span>
  <br />
  收集到所有的月亮寶石並到終點
  <Image
    src="/moon2.png"
    alt="月亮寶石"
    width={36}
    height={36}
    style={{
      display: "inline-block",
      verticalAlign: "middle",
      marginLeft: "5px",
    }}
  />
  回答問題!<br />
  使用方向鍵選擇選項並按下 Enter 即可回答問題~<br />
  <span>
    如果回答錯誤會扣 1 顆心
    <Image
      src="/heart.png"
      alt="愛心"
      width={48}
      height={48}
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        marginLeft: "5px",
      }}
    />
    ，沒心就要重來喔！
  </span>
  <br />
  若卡關了按下
  <Image
    src="/reset.png"
    alt="重製按鈕"
    width={36}
    height={36}
    style={{
      display: "inline-block",
      verticalAlign: "middle",
      marginLeft: "5px",
    }}
  />
  此按鈕會重製關卡喔~<br />
  想選擇其他關卡可以按
  <Image
    src="/map.png"
    alt="地圖按鈕"
    width={36}
    height={36}
    style={{
      display: "inline-block",
      verticalAlign: "middle",
      marginLeft: "5px",
    }}
  />
  此按鈕(0為開頭劇情)
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
