import {
  PLACEMENT_TYPE_HERO,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_WALL,
  PLACEMENT_TYPE_FLOUR,
  PLACEMENT_TYPE_CELEBRATION,
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
  PLACEMENT_TYPE_BOARD,
  PLACEMENT_TYPE_WARNING,
  PLACEMENT_TYPE_WEAPON,
  PLACEMENT_TYPE_WEAPON_PICKUP,
  PLACEMENT_TYPE_WEAPON_LAUNCHER,
} from "../helpers/consts";

import { HeroPlacement } from "../game-objects/HeroPlacement";
import { GoalPlacement } from "../game-objects/GoalPlacement";
import { WallPlacement } from "../game-objects/WallPlacement";
import { FlourPlacement } from "../game-objects/FlourPlacement";
import { CelebrationPlacement } from "../game-objects/CelebrationPlacement";
import { LockPlacement } from "../game-objects/LockPlacement";
import { KeyPlacement } from "../game-objects/KeyPlacement";
import { WaterPlacement } from "../game-objects/WaterPlacement";
import { GroundEnemyPlacement } from "../game-objects/GroundEnemyPlacement";
import { FlyingEnemyPlacement } from "../game-objects/FlyingEnemyPlacement";
import { RoamingEnemyPlacement } from "../game-objects/RoamingEnemyPlacement";
import { ConveyorPlacement } from "../game-objects/ConveyorPlacement";
import { IcePlacement } from "../game-objects/IcePlacement";
import { IcePickupPlacement } from "../game-objects/IcePickupPlacement";
import { FirePlacement } from "../game-objects/FirePlacement";
import { FirePickupPlacement } from "../game-objects/FirePickupPlacement";
import { SwitchableDoorPlacement } from "../game-objects/SwitchableDoorPlacement";
import { DoorSwitchPlacement } from "../game-objects/DoorSwitchPlacement";
import { TeleportPlacement } from "../game-objects/TeleportPlacement";
import { ThiefPlacement } from "../game-objects/ThiefPlacement";
import { CiabattaPlacement } from "../game-objects/CiabattaPlacement";
import { RabbitPlacement } from "@/game-objects/RabbitPlacement";
import { PrincessPlacement } from "@/game-objects/PrincessPlacement";
import { BoardPlacement } from "@/game-objects/BoardPlacement";
// types
import { LevelSchema, PlacementSchema } from "@/helpers/types";
import { WaterPickupPlacement } from "@/game-objects/WaterPickupPlacement";
import { WarningPlacement } from "@/game-objects/WarningPlacement";
import { WeaponPickupPlacement } from "@/game-objects/WeaponPickupPlacement";
import { WeaponLauncherPlacement } from "@/game-objects/WeaponLauncherPlacement";


const placementTypeClassMap = {
  [PLACEMENT_TYPE_HERO]: HeroPlacement,
  [PLACEMENT_TYPE_GOAL]: GoalPlacement,
  [PLACEMENT_TYPE_WALL]: WallPlacement,
  [PLACEMENT_TYPE_FLOUR]: FlourPlacement,
  [PLACEMENT_TYPE_CELEBRATION]: CelebrationPlacement,
  [PLACEMENT_TYPE_LOCK]: LockPlacement,
  [PLACEMENT_TYPE_KEY]: KeyPlacement,
  [PLACEMENT_TYPE_WATER]: WaterPlacement,
  [PLACEMENT_TYPE_WATER_PICKUP]: WaterPickupPlacement,
  [PLACEMENT_TYPE_GROUND_ENEMY]: GroundEnemyPlacement,
  [PLACEMENT_TYPE_FLYING_ENEMY]: FlyingEnemyPlacement,
  [PLACEMENT_TYPE_ROAMING_ENEMY]: RoamingEnemyPlacement,
  [PLACEMENT_TYPE_RABBIT]: RabbitPlacement,
  [PLACEMENT_TYPE_PRINCESS]: PrincessPlacement,
  [PLACEMENT_TYPE_CONVEYOR]: ConveyorPlacement,
  [PLACEMENT_TYPE_ICE]: IcePlacement,
  [PLACEMENT_TYPE_ICE_PICKUP]: IcePickupPlacement,
  [PLACEMENT_TYPE_FIRE]: FirePlacement,
  [PLACEMENT_TYPE_FIRE_PICKUP]: FirePickupPlacement,
  [PLACEMENT_TYPE_SWITCH_DOOR]: SwitchableDoorPlacement,
  [PLACEMENT_TYPE_SWITCH]: DoorSwitchPlacement,
  [PLACEMENT_TYPE_TELEPORT]: TeleportPlacement,
  [PLACEMENT_TYPE_THIEF]: ThiefPlacement,
  [PLACEMENT_TYPE_CIABATTA]: CiabattaPlacement,
  [PLACEMENT_TYPE_BOARD]:BoardPlacement,
  [PLACEMENT_TYPE_WARNING]:WarningPlacement,
  [PLACEMENT_TYPE_WEAPON_PICKUP]:WeaponPickupPlacement,
  [PLACEMENT_TYPE_WEAPON_LAUNCHER]:WeaponLauncherPlacement,
};

class PlacementFactory {
  createPlacement(config: PlacementSchema, level: LevelSchema) {
    const placementClass = placementTypeClassMap[config.type];
    if (!placementClass) {
      console.warn("NO TYPE FOUND", config.type);
    }
    // Generate a new instance with random ID
    const instance = new placementClass(config, level);
    instance.id = Math.floor(Math.random() * 9999999) + 1;
    return instance;
  }

  // getInstance(config: PlacementSchema, level: LevelSchema) {
  //   switch (config.type) {
  //     case PLACEMENT_TYPE_HERO:
  //       return new HeroPlacement(config, level);
  //     case PLACEMENT_TYPE_GOAL:
  //       return new GoalPlacement(config, level);
  //     case PLACEMENT_TYPE_WALL:
  //       return new WallPlacement(config, level);
  //     case PLACEMENT_TYPE_FLOUR:
  //       return new FlourPlacement(config, level);
  //     default:
  //       console.warn("NO TYPE FOUND", config.type);
  //       return null;
  //   }
  // }
}

export const placementFactory = new PlacementFactory();
