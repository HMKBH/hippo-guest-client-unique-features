import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import React, { useState } from "react";
import BasisTypes from "./BasisTypes";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { X } from "lucide-react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RoomTypeWithModal from "./Model";

const basisTypes = [
  { id: 1, type: "Room Only" },
  { id: 2, type: "Full Board" },
  { id: 3, type: "Bed & Breakfast" },
  { id: 4, type: "Full Board" },
];

interface Details {
  BasisTypes: { id: number; type: string }[];
  // Add other properties of the details object here
}

const RoomTypes = ({
  details,
  setDetails,
}: {
  details: Details;
  setDetails: React.Dispatch<React.SetStateAction<Details>>;
}) => {
  const [layouts, setLayouts] = useState([{ id: "item-1", name: "Layout 1" }]);

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

  const addLayout = () => {
    const newId = `item-${layouts.length + 1}`;
    setLayouts([
      ...layouts,
      { id: newId, name: `Layout ${layouts.length + 1}` },
    ]);
  };

  const deleteLayout = (id: string) => {
    const updatedLayouts = layouts.filter((layout) => layout.id !== id);
    setLayouts(updatedLayouts);
  };

  return (
    <div className="flex flex-col 2xl:flex-row 2xl:gap-4 gap-2 2xl:w-[800px] 2xl:justify-between 2xl:items-center">
      <label id="propertytype" className="2xl:text-lg text-sm font-semibold">
        Room Type<span className="text-red-500 font-bold">*</span>
      </label>
      <div className="flex items-center 2xl:gap-14 2xl:w-[515px]">
        <Dialog>
          <DialogTrigger className="flex 2xl:w-[430px] w-[320px] h-[40px] 2xl:h-[50px] border border-border-input items-center px-4 justify-between rounded-sm ">
            <span>--Select--</span> <KeyboardArrowDownIcon />
          </DialogTrigger>
          <DialogContent className="max-w-[890px] max-h-[680px] min-h-[400px] h-fit flex flex-col p-0 gap-0 overflow-y-scroll overflow-x-hidden">
            <DialogHeader className="flex flex-row justify-end items-center p-2">
              <DialogClose className="border border-border-input rounded-full">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogHeader>
            <div className="flex flex-wrap  p-2">
              <RoomTypeWithModal
                layouts={layouts}
                deleteLayout={deleteLayout}
              />
            </div>
            <div className="flex justify-between p-3 ">
              <Button onClick={addLayout}>Add another layout</Button>
              <Button onClick={() => {}}>Done</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RoomTypes;
