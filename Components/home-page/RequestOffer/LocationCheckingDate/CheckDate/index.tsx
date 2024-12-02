import React from "react";
import CheckinCheckoutCalendar from "./checkin-checkout-calendar";

const CheckDate = () => {
  return (
    <div className="flex flex-col gap-3 w-auto h-auto sm:flex-row sm:w-[550px] md:w-[650px] sm:items-center sm:justify-between">
      <label className="text-md md:text-lg font-semibold whitespace-nowrap">
        Check In - Out<span className="text-red-500 font-bold">*</span>
      </label>
      <CheckinCheckoutCalendar />
    </div>
  );
};

export default CheckDate;
