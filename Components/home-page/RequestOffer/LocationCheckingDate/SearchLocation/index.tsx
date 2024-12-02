import React from "react";
import MainSearch from "./MainSearch";

interface SearchLocationProps {
  setZoom: (zoom: number) => void;
}

const SearchLocation: React.FC<SearchLocationProps> = ({ setZoom }) => {
  return (
    <div className="flex flex-col gap-3 w-auto h-auto sm:flex-row sm:w-[550px] md:w-[650px] sm:items-center sm:justify-between ">
      <label
        id="searchLocation"
        className="text-md md:text-lg font-semibold whitespace-nowrap"
      >
        Location<span className="text-red-500">*</span>
      </label>

      <MainSearch setZoom={setZoom} />
    </div>
  );
};

export default SearchLocation;
