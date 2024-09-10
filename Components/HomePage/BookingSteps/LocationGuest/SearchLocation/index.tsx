import React from "react";
import { MainSearch } from "hippo-guest-component-library";
import AutoComplete from "../../GoogleMapAutoComplete";

type SearchSuggestion = {
  _id: string;
  propertyId?: number;
  label: string;
  city: string;
  district: string;
  province?: string;
  country: string;
  latitude: number;
  longitude: number;
};

const SearchLocation = ({
  locationState,
  suggestions,
  handleQueryChange,
  errorMessage,
}) => {
  return (
    <div className="flex gap-4 w-[800px] justify-between">
      <label
        id="searchLocation"
        className="text-lg text-text-color font-semibold"
      >
        Search Location<span className="text-red-500 font-bold">*</span>
      </label>
      <div className="flex flex-col gap-2">
        {/* <AutoComplete /> */}
        <MainSearch
          // id="searchLocation"
          locationState={locationState}
          suggestions={suggestions}
          handleQueryChange={handleQueryChange}
          errorMessage={errorMessage}
          handleModalState={() => {}} // Pass the function or state handler for modal
          // setFirstSuggestion={(
          //   suggestion: google.maps.places.AutocompletePrediction
          // ) => {
          //   return handlePlaceChanged(suggestion);
          // }}
        />
      </div>
    </div>
  );
};

export default SearchLocation;
