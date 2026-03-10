"use client";

import type { ButtonHTMLAttributes } from "react";

import { Button } from "@/components/ui/button";

type ActionButtonProps = {
    label: string;
    color: "dark" | "light" | "amber";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const colorVariant: Record<
    ActionButtonProps["color"],
    "default" | "outline" | "secondary"
> = {
    dark: "default",
    light: "outline",
    amber: "secondary",
};

export function ActionButton({
    label,
    color,
    className = "",
    type = "button",
    ...props
}: ActionButtonProps) {
    return (
        <Button
            type={type}
            variant={colorVariant[color]}
            className={`w-full ${className}`.trim()}
            {...props}
        >
            {label}
        </Button>
    );
}
