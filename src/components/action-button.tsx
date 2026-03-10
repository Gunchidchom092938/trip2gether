"use client";

import type { ButtonHTMLAttributes } from "react";

type ActionButtonProps = {
    label: string;
    color: "dark" | "light" | "amber";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const colorClasses: Record<ActionButtonProps["color"], string> = {
    dark: "bg-accent-500 text-ink-inverse hover:bg-accent-700",
    light: "border border-line-subtle bg-surface-raised text-ink-strong hover:border-accent-500",
    amber: "bg-brand-500 text-ink-strong hover:bg-brand-300",
};

export function ActionButton({
    label,
    color,
    className = "",
    type = "button",
    ...props
}: ActionButtonProps) {
    return (
        <button
            type={type}
            className={`h-12 w-full rounded-2xl text-sm font-semibold transition ${colorClasses[color]} ${className}`.trim()}
            {...props}
        >
            {label}
        </button>
    );
}
