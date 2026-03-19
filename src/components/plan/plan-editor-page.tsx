"use client";

import { useMemo, useState } from "react";
import {
    closestCorners,
    DndContext,
    DragOverlay,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
    type DragStartEvent,
} from "@dnd-kit/core";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { StopCard } from "@/components/my-trip/stop-card";
import { Button } from "@/components/ui/button";
import { DayPlanCard } from "@/components/my-trip/day-plan-card";
import { SectionCard } from "@/components/my-trip/section-card";
import { TripOverviewForm } from "@/components/my-trip/trip-overview-form";
import { TripSummaryCard } from "@/components/my-trip/trip-summary-card";
import type { DayPlanMap, DraftStop, Stop } from "@/components/my-trip/types";
import {
    buildDateRange,
    createEmptyDraftStop,
    createId,
} from "@/components/my-trip/utils";

export default function PlanEditorPage() {
    const t = useTranslations("MyTrip");

    const [tripName, setTripName] = useState(t("defaultTripName"));
    const [owner, setOwner] = useState(t("defaultOwner"));
    const [startDate, setStartDate] = useState("2026-04-10");
    const [endDate, setEndDate] = useState("2026-04-14");
    const [budget, setBudget] = useState(35000);
    const [notes, setNotes] = useState(t("defaultNotes"));
    const [dayPlanMap, setDayPlanMap] = useState<DayPlanMap>({
        "2026-04-10": {
            date: "2026-04-10",
            tasks: [
                {
                    id: createId(),
                    label: t("sampleChecklistOne"),
                    done: true,
                },
            ],
            stops: [
                {
                    id: createId(),
                    title: t("sampleStopOneTitle"),
                    startTime: "11:00",
                    endTime: "14:00",
                    note: t("sampleStopOneNote"),
                    cost: 2500,
                    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop",
                    links: [
                        {
                            id: createId(),
                            label: t("sampleLinkLabelOne"),
                            url: "https://maps.google.com",
                        },
                    ],
                },
            ],
        },
        "2026-04-12": {
            date: "2026-04-12",
            tasks: [
                {
                    id: createId(),
                    label: t("sampleChecklistTwo"),
                    done: false,
                },
            ],
            stops: [
                {
                    id: createId(),
                    title: t("sampleStopTwoTitle"),
                    startTime: "07:30",
                    endTime: "18:30",
                    note: t("sampleStopTwoNote"),
                    cost: 4200,
                    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
                    links: [
                        {
                            id: createId(),
                            label: t("sampleLinkLabelTwo"),
                            url: "https://example.com/guide",
                        },
                    ],
                },
            ],
        },
    });
    const [taskDrafts, setTaskDrafts] = useState<Record<string, string>>({});
    const [stopDrafts, setStopDrafts] = useState<Record<string, DraftStop>>({});
    const [linkDrafts, setLinkDrafts] = useState<
        Record<string, { label: string; url: string }>
    >({});
    const [openStops, setOpenStops] = useState<Record<string, boolean>>({});
    const [activeStop, setActiveStop] = useState<{
        dayDate: string;
        stop: Stop;
        index: number;
    } | null>(null);

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 150,
                tolerance: 8,
            },
        }),
    );

    const dateRange = useMemo(
        () => buildDateRange(startDate, endDate),
        [startDate, endDate],
    );

    const dayPlans = useMemo(
        () =>
            dateRange.map(
                (date) => dayPlanMap[date] ?? { date, tasks: [], stops: [] },
            ),
        [dateRange, dayPlanMap],
    );

    const totalCost = useMemo(
        () =>
            dayPlans.reduce(
                (sum, dayPlan) =>
                    sum +
                    dayPlan.stops.reduce(
                        (daySum, stop) => daySum + stop.cost,
                        0,
                    ),
                0,
            ),
        [dayPlans],
    );
    const totalStops = useMemo(
        () => dayPlans.reduce((sum, dayPlan) => sum + dayPlan.stops.length, 0),
        [dayPlans],
    );
    const totalTasks = useMemo(
        () => dayPlans.reduce((sum, dayPlan) => sum + dayPlan.tasks.length, 0),
        [dayPlans],
    );
    const completedTasks = useMemo(
        () =>
            dayPlans.reduce(
                (sum, dayPlan) =>
                    sum + dayPlan.tasks.filter((task) => task.done).length,
                0,
            ),
        [dayPlans],
    );
    const remainingBudget = budget - totalCost;

    const addTask = (date: string) => {
        const label = taskDrafts[date]?.trim();
        if (!label) return;

        setDayPlanMap((current) => ({
            ...current,
            [date]: {
                ...(current[date] ?? { date, tasks: [], stops: [] }),
                tasks: [
                    ...(current[date]?.tasks ?? []),
                    { id: createId(), label, done: false },
                ],
                stops: current[date]?.stops ?? [],
            },
        }));
        setTaskDrafts((current) => ({ ...current, [date]: "" }));
    };

    const updateTaskDraft = (date: string, value: string) => {
        setTaskDrafts((current) => ({
            ...current,
            [date]: value,
        }));
    };

    const toggleTask = (date: string, taskId: string) => {
        setDayPlanMap((current) => ({
            ...current,
            [date]: {
                ...(current[date] ?? {
                    date,
                    tasks: [],
                    stops: [],
                }),
                tasks: (current[date]?.tasks ?? []).map((currentTask) =>
                    currentTask.id === taskId
                        ? {
                              ...currentTask,
                              done: !currentTask.done,
                          }
                        : currentTask,
                ),
                stops: current[date]?.stops ?? [],
            },
        }));
    };

    const removeTask = (date: string, taskId: string) => {
        setDayPlanMap((current) => ({
            ...current,
            [date]: {
                ...(current[date] ?? {
                    date,
                    tasks: [],
                    stops: [],
                }),
                tasks: (current[date]?.tasks ?? []).filter(
                    (task) => task.id !== taskId,
                ),
                stops: current[date]?.stops ?? [],
            },
        }));
    };

    const addLinkToDraft = (date: string) => {
        const draft = linkDrafts[date];
        if (!draft?.label.trim() || !draft.url.trim()) return;

        setStopDrafts((current) => ({
            ...current,
            [date]: {
                ...(current[date] ?? createEmptyDraftStop()),
                links: [
                    ...(current[date]?.links ?? []),
                    {
                        id: createId(),
                        label: draft.label.trim(),
                        url: draft.url.trim(),
                    },
                ],
            },
        }));
        setLinkDrafts((current) => ({
            ...current,
            [date]: { label: "", url: "" },
        }));
    };

    const removeDraftLink = (date: string, linkId: string) => {
        setStopDrafts((current) => ({
            ...current,
            [date]: {
                ...(current[date] ?? createEmptyDraftStop()),
                links: (current[date]?.links ?? []).filter(
                    (link) => link.id !== linkId,
                ),
            },
        }));
    };

    const updateStopDraft = (date: string, patch: Partial<DraftStop>) => {
        setStopDrafts((current) => ({
            ...current,
            [date]: {
                ...(current[date] ?? createEmptyDraftStop()),
                ...patch,
            },
        }));
    };

    const updateLinkDraft = (
        date: string,
        patch: { label?: string; url?: string },
    ) => {
        setLinkDrafts((current) => ({
            ...current,
            [date]: {
                ...(current[date] ?? {
                    label: "",
                    url: "",
                }),
                ...patch,
            },
        }));
    };

    const resetStopDraft = (date: string) => {
        setStopDrafts((current) => ({
            ...current,
            [date]: createEmptyDraftStop(),
        }));
        setLinkDrafts((current) => ({
            ...current,
            [date]: { label: "", url: "" },
        }));
    };

    const startEditStop = (date: string, stop: Stop) => {
        setStopDrafts((current) => ({
            ...current,
            [date]: {
                title: stop.title,
                startTime: stop.startTime,
                endTime: stop.endTime,
                note: stop.note,
                cost: String(stop.cost),
                image: stop.image,
                links: stop.links,
            },
        }));
        setLinkDrafts((current) => ({
            ...current,
            [date]: { label: "", url: "" },
        }));
    };

    const addStop = (date: string) => {
        const draft = stopDrafts[date] ?? createEmptyDraftStop();
        if (!draft.title.trim()) return;

        setDayPlanMap((current) => ({
            ...current,
            [date]: {
                ...(current[date] ?? { date, tasks: [], stops: [] }),
                tasks: current[date]?.tasks ?? [],
                stops: [
                    ...(current[date]?.stops ?? []),
                    {
                        id: createId(),
                        title: draft.title.trim(),
                        startTime: draft.startTime,
                        endTime: draft.endTime,
                        note: draft.note.trim(),
                        cost: Number(draft.cost) || 0,
                        image: draft.image.trim(),
                        links: draft.links,
                    },
                ],
            },
        }));
        setStopDrafts((current) => ({
            ...current,
            [date]: createEmptyDraftStop(),
        }));
        setLinkDrafts((current) => ({
            ...current,
            [date]: { label: "", url: "" },
        }));
    };

    const updateStop = (date: string, stopId: string) => {
        const draft = stopDrafts[date] ?? createEmptyDraftStop();
        if (!draft.title.trim()) return;

        setDayPlanMap((current) => ({
            ...current,
            [date]: {
                ...(current[date] ?? { date, tasks: [], stops: [] }),
                tasks: current[date]?.tasks ?? [],
                stops: (current[date]?.stops ?? []).map((stop) =>
                    stop.id === stopId
                        ? {
                              ...stop,
                              title: draft.title.trim(),
                              startTime: draft.startTime,
                              endTime: draft.endTime,
                              note: draft.note.trim(),
                              cost: Number(draft.cost) || 0,
                              image: draft.image.trim(),
                              links: draft.links,
                          }
                        : stop,
                ),
            },
        }));
        setStopDrafts((current) => ({
            ...current,
            [date]: createEmptyDraftStop(),
        }));
        setLinkDrafts((current) => ({
            ...current,
            [date]: { label: "", url: "" },
        }));
    };

    const removeStop = (date: string, stopId: string) => {
        setDayPlanMap((current) => ({
            ...current,
            [date]: {
                ...(current[date] ?? { date, tasks: [], stops: [] }),
                tasks: current[date]?.tasks ?? [],
                stops: (current[date]?.stops ?? []).filter(
                    (stop) => stop.id !== stopId,
                ),
            },
        }));
    };

    const moveStop = (
        sourceDate: string,
        stopId: string,
        targetDate: string,
        targetIndex: number,
    ) => {
        setDayPlanMap((current) => {
            const sourceDay = current[sourceDate] ?? {
                date: sourceDate,
                tasks: [],
                stops: [],
            };
            const targetDay = current[targetDate] ?? {
                date: targetDate,
                tasks: [],
                stops: [],
            };
            const sourceIndex = sourceDay.stops.findIndex(
                (stop) => stop.id === stopId,
            );

            if (sourceIndex === -1) return current;

            const stopToMove = sourceDay.stops[sourceIndex];
            const nextSourceStops = sourceDay.stops.filter(
                (stop) => stop.id !== stopId,
            );

            const baseTargetStops =
                sourceDate === targetDate ? nextSourceStops : targetDay.stops;
            const normalizedTargetIndex = Math.max(
                0,
                Math.min(targetIndex, baseTargetStops.length),
            );
            const adjustedTargetIndex =
                sourceDate === targetDate && sourceIndex < normalizedTargetIndex
                    ? normalizedTargetIndex - 1
                    : normalizedTargetIndex;
            const nextTargetStops = [...baseTargetStops];

            nextTargetStops.splice(adjustedTargetIndex, 0, stopToMove);

            return {
                ...current,
                [sourceDate]: {
                    ...sourceDay,
                    stops:
                        sourceDate === targetDate
                            ? nextTargetStops
                            : nextSourceStops,
                },
                [targetDate]: {
                    ...targetDay,
                    stops: nextTargetStops,
                },
            };
        });
    };

    const isStopOpen = (stopId: string) => openStops[stopId] ?? false;

    const toggleStopOpen = (stopId: string) => {
        setOpenStops((current) => ({
            ...current,
            [stopId]: !(current[stopId] ?? true),
        }));
    };

    const handleDragStart = (event: DragStartEvent) => {
        const data = event.active.data.current;

        if (data?.type !== "stop") return;

        setActiveStop({
            dayDate: String(data.date),
            stop: data.stop as Stop,
            index: Number(data.index ?? 0),
        });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        setActiveStop(null);

        if (!over) return;

        const activeData = active.data.current;
        const overData = over.data.current;

        if (activeData?.type !== "stop") return;

        const sourceDate = String(activeData.date);
        const stopId = String(active.id);

        if (overData?.type === "stop") {
            moveStop(
                sourceDate,
                stopId,
                String(overData.date),
                Number(overData.index),
            );
            return;
        }

        if (overData?.type === "day") {
            const targetDate = String(overData.date);
            const targetStops = dayPlanMap[targetDate]?.stops ?? [];

            moveStop(sourceDate, stopId, targetDate, targetStops.length);
        }
    };

    const handleDragCancel = () => {
        setActiveStop(null);
    };

    return (
        <main className="min-h-screen bg-surface-base text-ink-strong">
            <section className="border-b border-line-subtle bg-[radial-gradient(circle_at_top_left,rgba(220,155,28,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(75,46,18,0.12),transparent_30%)]">
                <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
                    <Link
                        href="/my-trip"
                        className="inline-flex items-center"
                    >
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                        >
                            <span>{t("back")}</span>
                        </Button>
                    </Link>

                    <div className="mt-6 max-w-3xl">
                        <p className="text-sm font-medium uppercase tracking-[0.3em] text-brand-700">
                            {t("badge")}
                        </p>
                        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                            {t("title")}
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-ink-body">
                            {t("description")}
                        </p>
                    </div>
                </div>
            </section>

            <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
                <div className="space-y-6">
                    <SectionCard
                        title={t("tripOverview")}
                        description={t("tripOverviewDescription")}
                    >
                        <TripOverviewForm
                            t={t}
                            tripName={tripName}
                            owner={owner}
                            startDate={startDate}
                            endDate={endDate}
                            budget={budget}
                            notes={notes}
                            onTripNameChange={setTripName}
                            onOwnerChange={setOwner}
                            onStartDateChange={setStartDate}
                            onEndDateChange={setEndDate}
                            onBudgetChange={setBudget}
                            onNotesChange={setNotes}
                        />
                    </SectionCard>

                    <SectionCard
                        title={t("daysTitle")}
                        description={t("daysDescription")}
                    >
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCorners}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            onDragCancel={handleDragCancel}
                        >
                            <div className="space-y-6">
                                {dayPlans.map((dayPlan, index) => {
                                    const stopDraft =
                                        stopDrafts[dayPlan.date] ??
                                        createEmptyDraftStop();
                                    const linkDraft = linkDrafts[dayPlan.date] ?? {
                                        label: "",
                                        url: "",
                                    };

                                    return (
                                        <DayPlanCard
                                            key={dayPlan.date}
                                            t={t}
                                            index={index}
                                            dayPlan={dayPlan}
                                            taskDraft={
                                                taskDrafts[dayPlan.date] ?? ""
                                            }
                                            stopDraft={stopDraft}
                                            linkDraft={linkDraft}
                                            onTaskDraftChange={(value) =>
                                                updateTaskDraft(dayPlan.date, value)
                                            }
                                            onAddTask={() => addTask(dayPlan.date)}
                                            onToggleTask={(taskId) =>
                                                toggleTask(dayPlan.date, taskId)
                                            }
                                            onRemoveTask={(taskId) =>
                                                removeTask(dayPlan.date, taskId)
                                            }
                                            onStopDraftChange={(patch) =>
                                                updateStopDraft(
                                                    dayPlan.date,
                                                    patch,
                                                )
                                            }
                                            onLinkDraftChange={(patch) =>
                                                updateLinkDraft(
                                                    dayPlan.date,
                                                    patch,
                                                )
                                            }
                                            onAddLink={() =>
                                                addLinkToDraft(dayPlan.date)
                                            }
                                            onRemoveDraftLink={(linkId) =>
                                                removeDraftLink(
                                                    dayPlan.date,
                                                    linkId,
                                                )
                                            }
                                            onResetStopDraft={() =>
                                                resetStopDraft(dayPlan.date)
                                            }
                                            onStartEditStop={(stop) =>
                                                startEditStop(dayPlan.date, stop)
                                            }
                                            onAddStop={() => addStop(dayPlan.date)}
                                            onUpdateStop={(stopId) =>
                                                updateStop(dayPlan.date, stopId)
                                            }
                                            onRemoveStop={(stopId) =>
                                                removeStop(dayPlan.date, stopId)
                                            }
                                            isStopOpen={isStopOpen}
                                            onToggleStopOpen={toggleStopOpen}
                                            isDraggingStop={activeStop !== null}
                                        />
                                    );
                                })}
                            </div>
                            <DragOverlay>
                                {activeStop ? (
                                    <div className="pointer-events-none w-[min(100%,42rem)]">
                                        <StopCard
                                            t={t}
                                            index={activeStop.index}
                                            stop={activeStop.stop}
                                            isOpen={isStopOpen(activeStop.stop.id)}
                                            className="shadow-[0_24px_80px_rgba(23,15,7,0.16)] ring-2 ring-brand-100"
                                            onToggleOpen={() => undefined}
                                            onEdit={() => undefined}
                                            onRemove={() => undefined}
                                        />
                                    </div>
                                ) : null}
                            </DragOverlay>
                        </DndContext>
                    </SectionCard>
                </div>

                <div className="space-y-6">
                    <SectionCard title={t("tripOverview")}>
                        <TripSummaryCard
                            t={t}
                            tripName={tripName}
                            owner={owner}
                            startDate={startDate}
                            endDate={endDate}
                            budget={budget}
                            totalStops={totalStops}
                            completedTasks={completedTasks}
                            totalTasks={totalTasks}
                            totalCost={totalCost}
                            remainingBudget={remainingBudget}
                        />
                    </SectionCard>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <Button variant="outline">{t("saveDraft")}</Button>
                        <Button>{t("publishTrip")}</Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
