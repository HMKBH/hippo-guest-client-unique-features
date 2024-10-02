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
    PropertyTypes: string[];
    layoutOptions: {
      id: number;
      adultCount: number;
      roomCount: number;
      childCount: number;
      childAges: number[];
      basis: string;
    }[];
    StarRating: string[];
    BudgetPerNight: {
      minimum: string;
      maximum: string;
    };
    SpecialNotes: string;
    location: Record<string, unknown>;
    BookingDates: Record<string, unknown>;
    reviewScore: number[];
  };
  setDetails: React.Dispatch<
    React.SetStateAction<{
      PropertyTypes: string[];
      layoutOptions: {
        id: number;
        adultCount: number;
        roomCount: number;
        childCount: number;
        childAges: number[];
        basis: string;
      }[];
      StarRating: string[];
      BudgetPerNight: {
        minimum: string;
        maximum: string;
      };
      SpecialNotes: string;
      location: Record<string, unknown>;
      BookingDates: Record<string, unknown>;
      reviewScore: number[];
    }>
  >;
}

export const StepperContext = createContext<StepperContextType | null>(null);

const TimeLine = () => {
  const [details, setDetails] = useState<StepperContextType["details"]>({
    PropertyTypes: [],
    layoutOptions: [
      {
        id: 1,
        adultCount: 1,
        roomCount: 1,
        childCount: 0,
        childAges: [],
        basis: "Bed and Breakfast",
      },
    ],
    StarRating: [],
    BudgetPerNight: {
      minimum: "",
      maximum: "",
    },
    SpecialNotes: "",
    location: {},
    BookingDates: {},
    reviewScore: [5, 7],
  });

  console.log({ details });

  const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];
  const [currentStep, setCurrentStep] = useState(1);

  const displayStep = (steps: number) => {
    switch (steps) {
      case 1:
        return <LocationAndGuests />;
      case 2:
        return <PropertyAndBudget />;
      case 3:
        return <StarRatingSelection />;
      case 4:
        return <ReviewsAndNotes />;
      case 5:
        return <SummaryOverview />;
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
