import React, { useEffect, useRef } from "react";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { X } from "lucide-react";
import { Slider } from "@/Components/ui/slider";

interface LocationRadiusProps {
  circleCenter: google.maps.LatLngLiteral | null;
  mapRef: React.RefObject<google.maps.Map>;
  setMapLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const LocationRadius: React.FC<LocationRadiusProps> = ({
  circleCenter,
  mapRef,
  setMapLoaded,
  zoom,
  radius,
  suggestions,
}) => {
  const circleRef = useRef<google.maps.Circle | null>(null);

  const suggestionsLatitude = suggestions.map(
    (location: { latitude: any }) => location.latitude
  );

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.setMap(null);
    }

    if (circleCenter && mapRef.current) {
      circleRef.current = new google.maps.Circle({
        center: circleCenter,
        radius: radius,
        strokeColor: "#0c4cb3",
        strokeOpacity: 1,
        strokeWeight: 3,
        fillColor: "#3b82f6",
        fillOpacity: 0.3,
        map: mapRef.current,
      });

      mapRef.current.panTo(circleCenter);
    }
  }, [circleCenter, mapRef, radius]);

  const defaultMapOptions = {
    fullscreenControl: false,
    streetViewControl: false,
    zoomControl: false,
    mapTypeControl: false,
    disableDoubleClickZoom: false,
    gestureHandling: "cooperative",
  };

  return (
    <div className="flex flex-col md:flex-row md:gap-4 gap-2 md:w-[600px] 2xl:w-[800px] md:justify-between md:items-center">
      <label
        id="locationRadius"
        className="2xl:text-lg text-sm md:!text-lg font-semibold"
      >
        Location Radius<span className="text-red-500">*</span>
      </label>
      <div className="flex items-center 2xl:gap-14 2xl:w-[515px]">
        <Dialog>
          <DialogTrigger>
            <Button className="w-fit !h-[40px] 2xl:!h-[50px] md:!h-[45px] !border border-solid border-border-input items-center px-4 justify-between rounded-sm ">
              Select Your Range
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 gap-0 overflow-hidden">
            <DialogHeader className="flex flex-row justify-between items-center p-3">
              <span>Property Location</span>
              <DialogClose className="border border-border-input rounded-full">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogHeader>
            <div>
              <GoogleMap
                options={defaultMapOptions}
                id="map"
                mapContainerStyle={{ width: "100%", height: "400px" }}
                center={circleCenter || { lat: 7.873054, lng: 80.771797 }}
                zoom={zoom}
                onLoad={(map) => {
                  mapRef.current = map;
                  setMapLoaded(true);
                }}
              >
                {circleCenter && (
                  <Marker
                    position={
                      {
                        lat: suggestions.latitude,
                        lng: suggestions.longitude,
                      } || circleCenter
                    }
                  />
                )}
              </GoogleMap>
            </div>
            <div className="p-5">
              <Slider defaultValue={[20]} max={50} step={1} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default LocationRadius;
