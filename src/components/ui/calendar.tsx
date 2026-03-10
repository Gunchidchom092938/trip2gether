"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: React.ComponentProps<typeof DayPicker>) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-1", className)}
            classNames={{
                root: "w-full",
                months:
                    "flex w-full flex-col gap-4 sm:flex-row sm:justify-center",
                month: "w-full space-y-4",
                month_caption:
                    "flex items-center justify-center px-10 pt-1 relative",
                caption_label: "text-sm font-semibold text-ink-strong",
                nav: "flex items-center gap-1",
                button_previous: cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "absolute left-1 h-9 w-9 rounded-full p-0 text-ink-body",
                ),
                button_next: cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "absolute right-1 h-9 w-9 rounded-full p-0 text-ink-body",
                ),
                month_grid: "w-full border-collapse",
                weekdays: "flex",
                weekday:
                    "w-9 flex-1 rounded-md text-center text-xs font-medium text-ink-body",
                week: "mt-2 flex w-full",
                day: "relative flex flex-1 items-center justify-center p-0 text-sm",
                day_button: cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-9 w-9 rounded-full p-0 text-sm font-normal aria-selected:opacity-100",
                ),
                today: "text-accent-700 ring-1 ring-brand-300",
                selected:
                    "bg-accent-500 text-ink-inverse hover:bg-accent-700 hover:text-ink-inverse",
                outside: "text-ink-body/50 opacity-60",
                disabled: "text-ink-body/40 opacity-50",
                hidden: "invisible",
                ...classNames,
            }}
            components={{
                Chevron: ({ orientation, className: iconClassName }) =>
                    orientation === "left" ? (
                        <ChevronLeft className={cn("h-4 w-4", iconClassName)} />
                    ) : (
                        <ChevronRight className={cn("h-4 w-4", iconClassName)} />
                    ),
            }}
            {...props}
        />
    );
}

export { Calendar };
