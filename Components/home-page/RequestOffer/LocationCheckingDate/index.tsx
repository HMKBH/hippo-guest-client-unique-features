import React, { useRef, useState } from "react";

import { Separator } from "@/components/ui/separator";

import CheckDate from "./CheckDate";
import LocationRadius from "./LocationRadius";
import SearchLocation from "./SearchLocation";
import MapLoader from "./LocationRadius/MapLoader";

const LocationCheckingDate: React.FC = () => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [zoom, setZoom] = useState<number>(7);

  return (
    <div className="flex flex-col gap-8 sm:items-center">
      <p className="text-md md:text-lg text-center sm:w-3/4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere at
        nesciunt sint quod ipsum, quibusdam fugit veniam nulla, dolorum odit
        consequatur natus ab quis velit consequuntur nostrum? Dolore, magnam
        veniam!
      </p>
      <Separator className="bg-[#D9D9D9] h-0.5" />
      <div className="flex flex-col gap-10 justify-center sm:items-center w-full">
        <SearchLocation setZoom={setZoom} />
        <MapLoader>
          <LocationRadius mapRef={mapRef} zoom={zoom} setZoom={setZoom} />
        </MapLoader>
        <CheckDate />
      </div>
    </div>
  );
};

export default LocationCheckingDate;
