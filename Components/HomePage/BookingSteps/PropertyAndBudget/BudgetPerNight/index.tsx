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
    <div className="flex flex-col 2xl:flex-row 2xl:gap-4 gap-2 2xl:w-[800px] 2xl:justify-between 2xl:items-center ">
      <label className="2xl:text-lg text-sm font-semibold">
        Budget Per Night<span className="text-red-500 font-bold">*</span>
      </label>
      <div className="flex items-center gap-2 2xl:w-[515px]">
        <Input
          className="border border-border-input text-md font-semibold text-text-color bg-white focus-visible:ring-offset-0 focus-visible:ring-0 2xl:w-[200px] "
          type="number"
          placeholder="Minimum"
          min={0}
          max={10000}
          value={details.BudgetPerNight?.minimum}
          onChange={handleMinChange}
        />
        To
        <Input
          className="border border-border-input text-md font-semibold text-text-color bg-white focus-visible:ring-offset-0 focus-visible:ring-0 2xl:w-[200px] "
          type="number"
          placeholder="Maximum"
          min={0}
          max={10000}
          value={details.BudgetPerNight?.maximum}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  );
};

export default BudgetPerNight;
