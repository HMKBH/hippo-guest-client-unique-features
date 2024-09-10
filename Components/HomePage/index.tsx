import React, { useState } from "react";

import home from "../../public/images/home.jpg";

import TimeLine from "./BookingSteps/Progresstracker";

const HomePage = () => {
  const [details, setDetails] = useState({
    PropertyTypes: [],
    BasisTypes: [],
    StarRating: [],
    BudgetPerNight: {
      minimum: "",
      maximum: "",
    },
    SpecialNotes: "",
  });
  console.log({ details });

  return (
    <div>
      {/* <Header/> */}
      <div
        className="bg-cover bg-center h-[400px] flex flex-col justify-center items-center "
        style={{ backgroundImage: `url(${home.src})` }}
      >
        <h2 className="text-4xl font-bold text-text-color">Request offers</h2>
        <p className="text-2xl text-text-color">
          Discover entire homes and private rooms perfect for any trip
        </p>
      </div>
      <TimeLine details={details} setDetails={setDetails} />
      {/* <Footer/> */}
    </div>
  );
};

export default HomePage;
