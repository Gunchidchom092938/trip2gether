"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { ActionButton } from "@/components/action-button";
import { Link } from "@/i18n/navigation";

type Stop = {
    id: string;
    title: string;
    date: string;
    time: string;
    note: string;
    cost: number;
};

type ChecklistItem = {
    id: string;
    label: string;
    done: boolean;
};

const createId = () => Math.random().toString(36).slice(2, 10);

function SectionCard({
    title,
    description,
    children,
}: Readonly<{
    title: string;
    description?: string;
    children: React.ReactNode;
}>) {
    return (
        <section className="rounded-[2rem] border border-line-subtle bg-surface-raised p-6 shadow-[0_20px_60px_rgba(23,15,7,0.08)]">
            <div className="mb-6">
                <h2 className="text-2xl font-semibold tracking-tight text-ink-strong">
                    {title}
                </h2>
                {description ? (
                    <p className="mt-2 text-sm leading-6 text-ink-body">
                        {description}
                    </p>
                ) : null}
            </div>
            {children}
        </section>
    );
}

export default function MyTripPage() {
    const t = useTranslations("MyTrip");

    const [tripName, setTripName] = useState(
        t("defaultTripName"),
    );
    const [owner, setOwner] = useState(t("defaultOwner"));
    const [startDate, setStartDate] = useState("2026-04-10");
    const [endDate, setEndDate] = useState("2026-04-14");
    const [budget, setBudget] = useState(35000);
    const [notes, setNotes] = useState(t("defaultNotes"));
    const [stops, setStops] = useState<Stop[]>([
        {
            id: createId(),
            title: t("sampleStopOneTitle"),
            date: "2026-04-10",
            time: "11:00",
            note: t("sampleStopOneNote"),
            cost: 2500,
        },
        {
            id: createId(),
            title: t("sampleStopTwoTitle"),
            date: "2026-04-12",
            time: "07:30",
            note: t("sampleStopTwoNote"),
            cost: 4200,
        },
    ]);
    const [checklist, setChecklist] = useState<ChecklistItem[]>([
        {
            id: createId(),
            label: t("sampleChecklistOne"),
            done: true,
        },
        {
            id: createId(),
            label: t("sampleChecklistTwo"),
            done: false,
        },
    ]);
    const [draftStop, setDraftStop] = useState({
        title: "",
        date: "",
        time: "",
        note: "",
        cost: "",
    });
    const [draftChecklist, setDraftChecklist] = useState("");

    const totalCost = useMemo(
        () => stops.reduce((sum, stop) => sum + stop.cost, 0),
        [stops],
    );
    const remainingBudget = budget - totalCost;
    const completedChecklist = checklist.filter((item) => item.done).length;

    const addStop = () => {
        if (!draftStop.title.trim() || !draftStop.date) return;

        setStops((current) => [
            ...current,
            {
                id: createId(),
                title: draftStop.title.trim(),
                date: draftStop.date,
                time: draftStop.time,
                note: draftStop.note.trim(),
                cost: Number(draftStop.cost) || 0,
            },
        ]);
        setDraftStop({
            title: "",
            date: "",
            time: "",
            note: "",
            cost: "",
        });
    };

    const addChecklistItem = () => {
        if (!draftChecklist.trim()) return;

        setChecklist((current) => [
            ...current,
            {
                id: createId(),
                label: draftChecklist.trim(),
                done: false,
            },
        ]);
        setDraftChecklist("");
    };

    return (
        <main className="min-h-screen bg-surface-base text-ink-strong">
            <section className="border-b border-line-subtle bg-[radial-gradient(circle_at_top_left,rgba(220,155,28,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(75,46,18,0.12),transparent_30%)]">
                <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
                    <Link
                        href="/"
                        className="inline-flex items-center rounded-full border border-line-subtle bg-surface-raised px-4 py-2 text-sm font-medium text-ink-body transition hover:border-accent-500 hover:text-ink-strong"
                    >
                        {t("back")}
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
                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="space-y-2">
                                <span className="text-sm font-medium text-ink-body">
                                    {t("tripName")}
                                </span>
                                <input
                                    value={tripName}
                                    onChange={(event) =>
                                        setTripName(event.target.value)
                                    }
                                    placeholder={t("tripNamePlaceholder")}
                                    className="h-12 w-full rounded-2xl border border-line-subtle bg-surface-soft px-4 text-sm text-ink-strong outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                                />
                            </label>
                            <label className="space-y-2">
                                <span className="text-sm font-medium text-ink-body">
                                    {t("owner")}
                                </span>
                                <input
                                    value={owner}
                                    onChange={(event) =>
                                        setOwner(event.target.value)
                                    }
                                    className="h-12 w-full rounded-2xl border border-line-subtle bg-surface-soft px-4 text-sm text-ink-strong outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                                />
                            </label>
                            <label className="space-y-2">
                                <span className="text-sm font-medium text-ink-body">
                                    {t("startDate")}
                                </span>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(event) =>
                                        setStartDate(event.target.value)
                                    }
                                    className="h-12 w-full rounded-2xl border border-line-subtle bg-surface-soft px-4 text-sm text-ink-strong outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                                />
                            </label>
                            <label className="space-y-2">
                                <span className="text-sm font-medium text-ink-body">
                                    {t("endDate")}
                                </span>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(event) =>
                                        setEndDate(event.target.value)
                                    }
                                    className="h-12 w-full rounded-2xl border border-line-subtle bg-surface-soft px-4 text-sm text-ink-strong outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                                />
                            </label>
                            <label className="space-y-2">
                                <span className="text-sm font-medium text-ink-body">
                                    {t("budget")}
                                </span>
                                <input
                                    type="number"
                                    value={budget}
                                    onChange={(event) =>
                                        setBudget(Number(event.target.value) || 0)
                                    }
                                    className="h-12 w-full rounded-2xl border border-line-subtle bg-surface-soft px-4 text-sm text-ink-strong outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                                />
                            </label>
                            <label className="space-y-2 md:col-span-2">
                                <span className="text-sm font-medium text-ink-body">
                                    {t("notes")}
                                </span>
                                <textarea
                                    value={notes}
                                    onChange={(event) =>
                                        setNotes(event.target.value)
                                    }
                                    placeholder={t("notesPlaceholder")}
                                    className="min-h-28 w-full rounded-3xl border border-line-subtle bg-surface-soft px-4 py-3 text-sm text-ink-strong outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                                />
                            </label>
                        </div>
                    </SectionCard>

                    <SectionCard
                        title={t("itineraryTitle")}
                        description={t("itineraryDescription")}
                    >
                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="space-y-2 md:col-span-2">
                                <span className="text-sm font-medium text-ink-body">
                                    {t("stopTitle")}
                                </span>
                                <input
                                    value={draftStop.title}
                                    onChange={(event) =>
                                        setDraftStop((current) => ({
                                            ...current,
                                            title: event.target.value,
                                        }))
                                    }
                                    placeholder={t("stopTitlePlaceholder")}
                                    className="h-12 w-full rounded-2xl border border-line-subtle bg-surface-soft px-4 text-sm text-ink-strong outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                                />
                            </label>
                            <label className="space-y-2">
                                <span className="text-sm font-medium text-ink-body">
                                    {t("stopDate")}
                                </span>
                                <input
                                    type="date"
                                    value={draftStop.date}
                                    onChange={(event) =>
                                        setDraftStop((current) => ({
                                            ...current,
                                            date: event.target.value,
                                        }))
                                    }
                                    className="h-12 w-full rounded-2xl border border-line-subtle bg-surface-soft px-4 text-sm text-ink-strong outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                                />
                            </label>
                            <label className="space-y-2">
                                <span className="text-sm font-medium text-ink-body">
                                    {t("stopTime")}
                                </span>
                                <input
                                    type="time"
                                    value={draftStop.time}
                                    onChange={(event) =>
                                        setDraftStop((current) => ({
                                            ...current,
                                            time: event.target.value,
                                        }))
                                    }
                                    className="h-12 w-full rounded-2xl border border-line-subtle bg-surface-soft px-4 text-sm text-ink-strong outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                                />
                            </label>
                            <label className="space-y-2">
                                <span className="text-sm font-medium text-ink-body">
                                    {t("stopCost")}
                                </span>
                                <input
                                    type="number"
                                    value={draftStop.cost}
                                    onChange={(event) =>
                                        setDraftStop((current) => ({
                                            ...current,
                                            cost: event.target.value,
                                        }))
                                    }
                                    className="h-12 w-full rounded-2xl border border-line-subtle bg-surface-soft px-4 text-sm text-ink-strong outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                                />
                            </label>
                            <label className="space-y-2 md:col-span-2">
                                <span className="text-sm font-medium text-ink-body">
                                    {t("stopNote")}
                                </span>
                                <textarea
                                    value={draftStop.note}
                                    onChange={(event) =>
                                        setDraftStop((current) => ({
                                            ...current,
                                            note: event.target.value,
                                        }))
                                    }
                                    placeholder={t("stopNotePlaceholder")}
                                    className="min-h-24 w-full rounded-3xl border border-line-subtle bg-surface-soft px-4 py-3 text-sm text-ink-strong outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                                />
                            </label>
                        </div>

                        <div className="mt-4">
                            <ActionButton
                                color="amber"
                                label={t("addStop")}
                                onClick={addStop}
                                className="w-full md:w-auto md:px-6"
                            />
                        </div>

                        <div className="mt-8 space-y-4">
                            <h3 className="text-lg font-semibold text-ink-strong">
                                {t("tripStops")}
                            </h3>
                            {stops.length === 0 ? (
                                <p className="rounded-3xl border border-dashed border-line-subtle bg-surface-soft px-4 py-5 text-sm text-ink-body">
                                    {t("noStops")}
                                </p>
                            ) : (
                                stops.map((stop) => (
                                    <article
                                        key={stop.id}
                                        className="rounded-3xl border border-line-subtle bg-surface-soft p-4"
                                    >
                                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                            <div>
                                                <h4 className="text-lg font-semibold text-ink-strong">
                                                    {stop.title}
                                                </h4>
                                                <p className="mt-1 text-sm text-ink-body">
                                                    {stop.date} {stop.time}
                                                </p>
                                            </div>
                                            <p className="rounded-full bg-brand-100 px-3 py-2 text-sm font-semibold text-brand-900">
                                                {t("budgetUnit")}{" "}
                                                {stop.cost.toLocaleString()}
                                            </p>
                                        </div>
                                        {stop.note ? (
                                            <p className="mt-3 text-sm leading-6 text-ink-body">
                                                {stop.note}
                                            </p>
                                        ) : null}
                                    </article>
                                ))
                            )}
                        </div>
                    </SectionCard>
                </div>

                <div className="space-y-6">
                    <SectionCard title={t("tripOverview")}>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-3xl bg-surface-soft p-4">
                                <p className="text-sm text-ink-body">
                                    {t("totalStops")}
                                </p>
                                <p className="mt-2 text-3xl font-semibold">
                                    {stops.length}
                                </p>
                            </div>
                            <div className="rounded-3xl bg-surface-soft p-4">
                                <p className="text-sm text-ink-body">
                                    {t("checklistProgress")}
                                </p>
                                <p className="mt-2 text-3xl font-semibold">
                                    {completedChecklist}/{checklist.length}
                                </p>
                            </div>
                            <div className="rounded-3xl bg-surface-soft p-4">
                                <p className="text-sm text-ink-body">
                                    {t("totalCost")}
                                </p>
                                <p className="mt-2 text-3xl font-semibold">
                                    {totalCost.toLocaleString()}
                                </p>
                            </div>
                            <div className="rounded-3xl bg-surface-soft p-4">
                                <p className="text-sm text-ink-body">
                                    {t("remainingBudget")}
                                </p>
                                <p
                                    className={`mt-2 text-3xl font-semibold ${
                                        remainingBudget < 0
                                            ? "text-highlight-strong"
                                            : ""
                                    }`}
                                >
                                    {remainingBudget.toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 rounded-3xl border border-line-subtle bg-surface-soft p-4 text-sm leading-7 text-ink-body">
                            <p>
                                <span className="font-semibold text-ink-strong">
                                    {t("tripName")}:
                                </span>{" "}
                                {tripName}
                            </p>
                            <p>
                                <span className="font-semibold text-ink-strong">
                                    {t("owner")}:
                                </span>{" "}
                                {owner}
                            </p>
                            <p>
                                <span className="font-semibold text-ink-strong">
                                    {t("startDate")}:
                                </span>{" "}
                                {startDate}
                            </p>
                            <p>
                                <span className="font-semibold text-ink-strong">
                                    {t("endDate")}:
                                </span>{" "}
                                {endDate}
                            </p>
                            <p>
                                <span className="font-semibold text-ink-strong">
                                    {t("budget")}:
                                </span>{" "}
                                {budget.toLocaleString()} {t("budgetUnit")}
                            </p>
                        </div>
                    </SectionCard>

                    <SectionCard
                        title={t("checklistTitle")}
                        description={t("checklistDescription")}
                    >
                        <div className="flex gap-2">
                            <input
                                value={draftChecklist}
                                onChange={(event) =>
                                    setDraftChecklist(event.target.value)
                                }
                                placeholder={t("checklistPlaceholder")}
                                className="h-12 flex-1 rounded-2xl border border-line-subtle bg-surface-soft px-4 text-sm text-ink-strong outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                            />
                            <ActionButton
                                color="light"
                                label={t("addChecklist")}
                                onClick={addChecklistItem}
                                className="w-auto px-5"
                            />
                        </div>

                        <div className="mt-6 space-y-3">
                            {checklist.length === 0 ? (
                                <p className="rounded-3xl border border-dashed border-line-subtle bg-surface-soft px-4 py-5 text-sm text-ink-body">
                                    {t("emptyChecklist")}
                                </p>
                            ) : (
                                checklist.map((item) => (
                                    <label
                                        key={item.id}
                                        className="flex items-center gap-3 rounded-3xl border border-line-subtle bg-surface-soft px-4 py-4 text-sm text-ink-body"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={item.done}
                                            onChange={() =>
                                                setChecklist((current) =>
                                                    current.map(
                                                        (currentItem) =>
                                                            currentItem.id ===
                                                            item.id
                                                                ? {
                                                                      ...currentItem,
                                                                      done: !currentItem.done,
                                                                  }
                                                                : currentItem,
                                                    ),
                                                )
                                            }
                                            className="h-4 w-4 rounded border-line-subtle text-brand-500 focus:ring-brand-500"
                                        />
                                        <span
                                            className={
                                                item.done
                                                    ? "line-through opacity-60"
                                                    : ""
                                            }
                                        >
                                            {item.label}
                                        </span>
                                    </label>
                                ))
                            )}
                        </div>
                    </SectionCard>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <ActionButton color="light" label={t("saveDraft")} />
                        <ActionButton color="dark" label={t("publishTrip")} />
                    </div>
                </div>
            </div>
        </main>
    );
}
