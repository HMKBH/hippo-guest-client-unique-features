"use client";

import React, { createContext, useState } from "react";
import LocationAndGuests from "../LocationGuest";
import PropertyAndBudget from "../PropertyAndBudget";
import StarRatingSelection from "../StarRatingSelection";
import Stepper from "./Stepper";
import Buttons from "./Buttons";
import ReviewsAndNotes from "../ReviewsAndNotes";
import SummaryOverview from "../SummaryOverview";

const TimeLine = ({ details, setDetails }) => {
  const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];
  const [currentStep, setCurrentStep] = useState(1);

  const StepperContext = createContext(null);

  const displayStep = (steps) => {
    switch (steps) {
      case 1:
        return <LocationAndGuests />;
      case 2:
        return <PropertyAndBudget details={details} setDetails={setDetails} />;
      case 3:
        return (
          <StarRatingSelection details={details} setDetails={setDetails} />
        );

      case 4:
        return <ReviewsAndNotes />;
      case 5:
      // return <SummaryOverview />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col bg-white justify-between container h-[680px] gap-5 my-10 p-10 shadow-xl">
      <div className="flex flex-col items-center gap-5">
        {currentStep !== 5 && (
          <Stepper steps={steps} currentStep={currentStep} />
        )}

        <div className="">
          <StepperContext.Provider value={{ details, setDetails }}>
            {displayStep(currentStep)}
          </StepperContext.Provider>
        </div>
      </div>

      <Buttons
        currentStep={currentStep}
        steps={steps}
        setCurrentStep={setCurrentStep}
      />
    </div>
  );
};

export default TimeLine;
