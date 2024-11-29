import React, { useContext } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { X } from "lucide-react";
import { Button } from "@/Components/ui/button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import RoomTypeWithModal from "./Model";
import { StepperContext } from "../../Progresstracker";
import FormErrorMsg from "@/Components/ui/form-error-message";

interface roomOption {
  adultCount: number;
  childCount: number;
  childAges: number[];
}

const RoomTypes = () => {
  const stepperContext = useContext(StepperContext);

  if (!stepperContext) {
    return null;
  }

  const { setDetails, details, errorMessage, isSubmitted } = stepperContext;

  const addRoom = () => {
    const newRoom: roomOption = {
      adultCount: 1,
      childCount: 0,
      childAges: [],
    };

    setDetails((prevDetails) => ({
      ...prevDetails,
      roomOptions: [...prevDetails.roomOptions, newRoom],
    }));
  };

  const deleteRoom = (index: number) => {
    setDetails((prev) => ({
      ...prev,
      roomOptions: prev.roomOptions.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="flex flex-col gap-3 w-auto h-auto sm:flex-row sm:w-[550px] md:w-[650px] sm:items-center sm:justify-between">
      <label className="text-md md:text-lg font-semibold whitespace-nowrap">
        Travelers<span className="text-red-500">*</span>
      </label>
      <div className="sm:flex sm:flex-col sm:justify-end md:w-[430px] sm:w-[400px] w-auto">
        {window.innerWidth >= 640 ? (
          <Popover>
            <PopoverTrigger className="flex w-full h-[45px] md:h-[50px] border border-border-input items-center px-4 justify-between rounded-sm ">
              <span>--Select--</span> <KeyboardArrowDownIcon />
            </PopoverTrigger>
            <PopoverContent className="max-h-[430px] w-[256px] md:w-[430px] sm:w-[400px] overflow-hidden overflow-y-auto flex flex-col p-0 gap-0">
              <div className="flex flex-col p-2 w-full ">
                <RoomTypeWithModal deleteRoom={deleteRoom} />
              </div>
              <div className="flex justify-between p-2">
                <Button
                  onClick={addRoom}
                  disabled={details?.roomOptions.length >= 30}
                >
                  Add another room
                </Button>
                <Button onClick={() => {}}>Done</Button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Dialog>
            <DialogTrigger
              asChild
              className="flex w-full h-[45px] md:h-[50px] border border-border-input items-center px-4 justify-between rounded-sm bg-white"
            >
              <Button variant="outline">
                <span>-- Select --</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[800px] overflow-hidden overflow-y-auto p-3">
              <DialogHeader className="flex flex-row justify-between items-center">
                <DialogTitle>Room Types</DialogTitle>
                <DialogClose>
                  <X />
                </DialogClose>
              </DialogHeader>
              <div className="flex flex-col p-4 w-full ">
                <RoomTypeWithModal deleteRoom={deleteRoom} />
              </div>
              <div className="flex justify-between p-2">
                <Button
                  onClick={addRoom}
                  disabled={details?.roomOptions.length >= 30}
                >
                  Add another room
                </Button>
                <Button>Done</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
        {errorMessage && (
          <FormErrorMsg className="ml-0.5" id="searchCalendarError">
            {errorMessage?.guests}
          </FormErrorMsg>
        )}
      </div>
    </div>
  );
};

export default RoomTypes;
