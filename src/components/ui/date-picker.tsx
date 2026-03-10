"use client";

import { CalendarIcon } from "lucide-react";
import { format, parseISO } from "date-fns";
import { enUS, th } from "date-fns/locale";
import { useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DatePickerProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
};

export function DatePicker({
    value,
    onChange,
    placeholder = "Pick a date",
    className,
}: DatePickerProps) {
    const locale = useLocale();
    const selectedDate = value ? parseISO(value) : undefined;
    const dateLocale = locale === "th" ? th : enUS;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className={cn(
                        "h-12 w-full justify-between rounded-2xl bg-surface-soft px-4 text-left font-normal hover:bg-surface-soft",
                        !selectedDate && "text-ink-body",
                        className,
                    )}
                >
                    <span className="truncate">
                        {selectedDate
                            ? format(selectedDate, "PPP", {
                                  locale: dateLocale,
                              })
                            : placeholder}
                    </span>
                    <CalendarIcon className="h-4 w-4 shrink-0 text-ink-body" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3" align="start">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) =>
                        onChange(date ? format(date, "yyyy-MM-dd") : "")
                    }
                    locale={dateLocale}
                />
            </PopoverContent>
        </Popover>
    );
}
