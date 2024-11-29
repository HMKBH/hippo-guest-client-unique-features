import React, { useContext } from "react";
import { Label } from "@/Components/ui/label";
import { Checkbox } from "@/Components/ui/checkbox";
import { StepperContext } from "../../Progresstracker";

const ShowSuggestions = () => {
  const stepperContext = useContext(StepperContext);

  if (!stepperContext) {
    return null;
  }

  const { setDetails, details } = stepperContext;

  const handleCheckboxChange = (checked: boolean) => {
    setDetails((prev) => ({ ...prev, showSuggestions: checked }));
  };

  return (
    <div className="flex gap-3 w-auto h-auto flex-row sm:w-[550px] md:w-[650px]">
      <Checkbox
        className="mt-[6px]"
        checked={details.showSuggestions}
        onCheckedChange={handleCheckboxChange}
        id="terms"
        indicator={<div className="h-3 w-3 rounded-full bg-primary" />}
      />
      <Label className="text-md md:text-lg" htmlFor="terms">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere at
        nesciunt sint quod ipsum, quibusdam fugit veniam nulla, dolorum odit
        consequatur natus ab quis velit consequuntur nostrum? Dolore, magnam
        veniam!
      </Label>
    </div>
  );
};

export default ShowSuggestions;
