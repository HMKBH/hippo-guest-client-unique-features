import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Separator } from "@/Components/ui/separator";
import CheckDate from "./CheckDate";
import SearchLocation from "./SearchLocation";
import MapLoader from "./MapLoader";
import LocationRadius from "./LocationRadius";
import { SearchSuggestion } from "@/lib/types/searchTypes";
import { StepperContext } from "../Progresstracker";
import { getSearchSuggestionsApi } from "@/lib/api/searchApi";

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
  const [selectedLocation, setSelectedLocation] =
    useState<SearchSuggestion | null>(null);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const circleRef = useRef<google.maps.Circle | null>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [zoom, setZoom] = useState(7);
  const [radius, setRadius] = useState<number>(5000);

  const [query, setQuery] = useState("");

  const handleQueryChange = useCallback(async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    console.log({ location });
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
          const transformedSuggestions = predictions.map((prediction) => ({
            _id: prediction.place_id,
            label: prediction.description,
            city: "",
            district: "",
            province: "",
            country: "Sri lanka",
            latitude: 0,
            longitude: 0,
            types: prediction.types?.[0],
            radius: 0,
          }));
          setSuggestions(transformedSuggestions);
        }
      }
    );
  }, []);

  const handleSelection = (suggestion: {
    _id: any;
    propertyId?: number | undefined;
    label?: string;
    city?: string;
    district?: string;
    province?: string | undefined;
    country?: string;
    latitude?: number;
    longitude?: number;
  }) => {
    console.log({ suggestion });
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ placeId: suggestion._id }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
        const res = results[0];
        const location = results[0].geometry.location;

        let calculatedRadius = 15000;
        let newZoom = 7;

        const placeType = res.types[0];

        if (placeType === "country") {
          calculatedRadius = 240000;
          newZoom = 7;
        } else if (placeType === "administrative_area_level_1") {
          calculatedRadius = 30000;
          newZoom = 9;
        } else if (placeType === "administrative_area_level_2") {
          calculatedRadius = 20000;
          newZoom = 11;
        } else if (isCityType(placeType)) {
          calculatedRadius = 5000;
          newZoom = 12;
        }

        if (markerRef.current) {
          markerRef.current.setMap(null);
          markerRef.current = null;
        }
        if (circleRef.current) {
          circleRef.current.setMap(null);
          circleRef.current = null;
        }

        const updatedSuggestion: SearchSuggestion = {
          ...suggestion,
          latitude: location.lat(),
          longitude: location.lng(),
          radius: calculatedRadius,
        };
        setSelectedLocation(updatedSuggestion);

        setZoom(newZoom);
        setRadius(calculatedRadius);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6 items-center w-[100%]">
      <p className=" !text-xs md:!text-md text-center !w-[80%]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere at
        nesciunt sint quod ipsum, quibusdam fugit veniam nulla, dolorum odit
        consequatur natus ab quis velit consequuntur nostrum? Dolore, magnam
        veniam!
      </p>
      <Separator className="bg-[#D9D9D9] h-0.5 " />
      <div className="flex flex-col 2xl:gap-20 gap-5 ">
        <SearchLocation
          handleSelection={handleSelection}
          suggestions={suggestions}
          handleQueryChange={handleQueryChange}
          errorMessage={errorMessage}
          setDetails={setDetails}
          setQuery={setQuery}
          query={query}
          setSuggestions={setSuggestions}
        />
        <MapLoader>
          <LocationRadius
            circleCenter={
              selectedLocation
                ? {
                    lat: selectedLocation.latitude,
                    lng: selectedLocation.longitude,
                  }
                : null
            }
            mapRef={mapRef} // Pass the map reference
            setMapLoaded={setMapLoaded}
            zoom={zoom}
            radius={radius}
            suggestions={suggestions}
          />
        </MapLoader>

        <CheckDate setDetails={setDetails} />
      </div>
    </div>
  );
};

export default LocationAndGuests;
