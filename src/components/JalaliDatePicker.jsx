import { useFormContext } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import "react-multi-date-picker/styles/colors/teal.css";



export default function JalaliDatePicker({ name, required = false, className = "", placeholder = "" }) {
  const { setValue, watch } = useFormContext();
  const value = watch(name);

  const handleChange = (date) => {
    // Date picker returns a DateObject or null
    if (date) {
      // Format as Jalali date string (YYYY/MM/DD)
      const formattedDate = date.format("YYYY/MM/DD");
      setValue(name, formattedDate, { shouldValidate: true, shouldDirty: true });
    } else {
      setValue(name, "", { shouldValidate: true, shouldDirty: true });
    }
  };

  // Convert Jalali date string to DateObject for the picker
  const dateValue = value && !value.includes("T") && !(value.includes("-") && value.length > 10)
    ? (() => {
        try {
          const [year, month, day] = value.split("/").map(Number);
          if (year && month && day) {
            return new DateObject({
              calendar: persian,
              locale: persian_fa,
            }).setYear(year).setMonth(month).setDay(day);
          }
        } catch (e) {
          // If parsing fails, return undefined
        }
        return undefined;
      })()
    : undefined;

  return (
    <div className="w-full">
      <DatePicker
        value={dateValue}
        onChange={handleChange}
        calendar={persian}
        locale={persian_fa}
        className={`rmdp-rtl ${className}`}
        inputClass="input input-bordered w-full text-center rtl"
        containerClassName="w-full"
        placeholder={placeholder}
        required={required}
        format="YYYY/MM/DD"
        style={{
          width: "100%",
        }}
        shadow={false}
        showOtherDays={false}
      />
    </div>
  );
}

