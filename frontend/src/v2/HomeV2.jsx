import Navbar from "./components/Navbar";
import ImmersiveCampusTour from "./immersive/ImmersiveCampusTour";
import "./v2.css";

export default function HomeV2() {
  return (
    <div className="v2-shell">
      <Navbar />
      <ImmersiveCampusTour />
    </div>
  );
}
