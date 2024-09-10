import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { Checkbox } from "@/Components/ui/checkbox";

interface StarCountProps {
  rate: {
    id: string;
    numberOfStar: number;
    numberOfProperties: number;
  };
  selectedList: StarRatings[];
  setSelectedList: React.Dispatch<React.SetStateAction<StarRatings[]>>;
}

interface StarRatings {
  id: string;
  numberOfStar: number;
  numberOfProperties: number;
}

const StarCount = ({ rate, details, setDetails }: StarCountProps) => {
  const isSelected = details.StarRating.some((list) => list.id === rate.id);

  const handleSelect = () => {
    if (rate.numberOfProperties === 0) return;

    setDetails((prevDetails: { StarRating: any[] }) => {
      const updatedSelectedList = isSelected
        ? prevDetails.StarRating.filter((item) => item.id !== rate.id)
        : [...prevDetails.StarRating, { ...rate }];

      return {
        ...prevDetails,
        StarRating: updatedSelectedList,
      };
    });
  };

  function renderStarIcons(rate: { numberOfStar: number }) {
    const starIcons = Array.from({ length: 7 }).map((_, index) => {
      const isFilled = index < rate.numberOfStar;
      const IconComponent = isFilled ? StarIcon : StarOutlineIcon;
      return <IconComponent className="fill-star-rating" key={index} />;
    });

    return starIcons;
  }
  const starIcons = renderStarIcons({ numberOfStar: rate.numberOfStar });

  return (
    <div
      onClick={handleSelect}
      className="flex gap-10 items-center h-[20px] w-[515px] "
    >
      <Checkbox
        id={rate.id}
        checked={isSelected}
        disabled={rate.numberOfProperties === 0}
        className="border border-border-input fill-star-rating"
      />
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-30">
        {starIcons}
      </label>
      <p className=" peer-disabled:cursor-not-allowed peer-disabled:opacity-30 text-text-color">
        {`${rate.numberOfStar} (Number of properties - ${rate.numberOfProperties})`}
      </p>
    </div>
  );
};

export default StarCount;
