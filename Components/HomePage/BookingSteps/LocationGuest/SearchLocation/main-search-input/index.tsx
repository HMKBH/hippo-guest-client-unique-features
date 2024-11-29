import { Fragment, useEffect, useRef, useState } from "react";

// Third-party Libraries
import { Combobox, Transition } from "@headlessui/react";
import type { ComboboxInputProps } from "@headlessui/react";
import { MapPinIcon, BedDoubleIcon, ArrowLeftCircleIcon } from "lucide-react";
// import FormErrorMsg from "@/components/form-error-message";

// Assets
import "./main-search-input.css";

import type { SearchSuggestion } from "@/lib/types/searchTypes";
import { Separator } from "@/Components/ui/separator";

type ComponentProps = React.InputHTMLAttributes<HTMLInputElement> &
  ComboboxInputProps<"input", any> & {
    locationState?: [
      SearchSuggestion | null,
      React.Dispatch<React.SetStateAction<SearchSuggestion | null>>
    ];
    errorMessage?: string;
    setFirstSuggestion?: React.Dispatch<
      React.SetStateAction<SearchSuggestion | null>
    >;
    suggestions: SearchSuggestion[];
    handleQueryChange: (value: string) => Promise<void>;
    handleSelection?: (value: SearchSuggestion | null) => void;
    handleModalState?: ({ isOpened }: { isOpened: boolean }) => void;
    hideSrOnlyLabel?: boolean;
    optionsClassName?: string;
    rootParentClassname?: string;
  };

const MainSearch = (props: ComponentProps) => {
  const {
    locationState,
    errorMessage,
    setFirstSuggestion,
    suggestions,
    handleQueryChange,
    handleSelection,
    handleModalState,
    className,
    hideSrOnlyLabel = true,
    optionsClassName,
    rootParentClassname,
    ...rest
  } = props;

  const [selected, setSelected] =
    locationState ?? useState<SearchSuggestion | null>(null);

  const [query, setQuery] = useState("");

  const locationSearchRef = useRef<HTMLInputElement>(null);
  const [isModelOpen, setIsModelOpen] = useState(false);

  useEffect(() => {
    if (!setFirstSuggestion) return;

    if (suggestions.length > 0 && query !== "") {
      setFirstSuggestion(suggestions[0]);
    }
  }, [suggestions]);

  let isSmallScreen = false;

  if (typeof window !== "undefined") {
    isSmallScreen = window.innerWidth < 1024;
  }

  function handleInputFocus(
    e: React.FocusEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>
  ) {
    // Get the current target element and assert it as HTMLElement
    const currentElement = e.target as HTMLElement;

    // Get the next sibling of the current element
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
          // Assert that the target is an HTMLElement
          const target = mutation.target as HTMLElement;
          const isExpanded = target.getAttribute("aria-expanded") === "true";

          if (isExpanded) {
            setIsModelOpen(isExpanded);
            window.location.hash = "overlay";
            if (isSmallScreen) {
              document.body.style.overflow = "hidden";
            }
          } else {
            // set after transition
            setTimeout(() => {
              setIsModelOpen(isExpanded);
              if (window.location.hash === "#overlay") {
                const path = window.location.pathname || "/";
                const search = window.location.search || "";
                const currentUrl = path + search;

                window.history.pushState(null, document.title, currentUrl);
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
    handleModalState?.({ isOpened: isModelOpen });

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

    // Cleanup function
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isModelOpen]);

  return (
    <Combobox
      value={selected}
      onChange={(value) => {
        setSelected(value);
        handleSelection?.(value);
      }}
    >
      <div
        className="location-search w-full h-full z-50 left-0 md:left-auto"
        data-isopened={isModelOpen}
      >
        {!hideSrOnlyLabel && (
          <Combobox.Label className="sr-only">
            Search for a location
          </Combobox.Label>
        )}
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
            aria-describedby={errorMessage ? "searchLocationError" : undefined}
            className="location-search-input w-full h-[45px] md:h-[50px] text-dark inline-flex items-center top-0 text-sm ring-offset-background transition-colors focus-visible:outline-none  disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent px-4 py-2 justify-start text-center font-medium bg-white border border-solid border-border-input hover:bg-white hover:text-muted-foreground lg:hover:bg-accent lg:hover:text-accent-foreground transition-none z-10 rounded-sm"
            displayValue={(suggestion: SearchSuggestion) => suggestion?.label}
            onFocus={handleInputFocus}
            autoFocus={false}
            {...rest}
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
              suggestions.map((suggestion: SearchSuggestion, index: number) => (
                <div key={suggestion.label}>
                  <Combobox.Option
                    className={generateComboOptionClass}
                    value={suggestion}
                  >
                    {suggestion.propertyId ? (
                      <BedDoubleIcon className="min-w-[24px]" />
                    ) : (
                      <MapPinIcon className="min-w-[24px]" />
                    )}
                    <span className={`block truncate`}>{suggestion.label}</span>
                  </Combobox.Option>
                  {index !== suggestions.length - 1 && <Separator />}
                </div>
              ))
            )}
          </Combobox.Options>
        </Transition>
        {/* {errorMessage && (
          <FormErrorMsg
            className="text-sm text-red-500 mt-1"
            id="searchLocationError"
          >
            {errorMessage}
          </FormErrorMsg>
        )} */}
      </div>
      <div className="search-space-filler"></div>
    </Combobox>
  );
};

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
