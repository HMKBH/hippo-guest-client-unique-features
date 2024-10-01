import React, { useState } from "react";
import { Select, SelectContent, SelectTrigger } from "@/Components/ui/select";
import { Counter } from "hippo-guest-component-library";
import ChildrenAges from "./ChildrenAges";

interface GuestCounterProps {
  occupancyConfigState: [any, React.Dispatch<React.SetStateAction<any>>];
}

const GuestCounter: React.FC<GuestCounterProps> = ({
  handleCounterChange,
  handleChildAgeChange,
  occupancyConfig,
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
              value={occupancyConfig.adults}
              hanldeCounterChange={(id, value) =>
                handleCounterChange("adults", value)
              }
            />
          </div>
          <div className="flex flex-row p-4 justify-between ">
            <label className="text-lg text-text-color font-semibold">
              Children
            </label>
            <div className="flex flex-col">
              <Counter
                id="children-counter"
                value={occupancyConfig.children}
                hanldeCounterChange={(id, value) =>
                  handleCounterChange("children", value)
                }
              />
              <ChildrenAges
                childrenAges={occupancyConfig.childrenAges}
                handleChildAgeChange={handleChildAgeChange}
              />
            </div>
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

export default GuestCounter;
