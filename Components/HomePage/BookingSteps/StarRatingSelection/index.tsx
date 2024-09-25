import React, { useContext } from "react";
import { Separator } from "@/Components/ui/separator";
import StarRatings from "./StarRatings";
import { StepperContext } from "../Progresstracker";

const StarRatingSelection = () => {
  const { setDetails, details } = useContext(StepperContext);
  return (
    <div className="flex flex-col gap-5 items-center">
      <p className="2xl:w-[800px] text-xs">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos officiis
        consequuntur in amet iste aliquid vitae fugit praesentium maxime itaque
        dolores, veritatis labore minus alias est ipsa provident commodi
        explicabo.
      </p>
      <Separator className="bg-[#D9D9D9] h-0.5 2xl:!w-[1200px] " />

      <div className="flex flex-col">
        <StarRatings details={details} setDetails={setDetails} />
      </div>
    </div>
  );
};

export default StarRatingSelection;
