import React from "react";
import HomeStory from "./HomeStory";
import CampusJourney from "../components/site/CampusJourney";
import siteData from "../data/malharData";

export default function HomeExperience() {
  return (
    <>
      <HomeStory />
      <CampusJourney gallery={siteData.gallery || []} />
    </>
  );
}
