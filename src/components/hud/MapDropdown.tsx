// @ts-nocheck
import { LevelSchema } from "@/helpers/types";
import "./ResetButton.css";
import Image from "next/image";
import Sprite from "../object-graphics/Sprite";
import { TILES } from "../../helpers/tiles";
type PropType = {
  level: LevelSchema;
};

export default function MapDropdown({ level }: PropType) {
  return (
    <div>
      <button
        onClick={(event) => {
          level.changelevel()
        }}
      >
      </button>
    </div>
  );
}
