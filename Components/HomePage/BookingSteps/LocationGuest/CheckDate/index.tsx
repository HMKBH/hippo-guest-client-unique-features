import React, { useContext, useState } from "react";
import CheckinCheckoutCalendar from "./checkin-checkout-calendar";
import { StepperContext } from "../../Progresstracker";

const CheckDate = () => {
  const { setDetails } = useContext(StepperContext) ?? {};

  const handleSelection = (newbookingDates: any) => {
    setDetails?.((prevDetails) => ({
      ...prevDetails,
      bookingDates: {
        ...prevDetails.bookingDates,
        from: newbookingDates.from,
        to: newbookingDates.to,
      },
    }));
  };

  return (
    <div className="flex flex-col gap-3 w-auto h-auto sm:flex-row sm:w-[550px] md:w-[650px] sm:items-center sm:justify-between">
      <label className="text-md md:text-lg font-semibold whitespace-nowrap">
        Check In - Out<span className="text-red-500 font-bold">*</span>
      </label>
      <CheckinCheckoutCalendar handleSelection={handleSelection} />
    </div>
  );
};

export default CheckDate;
