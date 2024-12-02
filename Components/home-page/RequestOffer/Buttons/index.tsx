import React from "react";

import { Button } from "@/components/ui/button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface ButtonsProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  handleSearchSubmit: () => void;
  handleSearch: () => void;
}

const Buttons: React.FC<ButtonsProps> = ({
  currentStep,
  setCurrentStep,
  handleSearchSubmit,
  handleSearch,
}) => {
  return (
    <div className="flex justify-between md:p-5">
      <Button
        disabled={currentStep < 2}
        className="rounded font-semibold text-[#8864CC] disabled:text-slate-600 hover:text-[#443266] bg-transparent hover:bg-transparent w-fit p-0 m-0"
        onClick={() => {
          setCurrentStep((prev) => prev - 1);
        }}
      >
        <span className="flex gap-3 items-center">
          <KeyboardArrowLeftIcon /> Previous
        </span>
      </Button>
      <div className="flex gap-3">
        {currentStep < 2 ? (
          <Button
            className=" px-4 py-2 font-semibold bg-gradient-to-b from-[#443266] to-[#8864CC] text-white rounded hover:bg-gradient-to-b hover:from-[#8864CC] hover:to-[#443266] shadow-lg"
            onClick={handleSearchSubmit}
          >
            <span className="flex gap-3 items-center">
              Next <KeyboardArrowRightIcon />
            </span>
          </Button>
        ) : (
          <Button
            className=" px-4 py-2 font-semibold bg-gradient-to-b from-[#443266] to-[#8864CC] text-white rounded hover:bg-gradient-to-b hover:from-[#8864CC] hover:to-[#443266] shadow-lg"
            onClick={handleSearch}
          >
            Search
          </Button>
        )}
      </div>
    </div>
  );
};

export default Buttons;
