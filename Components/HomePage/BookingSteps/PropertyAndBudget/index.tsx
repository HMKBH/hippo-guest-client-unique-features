import React, { useContext } from "react";
import { Separator } from "@/Components/ui/separator";

import PropertyType from "./PropertyType";
import BudgetPerNight from "./BudgetPerNight";
import { StepperContext } from "../Progresstracker";
import RoomTypes from "./RoomType";
import { Checkbox } from "@/Components/ui/checkbox";
import { Label } from "@/Components/ui/label";

const PropertyAndBudget = () => {
  const stepperContext = useContext(StepperContext);
  if (!stepperContext) {
    return null;
  }
  const { setDetails, details } = stepperContext;

  const handleCheckboxChange = (checked: boolean) => {
    setDetails((prev) => ({ ...prev, showSuggestions: checked }));
  };

  return (
    <div className=" flex flex-col gap-6 items-center ">
      <p className="text-sm md:text-lg font-semibold">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere at
        nesciunt sint quod ipsum, quibusdam fugit veniam nulla, dolorum odit
        consequatur natus ab quis velit consequuntur nostrum? Dolore, magnam
        veniam!
      </p>
      <Separator className="bg-[#D9D9D9] h-0.5 2xl:!w-[1200px] " />
      <div className="flex flex-col 2xl:gap-20 gap-5 ">
        <RoomTypes details={details} setDetails={setDetails} />
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={details.showSuggestions}
            onCheckedChange={handleCheckboxChange}
            id="terms"
            indicator={<div className="h-3 w-3 rounded-full bg-primary" />}
          />
          <Label className="text-sm md:text-lg " htmlFor="terms">
            Accept terms and conditions
          </Label>
        </div>
      </div>
    </div>
  );
};

export default PropertyAndBudget;
