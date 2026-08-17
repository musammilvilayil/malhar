import Navbar from "./components/Navbar";
import HeroV2 from "./components/HeroV2";
import V3Manifesto from "./components/V3Manifesto";
import FounderV2 from "./components/FounderV2";
import InstitutionsV2 from "./components/InstitutionsV2";
import CampusLifeV2 from "./components/CampusLifeV2";
import KeyPersonalitiesV2 from "./components/KeyPersonalitiesV2";
import StatsV2 from "./components/StatsV2";
import HomeEndV2 from "./components/HomeEndV2";
import AtmosphereV3 from "./components/AtmosphereV3";
import "./v2.css";
import "./redesign-v3.css";
import "./mobile-v3.css";
import "./readability-v3.css";

export default function HomeV2() {
  return (
    <div className="v2-shell v3-shell">
      <AtmosphereV3 />
      <Navbar />
      <HeroV2 />
      <V3Manifesto />
      <FounderV2 />
      <InstitutionsV2 />
      <CampusLifeV2 />
      <KeyPersonalitiesV2 />
      <StatsV2 />
      <HomeEndV2 />
    </div>
  );
}
