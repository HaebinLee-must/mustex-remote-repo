import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface NumericStepperInputProps {
    label: string;
    value: number | '';
    onChange: (next: number | '') => void;
    unit: string;
    step?: number;
    min?: number;
    max?: number;
    precision?: number;
    disabled?: boolean;
    readOnly?: boolean;
    placeholder?: string;
}

const NumericStepperInput: React.FC<NumericStepperInputProps> = ({
    label,
    value,
    onChange,
    unit,
    step = 0.1,
    min,
    max,
    precision = 2,
    disabled = false,
    readOnly = false,
    placeholder = '0.00'
}) => {

    const clamp = (num: number): number => {
        let val = num;
        if (min !== undefined) val = Math.max(min, val);
        if (max !== undefined) val = Math.min(max, val);
        return parseFloat(val.toFixed(precision));
    };

    const handleIncrement = () => {
        if (disabled || readOnly) return;
        const current = value === '' ? 0 : value;
        onChange(clamp(current + step));
    };

    const handleDecrement = () => {
        if (disabled || readOnly) return;
        const current = value === '' ? 0 : value;
        onChange(clamp(current - step));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = e.target.value;
        if (inputVal === '') {
            onChange('');
            return;
        }
        const parsed = parseFloat(inputVal);
        if (!isNaN(parsed)) {
            onChange(parsed);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            handleIncrement();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            handleDecrement();
        }
    };

    return (
        <div className={`flex flex-col gap-2 w-full ${disabled ? 'opacity-50 grayscale-[0.5]' : ''}`}>
            <label className="text-[10px] font-black text-dark-muted uppercase tracking-widest px-1">
                {label}
            </label>

            <div className="flex items-stretch bg-dark-surface border border-dark-border rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all group">
                {/* Main Input Area */}
                <div className="flex-1 flex items-center min-w-0 pl-4 pr-2">
                    <input
                        type="number"
                        value={value}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        disabled={disabled}
                        readOnly={readOnly}
                        placeholder={placeholder}
                        className="w-full bg-transparent text-right text-sm font-bold text-text outline-none placeholder:text-dark-muted/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </div>

                {/* Unit & Stepper Container */}
                <div className="flex items-center">
                    {/* Unit Badge */}
                    <div className="px-3 py-1 bg-dark-input/30 border-l border-dark-border text-[10px] font-black text-dark-muted flex items-center justify-center min-w-[56px] h-full select-none">
                        {unit}
                    </div>

                    {/* Stepper Buttons */}
                    <div className="flex flex-col border-l border-dark-border w-10">
                        <button
                            type="button"
                            onClick={handleIncrement}
                            disabled={disabled || readOnly}
                            aria-label={`Increase ${label}`}
                            className="flex-1 flex items-center justify-center hover:bg-white/5 active:bg-white/10 transition-colors text-dark-muted hover:text-text border-b border-dark-border py-1"
                        >
                            <ChevronUp size={14} strokeWidth={3} />
                        </button>
                        <button
                            type="button"
                            onClick={handleDecrement}
                            disabled={disabled || readOnly}
                            aria-label={`Decrease ${label}`}
                            className="flex-1 flex items-center justify-center hover:bg-white/5 active:bg-white/10 transition-colors text-dark-muted hover:text-text py-1"
                        >
                            <ChevronDown size={14} strokeWidth={3} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NumericStepperInput;
