import { useEffect, useState, useRef } from "react";
import { findDOMNode } from "react-dom";
import { DayPicker } from "react-day-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { DatePickerProps } from "./types";

export const DatePicker = ({
  selectedDate,
  setSelectedDate,
  disabledDays,
}: DatePickerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  });

  const formatString = "dd MMM yyyy";

  const handleDaySelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
    setIsOpen(false);
  };

  const handleOutsideClick = (event: Event) => {
    const element = event.target;
    const node = element instanceof Element ? findDOMNode(element) : undefined;
    if (node && !containerRef.current?.contains(node)) {
      setIsOpen(false);
    }
  };

  return (
    <div className="field">
      <label className="label" htmlFor="date">
        Date
      </label>
      <div className="control has-icons-left is-inline-block">
        <input
          id="date"
          name="date"
          readOnly
          value={format(selectedDate, formatString)}
          className="input"
          onClick={() => setIsOpen(true)}
        />
        {isOpen && (
          <div className="rdp-overlay_wrapper" ref={containerRef}>
            <div className="rdp-overlay">
              <DayPicker
                mode="single"
                defaultMonth={selectedDate}
                selected={selectedDate}
                onSelect={handleDaySelect}
                disabled={disabledDays}
              />
            </div>
          </div>
        )}
        <span className="icon is-left">
          <FontAwesomeIcon icon={faCalendarAlt} title="Calendar icon" />
        </span>
      </div>
    </div>
  );
};
