"use client";

import React, { createContext, useState } from "react";

import Buttons from "./Buttons";
import TimeLine from "./TimeLine";
import PropertyAndBudget from "./GuestBudget";
import LocationCheckingDate from "./LocationCheckingDate";

interface RequestOffersType {
  details: {
    roomOptions: {
      adultCount: number;
      childCount: number;
      childAges: number[];
    }[];

    location: Record<string, unknown>;
    bookingDates: Record<string, unknown>;
    showSuggestions: boolean;
    estimateBudget: {
      minimum: string;
      maximum: string;
    };
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
      estimateBudget: {
        minimum: string;
        maximum: string;
      };
    }>
  >;
  errorMessage: {
    budget: string;
    location: string;
    dates: string;
    guests: string;
  };
  setErrorMessage: React.Dispatch<
    React.SetStateAction<{
      location: string;
      dates: string;
      guests: string;
      budget: string;
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

export const RequestOffer = createContext<RequestOffersType | null>(null);

const RequestOffers = () => {
  const [details, setDetails] = useState<RequestOffersType["details"]>({
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
    estimateBudget: {
      minimum: "",
      maximum: "",
    },
    bookingDates: {
      from: new Date().toISOString().split("T")[0],
      to: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split("T")[0],
    },
    showSuggestions: false,
  });

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
    budget: "",
  });

  const displayStep = (steps: number) => {
    switch (steps) {
      case 1:
        return <LocationCheckingDate />;
      case 2:
        return <PropertyAndBudget />;
      default:
        return null;
    }
  };

  const validateEstimateBudget = () => {
    const { minimum, maximum } = details.estimateBudget;

    if (minimum === "" || maximum === "") {
      setErrorMessage((prev) => ({
        ...prev,
        budget: "Please enter the budget range.",
      }));
      return false;
    }
    if (Number(minimum) <= 0 || Number(minimum) >= Number(maximum)) {
      setErrorMessage((prev) => ({
        ...prev,
        budget:
          "Minimum budget should be greater than 0 and less than maximum budget.",
      }));
      return false;
    } else {
      return true;
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
      setIsSubmitted((prev) => ({
        ...prev,
        step1: true,
      }));
      return false;
    } else {
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
    if (validateChildAges() && validateEstimateBudget()) {
    } else {
      setIsSubmitted((prev) => ({
        ...prev,
        step2: true,
      }));
    }
  };

  return (
    <div className="flex flex-col bg-white justify-between w-full lg:h-[600px] my-20 p-5 gap-10 md:gap-0 shadow-xl container">
      <div className="flex flex-col items-center gap-5 w-full">
        <TimeLine steps={steps} currentStep={currentStep} />
        <RequestOffer.Provider
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
        </RequestOffer.Provider>
      </div>
      <Buttons
        currentStep={currentStep}
        handleSearch={handleSearch}
        setCurrentStep={setCurrentStep}
        handleSearchSubmit={handleSearchSubmit}
      />
    </div>
  );
};

export default RequestOffers;
