"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { PlanFilterSidebar } from "@/components/plan-hub/plan-filter-sidebar";
import { PlanHubContent } from "@/components/plan-hub/plan-hub-content";
import type { PlanCardItem, PlanHubTab } from "@/components/plan-hub/types";

const OWNED_TRIPS: PlanCardItem[] = [
    {
        id: "tokyo-spring-loop",
        title: "Tokyo Spring Loop",
        destination: "Tokyo, Japan",
        dateRange: "10 Apr - 14 Apr 2026",
        description:
            "A balanced city plan with cafe mornings, shopping blocks, and one flexible Fuji day built in.",
        tags: ["citytrip", "cafe", "5days"],
        status: "traveling",
        owner: "You",
        coverImage:
            "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "chiangmai-friends-escape",
        title: "Chiang Mai Friends Escape",
        destination: "Chiang Mai, Thailand",
        dateRange: "22 May - 25 May 2026",
        description:
            "Mountain cafes, market nights, and a shared checklist for a small friend group.",
        tags: ["friends", "mountain", "weekend"],
        status: "planned",
        owner: "You",
        coverImage:
            "https://images.unsplash.com/photo-1512552288940-29d22b1a2f5e?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "osaka-food-night",
        title: "Osaka Food Night",
        destination: "Osaka, Japan",
        dateRange: "03 Jun - 06 Jun 2026",
        description:
            "Late-night route planning focused on food alleys, one day trip, and a copy-friendly budget split.",
        tags: ["food", "night", "grouptrip"],
        status: "draft",
        owner: "You",
        coverImage:
            "https://images.unsplash.com/photo-1526481280695-3c469d6a6e82?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "seoul-winter-finish",
        title: "Seoul Winter Finish",
        destination: "Seoul, South Korea",
        dateRange: "14 Jan - 18 Jan 2026",
        description:
            "A completed winter route with shopping streets, warm food stops, and notes collected after the trip ended.",
        tags: ["winter", "seoul", "finished"],
        status: "finished",
        owner: "You",
        coverImage:
            "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=1200&auto=format&fit=crop",
    },
];

const SAVED_TRIPS: PlanCardItem[] = [
    {
        id: "seoul-design-day",
        title: "Seoul Design Day",
        destination: "Seoul, South Korea",
        dateRange: "Saved from Kan Chidchom",
        description:
            "A polished route with galleries, design shops, and coffee stops ready to adapt into your own version.",
        tags: ["design", "seoul", "saved"],
        status: "saved",
        owner: "Kan Chidchom",
        coverImage:
            "https://images.unsplash.com/photo-1538485399081-7c897eeb0f84?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "bangkok-riverside-bites",
        title: "Bangkok Riverside Bites",
        destination: "Bangkok, Thailand",
        dateRange: "Saved from Ploy Sarin",
        description:
            "An evening route with ferry timing, food stops, and notes for turning it into a relaxed social post.",
        tags: ["bangkok", "riverside", "food"],
        status: "saved",
        owner: "Ploy Sarin",
        coverImage:
            "https://images.unsplash.com/photo-1508002366005-75a695ee2d17?q=80&w=1200&auto=format&fit=crop",
    },
];

export default function MyTripPage() {
    const t = useTranslations("PlanHub");
    const [activeTab, setActiveTab] = useState<PlanHubTab>("owned");
    const [activeStatus, setActiveStatus] = useState("all");
    const [activeDestination, setActiveDestination] = useState("all");
    const [activeCollection, setActiveCollection] = useState("all");

    const currentItems = activeTab === "owned" ? OWNED_TRIPS : SAVED_TRIPS;

    const filteredItems = useMemo(() => {
        return currentItems.filter((item) => {
            const matchesStatus =
                activeStatus === "all" || item.status === activeStatus;
            const matchesDestination =
                activeDestination === "all" ||
                item.destination.toLowerCase().includes(activeDestination);
            const matchesCollection =
                activeCollection === "all" ||
                (activeCollection === "mine" && item.owner === "You") ||
                (activeCollection === "community" && item.owner !== "You");

            return matchesStatus && matchesDestination && matchesCollection;
        });
    }, [activeCollection, activeDestination, activeStatus, currentItems]);

    return (
        <main className="min-h-screen bg-surface-base text-ink-strong">
            <section className="border-b border-line-subtle bg-[radial-gradient(circle_at_top_left,rgba(220,155,28,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(75,46,18,0.12),transparent_30%)]">
                <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
                    <div className="max-w-3xl">
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

            <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-[1fr_3fr] lg:px-10">
                <PlanFilterSidebar
                    title={t("filtersTitle")}
                    description={t("filtersDescription")}
                    statusLabel={t("statusLabel")}
                    statusOptions={[
                        { value: "all", label: t("statusOptions.all") },
                        { value: "draft", label: t("statusOptions.draft") },
                        {
                            value: "planned",
                            label: t("statusOptions.planned"),
                        },
                        {
                            value: "traveling",
                            label: t("statusOptions.traveling"),
                        },
                        {
                            value: "finished",
                            label: t("statusOptions.finished"),
                        },
                        { value: "saved", label: t("statusOptions.saved") },
                    ]}
                    destinationLabel={t("destinationLabel")}
                    destinationOptions={[
                        { value: "all", label: t("destinationOptions.all") },
                        {
                            value: "tokyo",
                            label: t("destinationOptions.tokyo"),
                        },
                        {
                            value: "chiang mai",
                            label: t("destinationOptions.chiangMai"),
                        },
                        {
                            value: "bangkok",
                            label: t("destinationOptions.bangkok"),
                        },
                        {
                            value: "seoul",
                            label: t("destinationOptions.seoul"),
                        },
                    ]}
                    collectionLabel={t("collectionLabel")}
                    collectionOptions={[
                        { value: "all", label: t("collectionOptions.all") },
                        { value: "mine", label: t("collectionOptions.mine") },
                        {
                            value: "community",
                            label: t("collectionOptions.community"),
                        },
                    ]}
                    activeStatus={activeStatus}
                    activeDestination={activeDestination}
                    activeCollection={activeCollection}
                    onStatusChange={setActiveStatus}
                    onDestinationChange={setActiveDestination}
                    onCollectionChange={setActiveCollection}
                />

                <PlanHubContent
                    title={t("contentTitle")}
                    description={t("contentDescription")}
                    activeTab={activeTab}
                    ownedLabel={t("ownedTab")}
                    savedLabel={t("savedTab")}
                    createLabel={t("createPlan")}
                    openLabel={t("openPlan")}
                    emptyLabel={t("emptyState")}
                    items={filteredItems}
                    onTabChange={setActiveTab}
                />
            </section>
        </main>
    );
}
