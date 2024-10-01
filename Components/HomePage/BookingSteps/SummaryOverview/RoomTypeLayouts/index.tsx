import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { X } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";

const RoomTypeLayouts = ({ layout }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <VisibilityIcon />
        </DialogTrigger>
        <DialogContent className="max-w-[890px] h-fit flex flex-col p-0 gap-0 bg-white">
          <DialogHeader className="flex flex-row justify-between items-center p-2">
            <span>Layouts {layout.id}</span>
            <DialogClose className="border border-border-input rounded-full">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>
          <Separator className="bg-[#D9D9D9] w-auto h-0.5 mx-2" />
          <div className="flex  flex-col h-fit gap-2 px-5 py-2">
            <div className="flex gap-4">
              <h3>Room Count</h3>
              <p>{layout.roomCount}</p>
            </div>
            <div className="flex gap-4">
              <h3>Guest Count</h3>
              <p>
                {layout.adultCount} Adults and {layout.childCount} Children ()
              </p>
            </div>
            <div className="flex gap-4">
              <h3>Basis</h3>
              <p>{layout.basis}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomTypeLayouts;
