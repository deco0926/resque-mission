import styles from "./TopHud.module.css";
import FlourCount from "./FlourCount";
import ClockCount from "./ClockCount";
import InventoryList from "./InventoryList";
// import EditorDropdown from "./EditorDropdown";
import ResetButton from "./ResetButton";
import MapButton from "./MapButton";

export default function TopHud({ level }) {
  return (
    <div className={styles.topHud}>
      <div className={styles.topHudLeft}>
        <MapButton level ={level} />
        <FlourCount level={level} />
        <ClockCount level={level} />      
        <InventoryList level={level} />
      </div>
      <div className={styles.topHudRight}>
        <ResetButton level={level} />
        {/*<span>Come back to me</span>*/}
        {/* <EditorDropdown level={level} /> */}
        
      </div>
    </div>
  );
}
