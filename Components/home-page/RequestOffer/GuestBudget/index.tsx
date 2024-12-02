import React from "react";

import { Separator } from "@/components/ui/separator";

import Travellers from "./Traveller";
import EstimateBudget from "./EstimateBudget";
import ShowSuggestions from "./ShowSuggestions";

const PropertyAndBudget = () => {
  return (
    <div className="flex flex-col gap-8 sm:items-center">
      <p className="text-md md:text-lg text-center sm:w-3/4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere at
        nesciunt sint quod ipsum, quibusdam fugit veniam nulla, dolorum odit
        consequatur natus ab quis velit consequuntur nostrum? Dolore, magnam
        veniam!
      </p>
      <Separator className="bg-[#D9D9D9] h-0.5" />
      <div className="flex flex-col gap-10 justify-center sm:items-center w-full">
        <EstimateBudget />
        <Travellers />
        <ShowSuggestions />
      </div>
    </div>
  );
};

export default PropertyAndBudget;
