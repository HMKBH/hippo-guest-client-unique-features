"use client";

import React, { createContext, useState } from "react";
import LocationAndGuests from "../LocationGuest";
import PropertyAndBudget from "../PropertyAndBudget";
import StarRatingSelection from "../StarRatingSelection";
import Stepper from "./Stepper";
import Buttons from "./Buttons";
import ReviewsAndNotes from "../ReviewsAndNotes";
import SummaryOverview from "../SummaryOverview";

interface StepperContextType {
  details: {
    roomOptions: {
      id: number;
      adultCount: number;
      childCount: number;
      childAges: number[];
    }[];

    location: Record<string, unknown>;
    bookingDates: Record<string, unknown>;
    showSuggestions: boolean;
  };
  setDetails: React.Dispatch<
    React.SetStateAction<{
      roomOptions: {
        id: number;
        adultCount: number;
        childCount: number;
        childAges: number[];
      }[];

      location: Record<string, unknown>;
      bookingDates: Record<string, unknown>;
      showSuggestions: boolean;
    }>
  >;
}

export const StepperContext = createContext<StepperContextType | null>(null);

const TimeLine = () => {
  const [details, setDetails] = useState<StepperContextType["details"]>({
    roomOptions: [
      {
        id: 1,
        adultCount: 1,
        childCount: 0,
        childAges: [],
      },
    ],

    location: {},
    bookingDates: {},
    showSuggestions: false,
  });

  console.log({ details });

  const steps = ["Step 1", "Step 2"];
  const [currentStep, setCurrentStep] = useState(1);

  const displayStep = (steps: number) => {
    switch (steps) {
      case 1:
        return <LocationAndGuests />;
      case 2:
        return <PropertyAndBudget />;
      default:
        return null;
    }
  };
  return (
    <div className="2xl:container flex flex-col bg-white justify-between lg:h-[680px] gap-10 2xl:my-10 m-5 p-5 shadow-xl">
      <div className="flex flex-col items-center gap-5 md:gap-10 w-full">
        {currentStep !== 5 && (
          <Stepper steps={steps} currentStep={currentStep} />
        )}

        <div>
          <StepperContext.Provider value={{ details, setDetails }}>
            {displayStep(currentStep)}
          </StepperContext.Provider>
        </div>
      </div>

      <Buttons currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </div>
  );
};

export default TimeLine;
