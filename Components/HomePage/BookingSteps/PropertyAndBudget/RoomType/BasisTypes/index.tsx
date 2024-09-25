import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import React from "react";

const BasisTypes = ({ basisType, details, setDetails }) => {
  const isSelected = details?.BasisTypes?.some(
    (list) => list.id === basisType.id
  );

  const handleSelect = () => {
    setDetails((prevDetails: { BasisTypes: any[] }) => {
      const updatedSelectedList = isSelected
        ? prevDetails?.BasisTypes?.filter((item) => item.id !== basisType.id)
        : [...prevDetails?.BasisTypes, { ...basisType }];

      return {
        ...prevDetails,
        BasisTypes: updatedSelectedList,
      };
    });
  };
  return (
    <Button
      onClick={handleSelect}
      className="flex items-center space-x-2 bg-white hover:bg-white p-0 justify-between text-black w-[140px]"
    >
      <label
        htmlFor={String(basisType?.id)}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {basisType.type}
      </label>
      <Checkbox
        id={String(basisType?.id)}
        checked={isSelected}
        className="border border-border-input fill-star-rating"
      />
    </Button>
  );
};

export default BasisTypes;
