import React from "react";
import { CheckinCheckoutCalendar } from "hippo-guest-component-library";

const CheckDate = () => {
  return (
    <div className="flex gap-4 w-[800px] justify-between">
      <label className="text-lg text-text-color font-semibold">
        Check Date<span className="text-red-500 font-bold">*</span>
      </label>
      <div className="flex flex-col gap-2">
        {/* <CheckinCheckoutCalendar bookingDatesState={[]} errorMessage={""} /> */}
      </div>
    </div>
  );
};

export default CheckDate;
