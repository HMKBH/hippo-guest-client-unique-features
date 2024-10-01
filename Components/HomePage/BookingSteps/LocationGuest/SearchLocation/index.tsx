import React, { useEffect, useState } from "react";
import { MainSearch } from "hippo-guest-component-library";
import { getSearchSuggestionsApi } from "@/lib/api/searchApi";

interface SearchLocationProps {
  locationState: google.maps.GeocoderResult[];
  suggestions: google.maps.places.AutocompletePrediction[];
  handleQueryChange: (value: string) => Promise<void>;
  handlePlaceChanged: (
    suggestion: google.maps.places.AutocompletePrediction
  ) => void;
  handleSelection: (location: any) => void;
  setQuery: (value: string) => void;
  errorMessage: string;
  setSuggestions: (
    suggestions: google.maps.places.AutocompletePrediction[]
  ) => void;
  query: string;
}

const SearchLocation: React.FC<SearchLocationProps> = ({
  suggestions,
  handleQueryChange,
  query,
  setQuery,
  setSuggestions,
  handleSelection,
}) => {
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await getSearchSuggestionsApi(query);
        setSuggestions(response.data.data.suggestions);
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
      }
    };

    fetchSuggestions();
  }, []);

  useEffect(() => {
    if (suggestions?.length > 0 && query !== "") {
      setSuggestions(suggestions);
    }
  }, [suggestions]);

  return (
    <div className="flex flex-col md:flex-row md:gap-4 gap-2 md:w-[600px] 2xl:w-[800px] md:justify-between md:items-center">
      <label id="searchLocation" className="text-sm md:text-lg font-semibold">
        Search Location<span className="text-red-500">*</span>
      </label>
      <div className="flex items-center md:gap-14 2xl:w-[515px]">
        <MainSearch
          handleSelection={handleSelection}
          className="2xl:w-[430px] h-[40px] 2xl:h-[50px] md:h-[45px] border border-solid border-border-input items-center px-4 justify-between rounded-sm"
          suggestions={suggestions}
          handleQueryChange={async (value: string) => {
            await handleQueryChange(value);
          }}
          handleModalState={() => {}}
          rootParentClassname="2xl:w-[430px] w-full  z-50 left-0 lg:left-auto "
          optionsClassName={suggestions.length !== 0 ? `lg:w-full` : `hidden`}
          onChange={(event) => {
            setQuery(event.target.value);
            handleQueryChange(event.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default SearchLocation;
