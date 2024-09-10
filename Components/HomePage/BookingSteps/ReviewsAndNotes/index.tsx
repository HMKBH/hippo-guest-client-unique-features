import { Separator } from "@/Components/ui/separator";
import React from "react";
import Reviews from "./Reviews";
import SpecialNotes from "./SpecialNotes";

const ReviewsAndNotes = () => {
  return (
    <div className="flex flex-col gap-6 items-center">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere at
        nesciunt sint quod ipsum, quibusdam fugit veniam nulla, dolorum odit
        consequatur natus ab quis velit consequuntur nostrum? Dolore, magnam
        veniam!
      </p>
      <Separator className="bg-[#D9D9D9] h-0.5" />
      <div className="flex flex-col mt-5 gap-5">
        <Reviews />
        <SpecialNotes />
      </div>
    </div>
  );
};

export default ReviewsAndNotes;
