import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import JsonData from "../data/data.json";
import data from "../data";
import Speakers from "./Speakers";
import Schedule from "./Schedule";
import TravelInformation from "./TravelInformation";
import Hotels from "./Hotels";

function Index() {
  const [landingPageData, setLandingPageData] = React.useState({});
  React.useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  console.log(data);
  return (
    <>
      <Header />
      <Hero data={landingPageData.Hero} />
      <AboutSection />
      <Speakers speakers={data.landingPage.speakers.speakers} />
      {/* <Schedule days={data.landingPage.schedules.days} /> */}
      <TravelInformation />
      <Hotels hotels={data.hotels} />
      <ContactSection />
      <Footer />
    </>
  );
}

export default Index;
