// React Imports
import { useContext, useEffect, useRef, useState } from "react";

// Third-party Libraries
import { X } from "lucide-react";
import { Close } from "@radix-ui/react-popover";
import { addDays, format } from "date-fns";

// Assets
import "./checkin-checkout-calendar.css";

// Components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { Calendar } from "@/Components/ui/calendar";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";

// Utilities and Types
import { cn } from "@/lib/utils/cn";
import FormErrorMsg from "@/Components/ui/form-error-message";
import { StepperContext } from "../../../Progresstracker";

interface BookingDates {
  from?: Date;
  to?: Date;
}

interface CheckinCheckoutCalendarProps {
  details?: {
    bookingDates?: {
      from?: Date;
      to?: Date;
    };
  };
  bookingDatesState?: [
    BookingDates,
    React.Dispatch<React.SetStateAction<BookingDates>>
  ];
  errorMessage?: {
    dates?: string;
  };
  handleSelection?: (newBookingDates: BookingDates) => void;
  [key: string]: any;
}

function CheckinCheckoutCalendar(props: CheckinCheckoutCalendarProps) {
  const { handleSelection, ...rest } = props;

  const { setDetails, details, errorMessage, setErrorMessage, isSubmitted } =
    useContext(StepperContext) ?? {};

  const [bookingDates, setBookingDates] = useState<BookingDates>({
    from:
      details?.bookingDates?.from instanceof Date
        ? details.bookingDates.from
        : new Date(),
    to:
      details?.bookingDates?.to instanceof Date
        ? details.bookingDates.to
        : addDays(new Date(), 1),
  });

  const bookingDatesButtonRef = useRef<HTMLButtonElement>(null);

  const [isOpened, setIsOpened] = useState(false);

  let isModal = false;

  if (typeof window !== "undefined") {
    isModal = window.innerWidth < 1024;
  }

  const [monthCount, setMonthCount] = useState(2);
  const monthHeight = 200;

  function handleSelect(selectedBookingDates: BookingDates) {
    const from = selectedBookingDates?.from;
    const to = selectedBookingDates?.to;

    if (bookingDates?.from && bookingDates?.to) return;

    // // from and to cannot be the same
    if (from?.getTime() === to?.getTime()) {
      return;
    }

    customSetBookingDates(selectedBookingDates);
    setErrorMessage?.((prev) => ({ ...prev, dates: "" }));
  }

  const displayDate = getDisplayDate({ bookingDates });

  const ariaLabel = generateAriaLabel(bookingDates);

  function handleOpenChange(open: boolean) {
    setIsOpened(open);
    // this should be run every popover close regardless of model or not
    if (open === false && bookingDates?.from && !bookingDates?.to) {
      const from = bookingDates?.from ?? new Date();
      customSetBookingDates({
        from: from,
        to: addDays(from, 1),
      });
    }

    if (!isModal) return;

    if (open) {
      document.body.classList.add("hui-custom-accommodation-overlay");
      // Add #overlay to the URL
      window.location.hash = "overlay";
    } else {
      // Remove the overlay class after the popover has closed
      setTimeout(() => {
        document.body.classList.remove("hui-custom-accommodation-overlay");

        if (window.location.hash === "#overlay") {
          window.history.pushState(
            {},
            document.title,
            window.location.pathname + window.location.search
          );
        }
      }, 150);
    }
  }

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  useEffect(() => {
    console.log("isOpened", isOpened);
    // be carefull with this, it will cause infinite loop
    if (!isOpened && monthCount > 2) {
      setMonthCount(2);
    }

    // Add the event listener to the scrollable element
    const scrollableElement = document.querySelector(".rdp-multiple_months");

    console.log("scrollableElement", scrollableElement);

    if (monthCount >= 12) {
      return;
    }

    const handleScroll = (e: Event) => {
      console.log("bye");

      const element = e.target as HTMLElement;

      // Remove the event listener if monthCount reaches 12
      if (monthCount >= 12 && scrollableElement) {
        scrollableElement.removeEventListener("scroll", handleScroll);
      }

      const scrollTop = element.scrollTop;
      const currentMonth = Math.ceil(scrollTop / monthHeight);

      // If currentMonth + 2 is greater than monthCount, and monthCount is less than 12
      if (currentMonth + 2 > monthCount && monthCount < 12) {
        const newValue = Math.min(12, currentMonth + 2);
        setMonthCount(newValue);
      }
    };

    scrollableElement?.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component is unmounted
    return () => {
      scrollableElement?.removeEventListener("scroll", handleScroll);
    };
  }, [isOpened, monthCount]);

  useEffect(() => {
    if (!isModal) return;

    const handleHashChange = () => {
      if (
        window.location.hash !== "#overlay" &&
        bookingDatesButtonRef.current &&
        isOpened
      ) {
        bookingDatesButtonRef.current.click();
      }
    };

    // Add the event listener
    window.addEventListener("hashchange", handleHashChange);

    // Cleanup function
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [isOpened]);

  function customSetBookingDates(newBookingDates: BookingDates) {
    setBookingDates(newBookingDates);
    handleSelection?.(newBookingDates);
  }

  function handleDayClick(day: Date) {
    // if both dates are selected, reset the dates and make from the new date
    if (bookingDates?.from && bookingDates?.to) {
      customSetBookingDates({
        from: day,
        to: undefined,
      });

      return;
    }
  }

  return (
    <div className="flex flex-col sm:justify-end md:w-[430px] sm:w-[400px] w-auto h-auto">
      <Popover modal={isModal} onOpenChange={handleOpenChange}>
        <PopoverTrigger
          asChild
          aria-label={ariaLabel}
          aria-controls="checkin-checkout-calendar"
          aria-invalid={!!errorMessage}
          aria-describedby={errorMessage ? "searchCalendarError" : undefined}
        >
          <Button
            ref={bookingDatesButtonRef}
            variant={"outline"}
            className={cn(
              "uppercase block text-center text-dark w-full h-[45px] md:h-[50px] font-medium bg-white border border-solid border-border-input items-center px-4 justify-between rounded-sm  hover:bg-white hover:text-muted-foreground lg:hover:bg-accent lg:hover:text-accent-foreground",
              !bookingDates && "text-muted-foreground"
            )}
            style={{ WebkitTapHighlightColor: "transparent" }}
            {...rest}
          >
            <span>{displayDate}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          id="checkin-checkout-calendar"
          className="flex flex-col w-screen lg:w-full p-1 pt-4 lg:p-0 h-[70vh] max-h-[600px] lg:max-h-max lg:h-full rounded-xl rounded-b-none lg:rounded-md lg:rounded-b-md 
          data-[state=open]:slide-in-from-bottom-56
          data-[state=open]:zoom-in-100
          lg:data-[state=open]:slide-in-from-bottom-2
          lg:data-[state=open]:zoom-in-95
          
          "
          align="start"
          side="bottom"
        >
          <Close className="block mb-3 ml-auto mr-3 lg:hidden">
            <X />
          </Close>
          <ul className="flex px-4 lg:hidden">
            {daysOfWeek.map((day) => (
              <li
                key={day}
                className="text-muted-foreground rounded-md w-full lg:w-9 font-normal text-[0.8rem] text-center"
                aria-label={day}
              >
                {day}
              </li>
            ))}
          </ul>
          <Separator className="mt-2 mb-1 lg:hidden" />
          <Calendar
            mode="range"
            defaultMonth={bookingDates?.from}
            selected={bookingDates}
            onSelect={handleSelect}
            numberOfMonths={3}
            onDayClick={handleDayClick}
            disabled={[
              {
                before: new Date(),
              },
            ]}
            fromMonth={new Date()}
            toMonth={addDays(new Date(), 365)}
            showOutsideDays={false}
            className="pt-0 pb-0 lg:pt-3 "
          />
          <Separator />
          <div className="flex items-center justify-center h-12 gap-2 text-sm text-center lg:h-8">
            {getDisplayDateInsideCalendar(bookingDates)}
          </div>
        </PopoverContent>
      </Popover>
      {errorMessage && isSubmitted && (
        <FormErrorMsg className="ml-0.5" id="searchCalendarError">
          {errorMessage.dates}
        </FormErrorMsg>
      )}
    </div>
  );
}

export default CheckinCheckoutCalendar;

function formatDate(date: Date) {
  return format(date, "LLL dd, y");
}

function getDisplayDate({
  bookingDates,
  isYearNeeded = true,
}: {
  bookingDates: BookingDates;
  isYearNeeded?: boolean;
}): string {
  if (!bookingDates) return "Checkin - Checkout";

  const from = bookingDates?.from ?? new Date();
  const to = bookingDates?.to;

  // Function to format date with or without year based on conditions
  const formatDateWithYear = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };

    // Add year if isYearNeeded is true or if the years of the dates are different
    if (isYearNeeded || (to && from.getFullYear() !== to.getFullYear())) {
      options.year = "numeric";
    }

    return date.toLocaleDateString(undefined, options);
  };

  if (to) {
    return `${formatDateWithYear(from)} - ${formatDateWithYear(to)}`;
  } else {
    return `${formatDateWithYear(from)} - Checkout`;
  }
}

function generateAriaLabel(bookingDates: BookingDates) {
  if (!bookingDates) return "Select checkin - checkout dates";

  const from = bookingDates?.from ?? new Date();
  const to = bookingDates?.to;

  if (to) {
    return `Selected dates: ${formatDate(from)} - ${formatDate(
      to
    )}. Click to change.`;
  } else {
    return `Selected dates: ${formatDate(from)}. Click to change.`;
  }
}

function getTotalNights(bookingDates: BookingDates) {
  if (!bookingDates?.from || !bookingDates?.to) return 0;

  // Clone the dates to avoid modifying the original objects
  const fromDate = new Date(bookingDates?.from?.getTime());
  const toDate = new Date(bookingDates?.to?.getTime());

  // Set the time to midnight to ignore the time component
  fromDate.setHours(0, 0, 0, 0);
  toDate.setHours(0, 0, 0, 0);

  // Calculate the difference in milliseconds using getTime()
  const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());

  // Convert the time difference to days
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

function getDisplayDateInsideCalendar(bookingDates: BookingDates): string {
  if (!bookingDates || !bookingDates.from) return "No dates selected";

  // Utilize the getDisplayDate function to format the date range.
  const dateRange = getDisplayDate({ bookingDates, isYearNeeded: false });

  // Initialize an empty string for the nights information.
  let nightsInfo = "";

  // If the 'to' date is available, calculate and add the total nights to the nightsInfo string.
  if (bookingDates?.to) {
    const totalNights = getTotalNights(bookingDates);
    nightsInfo = ` | ${totalNights} night${totalNights > 1 ? "s" : ""} `;
  }

  // Combine the formatted date range with the total nights (if available) into a single string.
  return `${dateRange}${nightsInfo}`;
}
