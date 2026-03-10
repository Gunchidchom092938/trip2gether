import type { DraftStop } from "./types";

export const createId = () => Math.random().toString(36).slice(2, 10);

export function buildDateRange(startDate: string, endDate: string) {
    if (!startDate || !endDate) return [];

    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return [];
    if (start > end) return [];

    const dates: string[] = [];
    const current = new Date(start);

    while (current <= end) {
        dates.push(current.toISOString().slice(0, 10));
        current.setDate(current.getDate() + 1);
    }

    return dates;
}

export function createEmptyDraftStop(): DraftStop {
    return {
        title: "",
        startTime: "",
        endTime: "",
        note: "",
        cost: "",
        image: "",
        links: [],
    };
}
