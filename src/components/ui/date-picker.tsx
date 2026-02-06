"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "../../design-system/cn"
import { Button } from "./button"
import { Calendar } from "./calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./popover"

interface DatePickerProps {
    date: Date | undefined;
    // Using a simpler type for setDate to avoid SelectSingleEventHandler import issues
    setDate: (date: Date | undefined) => void;
    placeholder?: string;
    className?: string;
}

export function DatePicker({ date, setDate, placeholder = "Pick a date", className }: DatePickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span className="text-muted-foreground">{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    mode="single" // Moving to end in case of prop order sensitivity
                />
            </PopoverContent>
        </Popover>
    )
}