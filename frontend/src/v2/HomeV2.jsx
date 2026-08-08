import HeroV2 from "./components/HeroV2";
import FounderV2 from "./components/FounderV2";
import "./v2.css";

export default function HomeV2() {
  return (
    <div className="v2-shell">
      <HeroV2 />
      <FounderV2 />
    </div>
  );
}
