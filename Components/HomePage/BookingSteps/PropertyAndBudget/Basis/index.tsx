import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import React from "react";
import BasisTypes from "./BasisTypes";

const basisTypes = [
  { id: 1, type: "Room Only" },
  { id: 2, type: "Full Board" },
  { id: 3, type: "Bed & Breakfast" },
  { id: 4, type: "Full Board" },
];

const Basis = ({ details, setDetails }) => {
  const selectableRatings = basisTypes.filter((types) => types.type);

  const isAllSelected =
    details?.BasisTypes?.length === selectableRatings.length;

  const handleSelectAllProperties = () => {
    if (isAllSelected) {
      setDetails({ ...details, BasisTypes: [] });
    } else {
      setDetails({ ...details, BasisTypes: selectableRatings });
    }
  };
  return (
    <div className="flex gap-4 w-[800px] justify-between ">
      <label className="text-lg text-text-color font-semibold">
        Basis<span className="text-red-500 font-bold">*</span>
      </label>
      <div className="flex items-start flex-col w-[515px] ">
        <Button className="flex space-x-2 bg-white hover:bg-white justify-between p-0 text-black w-[140px]">
          <label
            htmlFor={"All"}
            className="text-sm font-medium  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Select All
          </label>
          <Checkbox
            id="All"
            onClick={handleSelectAllProperties}
            className="border border-border-input"
            checked={isAllSelected}
          />
        </Button>

        {basisTypes?.map((basisType) => (
          <BasisTypes
            key={basisType.id}
            basisType={basisType}
            details={details}
            setDetails={setDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default Basis;
