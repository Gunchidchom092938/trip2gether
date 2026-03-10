"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { StopCard } from "./stop-card";
import type { Stop } from "./types";

export function SortableStopCard({
    t,
    dayDate,
    index,
    stop,
    isOpen,
    onToggleOpen,
    onEdit,
    onRemove,
}: Readonly<{
    t: (key: string, values?: Record<string, string | number>) => string;
    dayDate: string;
    index: number;
    stop: Stop;
    isOpen: boolean;
    onToggleOpen: () => void;
    onEdit: () => void;
    onRemove: () => void;
}>) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
        isOver,
    } = useSortable({
        id: stop.id,
        data: {
            type: "stop",
            date: dayDate,
            index,
            stop,
        },
    });

    return (
        <div
            ref={setNodeRef}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
            }}
        >
            <StopCard
                t={t}
                index={index}
                stop={stop}
                isOpen={isOpen}
                className={
                isDragging
                        ? "z-20 opacity-0"
                        : isOver
                          ? "border-accent-500 ring-2 ring-brand-100"
                          : undefined
                }
                dragHandleProps={{ ...attributes, ...listeners }}
                onToggleOpen={onToggleOpen}
                onEdit={onEdit}
                onRemove={onRemove}
            />
        </div>
    );
}
