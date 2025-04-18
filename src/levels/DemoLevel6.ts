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
} from "../helpers/consts";
import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
} from "@/helpers/consts";
const DemoLevel6 = {
  theme: LEVEL_THEMES.GRAY,
  tilesWidth: 11,
  tilesHeight: 11,
  placements: [
    { x: 1, y: 2, type: PLACEMENT_TYPE_HERO },
    { x: 6, y: 6, type: PLACEMENT_TYPE_GOAL },

    { x: 11, y: 1, type: PLACEMENT_TYPE_RABBIT,Talking:"當月亮從細細的彎月慢慢變大，變成圓圓的滿月，這個過程叫做「盈月」哦！就像月亮在長大一樣，越來越亮呢！",point:'盈月'},
    { x: 6, y: 5, type: PLACEMENT_TYPE_RABBIT,Talking:"當月亮從圓圓的滿月變成細細的彎月，這個過程叫做「虧月」哦！月亮就像在慢慢變小，最後變成新月呢！",point:'虧月'},
    { x: 1, y: 7, type: PLACEMENT_TYPE_RABBIT,Talking:"月亮的變化順序是這樣的哦：「新月 → 上弦月 → 滿月 → 下弦月」！這是月亮循環的過程，從完全看不見到圓圓的，再到變小，最後又回到新月啦！",point:'新月 → 上弦月 → 滿月 → 下弦月'},
    { x: 11, y: 11, type: PLACEMENT_TYPE_RABBIT,Talking:"月亮可不會出現三角形的形狀哦！月亮常見的形狀有圓形、半圓形和彎月形呢！",point:'不會出現三角形'},
    
    
    { x: 4, y: 4, type:PLACEMENT_TYPE_WATER},
    { x: 4, y: 5, type:PLACEMENT_TYPE_WATER},
    { x: 4, y: 6, type:PLACEMENT_TYPE_WATER},
    { x: 4, y: 7, type:PLACEMENT_TYPE_WATER},
    { x: 4, y: 8, type:PLACEMENT_TYPE_WATER},
    { x: 5, y: 4, type:PLACEMENT_TYPE_WATER},
    { x: 5, y: 8, type:PLACEMENT_TYPE_WATER},
    { x: 6, y: 4, type:PLACEMENT_TYPE_WATER},
    { x: 6, y: 8, type:PLACEMENT_TYPE_WATER},
    { x: 7, y: 4, type:PLACEMENT_TYPE_WATER},
    { x: 7, y: 8, type:PLACEMENT_TYPE_WATER},
    { x: 8, y: 4, type:PLACEMENT_TYPE_WATER},
    { x: 8, y: 5, type:PLACEMENT_TYPE_WATER},
    { x: 8, y: 6, type:PLACEMENT_TYPE_WATER},
    { x: 8, y: 7, type:PLACEMENT_TYPE_WATER},
    { x: 8, y: 8, type:PLACEMENT_TYPE_WATER},
    { x: 6, y: 9, type:PLACEMENT_TYPE_WATER_PICKUP},


    { x: 5, y: 5, type:PLACEMENT_TYPE_FIRE},
    { x: 5, y: 6, type:PLACEMENT_TYPE_FIRE},
    { x: 5, y: 7, type:PLACEMENT_TYPE_FIRE},
    { x: 6, y: 7, type:PLACEMENT_TYPE_FIRE},
    { x: 7, y: 5, type:PLACEMENT_TYPE_FIRE},
    { x: 7, y: 6, type:PLACEMENT_TYPE_FIRE},
    { x: 7, y: 7, type:PLACEMENT_TYPE_FIRE},
    { x: 6, y: 8, type:PLACEMENT_TYPE_FIRE_PICKUP},

    { x: 3, y: 3, type:PLACEMENT_TYPE_ICE},
    { x: 3, y: 4, type:PLACEMENT_TYPE_ICE},
    { x: 3, y: 5, type:PLACEMENT_TYPE_ICE},
    { x: 3, y: 7, type:PLACEMENT_TYPE_ICE},
    { x: 3, y: 8, type:PLACEMENT_TYPE_ICE},
    { x: 3, y: 9, type:PLACEMENT_TYPE_ICE},
    { x: 4, y: 3, type:PLACEMENT_TYPE_ICE},
    { x: 4, y: 9, type:PLACEMENT_TYPE_ICE},
    { x: 5, y: 3, type:PLACEMENT_TYPE_ICE},
    { x: 5, y: 9, type:PLACEMENT_TYPE_ICE},
    { x: 6, y: 3, type:PLACEMENT_TYPE_ICE},
    { x: 6, y: 9, type:PLACEMENT_TYPE_ICE},
    { x: 7, y: 3, type:PLACEMENT_TYPE_ICE},
    { x: 7, y: 9, type:PLACEMENT_TYPE_ICE},
    { x: 8, y: 3, type:PLACEMENT_TYPE_ICE},
    { x: 8, y: 9, type:PLACEMENT_TYPE_ICE},
    { x: 9, y: 3, type:PLACEMENT_TYPE_ICE},
    { x: 9, y: 4, type:PLACEMENT_TYPE_ICE},
    { x: 9, y: 5, type:PLACEMENT_TYPE_ICE},
    { x: 9, y: 7, type:PLACEMENT_TYPE_ICE},
    { x: 9, y: 8, type:PLACEMENT_TYPE_ICE},
    { x: 9, y: 9, type:PLACEMENT_TYPE_ICE},
    { x: 10, y: 2, type:PLACEMENT_TYPE_ICE_PICKUP},

    // { x: 3, y: 2, type:PLACEMENT_TYPE_THIEF},
    // { x: 2, y: 9, type:PLACEMENT_TYPE_THIEF},
    // { x: 9, y: 10, type:PLACEMENT_TYPE_THIEF},
    // { x: 10, y: 3, type:PLACEMENT_TYPE_THIEF},

    { x: 1, y: 1, type:PLACEMENT_TYPE_GROUND_ENEMY},
    { x: 1, y: 11, type:PLACEMENT_TYPE_GROUND_ENEMY},

    { x: 2, y: 4, type:PLACEMENT_TYPE_CONVEYOR,direction:'UP'},
    { x: 2, y: 5, type:PLACEMENT_TYPE_CONVEYOR,direction:'UP'},
    { x: 2, y: 6, type:PLACEMENT_TYPE_CONVEYOR,direction:'UP'},
    { x: 2, y: 7, type:PLACEMENT_TYPE_CONVEYOR,direction:'UP'},
    { x: 2, y: 8, type:PLACEMENT_TYPE_CONVEYOR,direction:'UP'},
    { x: 3, y: 10, type:PLACEMENT_TYPE_CONVEYOR,direction:'UP'},
    { x: 2, y: 3, type:PLACEMENT_TYPE_CONVEYOR,direction:'RIGHT'},
    { x: 4, y: 2, type:PLACEMENT_TYPE_CONVEYOR,direction:'RIGHT'},
    { x: 5, y: 2, type:PLACEMENT_TYPE_CONVEYOR,direction:'RIGHT'},
    { x: 6, y: 2, type:PLACEMENT_TYPE_CONVEYOR,direction:'RIGHT'},
    { x: 7, y: 2, type:PLACEMENT_TYPE_CONVEYOR,direction:'RIGHT'},
    { x: 8, y: 2, type:PLACEMENT_TYPE_CONVEYOR,direction:'RIGHT'},
    { x: 9, y: 2, type:PLACEMENT_TYPE_CONVEYOR,direction:'DOWN'},
    { x: 10, y: 4, type:PLACEMENT_TYPE_CONVEYOR,direction:'DOWN'},
    { x: 10, y: 5, type:PLACEMENT_TYPE_CONVEYOR,direction:'DOWN'},
    { x: 10, y: 6, type:PLACEMENT_TYPE_CONVEYOR,direction:'DOWN'},
    { x: 10, y: 7, type:PLACEMENT_TYPE_CONVEYOR,direction:'DOWN'},
    { x: 10, y: 8, type:PLACEMENT_TYPE_CONVEYOR,direction:'DOWN'},
    { x: 10, y: 9, type:PLACEMENT_TYPE_CONVEYOR,direction:'LEFT'},
    { x: 4, y: 10, type:PLACEMENT_TYPE_CONVEYOR,direction:'LEFT'},
    { x: 5, y: 10, type:PLACEMENT_TYPE_CONVEYOR,direction:'LEFT'},
    { x: 6, y: 10, type:PLACEMENT_TYPE_CONVEYOR,direction:'LEFT'},
    { x: 7, y: 10, type:PLACEMENT_TYPE_CONVEYOR,direction:'LEFT'},
    { x: 8, y: 10, type:PLACEMENT_TYPE_CONVEYOR,direction:'LEFT'},

    { x: 6, y: 1, type:PLACEMENT_TYPE_SWITCH_DOOR,isRaised:true},
    { x: 6, y: 11, type:PLACEMENT_TYPE_SWITCH_DOOR,isRaised:false},

    { x: 3, y: 6, type:PLACEMENT_TYPE_SWITCH},
    { x: 9, y: 6, type:PLACEMENT_TYPE_SWITCH},
    { x: 1, y: 6, type:PLACEMENT_TYPE_WALL},
    { x: 11, y: 6, type:PLACEMENT_TYPE_WALL},



    





    
  ],
};

export default DemoLevel6;
