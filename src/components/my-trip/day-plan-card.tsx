"use client";

import { useEffect, useState } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { ChevronDown, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { SortableStopCard } from "./sortable-stop-card";
import { StopFormModal, type StopFormValues } from "./stop-form-modal";
import type { DayPlan, DraftStop, Stop } from "./types";

export function DayPlanCard({
    t,
    index,
    dayPlan,
    taskDraft,
    stopDraft,
    linkDraft,
    onTaskDraftChange,
    onAddTask,
    onToggleTask,
    onRemoveTask,
    onStopDraftChange,
    onLinkDraftChange,
    onAddLink,
    onRemoveDraftLink,
    onResetStopDraft,
    onStartEditStop,
    onAddStop,
    onUpdateStop,
    onRemoveStop,
    isStopOpen,
    onToggleStopOpen,
    isDraggingStop,
}: Readonly<{
    t: (key: string, values?: Record<string, string | number>) => string;
    index: number;
    dayPlan: DayPlan;
    taskDraft: string;
    stopDraft: DraftStop;
    linkDraft: { label: string; url: string };
    onTaskDraftChange: (value: string) => void;
    onAddTask: () => void;
    onToggleTask: (taskId: string) => void;
    onRemoveTask: (taskId: string) => void;
    onStopDraftChange: (patch: Partial<DraftStop>) => void;
    onLinkDraftChange: (patch: { label?: string; url?: string }) => void;
    onAddLink: () => void;
    onRemoveDraftLink: (linkId: string) => void;
    onResetStopDraft: () => void;
    onStartEditStop: (stop: Stop) => void;
    onAddStop: () => void;
    onUpdateStop: (stopId: string) => void;
    onRemoveStop: (stopId: string) => void;
    isStopOpen: (stopId: string) => boolean;
    onToggleStopOpen: (stopId: string) => void;
    isDraggingStop: boolean;
}>) {
    const [isStopModalOpen, setIsStopModalOpen] = useState(false);
    const [editingStopId, setEditingStopId] = useState<string | null>(null);
    const [isCollapsed, setIsCollapsed] = useState(true);

    const { isOver, setNodeRef } = useDroppable({
        id: `day:${dayPlan.date}`,
        data: {
            type: "day",
            date: dayPlan.date,
        },
    });

    const taskForm = useForm<{ taskDraft: string }>({
        defaultValues: {
            taskDraft,
        },
    });

    const stopForm = useForm<StopFormValues>({
        defaultValues: {
            stopTitle: stopDraft.title,
            stopStartTime: stopDraft.startTime,
            stopEndTime: stopDraft.endTime,
            stopCost: stopDraft.cost,
            stopImage: stopDraft.image,
            stopNote: stopDraft.note,
            linkLabel: linkDraft.label,
            linkUrl: linkDraft.url,
        },
    });

    useEffect(() => {
        taskForm.setValue("taskDraft", taskDraft);
    }, [taskForm, taskDraft]);

    useEffect(() => {
        stopForm.setValue("stopTitle", stopDraft.title);
        stopForm.setValue("stopStartTime", stopDraft.startTime);
        stopForm.setValue("stopEndTime", stopDraft.endTime);
        stopForm.setValue("stopCost", stopDraft.cost);
        stopForm.setValue("stopImage", stopDraft.image);
        stopForm.setValue("stopNote", stopDraft.note);
    }, [stopForm, stopDraft]);

    useEffect(() => {
        stopForm.setValue("linkLabel", linkDraft.label);
        stopForm.setValue("linkUrl", linkDraft.url);
    }, [stopForm, linkDraft]);

    const openAddStopModal = () => {
        setEditingStopId(null);
        onResetStopDraft();
        setIsStopModalOpen(true);
    };

    const openEditStopModal = (stop: Stop) => {
        setEditingStopId(stop.id);
        onStartEditStop(stop);
        setIsStopModalOpen(true);
    };

    const handleStopModalOpenChange = (open: boolean) => {
        setIsStopModalOpen(open);
        if (!open) {
            setEditingStopId(null);
        }
    };

    const handleStopSubmit = () => {
        if (editingStopId) {
            onUpdateStop(editingStopId);
            setEditingStopId(null);
            return;
        }
        onAddStop();
    };

    const isExpanded = !isCollapsed;

    return (
        <Card
            ref={setNodeRef}
            className={cn(
                "bg-surface-soft transition",
                isDraggingStop &&
                    isOver &&
                    "border-accent-500 bg-brand-50/40 ring-2 ring-brand-100",
            )}
        >
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-ink-body hover:bg-brand-50 hover:text-ink-strong"
                            aria-label={
                                isExpanded ? t("collapseDay") : t("expandDay")
                            }
                            onClick={() => setIsCollapsed((current) => !current)}
                        >
                            <ChevronDown
                                className={cn(
                                    "h-4 w-4 transition-transform",
                                    !isExpanded && "-rotate-90",
                                )}
                            />
                        </Button>
                        <span>{t("dayLabel", { day: index + 1 })}</span>
                    </div>
                    <span className="rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-900">
                        {dayPlan.date}
                    </span>
                </CardTitle>
                {isExpanded ? (
                    <CardDescription>{t("dayDescription")}</CardDescription>
                ) : null}
            </CardHeader>
            {isExpanded ? (
            <CardContent className="space-y-8">
                <Form {...taskForm}>
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-ink-strong">
                            {t("checklistTitle")}
                        </h3>
                        <div className="flex gap-2">
                            <FormField
                                control={taskForm.control}
                                name="taskDraft"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={t(
                                                    "dayTaskPlaceholder",
                                                )}
                                                onChange={(event) => {
                                                    field.onChange(event);
                                                    onTaskDraftChange(
                                                        event.target.value,
                                                    );
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="button" variant="outline" onClick={onAddTask}>
                                {t("addChecklist")}
                            </Button>
                        </div>
                        <div className="mt-4 space-y-3">
                            {dayPlan.tasks.length > 0
                                ? (
                                dayPlan.tasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className="flex items-center gap-3 rounded-3xl border border-line-subtle bg-surface-raised px-4 py-4 text-sm text-ink-body"
                                    >
                                        <Checkbox
                                            checked={task.done}
                                            onCheckedChange={() =>
                                                onToggleTask(task.id)
                                            }
                                        />
                                        <span
                                            className={
                                                task.done
                                                    ? "line-through opacity-60"
                                                    : ""
                                            }
                                        >
                                            {task.label}
                                        </span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                onRemoveTask(task.id)
                                            }
                                            className="ml-auto text-highlight-strong hover:bg-red-50 hover:text-highlight-strong"
                                            aria-label={t("deleteTask")}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))
                                )
                                : null}
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-ink-strong">
                            {t("dayStopsTitle")}
                        </h3>
                        <div className="mt-4">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={openAddStopModal}
                                className="w-full md:w-auto md:px-6"
                            >
                                {t("addStop")}
                            </Button>
                        </div>
                        <StopFormModal
                            t={t}
                            open={isStopModalOpen}
                            onOpenChange={handleStopModalOpenChange}
                            form={stopForm}
                            mode={editingStopId ? "edit" : "add"}
                            stopDraft={stopDraft}
                            onStopDraftChange={onStopDraftChange}
                            onLinkDraftChange={onLinkDraftChange}
                            onAddLink={onAddLink}
                            onRemoveDraftLink={onRemoveDraftLink}
                            onSubmit={handleStopSubmit}
                        />

                        <div className="mt-6 space-y-4">
                            <div
                                className={cn(
                                    "space-y-4 rounded-3xl transition",
                                    dayPlan.stops.length === 0 &&
                                        "min-h-24 border border-dashed border-line-subtle bg-surface-raised/40",
                                    isOver &&
                                        !isDraggingStop &&
                                        "border-accent-500 bg-brand-50/40 ring-2 ring-brand-100",
                                )}
                            >
                                <SortableContext
                                    items={dayPlan.stops.map((stop) => stop.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {dayPlan.stops.length > 0
                                        ? dayPlan.stops.map((stop, stopIndex) => (
                                              <SortableStopCard
                                                  key={stop.id}
                                                  t={t}
                                                  dayDate={dayPlan.date}
                                                  index={stopIndex}
                                                  stop={stop}
                                                  isOpen={isStopOpen(stop.id)}
                                                  onToggleOpen={() =>
                                                      onToggleStopOpen(stop.id)
                                                  }
                                                  onEdit={() =>
                                                      openEditStopModal(stop)
                                                  }
                                                  onRemove={() =>
                                                      onRemoveStop(stop.id)
                                                  }
                                              />
                                          ))
                                        : null}
                                </SortableContext>
                            </div>
                        </div>
                    </div>
                </Form>
            </CardContent>
            ) : null}
        </Card>
    );
}
