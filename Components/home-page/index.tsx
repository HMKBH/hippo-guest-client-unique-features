import React from "react";

import RequestOffers from "./RequestOffer";
import home from "../../public/images/home.jpg";

const HomePage = () => {
  return (
    <div className="flex items-center flex-col ">
      <div
        className="flex flex-col justify-center items-center text-center h-[350px] bg-cover bg-center w-full"
        style={{ backgroundImage: `url(${home.src})` }}
      >
        <h2 className="2xl:text-4xl text-xl font-bold text-text-color">
          Request offers
        </h2>
        <p className="2xl:text-2xl text-sm text-text-color text-center">
          Discover entire homes and private rooms perfect for any trip
        </p>
      </div>
      <RequestOffers />
    </div>
  );
};

export default HomePage;
