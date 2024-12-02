import React, { useContext } from "react";

import { Input } from "@/components/ui/input";

import { RequestOffer } from "../..";
import FormErrorMsg from "@/components/ui/formErrorMessage";

const EstimateBudget = () => {
  const { setDetails, details, errorMessage, setErrorMessage, isSubmitted } =
    useContext(RequestOffer) ?? {};

  const handleMinChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setDetails?.((prevDetails: any) => ({
      ...prevDetails,
      estimateBudget: {
        ...prevDetails.estimateBudget,
        minimum: value,
      },
    }));
    if (value > 0 && (details?.estimateBudget?.maximum ?? 0) !== "") {
      setErrorMessage?.((prevError: any) => ({
        ...prevError,
        budget: "",
      }));
    }
  };

  const handleMaxChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setDetails?.((prevDetails: any) => ({
      ...prevDetails,
      estimateBudget: {
        ...prevDetails.estimateBudget,
        maximum: value,
      },
    }));

    if (
      (details?.estimateBudget?.minimum ?? 0) < value &&
      (details?.estimateBudget?.minimum ?? 0) !== ""
    ) {
      setErrorMessage?.((prevError: any) => ({
        ...prevError,
        budget: "",
      }));
    }
  };
  return (
    <div className="flex flex-col gap-3 w-auto h-auto sm:flex-row sm:w-[550px] md:w-[650px] sm:items-center sm:justify-between ">
      <label className="text-md md:text-lg font-semibold whitespace-nowrap">
        Estimate Budget<span className="text-red-500">*</span>
      </label>
      <div className="flex flex-col">
        <div className="flex flex-row sm:justify-start md:w-[430px] sm:w-[400px] h-auto w-auto items-center gap-2">
          <Input
            className="h-[45px] md:h-[50px] border border-border-input text-md font-semibold text-text-color bg-white focus-visible:ring-offset-0 focus-visible:ring-0  "
            type="number"
            placeholder="Minimum"
            min={0}
            max={10000}
            value={details?.estimateBudget?.minimum}
            onChange={handleMinChange}
          />
          To
          <Input
            className="h-[45px] md:h-[50px] border border-border-input text-md font-semibold text-text-color bg-white focus-visible:ring-offset-0 focus-visible:ring-0  "
            type="number"
            placeholder="Maximum"
            min={0}
            max={10000}
            value={details?.estimateBudget?.maximum}
            onChange={handleMaxChange}
          />
        </div>
        {errorMessage && isSubmitted?.step2 && (
          <FormErrorMsg className="max-w-[390px] ml-1">
            {errorMessage?.budget}
          </FormErrorMsg>
        )}
      </div>
    </div>
  );
};

export default EstimateBudget;
