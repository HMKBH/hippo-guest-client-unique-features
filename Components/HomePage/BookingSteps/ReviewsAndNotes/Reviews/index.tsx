import { Slider } from "@/Components/ui/slider";
import React from "react";

const Reviews = () => {
  return (
    <div className="flex flex-col 2xl:flex-row 2xl:gap-4 gap-2 2xl:w-[800px] 2xl:justify-between 2xl:items-center">
      <label className="2xl:text-lg text-sm font-semibold">
        Reviews<span className="text-red-500 font-bold">*</span>
      </label>
      <div className="flex flex-col gap-4 2xl:w-[515px]">
        <Slider defaultValue={[3.3]} max={10} step={0.01} />
      </div>
    </div>
  );
};

export default Reviews;
