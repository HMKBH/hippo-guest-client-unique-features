import { Separator } from "@/Components/ui/separator";
import React from "react";
import Reviews from "./Reviews";
import SpecialNotes from "./SpecialNotes";

const ReviewsAndNotes = () => {
  return (
    <div className="flex flex-col gap-5 items-center">
      <p className="2xl:w-[800px] text-xs">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere at
        nesciunt sint quod ipsum, quibusdam fugit veniam nulla, dolorum odit
        consequatur natus ab quis velit consequuntur nostrum? Dolore, magnam
        veniam!
      </p>
      <Separator className="bg-[#D9D9D9] h-0.5 2xl:!w-[1200px] " />
      <div className="flex flex-col 2xl:gap-20 gap-5 ">
        <Reviews />
        <SpecialNotes />
      </div>
    </div>
  );
};

export default ReviewsAndNotes;
