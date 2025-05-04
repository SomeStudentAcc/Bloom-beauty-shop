import clsx from "clsx";
import React, { useEffect } from "react";

interface Props {
  placeHolder: string;
  setter?: (value: string) => void;
  getter: string;
  className?: string;
}

export default function PhoneInput({
  placeHolder,
  getter,
  setter,
  className,
}: Props) {
  // Format the phone number according to the required pattern
  const formatPhoneNumber = (value: string) => {
    // Strip all non-digit characters
    const digits = value.replace(/\D/g, "");
    
    // If empty, return empty
    if (!digits) return "";
    
    // Always start with +998
    let formattedNumber = "+998";
    
    // Add the rest of the formatting based on how many digits we have
    if (digits.length > 3) {
      formattedNumber += " (" + digits.substring(3, 5);
      
      if (digits.length > 5) {
        formattedNumber += ") " + digits.substring(5, 8);
        
        if (digits.length > 8) {
          formattedNumber += "-" + digits.substring(8, 10);
          
          if (digits.length > 10) {
            formattedNumber += "-" + digits.substring(10, 12);
          }
        }
      }
    } else {
      // Always add opening parenthesis after country code
      formattedNumber += " (";
    }
    
    return formattedNumber;
  };

  // Handle input changes and formatting
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Make sure we don't allow deletion of the prefix
    if (value.length < 6) { // +998 (
      setter?.("+998 (");
      return;
    }
    
    const formattedValue = formatPhoneNumber(value);
    setter?.(formattedValue);
  };

  // Handle focus to prefill +998 ( if empty
  const handleFocus = () => {
    if (!getter || getter.trim() === "") {
      setter?.("+998 (");
    }
  };

  // Apply formatting on initial render if getter has a value
  useEffect(() => {
    if (getter && !getter.startsWith("+998")) {
      setter?.(formatPhoneNumber(getter));
    }
  }, [getter, setter]);

  return (
    <input
      type="text"
      className={clsx(
        "pl-5 py-4 text-black outline-none border-[#F3F3F3] border-2 w-full",
        className
      )}
      id={getter}
      onChange={handleChange}
      onFocus={handleFocus}
      value={getter}
      placeholder={placeHolder}
    />
  );
}