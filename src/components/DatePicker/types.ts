export interface DatePickerProps {
  selectedDate: Date;
  setSelectedDate: (localDate: Date) => void;
  disabledDays: (localDate: Date) => boolean;
}
