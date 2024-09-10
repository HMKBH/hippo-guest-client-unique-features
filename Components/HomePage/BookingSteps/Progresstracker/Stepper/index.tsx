import React from "react";

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between">
      {steps.map((step, i) => (
        <div
          key={i}
          className={`relative flex flex-col justify-center items-center w-80 ${
            i !== 0
              ? `${
                  i + 1 < currentStep || currentStep === i + 1
                    ? "before:bg-[#443266]"
                    : "before:bg-[#D9D9D9]"
                } before:content-[''] before:absolute before:w-full before:h-1 before:right-2/4 before:top-1/3 before:-translate-y-2/4`
              : ""
          } ${currentStep === i + 1 ? "active" : ""} ${
            i + 1 < currentStep ? "complete" : ""
          }`}
        >
          <div
            className={`w-[50px] h-[50px] flex items-center justify-center z-10 relative rounded-full border-[3px] border-primary font-semibold text-white ${
              i + 1 < currentStep
                ? "bg-[#443266]"
                : currentStep === i + 1
                ? "bg-[#443266]"
                : "bg-[#D9D9D9]"
            }`}
          >
            {i + 1}
          </div>
          <p className="text-[#1F182B]">{step}</p>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
