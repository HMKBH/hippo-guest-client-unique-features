import React from "react";

interface TimeLineProps {
  steps: string[];
  currentStep: number;
}

const TimeLine: React.FC<TimeLineProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between w-[50%]">
      {steps.map((step, i) => (
        <div
          key={i}
          className={`relative flex flex-col justify-center items-center  w-full ${
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
            className={`md:w-[45px] md:h-[45px] w-[40px] h-[40px] flex items-center justify-center z-10 relative rounded-full md:border-[3px] md:text-lg border-[2px] border-primary font-semibold text-white text-sm ${
              i + 1 < currentStep
                ? "bg-[#443266]"
                : currentStep === i + 1
                ? "bg-[#443266]"
                : "bg-[#D9D9D9]"
            }`}
          >
            {i + 1}
          </div>
          <p className="text-[#1F182B] text-sm md:text-lg">{step}</p>
        </div>
      ))}
    </div>
  );
};

export default TimeLine;
