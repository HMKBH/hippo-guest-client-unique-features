import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const BasisTypes = () => {
  return (
    <div className="flex items-center gap-14 h-[20px] w-[515px]">
      <Select>
        <SelectTrigger className="flex w-[430px] h-[50px] border border-border-input items-center px-4 justify-between rounded-sm focus:ring-offset-0 focus:ring-0">
          --Select--
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="select-all">Select All</SelectItem>
          <SelectItem value="full-board">Full Board</SelectItem>
          <SelectItem value="bed-breakfast">Bed & Breakfast</SelectItem>
          <SelectItem value="half-board">Half Board</SelectItem>
          <SelectItem value="room-only">Room Only</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BasisTypes;
