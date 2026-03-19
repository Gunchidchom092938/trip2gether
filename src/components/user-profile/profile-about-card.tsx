import { BriefcaseBusiness, CalendarDays, GraduationCap, House, MapPin } from "lucide-react";

type AboutItem = {
    icon: "location" | "home" | "birthday" | "work" | "school";
    text: string;
};

type ProfileAboutCardProps = {
    title: string;
    items: AboutItem[];
    workTitle: string;
    workDescription: string;
    educationTitle: string;
    educationDescription: string;
};

const iconMap = {
    location: MapPin,
    home: House,
    birthday: CalendarDays,
    work: BriefcaseBusiness,
    school: GraduationCap,
} as const;

export function ProfileAboutCard({
    title,
    items,
    workTitle,
    workDescription,
    educationTitle,
    educationDescription,
}: Readonly<ProfileAboutCardProps>) {
    return (
        <aside className="space-y-5">
            <section className="rounded-[2rem] border border-line-subtle bg-surface-panel p-5 shadow-[0_22px_50px_rgba(36,24,21,0.08)]">
                <p className="text-2xl font-semibold tracking-tight text-ink-strong">
                    {title}
                </p>
                <div className="mt-5 space-y-4">
                    {items.map((item) => {
                        const Icon = iconMap[item.icon];

                        return (
                            <div
                                key={item.text}
                                className="flex items-start gap-3 text-sm text-ink-body"
                            >
                                <div className="rounded-2xl bg-brand-50 p-2.5 text-brand-700">
                                    <Icon className="h-4 w-4" />
                                </div>
                                <p className="leading-6">{item.text}</p>
                            </div>
                        );
                    })}
                </div>
            </section>
            <section className="rounded-[2rem] border border-line-subtle bg-surface-panel p-5 shadow-[0_22px_50px_rgba(36,24,21,0.08)]">
                <p className="text-lg font-semibold text-ink-strong">
                    {workTitle}
                </p>
                <p className="mt-3 text-sm leading-6 text-ink-body">
                    {workDescription}
                </p>
            </section>
            <section className="rounded-[2rem] border border-line-subtle bg-surface-panel p-5 shadow-[0_22px_50px_rgba(36,24,21,0.08)]">
                <p className="text-lg font-semibold text-ink-strong">
                    {educationTitle}
                </p>
                <p className="mt-3 text-sm leading-6 text-ink-body">
                    {educationDescription}
                </p>
            </section>
        </aside>
    );
}
