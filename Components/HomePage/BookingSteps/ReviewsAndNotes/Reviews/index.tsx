import { Slider } from "@/Components/ui/slider";
import React from "react";

const Reviews = () => {
  return (
    <div className="flex gap-4 w-[800px] justify-between items-center">
      <label className="text-lg text-text-color font-semibold">
        Reviews<span className="text-red-500 font-bold">*</span>
      </label>
      <div className="flex flex-col gap-4 w-[515px]">
        <Slider defaultValue={[3.3]} max={10} step={0.01} />
      </div>
    </div>
  );
};

export default Reviews;
