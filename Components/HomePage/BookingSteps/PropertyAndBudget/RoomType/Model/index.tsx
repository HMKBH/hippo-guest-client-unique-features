import React from "react";

interface RoomOption {
  id: number;
  adultCount: number;
  childCount: number;
  childAges: number[];
}

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
import ChildrenAges from "./GuestCounter/ChildrenAges";

interface RoomTypeWithModalProps {
  rooms: room[];
  deleteRoom: (id: string) => void;
  handleChildAgeChange: (age: number) => void;
  handleCounterChange: (value: number) => void;
  details: any;
  setDetails: React.Dispatch<React.SetStateAction<any>>;
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
  deleteRoom,
  details,
  setDetails,
}) => {
  // Handle counter change based on the ID (adults or children)
  function handleCounterChange(roomId: number, id: string, value: number) {
    if (!Number.isInteger(value)) {
      return;
    }

    setDetails((prev: { roomOptions: RoomOption[] }) => ({
      ...prev,
      roomOptions: prev.roomOptions.map((room: RoomOption) => {
        if (room.id === roomId) {
          if (id === "childCount") {
            const childAges = adjustArray(room.childAges, value);
            return {
              ...room,
              childCount: value,
              childAges,
            };
          }
          return {
            ...room,
            [id]: value,
          };
        }
        return room;
      }),
    }));
  }

  function handleChildAgeChange(roomId: number, index: number, value: number) {
    setDetails((prev: { roomOptions: RoomOption[] }) => ({
      ...prev,
      roomOptions: prev.roomOptions.map((room: RoomOption) => {
        if (room.id === roomId) {
          const childAgesArr = [...room.childAges];
          childAgesArr[index] = value;
          return {
            ...room,
            childAges: childAgesArr,
          };
        }
        return room;
      }),
    }));
  }
  return (
    <>
      {details.roomOptions.map((room: RoomOption, index: number) => (
        <Accordion
          type="single"
          collapsible
          defaultValue={room.id.toString()}
          className="w-full"
          key={room.id}
        >
          <AccordionItem
            value={room.id.toString()}
            className="border-b-[2px] border-[#999797] "
          >
            <AccordionTrigger className="hover:no-underline data-[state]:">
              Room {room.id}
            </AccordionTrigger>
            <Separator className="bg-[#999797] h-0.5" />
            <AccordionContent className=" my-5">
              <div className="flex flex-row p-4 justify-between items-center">
                <label className="text-lg text-text-color font-semibold">
                  Adults
                </label>
                <Counter
                  min={1}
                  id="adults-counter"
                  value={details.roomOptions[index].adultCount}
                  hanldeCounterChange={(id: string, value: number) =>
                    handleCounterChange(
                      details.roomOptions[index].id,
                      "adultCount",
                      value
                    )
                  }
                />
              </div>
              <div className="flex flex-row p-4 justify-between ">
                <label className="text-lg text-text-color font-semibold">
                  Children
                </label>
                <div className="flex flex-col ">
                  <div style={{ marginInlineStart: "auto" }}>
                    <Counter
                      min={0}
                      id="children-counter"
                      value={details.roomOptions[index].childCount}
                      hanldeCounterChange={(id: string, value: number) =>
                        handleCounterChange(
                          details.roomOptions[index].id,
                          "childCount",
                          value
                        )
                      }
                    />
                  </div>
                  <ChildrenAges
                    childrenAges={details.roomOptions[index].childAges}
                    handleChildAgeChange={(childIndex: number, value: number) =>
                      handleChildAgeChange(
                        details.roomOptions[index].id,
                        childIndex,
                        value
                      )
                    }
                  />
                </div>
              </div>
              {room.id > 1 && (
                <div className="flex justify-end p-3">
                  <Button
                    className="bg-transparent"
                    onClick={() => deleteRoom(room.id.toString())}
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
