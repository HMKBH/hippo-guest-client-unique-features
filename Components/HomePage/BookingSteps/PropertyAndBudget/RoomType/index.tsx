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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";

interface Details {
  roomOptions: roomOption[];
}

interface roomOption {
  id: number;
  adultCount: number;
  childCount: number;
  childAges: number[];
}

const RoomTypes = ({
  details,
  setDetails,
}: {
  details: Details;
  setDetails: React.Dispatch<React.SetStateAction<Details>>;
}) => {
  const addRoom = () => {
    const newRoomId = details.roomOptions.length + 1;

    const newRooms: roomOption = {
      id: newRoomId,
      adultCount: 1,
      childCount: 0,
      childAges: [],
    };

    setDetails((prevDetails) => ({
      ...prevDetails,
      roomOptions: [...prevDetails.roomOptions, newRooms],
    }));
  };
  const deleteRoom = (roomId: number | string) => {
    setDetails((prev: Details) => ({
      ...prev,
      roomOptions: prev.roomOptions.filter(
        (option: roomOption) => option.id !== parseInt(roomId.toString()) // Convert to number for comparison
      ),
    }));
  };

  return (
    <div className="flex flex-col md:flex-row md:gap-4 gap-2 md:w-[600px] 2xl:w-[800px] w-full md:justify-between md:items-center">
      <label className="2xl:text-lg text-sm font-semibold">
        Travelers<span className="text-red-500 font-bold">*</span>
      </label>
      <div className="flex items-center 2xl:gap-14 2xl:w-[515px]">
        <Popover>
          <PopoverTrigger className="flex 2xl:w-[430px] w-[320px] h-[40px] 2xl:h-[50px] border border-border-input items-center px-4 justify-between rounded-sm ">
            <span>--Select--</span> <KeyboardArrowDownIcon />
          </PopoverTrigger>
          <PopoverContent className="max-h-[430px] overflow-hidden overflow-y-auto flex flex-col p-0 gap-0 sm:rounded-none 2xl:w-[430px] w-[320px]">
            <div className="flex flex-wrap p-2 2xl:w-[430px] w-[320px]">
              <RoomTypeWithModal
                rooms={details.roomOptions}
                details={details}
                deleteRoom={deleteRoom}
                setDetails={setDetails}
                handleChildAgeChange={() => {}}
                handleCounterChange={() => {}}
              />
            </div>
            <div className="flex justify-between p-3">
              <Button onClick={addRoom}>Add another room</Button>
              <Button onClick={() => {}}>Done</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default RoomTypes;
{
  /* <Dialog>
<DialogTrigger className="flex 2xl:w-[430px] w-[320px] h-[40px] 2xl:h-[50px] border border-border-input items-center px-4 justify-between rounded-sm ">
  <span>--Select--</span> <KeyboardArrowDownIcon />
</DialogTrigger>
<DialogContent className="max-w-[890px] max-h-[680px] min-h-[400px] h-fit flex flex-col p-0 gap-0 overflow-y-scroll overflow-x-hidden sm:rounded-none">
  <DialogHeader className="flex flex-row justify-end items-center p-2">
    <DialogClose className="border border-border-input rounded-full">
      <X className="h-5 w-5" />
      <span className="sr-only">Close</span>
    </DialogClose>
  </DialogHeader>
  <div className="flex flex-wrap p-2">
    <RoomTypeWithModal
      rooms={rooms}
      details={details}
      setDetails={setDetails}
      deleteRoom={deleteRoom}
    />
  </div>
  <div className="flex justify-between p-3">
    <Button onClick={addRoom}>Add another Room</Button>
    <Button onClick={() => {}}>Done</Button>
  </div>
</DialogContent>
</Dialog> */
}
