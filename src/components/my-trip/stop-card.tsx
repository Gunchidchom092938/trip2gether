"use client";

import type { CSSProperties } from "react";
import { ChevronDown, GripVertical, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { Stop } from "./types";

export function StopCard({
    t,
    index,
    stop,
    isOpen,
    className,
    style,
    dragHandleProps,
    onToggleOpen,
    onEdit,
    onRemove,
}: Readonly<{
    t: (key: string, values?: Record<string, string | number>) => string;
    index: number;
    stop: Stop;
    isOpen: boolean;
    className?: string;
    style?: CSSProperties;
    dragHandleProps?: Record<string, unknown>;
    onToggleOpen: () => void;
    onEdit: () => void;
    onRemove: () => void;
}>) {
    return (
        <article
            className={cn(
                "relative rounded-3xl border border-line-subtle bg-surface-raised p-4 pl-14 pt-16 transition-shadow sm:pt-4",
                className,
            )}
            style={style}
        >
            <div className="absolute inset-y-0 left-0 w-10 rounded-l-3xl border-r border-line-subtle bg-brand-50/80 sm:w-12" />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute left-0.5 top-1/2 z-10 h-[calc(100%-0.75rem)] w-8 -translate-y-1/2 rounded-2xl cursor-grab touch-none select-none text-ink-body hover:bg-brand-100 hover:text-ink-strong active:cursor-grabbing sm:left-1 sm:w-9"
                aria-label={t("dragStop")}
                {...dragHandleProps}
            >
                <GripVertical className="h-4 w-4" />
            </Button>
            <div className="absolute right-3 top-3 flex items-center gap-1 sm:right-4 sm:top-4 sm:gap-2">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-ink-body hover:bg-brand-50 hover:text-ink-strong"
                    aria-label={
                        isOpen ? t("collapseStop") : t("expandStop")
                    }
                    onClick={onToggleOpen}
                >
                    <ChevronDown
                        className={cn(
                            "h-4 w-4 transition-transform",
                            !isOpen && "-rotate-90",
                        )}
                    />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={onEdit}
                    className="text-ink-body hover:bg-brand-50 hover:text-ink-strong"
                    aria-label={t("editStop")}
                >
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={onRemove}
                    className="text-highlight-strong hover:bg-red-50 hover:text-highlight-strong"
                    aria-label={t("deleteStop")}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
            <div className="flex flex-col gap-4 sm:pr-44">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-lg font-semibold text-ink-strong">
                                {t("stopLabel", { stop: index + 1 })}
                            </h4>
                            <p className="text-sm text-ink-body">
                                {stop.startTime} - {stop.endTime}
                            </p>
                        </div>
                        <div className="mt-2">
                            <p className="inline-flex rounded-full bg-brand-100 px-3 py-2 text-sm font-semibold text-brand-900">
                                {t("stopBudgetLabel")}{" "}
                                {stop.cost.toLocaleString()} {t("budgetUnit")}
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className={cn(
                        "grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out",
                        isOpen
                            ? "mt-0 grid-rows-[1fr] opacity-100"
                            : "mt-[-0.25rem] grid-rows-[0fr] opacity-0",
                    )}
                >
                    <div className="overflow-hidden">
                        <div className="flex flex-col gap-4 pt-1">
                            {stop.image ? (
                                <>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={stop.image}
                                        alt={stop.title}
                                        className="h-48 w-full rounded-3xl object-cover"
                                    />
                                </>
                            ) : null}
                            <div className="space-y-2">
                                <h5 className="text-base font-semibold text-ink-strong">
                                    {stop.title}
                                </h5>
                                {stop.note ? (
                                    <p className="text-sm leading-6 text-ink-body">
                                        {stop.note}
                                    </p>
                                ) : null}
                            </div>
                            {stop.links.length ? (
                                <div className="flex flex-wrap gap-2">
                                    {stop.links.map((link) => (
                                        <a
                                            key={link.id}
                                            href={link.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="rounded-full border border-line-subtle bg-surface-soft px-3 py-2 text-sm text-ink-body transition hover:border-accent-500 hover:text-ink-strong"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
