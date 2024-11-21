import React, { useContext } from "react";
import { Separator } from "@/Components/ui/separator";
import { StepperContext } from "../Progresstracker";
import RoomTypeLayouts from "./RoomTypeLayouts";

const SummaryOverview = () => {
  const { details } = useContext(StepperContext);

  return (
    <div className="flex flex-col gap-3 w-full items-start">
      <h2 className="font-semibold text-3xl mx-20 text-text-color">Summary</h2>
      <Separator className="bg-[#D9D9D9] w-[1300px] h-0.5" />
      <div className="flex flex-col mx-20 gap-4">
        <div className="flex justify-between items-baseline gap-10 ">
          <h3 className="font-semibold whitespace-nowrap  text-lg text-text-color">
            Location
          </h3>
          <p className="text-text-color w-[900px]">{details.location.label}</p>
        </div>
        <div className="flex justify-between items-baseline ">
          <h3 className="font-semibold whitespace-nowrap  text-lg text-text-color">
            Radius
          </h3>
          <p className="text-text-color w-[900px]">
            {`${details.location.radius / 1000} km Range`}
          </p>
        </div>
        <div className="flex justify-between items-baseline">
          <h3 className="font-semibold whitespace-nowrap text-lg text-text-color">
            Check in
          </h3>
          <p className="text-text-color w-[900px]">
            {new Date(details.bookingDates.from).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex justify-between items-baseline">
          <h3 className="font-semibold whitespace-nowrap text-lg text-text-color">
            Check out
          </h3>
          <p className="text-text-color w-[900px]">
            {details.bookingDates.to
              ? new Date(details.bookingDates.to).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "N/A"}
          </p>
        </div>
        <div className="flex justify-between items-baseline ">
          <h3 className="font-semibold whitespace-nowrap  text-lg text-text-color">
            Property Type
          </h3>
          <p className="text-text-color w-[900px]">
            {details.PropertyTypes.map((type: PropertyType) => (
              <span key={type.id} className="mr-2">
                {type.name},
              </span>
            ))}
          </p>
        </div>
        <div className="flex justify-between items-baseline ">
          <h3 className="font-semibold whitespace-nowrap  text-lg text-text-color">
            Room Type
          </h3>
          <span className="flex flex-col gap-1">
            {details.roomOptions.map((layout) => (
              <span
                key={layout.id}
                className="text-text-color w-[900px] flex gap-2  items-baseline"
              >
                <p>Layouts {layout.id}</p>
                <RoomTypeLayouts layout={layout} />
              </span>
            ))}
          </span>
        </div>
        <div className="flex justify-between items-baseline gap-10 ">
          <h3 className="font-semibold whitespace-nowrap  text-lg text-text-color">
            Budget Per Night
          </h3>
          <p className="text-text-color w-[900px]">
            {`${details.BudgetPerNight.minimum} LKR to ${details.BudgetPerNight.maximum} LKR`}
          </p>
        </div>
        <div className="flex justify-between items-baseline gap-10 ">
          <h3 className="font-semibold whitespace-nowrap  text-lg text-text-color">
            Star Rating
          </h3>
          <p className="text-text-color w-[900px]">
            {details.StarRating.map((rating: StarRating) => (
              <span key={rating.id}>{rating.numberOfStar} Star, </span>
            ))}
          </p>
        </div>
        <div className="flex justify-between items-baseline gap-10 ">
          <h3 className="font-semibold whitespace-nowrap  text-lg text-text-color">
            Review
          </h3>
          <p className="text-text-color w-[900px]">
            {`${details.reviewScore[0]}/10 and ${details.reviewScore[1]}/10`}
          </p>
        </div>
        <div className="flex justify-between items-baseline gap-10 ">
          <h3 className="font-semibold whitespace-nowrap  text-lg text-text-color">
            Special Notes
          </h3>
          <p className="text-text-color w-[900px]">{details.SpecialNotes}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryOverview;
