import React from "react";
import VillaIcon from "@mui/icons-material/Villa";
import { Checkbox } from "@/Components/ui/checkbox";
import { Button } from "@/Components/ui/button";

const Properties = ({ details, setDetails, property }) => {
  let isSelected = details?.PropertyTypes?.some(
    (list) => list.id === property.id
  );

  const handleSelect = () => {
    setDetails((prevDetails: { PropertyTypes: any[] }) => {
      const updatedSelectedList = isSelected
        ? prevDetails?.PropertyTypes.filter((item) => item.id !== property.id)
        : [...prevDetails.PropertyTypes, { ...property }];

      return {
        ...prevDetails,
        PropertyTypes: updatedSelectedList,
      };
    });
  };

  return (
    <Button
      onClick={handleSelect}
      className="w-[430px] h-[50px] border border-border-input rounded-sm flex justify-between items-center px-3 gap-0 bg-transparent hover:bg-transparent text-primary"
    >
      <div className="flex gap-4 items-center">
        <VillaIcon className="fill-primary" />
        <p>{property.name}</p>
      </div>
      <Checkbox
        id={property.id}
        checked={isSelected}
        className="border border-border-input fill-star-rating"
      />
    </Button>
  );
};

export default Properties;
