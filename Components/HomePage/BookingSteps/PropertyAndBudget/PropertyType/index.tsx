import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/Components/ui/dialog";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import Properties from "./Properties";
import { X } from "lucide-react";

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

interface PropertyTypeProps {
  details: any; // Replace 'any' with the appropriate type if known
  setDetails: (details: any) => void; // Replace 'any' with the appropriate type if known
}

const PropertyType: React.FC<PropertyTypeProps> = ({ details, setDetails }) => {
  return (
    <div className="flex flex-col 2xl:flex-row 2xl:gap-4 gap-2 2xl:w-[800px] 2xl:justify-between 2xl:items-center">
      <label id="propertytype" className="2xl:text-lg text-sm font-semibold">
        Property Type<span className="text-red-500 font-bold">*</span>
      </label>
      <div className="flex items-center 2xl:gap-14 2xl:w-[515px]">
        <Dialog>
          <DialogTrigger className="flex 2xl:w-[430px] w-[320px] h-[40px] 2xl:h-[50px] border border-border-input items-center px-4 justify-between rounded-sm">
            <span>--Select--</span> <KeyboardArrowDownIcon />
          </DialogTrigger>
          <DialogContent className="max-w-[890px] h-fit flex flex-col p-0 gap-0">
            <DialogHeader className="flex flex-row justify-between items-center p-2">
              <span>Property types</span>
              <DialogClose className="border border-border-input rounded-full">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogHeader>
            <div className="flex flex-wrap gap-2 p-2">
              {propertytypes?.map((property) => (
                <Properties
                  key={property.id}
                  property={property}
                  details={details}
                  setDetails={setDetails}
                />
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PropertyType;
