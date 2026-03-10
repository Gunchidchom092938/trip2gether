"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold transition outline-none focus-visible:ring-4 focus-visible:ring-brand-100 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-accent-500 text-ink-inverse hover:bg-accent-700",
                outline:
                    "border border-line-subtle bg-surface-raised text-ink-strong hover:border-accent-500",
                secondary:
                    "bg-brand-500 text-ink-strong hover:bg-brand-300",
                ghost: "text-ink-body hover:bg-brand-50 hover:text-ink-strong",
            },
            size: {
                default: "h-12 px-5 py-3",
                sm: "h-10 rounded-xl px-4",
                lg: "h-14 rounded-3xl px-6",
                icon: "h-11 w-11 rounded-full",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button, buttonVariants };
