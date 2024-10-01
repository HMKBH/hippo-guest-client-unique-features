import React, { useContext, useRef, useState } from "react";
import { Separator } from "@/Components/ui/separator";
import CheckDate from "./CheckDate";
import SearchLocation from "./SearchLocation";
import MapLoader from "./MapLoader";
import LocationRadius from "./LocationRadius";
import { SearchSuggestion } from "@/lib/types/searchTypes";
import { StepperContext } from "../Progresstracker";

const cityTypes = [
  "administrative_area_level_3",
  "locality",
  "political",
  "neighborhood",
  "sublocality",
  "sublocality_level_1",
  "sublocality_level_2",
  "sublocality_level_3",
  "sublocality_level_4",
  "sublocality_level_5",
  "establishment",
];

function isCityType(type: string | undefined): boolean {
  return cityTypes.includes(type || "");
}

const LocationAndGuests: React.FC = () => {
  const stepperContext = useContext(StepperContext);
  const setDetails = stepperContext?.setDetails;
  const [selectLocation, setSelectLocation] = useState<SearchSuggestion>();
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [zoom, setZoom] = useState(7);
  const [radius, setRadius] = useState<number>();
  const [query, setQuery] = useState("");

  async function handleQueryChange(query: string) {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const autocompleteService = new google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions(
      {
        input: query,
        componentRestrictions: { country: "lk" },
        types: ["(regions)"],
      },
      (predictions, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          const places = predictions.map((prediction) => ({
            _id: prediction.place_id,
            label: prediction.description,
          }));
          setSuggestions(places);
        } else {
          setSuggestions([]);
        }
      }
    );
  }
  const handleSelection = async (location: { _id: string; label: string }) => {
    setQuery(location.label);

    try {
      const placeDetails = (await fetchPlaceDetails(
        location.label
      )) as SearchSuggestion;
      setSelectLocation(placeDetails);
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  async function fetchPlaceDetails(label: string) {
    const geocoder = new google.maps.Geocoder();

    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: label }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const geometry = results[0].geometry;
          const addressComponents = results[0].address_components;

          let country = "";
          let city = "";
          let district = "";
          let province = "";
          let calculatedRadius = 15000;
          let newZoom = 7;

          const placeType = addressComponents.find((component) => {
            return (
              component.types.includes("country") ||
              component.types.includes("administrative_area_level_1") ||
              component.types.includes("administrative_area_level_2") ||
              component.types.includes("locality")
            );
          })?.types[0];

          if (placeType === "country") {
            calculatedRadius = 240000;
            newZoom = 7;
          } else if (placeType === "administrative_area_level_1") {
            calculatedRadius = 30000;
            newZoom = 9.8;
          } else if (placeType === "administrative_area_level_2") {
            calculatedRadius = 20000;
            newZoom = 10.5;
          } else if (isCityType(placeType)) {
            calculatedRadius = 5000;
            newZoom = 12;
          }

          addressComponents.forEach((component) => {
            if (component.types.includes("locality")) {
              city = component.long_name;
            } else if (
              component.types.includes("administrative_area_level_2")
            ) {
              district = component.long_name;
            } else if (
              component.types.includes("administrative_area_level_1")
            ) {
              province = component.long_name.replace(" Province", "");
            } else if (component.types.includes("country")) {
              country = component.long_name;
            }
          });

          const location = {
            latitude: geometry.location.lat(),
            longitude: geometry.location.lng(),
            country,
            city,
            district,
            province,
            radius: calculatedRadius,
            label,
          };

          setRadius(calculatedRadius);
          setZoom(newZoom);
          resolve(location);

          setDetails((prevDetails) => ({
            ...prevDetails,
            location: {
              latitude: geometry.location.lat(),
              longitude: geometry.location.lng(),
              country,
              city,
              district,
              province,
              radius: calculatedRadius,
              label,
            },
          }));
        } else {
          reject(new Error("Geocode was not successful"));
        }
      });
    });
  }
  return (
    <div className="flex flex-col gap-6 items-center w-[100%]">
      <p className=" text-xs md:text-md text-center !w-[80%]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere at
        nesciunt sint quod ipsum, quibusdam fugit veniam nulla, dolorum odit
        consequatur natus ab quis velit consequuntur nostrum? Dolore, magnam
        veniam!
      </p>
      <Separator className="bg-[#D9D9D9] h-0.5 " />
      <div className="flex flex-col 2xl:gap-20 gap-5 ">
        <SearchLocation
          suggestions={suggestions}
          handleQueryChange={handleQueryChange}
          errorMessage={errorMessage}
          setDetails={setDetails}
          setQuery={setQuery}
          query={query}
          setSuggestions={setSuggestions}
          handleSelection={handleSelection}
        />
        <MapLoader>
          <LocationRadius
            mapRef={mapRef}
            setMapLoaded={setMapLoaded}
            zoom={zoom}
            radius={radius}
            selectLocation={selectLocation}
            setRadius={setRadius}
            setDetails={setDetails}
          />
        </MapLoader>

        <CheckDate setDetails={setDetails} />
      </div>
    </div>
  );
};

export default LocationAndGuests;
