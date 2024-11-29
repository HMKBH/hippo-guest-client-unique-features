import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { Separator } from "@/Components/ui/separator";
import { Combobox, Transition } from "@headlessui/react";
import FormErrorMsg from "@/Components/ui/form-error-message";
import { getSearchSuggestionsApi } from "@/lib/api/searchApi";
import type { SearchSuggestion } from "@/lib/types/searchTypes";
import { MapPinIcon, BedDoubleIcon, ArrowLeftCircleIcon } from "lucide-react";

import "./main-search-input.css";

import { StepperContext } from "../../Progresstracker";

type PageProps = {
  setZoom: (zoom: number) => void;
};

const cityTypes = [
  "administrative_area_level_3",
  "locality",
  "political",
  "neighborhood",
  "sublocality",
  "sublocality_level_1",
  "sublocality_level_2",
  "sublocality_level_3",
  "sublocality_level_4",
  "sublocality_level_5",
  "establishment",
];

function isCityType(type: string | undefined): boolean {
  return cityTypes.includes(type || "");
}

function MainSearch({ setZoom }: PageProps) {
  const { setDetails, details, errorMessage, setErrorMessage, isSubmitted } =
    useContext(StepperContext) ?? {};

  const selected = details?.location;

  const [query, setQuery] = useState("");

  const locationSearchRef = useRef<HTMLInputElement>(null);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await getSearchSuggestionsApi(query);
        setSuggestions(response.data.data.suggestions);
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
      }
    };

    fetchSuggestions();
  }, []);

  async function handleQueryChange(query: string) {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const autocompleteService = new google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions(
      {
        input: query,
        componentRestrictions: { country: "lk" },
        types: ["(regions)"],
      },
      (predictions, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          const places: SearchSuggestion[] = predictions.map((prediction) => ({
            _id: prediction.place_id,
            label: prediction.description,
            city: "",
            district: "",
            country: "",
            latitude: 0,
            longitude: 0,
            radius: 0,
          }));
          setSuggestions(places);
        }
      }
    );
  }

  async function fetchPlaceDetails(label: string) {
    const geocoder = new google.maps.Geocoder();

    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: label }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const geometry = results[0].geometry;
          const addressComponents = results[0].address_components;

          let country = "";
          let city = "";
          let district = "";
          let province = "";
          let calculatedRadius = 15000;
          let newZoom = 7;

          const placeType = addressComponents.find((component) => {
            return (
              component.types.includes("country") ||
              component.types.includes("administrative_area_level_1") ||
              component.types.includes("administrative_area_level_2") ||
              component.types.includes("locality")
            );
          })?.types[0];

          if (placeType === "country") {
            calculatedRadius = 240000;
            newZoom = 7.093109404391481;
          } else if (placeType === "administrative_area_level_1") {
            calculatedRadius = 30000;
            newZoom = 10.09310940439148;
          } else if (placeType === "administrative_area_level_2") {
            calculatedRadius = 20000;
            newZoom = 10.678071905112638;
          } else if (isCityType(placeType)) {
            calculatedRadius = 5000;
            newZoom = 12.678071905112638;
          }

          addressComponents.forEach((component) => {
            if (component.types.includes("locality")) {
              city = component.long_name;
            } else if (
              component.types.includes("administrative_area_level_2")
            ) {
              district = component.long_name;
            } else if (
              component.types.includes("administrative_area_level_1")
            ) {
              province = component.long_name.replace("Province", "");
            } else if (component.types.includes("country")) {
              country = component.long_name;
            }
          });

          const location = {
            latitude: geometry.location.lat(),
            longitude: geometry.location.lng(),
            country,
            city,
            district,
            province,
            radius: calculatedRadius,
            label,
          };

          resolve({ location, zoomLevel: newZoom });
        } else {
          reject(new Error("Geocode was not successful"));
        }
      });
    });
  }
  const handleSelection = async (location: { _id: string; label: string }) => {
    setQuery(location.label);

    try {
      const placeDetails = (await fetchPlaceDetails(location.label)) as {
        location: SearchSuggestion;
        zoomLevel: number;
      };

      setZoom(placeDetails.zoomLevel);
      setDetails?.((prevDetails) => ({
        ...prevDetails,
        location: placeDetails.location,
      }));
      setErrorMessage?.((prevError) => ({
        ...prevError,
        location: "",
      }));
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };
  useEffect(() => {
    if (suggestions.length > 0 && query !== "") {
      setDetails?.((prevDetails) => ({
        ...prevDetails,
        location: suggestions[0],
      }));
    }
  }, [suggestions]);

  let isSmallScreen = false;

  if (typeof window !== "undefined") {
    isSmallScreen = window.innerWidth < 1024;
  }

  function handleInputFocus(
    e: React.FocusEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>
  ) {
    const currentElement = e.target as HTMLElement;

    const nextSibling = currentElement.nextSibling;

    if (
      nextSibling &&
      nextSibling instanceof HTMLButtonElement &&
      !isModelOpen
    ) {
      if (isSmallScreen) {
        nextSibling.click();
      } else {
        setTimeout(() => {
          nextSibling.click();
        }, 80);
      }
    }
  }

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "aria-expanded"
        ) {
          const target = mutation.target as HTMLElement;
          const isExpanded = target.getAttribute("aria-expanded") === "true";

          if (isExpanded) {
            setIsModelOpen(isExpanded);
            window.location.hash = "overlay";
            if (isSmallScreen) {
              document.body.style.overflow = "hidden";
            }
          } else {
            setTimeout(() => {
              setIsModelOpen(isExpanded);
              if (window.location.hash === "#overlay") {
                window.history.pushState(
                  {},
                  document.title,
                  window.location.pathname + window.location.search
                );
              }
            }, 50);
            if (isSmallScreen) {
              document.body.style.overflow = "";
            }
          }
        }
      });
    });

    const config = { attributes: true };
    const targetNode = locationSearchRef.current;

    if (targetNode) {
      observer.observe(targetNode, config);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isSmallScreen) {
      return;
    }

    function handlePopState() {
      const isExpanded =
        locationSearchRef.current?.getAttribute("aria-expanded") === "true";
      const button = locationSearchRef.current
        ?.nextSibling as HTMLButtonElement;

      if (button && isExpanded && isModelOpen && location.hash !== "#overlay") {
        button.click();
      }
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isModelOpen]);

  return (
    <div className="sm:flex sm:justify-end md:w-[430px] sm:w-[400px] w-auto border border-solid border-border-input rounded-sm">
      <Combobox value={selected} onChange={handleSelection}>
        <div
          className="location-search w-full md:h-[50px] z-50 left-0 md:left-auto "
          data-isopened={isModelOpen}
        >
          <Combobox.Label className="sr-only">
            Search for a location
          </Combobox.Label>
          <div className="location-search-input-wrapper">
            <Combobox.Input
              type="search"
              ref={locationSearchRef}
              id="locationSearch"
              name="locationSearch"
              placeholder="WHERE TO"
              autoComplete="off"
              aria-required="true"
              aria-invalid={!!errorMessage}
              aria-describedby={
                errorMessage ? "searchLocationError" : undefined
              }
              className="location-search-input w-full h-[45px] md:h-[50px] !mb-0 text-dark inline-flex items-center top-0 text-sm ring-offset-background transition-colors focus-visible:outline-none  disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent px-4 py-2 justify-start text-center font-medium bg-white  hover:bg-white hover:text-muted-foreground lg:hover:bg-accent lg:hover:text-accent-foreground transition-none z-10 rounded-sm"
              displayValue={(suggestion: SearchSuggestion) => suggestion?.label}
              onChange={(event) => {
                setQuery(event.target.value);
                handleQueryChange(event.target.value);
              }}
              onFocus={handleInputFocus}
              autoFocus={false}
            />
            <Combobox.Button
              as="button"
              type="button"
              className="hidden"
            ></Combobox.Button>
            <button className="location-search-back lg:hidden">
              <ArrowLeftCircleIcon className="w-7 h-7" />
            </button>
          </div>

          <Transition
            as={Fragment}
            enter={
              isSmallScreen
                ? "transition-all duration-150 delay-200"
                : "transition-all duration-150"
            }
            enterFrom={
              isSmallScreen ? "translate-y-4 opacity-0" : "opacity-0 scale-95"
            }
            enterTo={
              isSmallScreen
                ? "translate-y-0 opacity-100"
                : "opacity-100 scale-100"
            }
            leave={!isSmallScreen ? "transition-all duration-150" : undefined}
            leaveFrom={!isSmallScreen ? "opacity-100 scale-100" : undefined}
            leaveTo={!isSmallScreen ? "opacity-0 scale-95" : undefined}
            afterLeave={() => {
              locationSearchRef.current?.blur();
            }}
          >
            <Combobox.Options className="absolute z-50 lg:w-[430px] mt-1 text-base shadow-lg location-search-suggestions lg:py-1 lg:rounded-md max-h-80 bg-popover text-popover-foreground ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {suggestions.length === 0 && query !== "" ? (
                <div className="relative px-4 py-2 cursor-default select-none">
                  No locations found
                </div>
              ) : (
                suggestions.map(
                  (suggestion: SearchSuggestion, index: number) => (
                    <>
                      <Combobox.Option
                        key={index}
                        className={generateComboOptionClass}
                        value={suggestion}
                      >
                        {suggestion.propertyId ? (
                          <BedDoubleIcon className="min-w-[24px]" />
                        ) : (
                          <MapPinIcon className="min-w-[24px]" />
                        )}
                        <span className={`block truncate`}>
                          {suggestion.label}
                        </span>
                      </Combobox.Option>
                      {index !== suggestions.length - 1 && <Separator />}
                    </>
                  )
                )
              )}
            </Combobox.Options>
          </Transition>
          {errorMessage && !isModelOpen && isSubmitted?.step1 && (
            <FormErrorMsg
              className="absolute left-1 -bottom-6 lg:relative lg:bottom-0"
              id="searchLocationError"
            >
              {errorMessage?.location}
            </FormErrorMsg>
          )}
        </div>
      </Combobox>
    </div>
  );
}

export default MainSearch;

function generateComboOptionClass({
  active,
  selected,
}: {
  active: boolean;
  selected: boolean;
}): string {
  const baseClass =
    "flex items-center gap-3 relative cursor-default select-none py-3 pl-4 pr-4";

  if (selected) return `${baseClass} bg-primary text-primary-foreground`;
  if (active) return `${baseClass} bg-muted`;
  return baseClass;
}
