import { Textarea } from "@/Components/ui/textarea";
import React from "react";

const SpecialNotes = () => {
  return (
    <div className="flex flex-col 2xl:flex-row 2xl:gap-4 gap-2 2xl:w-[800px] 2xl:justify-between 2xl:items-cente">
      <label className="2xl:text-lg text-sm font-semibold">
        Special Notes<span className="text-red-500 font-bold">*</span>
      </label>
      <div className="flex flex-col gap-4">
        <Textarea className="2xl:w-[515px] h-[270px] max-h-[270px] w-[300px] text-md border border-border-input bg-white focus-visible:ring-offset-0 focus-visible:ring-0" />
      </div>
    </div>
  );
};

export default SpecialNotes;
