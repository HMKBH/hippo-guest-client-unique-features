import { Textarea } from "@/Components/ui/textarea";
import React from "react";

const SpecialNotes = () => {
  return (
    <div className="flex gap-4 w-[800px] justify-between">
      <label className="text-lg text-text-color font-semibold">
        Special Notes<span className="text-red-500 font-bold">*</span>
      </label>
      <div className="flex flex-col gap-4">
        <Textarea className="w-[515px] h-[270px] max-h-[270px] text-xl border border-border-input bg-white focus-visible:ring-offset-0 focus-visible:ring-0" />
      </div>
    </div>
  );
};

export default SpecialNotes;
