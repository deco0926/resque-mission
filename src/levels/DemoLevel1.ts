import {
  LEVEL_THEMES,
  PLACEMENT_TYPE_FLOUR,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_HERO,
  PLACEMENT_TYPE_WALL,
  PLACEMENT_TYPE_LOCK,
  PLACEMENT_TYPE_KEY,
  PLACEMENT_TYPE_WATER,
  PLACEMENT_TYPE_WATER_PICKUP,
  PLACEMENT_TYPE_GROUND_ENEMY,
  PLACEMENT_TYPE_FLYING_ENEMY,
  PLACEMENT_TYPE_ROAMING_ENEMY,
  PLACEMENT_TYPE_CONVEYOR,
  PLACEMENT_TYPE_ICE,
  PLACEMENT_TYPE_ICE_PICKUP,
  PLACEMENT_TYPE_FIRE,
  PLACEMENT_TYPE_FIRE_PICKUP,
  PLACEMENT_TYPE_SWITCH_DOOR,
  PLACEMENT_TYPE_SWITCH,
  PLACEMENT_TYPE_TELEPORT,
  PLACEMENT_TYPE_THIEF,
  PLACEMENT_TYPE_CIABATTA,
  PLACEMENT_TYPE_RABBIT,
  PLACEMENT_TYPE_PRINCESS,
} from "../helpers/consts";
const DemoLevel1 = {
  theme: LEVEL_THEMES.GRAY,
  tilesWidth: 11,
  tilesHeight: 10,
  placements: [
    { x: 1, y: 5, type: PLACEMENT_TYPE_HERO },
    // { x: 2, y: 5, type: PLACEMENT_TYPE_FLOUR },
    { x: 11, y: 5, type: PLACEMENT_TYPE_GOAL },

    { x: 5, y: 1, type: PLACEMENT_TYPE_SWITCH_DOOR, isRaised: true },
    { x: 7, y: 1, type: PLACEMENT_TYPE_SWITCH_DOOR, isRaised: false },
    { x: 6, y: 2, type: PLACEMENT_TYPE_SWITCH },
    { x: 6, y: 3, type: PLACEMENT_TYPE_RABBIT,Talking:"踩下這個按鈕就會改變方塊的狀態~"},

    { x: 10, y: 2, type: PLACEMENT_TYPE_THIEF},
    { x: 10, y: 3, type: PLACEMENT_TYPE_RABBIT,Talking:"踩下這個方塊就會還原之前拿到的道具，要小心哦~"},

    { x: 8, y: 5, type: PLACEMENT_TYPE_KEY},
    { x: 10, y: 5, type: PLACEMENT_TYPE_LOCK},
    { x: 6, y: 5, type: PLACEMENT_TYPE_RABBIT,Talking:"你好~是后羿啊!嫦娥被抓走了!熟悉這些道具的作用然後拿上這個月亮寶石去拯救她吧!"},

    { x: 9, y: 8, type: PLACEMENT_TYPE_ICE_PICKUP},
    { x: 10, y: 8, type: PLACEMENT_TYPE_ICE},
    { x: 11, y: 8, type: PLACEMENT_TYPE_ICE,corner:"TOP_RIGHT"},
    { x: 9, y: 9, type: PLACEMENT_TYPE_ICE},
    { x: 9, y: 10, type: PLACEMENT_TYPE_ICE,corner:"BOTTOM_LEFT"},
    { x: 10, y: 9, type: PLACEMENT_TYPE_ICE},
    { x: 10, y: 10, type: PLACEMENT_TYPE_ICE},
    { x: 11, y: 9, type: PLACEMENT_TYPE_ICE},
    { x: 11, y: 10, type: PLACEMENT_TYPE_ICE,corner:"BOTTOM_RIGHT"},
    { x: 10, y: 7, type: PLACEMENT_TYPE_RABBIT,Talking:"穿上這個就不會滑了~"},

    { x: 5, y: 8, type: PLACEMENT_TYPE_FIRE_PICKUP},
    { x: 6, y: 8, type: PLACEMENT_TYPE_FIRE},
    { x: 7, y: 8, type: PLACEMENT_TYPE_FIRE},
    { x: 5, y: 9, type: PLACEMENT_TYPE_FIRE},
    { x: 5, y: 10, type: PLACEMENT_TYPE_FIRE},
    { x: 6, y: 9, type: PLACEMENT_TYPE_FIRE},
    { x: 6, y: 10, type: PLACEMENT_TYPE_FIRE},
    { x: 7, y: 9, type: PLACEMENT_TYPE_FIRE},
    { x: 7, y: 10, type: PLACEMENT_TYPE_FIRE},
    { x: 6, y: 7, type: PLACEMENT_TYPE_RABBIT,Talking:"穿上這個可以防火~"},

    { x: 1, y: 8, type: PLACEMENT_TYPE_WATER_PICKUP},
    { x: 2, y: 8, type: PLACEMENT_TYPE_WATER},
    { x: 3, y: 8, type: PLACEMENT_TYPE_WATER},
    { x: 1, y: 9, type: PLACEMENT_TYPE_WATER},
    { x: 1, y: 10, type: PLACEMENT_TYPE_WATER},
    { x: 2, y: 9, type: PLACEMENT_TYPE_WATER},
    { x: 2, y: 10, type: PLACEMENT_TYPE_WATER},
    { x: 3, y: 9, type: PLACEMENT_TYPE_WATER},
    { x: 3, y: 10, type: PLACEMENT_TYPE_WATER},
    { x: 2, y: 7, type: PLACEMENT_TYPE_RABBIT,Talking:"穿上這個可以在水裡游泳~"},

    { x: 1, y: 2, type: PLACEMENT_TYPE_TELEPORT},
    { x: 3, y: 2, type: PLACEMENT_TYPE_TELEPORT},
    { x: 2, y: 3, type: PLACEMENT_TYPE_RABBIT,Talking:"只要踩到這個方塊就會移動到另一個對應的方塊哦~"},

    



  ],
};

export default DemoLevel1;
