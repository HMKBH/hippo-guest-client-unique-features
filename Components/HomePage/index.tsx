import React from "react";

import home from "../../public/images/home.jpg";

import TimeLine from "./BookingSteps/Progresstracker";

const HomePage = () => {
  return (
    <div className="flex items-center flex-col">
      <div
        className="flex flex-col justify-center items-center text-center h-[150px] "
        // style={{ backgroundImage: `url(${home.src})` }}
      >
        <h2 className="2xl:text-4xl text-xl font-bold text-text-color">
          Request offers
        </h2>
        <p className="2xl:text-2xl text-sm text-text-color text-center">
          Discover entire homes and private rooms perfect for any trip
        </p>
      </div>
      <TimeLine />
    </div>
  );
};

export default HomePage;
