import React, { useContext } from "react";
import { Separator } from "@/Components/ui/separator";

import PropertyType from "./PropertyType";
import BudgetPerNight from "./BudgetPerNight";
import { StepperContext } from "../Progresstracker";
import RoomTypes from "./RoomType";

const PropertyAndBudget = () => {
  const stepperContext = useContext(StepperContext);
  if (!stepperContext) {
    return null; // or handle the null case appropriately
  }
  const { setDetails, details } = stepperContext;

  return (
    <div className=" flex flex-col gap-6 items-center ">
      <p className="2xl:w-[800px] text-xs">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere at
        nesciunt sint quod ipsum, quibusdam fugit veniam nulla, dolorum odit
        consequatur natus ab quis velit consequuntur nostrum? Dolore, magnam
        veniam!
      </p>
      <Separator className="bg-[#D9D9D9] h-0.5 2xl:!w-[1200px] " />
      <div className="flex flex-col 2xl:gap-20 gap-5 ">
        <PropertyType details={details} setDetails={setDetails} />
        <RoomTypes details={details} setDetails={setDetails} />
        <BudgetPerNight details={details} setDetails={setDetails} />
      </div>
    </div>
  );
};

export default PropertyAndBudget;
