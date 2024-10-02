import React from "react";
import Slider from "@mui/material/Slider";

interface ReviewsProps {
  setDetails: (details: any) => void;
  details: { reviewScore: number };
}

const Reviews: React.FC<ReviewsProps> = ({ setDetails, details }) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    setDetails((prevDetails: { reviewScore: number }) => ({
      ...prevDetails,
      reviewScore: newValue as number,
    }));
  };

  const marks = [
    { value: 0, label: "0" },
    { value: 10, label: "10" },
  ];

  return (
    <div className="flex flex-col md:flex-row md:gap-4 gap-2 2xl:w-[800px] md:justify-between md:items-center">
      <label className=" md:!text-lg text-sm font-semibold">
        Reviews<span className="text-red-500 font-bold ">*</span>
      </label>
      <div className="flex 2xl:w-[515px] ">
        <Slider
          value={details.reviewScore}
          onChange={handleChange}
          valueLabelDisplay="auto"
          step={0.01}
          marks={marks}
          max={10}
          min={0}
          sx={{
            color: "#443266",
            margin: "0",
            padding: "0",
            "& .MuiSlider-markLabel ": {
              height: "24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "42px",
              position: "absolute",
              borderRadius: "5px",
              color: "white",
              bgcolor: "#443266",
            },
            "& .MuiSlider-valueLabelLabel": {
              bgcolor: "#443266",
              position: "absolute",
              top: "0",
            },
            "& .MuiSlider-mark": {
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#443266",
            },
            "& .MuiSlider-valueLabelOpen ": {
              bgcolor: "#443266",
            },
            "& .MuiSlider-valueLabelLabel": {
              bgcolor: "#443266",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Reviews;
