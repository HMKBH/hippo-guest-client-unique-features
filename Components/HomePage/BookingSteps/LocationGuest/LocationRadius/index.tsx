import React from "react";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Circle, GoogleMap, Marker } from "@react-google-maps/api";
import { X } from "lucide-react";
import Slider from "@mui/material/Slider";
interface LocationRadiusProps {
  mapRef: React.MutableRefObject<google.maps.Map | null>;
  setMapLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  zoom: number;
  radius: number;
  suggestions: { latitude: number; longitude: number };
  selectLocation: { latitude: number; longitude: number };
  setRadius: React.Dispatch<React.SetStateAction<number>>;
}

const LocationRadius: React.FC<LocationRadiusProps> = ({
  mapRef,
  setMapLoaded,
  zoom,
  radius,
  selectLocation,
  setRadius,
  setDetails,
}) => {
  const position = {
    lat: selectLocation?.latitude,
    lng: selectLocation?.longitude,
  };

  const circleOptions = {
    strokeColor: "#443266",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#443266",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: radius,
    zIndex: 1,
  };
  const defaultMapOptions = {
    fullscreenControl: false,
    streetViewControl: false,
    zoomControl: false,
    mapTypeControl: false,
    disableDoubleClickZoom: false,
    gestureHandling: "cooperative",
  };
  const marks = [
    { value: 5000, label: "5km" },
    { value: 240000, label: "240km" },
  ];
  function valueLabelFormat(value: number) {
    return `${value / 1000}km`;
  }

  return (
    <div className="flex flex-col md:flex-row md:gap-4 gap-2 md:w-[600px] 2xl:w-[800px] md:justify-between md:items-center">
      <label
        id="locationRadius"
        className="2xl:text-lg text-sm md:!text-lg font-semibold"
      >
        Location Radius<span className="text-red-500">*</span>
      </label>
      <div className="flex items-center 2xl:gap-14 2xl:w-[515px] md:w-[380px]">
        <Dialog>
          <DialogTrigger>
            <Button className="w-fit !h-[40px] 2xl:!h-[50px] md:!h-[45px] items-center px-4 justify-between rounded-sm bg-gradient-to-r from-[#443266] to-[#8864CC] hover:bg-gradient-to-l hover:from-[#8864CC] hover:to-[#443266]">
              Select Your Range
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 gap-0 overflow-hidden lg:!w-[800px] lg:h-[750px] max-w-[800px]">
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
                mapContainerStyle={{ width: "100%", height: "450px" }}
                center={position || { lat: 7.873054, lng: 80.771797 }}
                zoom={zoom}
                onLoad={(map) => {
                  mapRef.current = map;
                  setMapLoaded(true);
                }}
              >
                {selectLocation && <Marker position={position} />}
                {selectLocation && (
                  <Circle center={position} options={circleOptions} />
                )}
              </GoogleMap>
            </div>
            <span className="text-center mt-2 text-lg font-semibold">
              Radius {radius / 1000}km
            </span>
            <div className="flex p-12 mb-2">
              <Slider
                onChange={(event) => {
                  setRadius(Number((event.target as HTMLInputElement)?.value));
                }}
                defaultValue={radius}
                valueLabelDisplay="auto"
                valueLabelFormat={valueLabelFormat}
                step={1000}
                marks={marks}
                min={5000}
                max={240000}
                sx={{
                  color: "#443266",
                  margin: "0",
                  padding: "0",
                  "& .MuiSlider-markLabel ": {
                    height: "24px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50px",
                    position: "absolute",
                    borderRadius: "5px",
                    color: "white",
                    bgcolor: "#443266",
                  },
                  "& .MuiSlider-mark": {
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#443266",
                  },
                  "& .MuiSlider-valueLabelOpen ": {
                    bgcolor: "#443266",
                  },
                  "& .MuiSlider-valueLabelLabel": {
                    bgcolor: "#443266",
                  },
                }}
              />
            </div>
            <div className="flex items-end w-full h-auto">
              <DialogClose
                onClick={() =>
                  setDetails((prev) => ({
                    ...prev,
                    location: {
                      ...selectLocation,
                      radius: radius,
                    },
                  }))
                }
                className=" border border-border-input w-fit h-fit bg-gradient-to-r from-[#443266] to-[#8864CC] hover:bg-gradient-to-l hover:from-[#8864CC] hover:to-[#443266] rounded-lg"
              >
                <span className="px-5 py-3">confirm</span>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default LocationRadius;
