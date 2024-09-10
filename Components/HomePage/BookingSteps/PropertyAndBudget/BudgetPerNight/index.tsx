import { Input } from "@/Components/ui/input";
import React from "react";

const BudgetPerNight = ({ details, setDetails }) => {
  const handleMinChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setDetails((prevDetails: { BudgetPerNight: any }) => ({
      ...prevDetails,
      BudgetPerNight: {
        ...prevDetails.BudgetPerNight,
        minimum: value,
      },
    }));
  };

  const handleMaxChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setDetails((prevDetails: { BudgetPerNight: any }) => ({
      ...prevDetails,
      BudgetPerNight: {
        ...prevDetails.BudgetPerNight,
        maximum: value,
      },
    }));
  };
  return (
    <div className="flex gap-4 w-[800px] justify-between">
      <label className="text-lg text-text-color font-semibold">
        Budget Per Night<span className="text-red-500 font-bold">*</span>
      </label>
      <div className="flex gap-2 items-center w-[515px]">
        <Input
          className="border border-border-input text-lg bg-white focus-visible:ring-offset-0 focus-visible:ring-0"
          type="number"
          min={0}
          max={10000}
          value={details.BudgetPerNight.minimum}
          onChange={handleMinChange}
        />
        To
        <Input
          className="border border-border-input text-lg bg-white focus-visible:ring-offset-0 focus-visible:ring-0"
          type="number"
          min={0}
          max={10000}
          value={details.BudgetPerNight.maximum}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  );
};

export default BudgetPerNight;
