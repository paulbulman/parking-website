import { DateUtils } from "react-day-picker";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { format, parse } from "date-fns";
import { DatePickerProps } from "./types";

const formatDate = (localDate: Date, formatString: string) => {
  return format(localDate, formatString);
};

const parseDate = (dateString: string, formatString: string) => {
  const localDate = parse(dateString, formatString, new Date());
  return DateUtils.isDate(localDate) ? localDate : undefined;
};

export const DatePicker = ({
  selectedDate,
  setSelectedDate,
  disabledDays,
}: DatePickerProps) => {
  return (
    <div className="field">
      <label className="label" htmlFor="date">
        Date
      </label>
      <div className="control has-icons-left">
        <DayPickerInput
          value={selectedDate}
          formatDate={formatDate}
          format="dd MMM yyyy"
          parseDate={parseDate}
          placeholder="Select date"
          inputProps={{
            id: "date",
            name: "date",
            className: "input",
            readOnly: true,
          }}
          dayPickerProps={{
            selectedDays: selectedDate,
            disabledDays: disabledDays,
          }}
          onDayChange={setSelectedDate}
        />
        <span className="icon is-left">
          <FontAwesomeIcon icon={faCalendarAlt} title="Calendar icon" />
        </span>
      </div>
    </div>
  );
};
