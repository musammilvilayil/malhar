import HeroV2 from "./components/HeroV2";
import FounderV2 from "./components/FounderV2";
import QuranVersesV2 from "./components/QuranVersesV2";
import InstitutionsV2 from "./components/InstitutionsV2";
import CampusLifeV2 from "./components/CampusLifeV2";
import "./v2.css";

export default function HomeV2() {
  return (
    <div className="v2-shell">
      <HeroV2 />
      <FounderV2 />
      <QuranVersesV2 />
      <InstitutionsV2 />
      <CampusLifeV2 />
    </div>
  );
}
