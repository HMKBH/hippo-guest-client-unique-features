import React, { useContext } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Counter } from "hippo-guest-component-library";

import ChildrenAges from "./GuestCounter/ChildrenAges";
import { RequestOffer } from "../../..";

interface RoomGuestCountProps {
  deleteRoom: (index: number) => void;
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
const RoomGuestCount: React.FC<RoomGuestCountProps> = ({ deleteRoom }) => {
  const { setDetails, details, isSubmitted, setErrorMessage, setIsSubmitted } =
    useContext(RequestOffer) ?? {};

  function handleCounterChange(index: number, key: string, value: number) {
    if (!Number.isInteger(value)) {
      return;
    }

    setDetails?.((prev) => ({
      ...prev,
      roomOptions: prev.roomOptions.map((room, i) => {
        if (i === index) {
          if (key === "childCount") {
            const childAges = adjustArray(room.childAges, value);
            return {
              ...room,
              childCount: value,
              childAges,
            };
          }
          return {
            ...room,
            [key]: value,
          };
        }
        return room;
      }),
    }));
  }

  function handleChildAgeChange(
    roomIndex: number,
    childIndex: number,
    value: number
  ) {
    let hasGuestError = false;

    setDetails?.((prev) => {
      return {
        ...prev,
        roomOptions: prev.roomOptions.map((room, i) => {
          if (i === roomIndex) {
            const childAgesArr = [...room.childAges];
            childAgesArr[childIndex] = value;

            hasGuestError = childAgesArr.some((age) => age === null);

            return {
              ...room,
              childAges: childAgesArr,
            };
          } else {
            hasGuestError = room.childAges.some((age) => age === null);
          }
          return room;
        }),
      };
    });

    if (!hasGuestError) {
      setErrorMessage?.((prev) => ({
        ...prev,
        guests: "",
      }));
    }
  }

  return (
    <>
      {details?.roomOptions.map((room, index) => {
        const count = index + 1;
        const hasAgeError = room.childAges.some((age) => age === null);
        return (
          <Accordion
            type="single"
            collapsible
            defaultValue={count.toString()}
            className="w-full"
            key={count}
          >
            <AccordionItem
              value={count.toString()}
              className="border-b-[1px] border-[#999797] "
            >
              <AccordionTrigger
                className={`hover:no-underline ${
                  isSubmitted?.step2 && hasAgeError ? "text-red-500" : ""
                }`}
              >
                Room {count}
              </AccordionTrigger>
              <Separator className="bg-[#999797] h-[1px]" />
              <AccordionContent className=" my-5">
                <div className="flex flex-row p-4 justify-between items-center">
                  <label className="text-md md:text-lg text-text-color font-semibold">
                    Adults
                  </label>
                  <Counter
                    min={1}
                    max={30}
                    id="adults-counter"
                    value={room.adultCount}
                    hanldeCounterChange={(id, value) =>
                      handleCounterChange(index, "adultCount", value)
                    }
                  />
                </div>
                <div className="flex flex-row p-4 justify-between ">
                  <label className="text-md md:text-lg text-text-color font-semibold">
                    Children
                  </label>
                  <div className="flex flex-col ">
                    <div style={{ marginInlineStart: "auto" }}>
                      <Counter
                        min={0}
                        max={10}
                        id="children-counter"
                        value={room.childCount}
                        hanldeCounterChange={(id, value) => {
                          handleCounterChange(index, "childCount", value);
                          setIsSubmitted?.((prev) => ({
                            ...prev,
                            step2: false,
                          }));
                        }}
                      />
                    </div>
                    <ChildrenAges
                      childrenAges={room.childAges}
                      handleChildAgeChange={(childIndex, value) =>
                        handleChildAgeChange(index, childIndex, value)
                      }
                    />
                  </div>
                </div>
                {count > 1 && (
                  <div className="flex justify-end p-3">
                    <Button
                      className="bg-transparent hover:bg-red-500 text-red-500 hover:text-white"
                      onClick={() => deleteRoom(index)}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </>
  );
};

export default RoomGuestCount;
