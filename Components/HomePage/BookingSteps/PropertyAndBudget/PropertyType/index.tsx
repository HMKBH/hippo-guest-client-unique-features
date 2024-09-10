import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/Components/ui/dialog";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import Properties from "./Properties";

const propertytypes = [
  { id: 1, name: "Apartments" },
  { id: 2, name: "Hotels" },
  { id: 3, name: "Homestays" },
  { id: 4, name: "Bed and Breakfasts" },
  { id: 5, name: "Resorts" },
  { id: 6, name: "Motels" },
  { id: 7, name: "Guest Houses" },
  { id: 8, name: "Caravans" },
  { id: 9, name: "Boats" },
  { id: 10, name: "Cabanas" },
  { id: 11, name: "Villas" },
  { id: 12, name: "Holiday Homes" },
];

const PropertyType = ({ details, setDetails }) => {
  return (
    <div className="flex gap-4 w-[800px] justify-between items-center">
      <label
        id="propertytype"
        className="text-lg text-text-color font-semibold"
      >
        Property Type<span className="text-red-500 font-bold">*</span>
      </label>
      <div className="flex items-center gap-14 h-[20px] w-[515px] ">
        <Dialog>
          <DialogTrigger className="flex w-[430px] h-[50px] border border-border-input items-center px-4 justify-between rounded-sm">
            <span>--Select--</span> <KeyboardArrowDownIcon />
          </DialogTrigger>
          <DialogContent className="max-w-[950px] h-fit flex flex-wrap ">
            {propertytypes?.map((property) => (
              <Properties
                key={property.id}
                property={property}
                details={details}
                setDetails={setDetails}
              />
            ))}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PropertyType;
