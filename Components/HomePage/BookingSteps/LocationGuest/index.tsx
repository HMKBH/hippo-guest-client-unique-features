import React, { useCallback, useEffect, useRef, useState } from "react";
import { Separator } from "@/Components/ui/separator";
import SearchLocation from "./SearchLocation";
import LocationRadius from "./LocationRadius";
import CheckDate from "./CheckDate";
import MapLoader from "./MapLoader";

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

const LocationAndGuests = () => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const circleRef = useRef<google.maps.Circle | null>(null);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [locationState, setLocationState] = useState<
    google.maps.GeocoderResult[]
  >([]);
  const [circleCenter, setCircleCenter] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handlePlaceChanged = useCallback(
    (place: google.maps.places.AutocompletePrediction) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ placeId: place.place_id }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location;
          const lat = location.lat();
          const lng = location.lng();
          const position = { lat, lng };

          let calculatedRadius = 15000;

          const placeType = place.types?.[0];
          if (placeType === "country") {
            calculatedRadius = 240000;
          } else if (placeType === "administrative_area_level_1") {
            calculatedRadius = 30000;
          } else if (placeType === "administrative_area_level_2") {
            calculatedRadius = 20000;
          } else if (isCityType(placeType)) {
            calculatedRadius = 5000;
          }

          markerRef.current?.setMap(null);
          circleRef.current?.setMap(null);

          setLocationState([results[0]]);
          setCircleCenter(position);
          setSuggestions([]);

          circleRef.current = new google.maps.Circle({
            center: position,
            radius: calculatedRadius,
            strokeColor: "#0c4cb3",
            strokeOpacity: 1,
            strokeWeight: 3,
            fillColor: "#3b82f6",
            fillOpacity: 0.3,
            map: mapRef.current,
          });

          mapRef.current?.panTo(position);
          mapRef.current?.setZoom(13);

          markerRef.current = new google.maps.Marker({
            position,
            map: mapRef.current,
          });
        } else {
          setErrorMessage("Failed to fetch location details.");
        }
      });
    },
    []
  );

  const handleQueryChange = useCallback(async (value: string) => {
    if (value && autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        {
          input: value,
          componentRestrictions: { country: "lk" },
          types: ["(regions)"],
        },
        (predictions, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setSuggestions(predictions);
          } else {
            setSuggestions([]);
            setErrorMessage("No suggestions found.");
          }
        }
      );
    } else {
      setSuggestions([]);
    }
  }, []);

  useEffect(() => {
    if (mapLoaded && !autocompleteService.current) {
      autocompleteService.current =
        new google.maps.places.AutocompleteService();
    }
  }, [mapLoaded]);

  return (
    <div className="flex flex-col gap-6 items-center">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere at
        nesciunt sint quod ipsum, quibusdam fugit veniam nulla, dolorum odit
        consequatur natus ab quis velit consequuntur nostrum? Dolore, magnam
        veniam!
      </p>
      <Separator className="bg-[#D9D9D9] h-0.5" />
      <div className="flex flex-col mt-5 gap-6">
        <SearchLocation
          locationState={locationState}
          suggestions={suggestions}
          handleQueryChange={handleQueryChange}
          errorMessage={errorMessage}
        />
        <MapLoader>
          <LocationRadius
            circleCenter={circleCenter}
            mapRef={mapRef}
            setMapLoaded={setMapLoaded}
          />
        </MapLoader>
        <CheckDate />
      </div>
    </div>
  );
};

export default LocationAndGuests;
