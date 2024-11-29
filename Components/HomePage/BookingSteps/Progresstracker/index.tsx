"use client";

import React, { createContext, useState } from "react";

import Buttons from "./Buttons";
import Stepper from "./Stepper";
import LocationAndGuests from "../LocationGuest";
import PropertyAndBudget from "../PropertyAndBudget";

interface StepperContextType {
  details: {
    roomOptions: {
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
        adultCount: number;
        childCount: number;
        childAges: number[];
      }[];

      location: Record<string, unknown>;
      bookingDates: Record<string, unknown>;
      showSuggestions: boolean;
    }>
  >;
  errorMessage: {
    location: string;
    dates: string;
    guests: string;
  };
  setErrorMessage: React.Dispatch<
    React.SetStateAction<{
      location: string;
      dates: string;
      guests: string;
    }>
  >;
  isSubmitted: {
    step1: boolean;
    step2: boolean;
  };
  validateDates?: () => void;
  validateLocation?: () => void;
  setIsSubmitted: React.Dispatch<
    React.SetStateAction<{
      step1: boolean;
      step2: boolean;
    }>
  >;
}

export const StepperContext = createContext<StepperContextType | null>(null);

const TimeLine = () => {
  const [details, setDetails] = useState<StepperContextType["details"]>({
    roomOptions: [
      {
        adultCount: 1,
        childCount: 0,
        childAges: [],
      },
    ],

    location: {
      latitude: 0,
      longitude: 0,
      city: "",
      district: "",
      country: "",
      label: "",
      province: "",
      radius: 5000,
    },
    bookingDates: {},
    showSuggestions: false,
  });

  console.log({ details });

  const steps = ["Step 1", "Step 2"];
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState({
    step1: false,
    step2: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    location: "",
    dates: "",
    guests: "",
  });

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

  const validateDates = () => {
    const { from, to } = details.bookingDates;
    const startDate = new Date(from as string | number | Date);
    const endDate = new Date(to as string | number | Date);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 90) {
      setErrorMessage((prev) => ({
        ...prev,
        dates: "You can only book for a maximum of 90 days.",
      }));
      return false;
    } else {
      return true;
    }
  };

  const validateChildAges = () => {
    const { roomOptions } = details;

    const hasNull = roomOptions.some((room) => {
      return room.childAges.some((age) => age === null);
    });
    const hasNullValues = details.roomOptions.some(
      (option) =>
        option.adultCount === null ||
        option.childCount === null ||
        option.childAges === null
    );

    if (hasNull || hasNullValues) {
      setErrorMessage((prev) => ({
        ...prev,
        guests: "Please select the children ages.",
      }));
      setIsSubmitted((prev) => ({
        ...prev,
        step2: true,
      }));
      return false;
    } else {
      return true;
    }
  };

  const validateLocation = () => {
    const label = details.location.label;

    if (label === "" || label === undefined || label === null) {
      setErrorMessage((prev) => ({
        ...prev,
        location: "Please select a location.",
      }));
      return false;
    } else {
      setIsSubmitted((prev) => ({
        ...prev,
        step1: true,
      }));
      return true;
    }
  };

  const handleSearchSubmit = () => {
    if (validateDates() && validateLocation()) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsSubmitted((prev) => ({
        ...prev,
        step1: true,
      }));
    }
  };

  const handleSearch = () => {
    validateChildAges();
  };

  return (
    <div className="flex flex-col bg-white justify-between w-full lg:h-[575px] m-5 p-5 gap-10 md:gap-0 shadow-xl">
      <div className="flex flex-col items-center gap-5 w-full">
        <Stepper steps={steps} currentStep={currentStep} />

        <StepperContext.Provider
          value={{
            details,
            setDetails,
            isSubmitted,
            errorMessage,
            setIsSubmitted,
            setErrorMessage,
          }}
        >
          {displayStep(currentStep)}
        </StepperContext.Provider>
      </div>

      <Buttons
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        handleSearchSubmit={handleSearchSubmit}
        handleSearch={handleSearch}
      />
    </div>
  );
};

export default TimeLine;
