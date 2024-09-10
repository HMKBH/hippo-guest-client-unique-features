import React, { useState } from "react";
import { Checkbox } from "@/Components/ui/checkbox";
import StarCount from "./StarCount";

interface StarRating {
  id: string;
  numberOfStar: number;
  numberOfProperties: number;
}
const rating: StarRating[] = [
  { id: "7Star", numberOfStar: 7, numberOfProperties: 0 },
  { id: "6Star", numberOfStar: 6, numberOfProperties: 3 },
  { id: "5Star", numberOfStar: 5, numberOfProperties: 10 },
  { id: "4Star", numberOfStar: 4, numberOfProperties: 17 },
  { id: "3Star", numberOfStar: 3, numberOfProperties: 13 },
  { id: "2Star", numberOfStar: 2, numberOfProperties: 18 },
  { id: "1Star", numberOfStar: 1, numberOfProperties: 50 },
];

const StarRatings = ({ details, setDetails }) => {
  const selectableRatings = rating.filter(
    (rate) => rate.numberOfProperties > 0
  );

  const isAllSelected = details.StarRating.length === selectableRatings.length;

  const handleSelectAllProperties = () => {
    if (isAllSelected) {
      setDetails({ ...details, StarRating: [] });
    } else {
      setDetails({ ...details, StarRating: selectableRatings });
    }
  };

  return (
    <div className="flex gap-4 w-[800px] justify-between">
      <label className="text-lg text-text-color font-semibold">
        Star rating<span className="text-red-500 font-bold">*</span>
      </label>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-14 h-[20px] w-[515px] ">
          <Checkbox
            id="AllProperties"
            onClick={handleSelectAllProperties}
            className="border border-border-input"
            checked={isAllSelected}
          />
          <label
            htmlFor="AllProperties"
            className="text-sm font-medium pr-6 text-text-color leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-30"
          >
            All Rated Properties
          </label>
          <p className="peer-disabled:cursor-not-allowed peer-disabled:opacity-30 text-text-color">
            (Number of properties - 100)
          </p>
        </div>
        {rating.map((rate) => (
          <StarCount
            key={rate.id}
            rate={rate}
            details={details}
            setDetails={setDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default StarRatings;
