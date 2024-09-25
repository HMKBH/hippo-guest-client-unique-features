import React from "react";
import { Separator } from "@/Components/ui/separator";

const SummaryOverview = () => {
  return (
    <div className="flex flex-col gap-3 w-full items-start">
      <h2 className="font-semibold text-3xl text-text-color">Summary</h2>
      <Separator className="bg-[#D9D9D9] !w-[1200px] h-0.5" />
    </div>
  );
};

export default SummaryOverview;
