import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { Separator } from "@/Components/ui/separator";
import { Counter } from "hippo-guest-component-library";
import GuestCounter from "./GuestCounter";
import BasisTypes from "./basisTypes";
import { Button } from "@/Components/ui/button";
import DeleteIcon from "@mui/icons-material/Delete";

interface Layout {
  id: string;
  name: string;
}

interface RoomTypeWithModalProps {
  layouts: Layout[];
  deleteLayout: (id: string) => void;
  handleChildAgeChange: (age: number) => void;
  handleCounterChange: (value: number) => void;
  details: any; // Add this line
}
function adjustArray(childrenAges: number[], newCount: number): number[] {
  const currentCount = childrenAges.length;

  if (newCount > currentCount) {
    return [...childrenAges, ...Array(newCount - currentCount).fill(null)];
  } else if (newCount < currentCount) {
    return childrenAges.slice(0, newCount);
  }

  return childrenAges;
}
const RoomTypeWithModal: React.FC<RoomTypeWithModalProps> = ({
  layouts,
  deleteLayout,
  details,
  setDetails,
}) => {
  // Handle counter change based on the ID (adults or children)
  function handleCounterChange(layoutId: number, id: string, value: number) {
    if (!Number.isInteger(value)) {
      return;
    }

    setDetails((prev) => ({
      ...prev,
      layoutOptions: prev.layoutOptions.map((layout) => {
        if (layout.id === layoutId) {
          if (id === "childCount") {
            const childAges = adjustArray(layout.childAges, value);
            return {
              ...layout,
              childCount: value,
              childAges,
            };
          }
          return {
            ...layout,
            [id]: value,
          };
        }
        return layout;
      }),
    }));
  }

  function handleChildAgeChange(
    layoutId: number,
    index: number,
    value: number
  ) {
    setDetails((prev) => ({
      ...prev,
      layoutOptions: prev.layoutOptions.map((layout) => {
        if (layout.id === layoutId) {
          const childAgesArr = [...layout.childAges];
          childAgesArr[index] = value;
          return {
            ...layout,
            childAges: childAgesArr,
          };
        }
        return layout;
      }),
    }));
  }
  return (
    <>
      {layouts.map((layout, index) => (
        <Accordion
          type="single"
          collapsible
          defaultValue={layout.id}
          className="w-full"
          key={layout.id}
        >
          <AccordionItem
            value={layout.id}
            className="border-b-[2px] border-[#999797] "
          >
            <AccordionTrigger className="hover:no-underline data-[state]:">
              {layout.name}
            </AccordionTrigger>
            <Separator className="bg-[#999797] h-0.5" />
            <AccordionContent className=" my-5">
              <div className="flex flex-col items-center mt-5 gap-20">
                <div className="flex gap-4 w-[800px] justify-between items-center">
                  <label
                    id={`room-count-${index}`}
                    className="text-lg text-text-color font-semibold"
                  >
                    Room count<span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="flex items-center gap-14 w-[515px]">
                    <Counter
                      id={`room-count-${index}`}
                      value={details.layoutOptions[index].roomCount}
                      hanldeCounterChange={(id, value) =>
                        handleCounterChange(
                          details.layoutOptions[index].id,
                          "roomCount",
                          value
                        )
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-4 w-[800px] justify-between items-center">
                  <label
                    id={`guest-count-${index}`}
                    className="text-lg text-text-color font-semibold"
                  >
                    Guest count<span className="text-red-500 font-bold">*</span>
                  </label>
                  <GuestCounter
                    index={index}
                    details={details}
                    handleCounterChange={handleCounterChange}
                    handleChildAgeChange={handleChildAgeChange}
                  />
                </div>
                <div className="flex gap-4 w-[800px] justify-between items-center">
                  <label
                    id="guest-count"
                    className="text-lg text-text-color font-semibold"
                  >
                    Basis<span className="text-red-500 font-bold">*</span>
                  </label>
                  <BasisTypes />
                </div>
              </div>
              {layout.id > "1" && (
                <div className="flex justify-end p-3">
                  <Button
                    className="bg-transparent"
                    onClick={() => deleteLayout(layout.id)}
                  >
                    <DeleteIcon className="fill-red-500" />
                  </Button>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </>
  );
};

export default RoomTypeWithModal;
