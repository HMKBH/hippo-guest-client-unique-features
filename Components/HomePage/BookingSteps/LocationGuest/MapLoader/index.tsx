// Components/HomePage/BookingSteps/MapLoader.tsx
import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";

const libraries = ["places"]; // Add other libraries you may need

const MapLoader: React.FC = ({ children }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDQZX8mnD3cyQyR-Fx3oXRQOje5NCH6fJ0", // Your API key here
    libraries,
  });

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default MapLoader;
