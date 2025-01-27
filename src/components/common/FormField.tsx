import React from "react";

interface FormFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    currency?: {
        value: string;
        onCurrencyChange: (currency: string) => void;
    };
}

export const FormField: React.FC<FormFieldProps> = ({ label, name, value, onChange, type = "text", placeholder, disabled = false, currency }) => {
    const formatDecimal = (value: string) => {
        const numericValue = value.replace(/[^\d.]/g, "");
        const parts = numericValue.split(".");
        if (parts.length > 1) {
            return `${parts[0]}.${parts[1].slice(0, 2)}`;
        }
        return numericValue;
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (currency) {
            const formattedValue = formatDecimal(e.target.value);
            onChange(formattedValue);
        } else {
            onChange(e.target.value);
        }
    };

    return (
        <>
            <div className="sm:col-span-1 content-center">
                <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
                    {label}
                </label>
            </div>
            <div className="sm:col-span-2">
                <div className="mt-2 relative">
                    {currency && (
                        <select
                            value={currency.value}
                            onChange={(e) => currency.onCurrencyChange(e.target.value)}
                            className={`absolute left-0 top-0 h-full px-2 w-20 border-0 bg-[#FFE5CC] text-gray-900 focus:ring-[#FF6600] sm:text-sm z-10 appearance-none focus:outline-none ${
                                disabled ? "bg-gray-100 cursor-not-allowed" : ""
                            }`}
                            disabled={disabled}
                        >
                            <option value="CHF">CHF</option>
                            <option value="EUR">EUR</option>
                            <option value="USD">USD</option>
                        </select>
                    )}
                    <input
                        type={currency ? "text" : type}
                        name={name}
                        id={name}
                        value={value}
                        onChange={handleValueChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={`block w-full rounded-md border-0 p-1.5 text-gray-900 bg-[#FFE5CC] ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#FF6600] sm:text-sm sm:leading-6 h-[38px] ${
                            disabled ? "bg-gray-100 cursor-not-allowed" : ""
                        } ${currency ? "pl-24 text-right" : ""}`}
                    />
                </div>
            </div>
        </>
    );
};
