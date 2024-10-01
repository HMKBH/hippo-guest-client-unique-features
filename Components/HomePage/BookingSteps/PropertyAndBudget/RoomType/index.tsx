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

interface LayoutOption {
  id: number;
  adultCount: number;
  roomCount: number;
  childCount: number;
  childAges: number[];
  basis: string;
}

interface Details {
  layoutOptions: LayoutOption[];
  BasisTypes: { id: number; type: string }[];
}

const basisTypes = [
  { id: 1, type: "Room Only" },
  { id: 2, type: "Full Board" },
  { id: 3, type: "Bed & Breakfast" },
  { id: 4, type: "Full Board" },
];

function adjustArray(childrenAges: number[], newCount: number): number[] {
  const currentCount = childrenAges.length;
  if (newCount > currentCount) {
    return [...childrenAges, ...Array(newCount - currentCount).fill(null)];
  } else if (newCount < currentCount) {
    return childrenAges.slice(0, newCount);
  }
  return childrenAges;
}

const RoomTypes = ({
  details,
  setDetails,
}: {
  details: Details;
  setDetails: React.Dispatch<React.SetStateAction<Details>>;
}) => {
  const [layouts, setLayouts] = useState([{ id: "1", name: "Room 1" }]);
  const selectableRatings = basisTypes.filter((types) => types.type);
  const isAllSelected =
    details?.BasisTypes?.length === selectableRatings.length;

  const handleSelectAllProperties = () => {
    if (isAllSelected) {
      setDetails((prev) => ({ ...prev, BasisTypes: [] }));
    } else {
      setDetails((prev) => ({ ...prev, BasisTypes: selectableRatings }));
    }
  };

  const addLayout = () => {
    const newId = layouts.length + 1;

    const newLayout: LayoutOption = {
      id: newId,
      adultCount: 1,
      roomCount: 1,
      childCount: 0,
      childAges: [],
      basis: "Bed and Breakfast",
    };

    setLayouts((prevLayouts) => [
      ...prevLayouts,
      { id: newId.toString(), name: `Room ${newId}` },
    ]);

    setDetails((prevDetails) => ({
      ...prevDetails,
      layoutOptions: [...prevDetails.layoutOptions, newLayout],
    }));
  };

  const deleteLayout = (id: number) => {
    setDetails((prev) => ({
      ...prev,
      layoutOptions: prev.layoutOptions.filter((layout) => layout.id !== id),
    }));
  };

  function handleCounterChange(
    layoutId: number,
    field: "adultCount" | "roomCount" | "childCount",
    value: number
  ) {
    if (!Number.isInteger(value) || value < 0) return;

    setDetails((prev) => ({
      ...prev,
      layoutOptions: prev.layoutOptions.map((layout) => {
        if (layout.id === layoutId) {
          const updatedLayout = { ...layout, [field]: value };

          if (
            field === "roomCount" &&
            updatedLayout.roomCount > updatedLayout.adultCount
          ) {
            updatedLayout.adultCount = updatedLayout.roomCount;
          } else if (
            field === "adultCount" &&
            updatedLayout.adultCount < updatedLayout.roomCount
          ) {
            updatedLayout.roomCount = updatedLayout.adultCount;
          }

          if (
            field === "childCount" &&
            updatedLayout.childCount < updatedLayout.childAges.length
          ) {
            updatedLayout.childAges = updatedLayout.childAges.slice(
              0,
              updatedLayout.childCount
            );
          }

          return updatedLayout;
        }
        return layout;
      }),
    }));
  }

  function handleChildAgeChange(
    layoutId: number,
    index: number,
    value: number
  ) {
    setDetails((prev) => ({
      ...prev,
      layoutOptions: prev.layoutOptions.map((layout) => {
        if (layout.id === layoutId) {
          const updatedChildAges = [...layout.childAges];
          updatedChildAges[index] = value;
          return { ...layout, childAges: updatedChildAges };
        }
        return layout;
      }),
    }));
  }

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
            <div className="flex flex-wrap p-2">
              <RoomTypeWithModal
                layouts={layouts}
                details={details}
                setDetails={setDetails}
                deleteLayout={deleteLayout}
                handleCounterChange={handleCounterChange}
                handleChildAgeChange={handleChildAgeChange}
              />
            </div>
            <div className="flex justify-between p-3">
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
