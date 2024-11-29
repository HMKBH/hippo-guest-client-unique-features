import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils/cn";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

import "./calendar.css";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months:
          "flex flex-col lg:flex-row space-y-1 lg:space-y-0 sm:space-x-4 ",
        month: " space-y-0 lg:space-y-4" + " " + "calender-month",
        caption: "flex lg:justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        nav_button_previous:
          "absolute left-1 hidden lg:flex rounded-md items-center justify-center",
        nav_button_next:
          "absolute right-1  hidden lg:flex rounded-md items-center justify-center",
        table: "w-full border-collapse space-y-0 lg:space-y-1",
        head_row: "hidden lg:flex",
        head_cell: "calendar-head-cell",
        row: "flex w-full mt-1 lg:mt-2",
        cell: "calendar-cell",
        day: "calendar-day",
        day_selected: "calendar-day-selected",
        day_range_start: "calendar-day-range-start",
        day_range_end: "calendar-day-range-end",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="w-4 h-4" />,
        IconRight: () => <ChevronRight className="w-4 h-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
