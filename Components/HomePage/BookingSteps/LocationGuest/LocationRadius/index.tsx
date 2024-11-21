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
  setZoom,
}) => {
  const position = {
    lat: selectLocation?.latitude,
    lng: selectLocation?.longitude,
  };

  const circleOptions = {
    strokeColor: "rgba(68, 50, 102, 0.3)",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "rgba(68, 50, 102, 0.53)",
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
    gestureHandling: "greedy",
    scrollwheel: true,
  };
  const marks = [
    { value: 5000, label: "5km" },
    { value: 240000, label: "240km" },
  ];
  function valueLabelFormat(value: number) {
    return `${value / 1000}km`;
  }
  const calculateZoom = (radius: number) => {
    const scale = radius / 1000;
    const newZoom = 15 - Math.log2(scale);
    return Math.max(0, Math.min(newZoom, 20));
  };

  const handleRadiusChange = (newRadius: number) => {
    setRadius(newRadius);
    const newZoom = calculateZoom(newRadius);
    setZoom(newZoom);
  };
  const svgIcon = `
 <svg width="30" height="38" viewBox="0 0 30 38" fill="none" xmlns="http://www.w3.org/2000/svg" ><path opacity="0.24" fill-rule="evenodd" clip-rule="evenodd" d="M15 38C18.3137 38 21 37.1046 21 36C21 34.8954 18.3137 34 15 34C11.6863 34 9 34.8954 9 36C9 37.1046 11.6863 38 15 38Z" fill="black"></path><path d="M15 35.125L14.6846 35.513L15 35.7694L15.3154 35.513L15 35.125ZM15 35.125C15.3154 35.513 15.3155 35.5129 15.3157 35.5127L15.3163 35.5122L15.3185 35.5105L15.3266 35.5038L15.3577 35.4783C15.3849 35.4559 15.425 35.4229 15.477 35.3796C15.5811 35.293 15.7331 35.1654 15.9263 35.0005C16.3125 34.6707 16.8632 34.1912 17.5238 33.591C18.8441 32.3911 20.6063 30.7056 22.37 28.7648C24.1321 26.826 25.9059 24.6214 27.2418 22.3835C28.5721 20.155 29.5 17.8414 29.5 15.6964C29.5 7.39175 23.0268 0.625 15 0.625C6.97321 0.625 0.5 7.39175 0.5 15.6964C0.5 17.8414 1.42787 20.155 2.75818 22.3835C4.09413 24.6214 5.86793 26.826 7.62998 28.7648C9.39373 30.7056 11.1559 32.3911 12.4762 33.591C13.1368 34.1912 13.6875 34.6707 14.0737 35.0005C14.2669 35.1654 14.4189 35.293 14.523 35.3796C14.575 35.4229 14.6151 35.4559 14.6423 35.4783L14.6734 35.5038L14.6815 35.5105L14.6837 35.5122L14.6843 35.5127C14.6845 35.5129 14.6846 35.513 15 35.125Z" fill="#CC0000" stroke="white"></path><path d="M15.5 20.5C18.2614 20.5 20.5 18.2614 20.5 15.5C20.5 12.7386 18.2614 10.5 15.5 10.5C12.7386 10.5 10.5 12.7386 10.5 15.5C10.5 18.2614 12.7386 20.5 15.5 20.5Z" fill="white" stroke="white"></path></svg>
`;

  const customSvgIcon = {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgIcon)}`,
    scaledSize: new window.google.maps.Size(36.71, 44.49),
  };
  return (
    <div className="flex flex-col md:flex-row md:gap-4 gap-2 md:w-[600px] 2xl:w-[800px] w-full md:justify-between md:items-center">
      <label
        id="locationRadius"
        className="2xl:text-lg text-sm md:text-lg font-semibold"
      >
        Radius<span className="text-red-500">*</span>
      </label>
      <div className="flex items-center w-[100%] 2xl:gap-14 2xl:w-[515px] md:w-[380px]">
        <Dialog>
          <DialogTrigger>
            <Button className="w-[100%] h-[40px] 2xl:h-[50px] md:h-[45px] rounded-sm md:items-center md:justify-between  md:text-md px-12 bg-gradient-to-r from-[#443266] to-[#8864CC] hover:bg-gradient-to-l hover:from-[#8864CC] hover:to-[#443266]">
              Select Your Range
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 gap-0 overflow-hidden lg:w-[800px] lg:h-[750px] max-w-[800px]">
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
                {selectLocation && (
                  <Marker position={position} icon={customSvgIcon} />
                )}
                {selectLocation && (
                  <Circle
                    center={position}
                    radius={radius}
                    options={circleOptions}
                  />
                )}
              </GoogleMap>
            </div>
            <span className="text-center mt-2 text-lg font-semibold">
              Radius {radius / 1000}km
            </span>
            <div className="flex p-12 mb-2">
              <Slider
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  if (target) {
                    handleRadiusChange(Number(target.value));
                  }
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
