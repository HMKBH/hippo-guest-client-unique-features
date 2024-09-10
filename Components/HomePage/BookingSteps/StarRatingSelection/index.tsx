import React from "react";
import { Separator } from "@/Components/ui/separator";
import StarRatings from "./StarRatings";

const StarRatingSelection = ({ details, setDetails }) => {
  return (
    <div className="container flex flex-col gap-6 items-center">
      <p className="">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos officiis
        consequuntur in amet iste aliquid vitae fugit praesentium maxime itaque
        dolores, veritatis labore minus alias est ipsa provident commodi
        explicabo.
      </p>
      <Separator className="bg-[#D9D9D9] h-0.5" />
      <div className="flex flex-col mt-5 gap-6 ">
        <StarRatings details={details} setDetails={setDetails} />
      </div>
    </div>
  );
};

export default StarRatingSelection;
