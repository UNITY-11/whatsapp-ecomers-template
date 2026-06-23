"use client";

import { useState, useRef, useEffect } from "react";
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
        className={`w-full flex items-center justify-between rounded-global border-0 py-2.5 px-3 text-left shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-brand-accent/50 transition-all ${
          disabled 
            ? "bg-gray-100 text-gray-400 ring-brand-border/50 cursor-not-allowed" 
            : "bg-white text-brand-text ring-brand-border hover:bg-brand-surface"
        }`}
      >
        <span className={`block truncate ${!selectedOption ? "text-brand-text/50" : "font-medium"}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${disabled ? "text-gray-400" : "text-brand-text/50"}`} />
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg ring-1 ring-black ring-opacity-5 max-h-60 overflow-auto border border-brand-border">
          <ul className="py-1 text-sm text-brand-text">
            {options.length === 0 ? (
              <li className="px-3 py-2 text-brand-text/50 italic">No options available</li>
            ) : (
              options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-brand-primary hover:text-brand-secondary transition-colors ${
                    option.value === value ? "bg-brand-secondary-hover font-semibold text-brand-primary" : ""
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
