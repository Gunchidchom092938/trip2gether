export type PlanHubTab = "owned" | "saved";

export type PlanCardItem = {
    id: string;
    title: string;
    destination: string;
    dateRange: string;
    description: string;
    tags: string[];
    status: "draft" | "planned" | "traveling" | "finished" | "saved";
    owner: string;
    coverImage: string;
};
