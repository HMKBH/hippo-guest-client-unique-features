import React, { useState } from "react";
import { Select, SelectContent, SelectTrigger } from "@/Components/ui/select";
import { Counter } from "hippo-guest-component-library";
import ChildrenAges from "./ChildrenAges";
import { Separator } from "@/Components/ui/separator";

interface GuestCounterProps {
  occupancyConfigState: [any, React.Dispatch<React.SetStateAction<any>>];
}

const GuestCounter: React.FC<GuestCounterProps> = ({
  handleCounterChange,
  handleChildAgeChange,
  details,
  index,
}) => {
  return (
    <div className="flex items-center gap-14 h-[20px] w-[515px]">
      <Select>
        <SelectTrigger className="flex w-[430px] h-[50px] border border-border-input items-center px-4 justify-between rounded-sm focus:ring-offset-0 focus:ring-0">
          --Select--
        </SelectTrigger>
        <SelectContent>
          <div className="flex flex-row p-4 justify-between items-center">
            <label className="text-lg text-text-color font-semibold">
              Adults
            </label>
            <Counter
              id="adults-counter"
              value={details.roomOptions[index].adultCount}
              hanldeCounterChange={(id, value) =>
                handleCounterChange(
                  details.roomOptions[index].id,
                  "adultCount",
                  value
                )
              }
            />
          </div>
          <Separator className="bg-[#999797] h-0.5" />

          <div className="flex flex-row p-4 justify-between ">
            <label className="text-lg text-text-color font-semibold">
              Children
            </label>
            <div className="flex flex-col">
              <Counter
                id="children-counter"
                value={details.roomOptions[index].childCount}
                hanldeCounterChange={(id, value) =>
                  handleCounterChange(
                    details.roomOptions[index].id,
                    "childCount",
                    value
                  )
                }
              />
              <ChildrenAges
                childrenAges={details.roomOptions[index].childAges}
                handleChildAgeChange={(childIndex, value) =>
                  handleChildAgeChange(
                    details.roomOptions[index].id,
                    childIndex,
                    value
                  )
                }
              />
            </div>
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

export default GuestCounter;
