import React, { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { Separator } from "@/Components/ui/separator";
import { Counter } from "hippo-guest-component-library";
import GuestCounter from "./GuestCounter";
import BasisTypes from "./basisTypes";
import { Button } from "@/Components/ui/button";
import DeleteIcon from "@mui/icons-material/Delete";

interface Layout {
  id: string;
  name: string;
}

interface RoomTypeWithModalProps {
  layouts: Layout[];
  deleteLayout: (id: string) => void;
  handleChildAgeChange: (age: number) => void;
  handleCounterChange: (value: number) => void;
  details: any; // Add this line
}
function adjustArray(childrenAges: number[], newCount: number): number[] {
  const currentCount = childrenAges.length;

  if (newCount > currentCount) {
    return [...childrenAges, ...Array(newCount - currentCount).fill(null)];
  } else if (newCount < currentCount) {
    return childrenAges.slice(0, newCount);
  }

  return childrenAges;
}
const RoomTypeWithModal: React.FC<RoomTypeWithModalProps> = ({
  layouts,
  deleteLayout,
  details,
  // handleCounterChange,
  // handleChildAgeChange,
}) => {
  const [occupancyConfig, setOccupancyConfig] = useState<{
    adults: number;
    children: number;
    childrenAges: number[];
    rooms: number;
  }>({
    adults: 1,
    children: 0,
    childrenAges: [],
    rooms: 1,
  });

  // Handle counter change based on the ID (adults or children)
  function handleCounterChange(id: string, value: number) {
    if (!Number.isInteger(value)) {
      return;
    }

    if (id === "children") {
      setOccupancyConfig((prev: any) => {
        const childrenAges = adjustArray(prev.childrenAges, value);

        return {
          ...prev,
          children: value,
          childrenAges,
        };
      });

      return;
    }

    setOccupancyConfig((prev: any) => {
      const newConfig = { ...prev, [id]: value };

      const { adults, rooms } = newConfig;

      // if (id === "rooms") {
      //   if (rooms > adults) {
      //     newConfig.adults = rooms;
      //   }
      // } else if (id === "adults") {
      //   if (adults < rooms && adults > 0) {
      //     newConfig.rooms = adults;
      //   }
      // }

      return newConfig;
    });
  }
  function handleChildAgeChange(index: number, value: number) {
    setOccupancyConfig((prev) => {
      const childrenAgesArr = [...prev.childrenAges];
      childrenAgesArr[index] = value;

      return {
        ...prev,
        childrenAges: childrenAgesArr,
      };
    });
  }
  console.log({ occupancyConfig });
  return (
    <Accordion type="single" collapsible className="w-full">
      {layouts.map((layout, index) => (
        <AccordionItem key={layout.id} value={layout.id}>
          <AccordionTrigger className="hover:no-underline data-[state]:">
            {layout.name}
          </AccordionTrigger>
          <Separator className="bg-[#999797] h-0.5" />
          <AccordionContent className=" mt-5 ">
            <div className="flex flex-col items-center mt-5 gap-20">
              <div className="flex gap-4 w-[800px] justify-between items-center">
                <label
                  id={`room-count-${index}`}
                  className="text-lg text-text-color font-semibold"
                >
                  Room count<span className="text-red-500 font-bold">*</span>
                </label>
                <div className="flex items-center gap-14 w-[515px]">
                  <Counter
                    id={`room-count-${index}`}
                    value={occupancyConfig.rooms}
                    hanldeCounterChange={(id, value) =>
                      handleCounterChange("rooms", value)
                    }
                  />
                </div>
              </div>
              <div className="flex gap-4 w-[800px] justify-between items-center">
                <label
                  id={`guest-count-${index}`}
                  className="text-lg text-text-color font-semibold"
                >
                  Guest count<span className="text-red-500 font-bold">*</span>
                </label>
                <GuestCounter
                  details={details}
                  handleCounterChange={handleCounterChange}
                  handleChildAgeChange={handleChildAgeChange}
                  occupancyConfig={occupancyConfig}
                />
              </div>
              <div className="flex gap-4 w-[800px] justify-between items-center">
                <label
                  id="guest-count"
                  className="text-lg text-text-color font-semibold"
                >
                  Basis<span className="text-red-500 font-bold">*</span>
                </label>
                <BasisTypes />
              </div>
            </div>
            {layouts.length > 1 && (
              <div className="flex justify-end p-3">
                <Button
                  className="bg-transparent"
                  onClick={() => deleteLayout(layout.id)}
                >
                  <DeleteIcon className="fill-red-500" />
                </Button>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default RoomTypeWithModal;
