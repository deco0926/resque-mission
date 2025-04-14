import { v4 as uuidv4 } from "uuid";

export function getPlayerId(): string {
  if (typeof window === "undefined") return "unknown";

  let id = localStorage.getItem("player_id");
  if (!id) {
    id = uuidv4();
    localStorage.setItem("player_id", id);
  }
  return id;
}
