import React from "react";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { GoogleMap, Marker } from "@react-google-maps/api";

interface LocationRadiusProps {
  circleCenter: google.maps.LatLngLiteral | null;
  mapRef: React.RefObject<google.maps.Map>;
  setMapLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const LocationRadius: React.FC<LocationRadiusProps> = ({
  circleCenter,
  mapRef,
  setMapLoaded,
}) => {
  return (
    <div className="flex gap-4 w-[800px] justify-between">
      <label
        id="locationRadius"
        className="text-lg text-text-color font-semibold"
      >
        Location Radius<span className="text-red-500 font-bold">*</span>
      </label>
      <div className="flex flex-col ">
        <Dialog>
          <DialogTrigger>
            <Button
              onClick={() => {}}
              className="w-[180px] h-[50px]  text-white rounded bg-gradient-to-r from-[#443266] to-[#8864CC] hover:bg-gradient-to-bl hover:from-[#8864CC] hover:to-[#443266] shadow-lg"
            >
              Select Your Range
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="font-semibold ">
              Property Location
            </DialogHeader>
            <div>
              <GoogleMap
                id="map"
                mapContainerStyle={{ width: "100%", height: "400px" }}
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
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default LocationRadius;
