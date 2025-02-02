import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Button } from "@/Components/ui/button";

const Buttons = ({ currentStep, steps, setCurrentStep }) => {
  return (
    <div className="flex  justify-between">
      <Button
        disabled={currentStep < 2}
        className=" rounded font-semibold text-[#8864CC] disabled:text-slate-600 hover:text-[#443266] bg-transparent hover:bg-transparent"
        onClick={() => {
          setCurrentStep((prev) => prev - 1);
        }}
      >
        <span className="flex gap-3 items-center">
          <KeyboardArrowLeftIcon /> Previous
        </span>
      </Button>
      <div className="flex gap-3">
        {currentStep === 4 && (
          <Button
            className=" px-4 py-2 font-semibold border-2 border-[#8864CC] text-[#8864CC] rounded hover:text-[#443266] hover:border-[#443266] bg-transparent hover:bg-transparent  shadow-lg"
            onClick={() => {
              setCurrentStep((prev) => prev + 1);
            }}
          >
            Summary
          </Button>
        )}
        {currentStep < 4 ? (
          <Button
            className=" px-4 py-2 font-semibold bg-gradient-to-b from-[#443266] to-[#8864CC] text-white rounded hover:bg-gradient-to-b hover:from-[#8864CC] hover:to-[#443266] shadow-lg"
            onClick={() => {
              setCurrentStep((prev) => prev + 1);
            }}
          >
            <span className="flex gap-3 items-center">
              Next <KeyboardArrowRightIcon />
            </span>
          </Button>
        ) : (
          <Button
            className=" px-4 py-2 font-semibold bg-gradient-to-b from-[#443266] to-[#8864CC] text-white rounded hover:bg-gradient-to-b hover:from-[#8864CC] hover:to-[#443266] shadow-lg"
            onClick={() => {
              //   setCurrentStep((prev) => prev + 1);
            }}
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default Buttons;
