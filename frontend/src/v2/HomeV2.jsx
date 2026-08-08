import HeroV2 from "./components/HeroV2";
import FounderV2 from "./components/FounderV2";
import InstitutionsV2 from "./components/InstitutionsV2";
import CampusLifeV2 from "./components/CampusLifeV2";
import KeyPersonalitiesV2 from "./components/KeyPersonalitiesV2";
import StatsV2 from "./components/StatsV2";
import HomeEndV2 from "./components/HomeEndV2";
import "./v2.css";

export default function HomeV2() {
  return (
    <div className="v2-shell">
      <HeroV2 />
      <FounderV2 />
      <InstitutionsV2 />
      <CampusLifeV2 />
      <KeyPersonalitiesV2 />
      <StatsV2 />
      <HomeEndV2 />
    </div>
  );
}
