import React from "react";
import { Select, SelectContent, SelectTrigger } from "@/Components/ui/select";
import { Counter } from "hippo-guest-component-library";

const GuestCounter = () => {
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
              value={0}
              hanldeCounterChange={function (id: string, value: number): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
          <div className="flex flex-row p-4 justify-between items-center">
            <label className="text-lg text-text-color font-semibold">
              Children
            </label>
            <Counter
              id="children-counter"
              value={0}
              hanldeCounterChange={function (id: string, value: number): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

export default GuestCounter;
