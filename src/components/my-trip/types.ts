export type StopLink = {
    id: string;
    label: string;
    url: string;
};

export type StopLinkInput = {
    label: string;
    url: string;
};

export type Stop = {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    note: string;
    cost: number;
    image: string;
    links: StopLink[];
};

export type ChecklistItem = {
    id: string;
    label: string;
    done: boolean;
};

export type DayPlan = {
    date: string;
    tasks: ChecklistItem[];
    stops: Stop[];
};

export type DayPlanMap = Record<string, DayPlan>;

export type DraftStop = {
    title: string;
    startTime: string;
    endTime: string;
    note: string;
    cost: string;
    image: string;
    links: StopLink[];
};

export type StopInput = {
    title: string;
    startTime: string;
    endTime: string;
    note: string;
    cost: number;
    image: string;
    links: StopLinkInput[];
};
