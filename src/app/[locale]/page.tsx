"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu } from "lucide-react";

import { ActionButton } from "@/components/action-button";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { AppLocale } from "@/i18n/routing";

const featuredTripsByLocale: Record<
    AppLocale,
    Array<{
        title: string;
        author: string;
        likes: string;
        summary: string;
        tags: string[];
    }>
> = {
    en: [
        {
            title: "Kyoto Autumn Escape",
            author: "Mina K.",
            likes: "12.4k",
            summary:
                "Temple mornings, hidden cafes, and a two-day Arashiyama loop.",
            tags: ["Japan", "Culture", "4 days"],
        },
        {
            title: "Iceland Ring Road Lite",
            author: "Theo M.",
            likes: "9.8k",
            summary:
                "A photo-heavy route with waterfalls, black sand, and hot springs.",
            tags: ["Iceland", "Nature", "6 days"],
        },
        {
            title: "Bangkok Food Sprint",
            author: "Ploy S.",
            likes: "8.6k",
            summary:
                "Late-night markets, riverside stops, and a short cafe map.",
            tags: ["Thailand", "Food", "2 days"],
        },
        {
            title: "Lisbon Friends Weekend",
            author: "Rui A.",
            likes: "7.9k",
            summary:
                "Trams, seafood, and a clean budget split for group travel.",
            tags: ["Portugal", "City", "3 days"],
        },
    ],
    th: [
        {
            title: "เกียวโตช่วงใบไม้เปลี่ยนสี",
            author: "Mina K.",
            likes: "12.4k",
            summary:
                "เช้าวัดเก่า คาเฟ่ลับ และแผนเที่ยว Arashiyama แบบ 2 วันเต็ม",
            tags: ["ญี่ปุ่น", "วัฒนธรรม", "4 วัน"],
        },
        {
            title: "ไอซ์แลนด์ Ring Road ฉบับกระชับ",
            author: "Theo M.",
            likes: "9.8k",
            summary:
                "สายถ่ายรูปต้องชอบ ทั้งน้ำตก หาดทรายดำ และบ่อน้ำร้อนในเส้นทางเดียว",
            tags: ["ไอซ์แลนด์", "ธรรมชาติ", "6 วัน"],
        },
        {
            title: "Bangkok Food Sprint",
            author: "Ploy S.",
            likes: "8.6k",
            summary:
                "ตะลุยตลาดกลางคืน จุดแวะริมแม่น้ำ และแผนคาเฟ่สั้นๆ สำหรับสายกิน",
            tags: ["ไทย", "อาหาร", "2 วัน"],
        },
        {
            title: "ลิสบอนทริปเพื่อนสุดสัปดาห์",
            author: "Rui A.",
            likes: "7.9k",
            summary:
                "นั่ง tram ชิมซีฟู้ด และมีการหารงบแบบชัดเจนสำหรับทริปกลุ่ม",
            tags: ["โปรตุเกส", "เมือง", "3 วัน"],
        },
    ],
};

type SearchFormProps = {
    className?: string;
    inputClassName?: string;
    buttonClassName?: string;
    placeholder: string;
    buttonLabel: string;
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
};

function SearchForm({
    className = "",
    inputClassName = "",
    buttonClassName = "",
    placeholder,
    buttonLabel,
    value,
    onChange,
    onSubmit,
}: SearchFormProps) {
    return (
        <form
            className={className}
            onSubmit={(event) => {
                event.preventDefault();
                onSubmit();
            }}
        >
            <Input
                type="search"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className={inputClassName}
            />
            <Button type="submit" className={buttonClassName}>
                {buttonLabel}
            </Button>
        </form>
    );
}

export default function HomePage() {
    const t = useTranslations("HomePage");
    const locale = useLocale() as AppLocale;
    const pathname = usePathname();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const featuredTrips = featuredTripsByLocale[locale];

    const handleSearchSubmit = () => {
        const query = searchQuery.trim();
        const basePath = "/trips";

        if (query.length === 0) {
            router.push(basePath);
            return;
        }

        router.push(`${basePath}?q=${encodeURIComponent(query)}`);
    };

    const handleLocaleChange = (nextLocale: AppLocale) => {
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <main className="min-h-screen bg-surface-base text-ink-strong">
            <header className="sticky top-0 z-20 border-b border-line-subtle bg-surface-base/90 backdrop-blur">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:gap-6 lg:px-10">
                    <div className="flex flex-col gap-3 md:min-w-0 md:flex-1 md:flex-row md:items-center md:gap-8">
                        <div className="flex items-center justify-between gap-4 md:min-w-[16rem] md:justify-start lg:min-w-[20rem]">
                            <a
                                href="#home"
                                className="text-xl font-semibold tracking-tight text-ink-strong"
                            >
                                {t("brand")}
                            </a>
                            <div className="flex items-center gap-2 md:hidden">
                                <div className="flex items-center rounded-full border border-line-subtle bg-surface-raised p-1">
                                    <Button
                                        type="button"
                                        onClick={() => handleLocaleChange("en")}
                                        variant="ghost"
                                        size="sm"
                                        className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                                            locale === "en"
                                                ? "bg-brand-500 text-ink-strong"
                                                : "text-ink-body hover:text-ink-strong"
                                        }`}
                                    >
                                        {t("languageEnglish")}
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => handleLocaleChange("th")}
                                        variant="ghost"
                                        size="sm"
                                        className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                                            locale === "th"
                                                ? "bg-brand-500 text-ink-strong"
                                                : "text-ink-body hover:text-ink-strong"
                                        }`}
                                    >
                                        {t("languageThai")}
                                    </Button>
                                </div>
                                <Sheet
                                    open={isMobileMenuOpen}
                                    onOpenChange={setIsMobileMenuOpen}
                                >
                                    <SheetTrigger asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            aria-label="Toggle navigation menu"
                                        >
                                            <Menu className="h-5 w-5" />
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent className="w-[88vw] max-w-sm bg-surface-panel px-6 py-16 md:hidden">
                                        <nav className="flex flex-col gap-4 text-base font-medium text-ink-body">
                                            <a
                                                href="#home"
                                                className="rounded-2xl px-4 py-3 transition hover:bg-brand-50 hover:text-ink-strong"
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                            >
                                                {t("navHome")}
                                            </a>
                                            <a
                                                href="#suggest-trip"
                                                className="rounded-2xl px-4 py-3 transition hover:bg-brand-50 hover:text-ink-strong"
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                            >
                                                {t("navTrip")}
                                            </a>
                                            <Link
                                                href="/my-trip"
                                                className="rounded-2xl px-4 py-3 transition hover:bg-brand-50 hover:text-ink-strong"
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                            >
                                                {t("navCreateTrip")}
                                            </Link>
                                            <a
                                                href="#join_us_for_shear_your_trip"
                                                className="rounded-2xl px-4 py-3 transition hover:bg-brand-50 hover:text-ink-strong"
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                            >
                                                {t("navShare")}
                                            </a>
                                        </nav>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                        <nav className="hidden flex-wrap items-center gap-5 text-sm font-medium text-ink-body md:flex">
                            <a href="#home" className="hover:text-ink-strong">
                                {t("navHome")}
                            </a>
                            <a
                                href="#suggest-trip"
                                className="hover:text-ink-strong"
                            >
                                {t("navTrip")}
                            </a>
                            <Link
                                href="/my-trip"
                                className="hover:text-ink-strong"
                            >
                                {t("navCreateTrip")}
                            </Link>
                            <a
                                href="#join_us_for_shear_your_trip"
                                className="hover:text-ink-strong"
                            >
                                {t("navShare")}
                            </a>
                        </nav>
                    </div>

                    <div className="flex w-full flex-col gap-3 md:ml-auto md:w-auto md:flex-row md:items-center">
                        <div className="w-full md:max-w-xl">
                            <SearchForm
                                className="flex w-full items-center gap-2"
                                placeholder={t("searchPlaceholder")}
                                buttonLabel={t("searchButton")}
                                value={searchQuery}
                                onChange={setSearchQuery}
                                onSubmit={handleSearchSubmit}
                                inputClassName="h-11 flex-1 rounded-full border border-line-subtle bg-surface-raised px-4 text-sm text-ink-strong outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                                buttonClassName="h-11 rounded-full bg-accent-500 px-5 text-sm font-semibold text-ink-inverse transition hover:bg-accent-700"
                            />
                        </div>
                        <div className="hidden items-center rounded-full border border-line-subtle bg-surface-raised p-1 md:flex">
                            <Button
                                type="button"
                                onClick={() => handleLocaleChange("en")}
                                variant="ghost"
                                size="sm"
                                className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                                    locale === "en"
                                        ? "bg-brand-500 text-ink-strong"
                                        : "text-ink-body hover:text-ink-strong"
                                }`}
                            >
                                {t("languageEnglish")}
                            </Button>
                            <Button
                                type="button"
                                onClick={() => handleLocaleChange("th")}
                                variant="ghost"
                                size="sm"
                                className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                                    locale === "th"
                                        ? "bg-brand-500 text-ink-strong"
                                        : "text-ink-body hover:text-ink-strong"
                                }`}
                            >
                                {t("languageThai")}
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <section
                id="home"
                className="relative overflow-hidden border-b border-line-subtle"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,155,28,0.25),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(75,46,18,0.16),transparent_35%)]" />
                <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
                    <div className="max-w-2xl">
                        <p className="text-sm font-medium uppercase tracking-[0.35em] text-brand-700">
                            {t("heroEyebrow")}
                        </p>
                        <h1 className="mt-5 text-5xl font-semibold leading-none tracking-tight sm:text-6xl">
                            {t("heroTitle")}
                        </h1>
                        <p className="mt-6 max-w-xl text-lg leading-8 text-ink-body">
                            {t("heroDescription")}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <a
                                href="#suggest-trip"
                                className="rounded-full bg-accent-500 px-5 py-3 text-sm font-semibold text-ink-inverse transition hover:bg-accent-700"
                            >
                                {t("heroPrimaryCta")}
                            </a>
                            <a
                                href="#join_us_for_shear_your_trip"
                                className="rounded-full border border-line-subtle bg-surface-raised px-5 py-3 text-sm font-semibold text-ink-strong transition hover:border-accent-500"
                            >
                                {t("heroSecondaryCta")}
                            </a>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Card className="p-6">
                            <CardContent className="p-0">
                            <p className="text-sm font-medium uppercase tracking-[0.25em] text-brand-700">
                                {t("whatWeDoLabel")}
                            </p>
                            <p className="mt-4 text-3xl font-semibold">
                                {t("whatWeDoTitle")}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-ink-body">
                                {t("whatWeDoDescription")}
                            </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-accent-500 p-6 text-ink-inverse shadow-[0_20px_60px_rgba(23,15,7,0.18)]">
                            <CardContent className="p-0">
                            <p className="text-sm font-medium uppercase tracking-[0.25em] text-brand-100">
                                {t("communityLabel")}
                            </p>
                            <p className="mt-4 text-3xl font-semibold">
                                {t("communityTitle")}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-brand-50">
                                {t("communityDescription")}
                            </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-brand-300 p-6 shadow-[0_20px_60px_rgba(180,83,9,0.18)]">
                            <CardContent className="p-0">
                            <p className="text-sm font-medium uppercase tracking-[0.25em] text-brand-900">
                                {t("shareLabel")}
                            </p>
                            <p className="mt-4 text-3xl font-semibold text-ink-strong">
                                {t("shareTitle")}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-brand-900/80">
                                {t("shareDescription")}
                            </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-surface-soft p-6">
                            <CardContent className="p-0">
                            <p className="text-4xl font-semibold">
                                {t("statsValue")}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-ink-body">
                                {t("statsDescription")}
                            </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <section id="suggest-trip" className="border-b border-line-subtle">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl">
                            <p className="text-sm font-medium uppercase tracking-[0.3em] text-brand-700">
                                {t("suggestEyebrow")}
                            </p>
                            <h2 className="mt-3 text-4xl font-semibold tracking-tight">
                                {t("suggestTitle")}
                            </h2>
                            <p className="mt-3 text-base leading-7 text-ink-body">
                                {t("suggestDescription")}
                            </p>
                        </div>

                        <SearchForm
                            className="flex w-full max-w-xl items-center gap-2"
                            placeholder={t("searchTripsPlaceholder")}
                            buttonLabel={t("searchButton")}
                            value={searchQuery}
                            onChange={setSearchQuery}
                            onSubmit={handleSearchSubmit}
                            inputClassName="h-12 flex-1 rounded-2xl border border-line-subtle bg-surface-raised px-4 text-sm text-ink-strong outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                            buttonClassName="h-12 rounded-2xl bg-brand-500 px-5 text-sm font-semibold text-ink-strong transition hover:bg-brand-300"
                        />
                    </div>

                    <div className="mt-10 grid gap-5 lg:grid-cols-2">
                        {featuredTrips.map((trip) => (
                            <Card
                                key={trip.title}
                                className="p-6 shadow-[0_18px_50px_rgba(23,15,7,0.08)]"
                            >
                                <CardContent className="p-0">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-700">
                                            {trip.author}
                                        </p>
                                        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                                            {trip.title}
                                        </h3>
                                    </div>
                                    <div className="rounded-full bg-highlight-soft px-3 py-2 text-sm font-semibold text-highlight-strong">
                                        {trip.likes} {t("likesSuffix")}
                                    </div>
                                </div>
                                <p className="mt-4 text-sm leading-7 text-ink-body">
                                    {trip.summary}
                                </p>
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {trip.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border border-line-subtle bg-surface-soft px-3 py-1 text-xs font-medium text-ink-body"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section
                id="join_us_for_shear_your_trip"
                className="relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,155,28,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(36,24,21,0.12),transparent_35%)]" />
                <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
                    <div className="max-w-xl">
                        <p className="text-sm font-medium uppercase tracking-[0.3em] text-brand-700">
                            {t("joinEyebrow")}
                        </p>
                        <h2 className="mt-3 text-4xl font-semibold tracking-tight">
                            {t("joinTitle")}
                        </h2>
                        <p className="mt-4 text-base leading-7 text-ink-body">
                            {t("joinDescription")}
                        </p>
                    </div>

                    <div className="mx-auto w-full max-w-md">
                        <Card className="bg-surface-panel p-7 shadow-[0_24px_80px_rgba(23,15,7,0.16)] backdrop-blur">
                            <CardContent className="p-0">
                            <div className="mb-8">
                                <p className="text-sm font-medium uppercase tracking-[0.3em] text-brand-700">
                                    {t("loginEyebrow")}
                                </p>
                                <h3 className="mt-3 text-3xl font-semibold tracking-tight text-ink-strong">
                                    {t("loginTitle")}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-ink-body">
                                    {t("loginDescription")}
                                </p>
                            </div>

                            <form className="space-y-5">
                                <div className="space-y-2">
                                    <label
                                        className="text-sm font-medium text-ink-body"
                                        htmlFor="email"
                                    >
                                        {t("emailLabel")}
                                    </label>

                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder={t("emailPlaceholder")}
                                        className="bg-surface-raised"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label
                                            className="text-sm font-medium text-ink-body"
                                            htmlFor="password"
                                        >
                                            {t("passwordLabel")}
                                        </label>
                                        <a
                                            href="#"
                                            className="text-sm font-medium text-brand-700 transition hover:text-brand-900"
                                        >
                                            {t("forgotPassword")}
                                        </a>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder={t("passwordPlaceholder")}
                                        className="bg-surface-raised"
                                    />
                                </div>

                                <div className="flex items-center justify-between text-sm text-ink-body">
                                    <label className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-line-subtle text-brand-500 focus:ring-brand-500"
                                        />
                                        {t("rememberMe")}
                                    </label>
                                    <span>{t("secureLogin")}</span>
                                </div>

                                <ActionButton
                                    type="submit"
                                    color="dark"
                                    label={t("signIn")}
                                />
                                <ActionButton
                                    color="light"
                                    label={t("secondaryButton")}
                                    onClick={() => console.log("A clicked")}
                                />
                            </form>

                            <div className="my-6 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-ink-body/60">
                                <div className="h-px flex-1 bg-line-subtle" />
                                {t("continueWith")}
                                <div className="h-px flex-1 bg-line-subtle" />
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="h-11 rounded-2xl"
                                >
                                    Google
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="h-11 rounded-2xl"
                                >
                                    Apple
                                </Button>
                            </div>

                            <p className="mt-6 text-center text-sm text-ink-body">
                                {t("newToTrip2Gather")}{" "}
                                <a
                                    href="#"
                                    className="font-semibold text-ink-strong"
                                >
                                    {t("createAccount")}
                                </a>
                            </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    );
}
