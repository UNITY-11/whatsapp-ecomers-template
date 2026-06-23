"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  name?: string; // To support form submission
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  disabled = false,
  className = "",
  name,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {name && <input type="hidden" name={name} value={value} />}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-global focus:ring-brand-focus-ring flex w-full items-center justify-between border-0 px-3 py-2.5 text-left shadow-sm ring-1 transition-all ring-inset focus:ring-2 ${
          disabled
            ? "ring-brand-border-global/50 cursor-not-allowed bg-gray-100 text-gray-400"
            : "text-brand-text ring-brand-border-global hover:bg-brand-surface bg-white"
        }`}
      >
        <span
          className={`block truncate ${!selectedOption ? "text-brand-text/50" : "font-medium"}`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""} ${disabled ? "text-gray-400" : "text-brand-text/50"}`}
        />
      </button>

      {isOpen && !disabled && (
        <div className="ring-opacity-5 border-global border-brand-border-global absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white shadow-lg ring-1 ring-black">
          <ul className="text-brand-body text-brand-text py-1">
            {options.length === 0 ? (
              <li className="text-brand-text/50 px-3 py-2 italic">No options available</li>
            ) : (
              options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`hover:bg-brand-primary hover:text-brand-secondary relative cursor-pointer py-2 pr-9 pl-3 transition-colors select-none ${
                    option.value === value
                      ? "bg-brand-secondary-hover text-brand-primary font-semibold"
                      : ""
                  }`}
                >
                  <span className="block truncate">{option.label}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
