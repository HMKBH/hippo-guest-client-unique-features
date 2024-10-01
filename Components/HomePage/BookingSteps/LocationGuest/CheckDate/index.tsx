import React, { useState } from "react";
import { CheckinCheckoutCalendar } from "hippo-guest-component-library";

interface CheckDateProps {
  setDetails: React.Dispatch<React.SetStateAction<{ BookingDates: any }>>;
}

const CheckDate: React.FC<CheckDateProps> = ({ setDetails }) => {
  const handleSelection = (newBookingDates: any) => {
    setDetails((prevDetails: { BookingDates: any }) => ({
      ...prevDetails,
      BookingDates: {
        ...prevDetails.BookingDates,
        from: newBookingDates.from,
        to: newBookingDates.to,
      },
    }));
  };

  return (
    <div className="flex flex-col md:flex-row md:gap-4 gap-2 md:w-[600px] 2xl:w-[800px] md:justify-between md:items-center ">
      <label className="text-sm md:!text-lg font-semibold">
        Check In - Check Out<span className="text-red-500 font-bold">*</span>
      </label>
      <div className="flex items-center md:gap-14 2xl:w-[515px] ">
        <CheckinCheckoutCalendar
          className="2xl:w-[430px] md:w-[380px] w-[320px] !h-[40px] 2xl:!h-[50px] md:!h-[45px] !border border-solid border-border-input items-center px-4 justify-between rounded-sm "
          errorMessage={""}
          handleSelection={handleSelection}
        />
      </div>
    </div>
  );
};

export default CheckDate;
