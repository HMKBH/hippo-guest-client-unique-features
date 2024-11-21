// import type { DateRange } from "react-day-picker";

// type bookingDates = DateRange | undefined;

type OccupancyConfigs = {
  adults: number;
  children: number;
  childrenAges: number[];
  rooms: number;
};

type SearchSuggestion = {
  _id: string;
  propertyId?: number;
  label: string;
  city: string;
  district: string;
  province?: string;
  country: string;
  latitude: number;
  longitude: number;
};

type AccommodationErrors = {
  isExists: boolean;
  location: string;
  occupancyConfig: string;
  bookingDates: string;
};

export type {
  //   bookingDates,
  OccupancyConfigs,
  SearchSuggestion,
  AccommodationErrors,
};
