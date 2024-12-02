import React, { useEffect, useRef, useState, useCallback } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { MainSearch } from "hippo-guest-component-library";

function isCityType(type: string | undefined) {
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
  return cityTypes.includes(type);
}

const PlaceAutocompleteMap: React.FC = () => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const circleRef = useRef<google.maps.Circle | null>(null);

  // State hooks
  const [mapLoaded, setMapLoaded] = useState(false);
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [locationState, setLocationState] = useState<any>([]); // Replace `any` with appropriate type
  const [circleCenter, setCircleCenter] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Function to handle when a suggestion is selected
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

          if (markerRef.current) {
            markerRef.current.setMap(null);
          }
          if (circleRef.current) {
            circleRef.current.setMap(null);
          }

          // Update state
          setLocationState([results[0]]); // Set the selected location
          setCircleCenter(position); // Set circle center
          setSuggestions([]); // Clear suggestions after selecting

          // Update map and circle
          if (circleRef.current) {
            circleRef.current.setMap(null);
          }
          circleRef.current = new google.maps.Circle({
            center: position,
            radius: 15000,
            strokeColor: "#0c4cb3",
            strokeOpacity: 1,
            strokeWeight: 3,
            fillColor: "#3b82f6",
            fillOpacity: 0.3,
            map: mapRef.current,
          });
          mapRef.current?.panTo(position);
          mapRef.current?.setZoom(13);

          if (markerRef.current) {
            markerRef.current.setMap(null);
          }
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

  // Function to handle query change (input change)
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
    if (mapLoaded) {
      if (!autocompleteService.current) {
        autocompleteService.current =
          new google.maps.places.AutocompleteService();
      }
    }
  }, [mapLoaded]);

  return (
    <div className="h-full">
      <div className="bg-white rounded-md shadow-lg m-2.5 p-1.5 font-sans text-lg font-bold">
        <p>Search for a place here:</p>
        <MainSearch
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
      <GoogleMap
        id="map"
        mapContainerStyle={{ width: "100%", height: "800px" }}
        center={circleCenter || { lat: 7.873054, lng: 80.771797 }}
        zoom={8}
        onLoad={(map) => {
          mapRef.current = map;
          setMapLoaded(true);
        }}
      >
        {circleCenter && <Marker position={circleCenter} />}
      </GoogleMap>
    </div>
  );
};

const AutoComplete: React.FC = () => {
  return (
    <LoadScript
      // googleMapsApiKey="AIzaSyDQZX8mnD3cyQyR-Fx3oXRQOje5NCH6fJ0"
      libraries={["places"]}
    >
      <PlaceAutocompleteMap />
    </LoadScript>
  );
};

export default AutoComplete;
