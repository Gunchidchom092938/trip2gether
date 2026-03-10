"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";

const navItems = [
    { href: "/#home", labelKey: "navHome" },
    { href: "/#suggest-trip", labelKey: "navTrip" },
    { href: "/my-trip", labelKey: "navCreateTrip" },
    {
        href: "/#join_us_for_shear_your_trip",
        labelKey: "navShare",
    },
] as const;

export function SiteNavbar() {
    const t = useTranslations("HomePage");
    const locale = useLocale() as AppLocale;
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLocaleChange = (nextLocale: AppLocale) => {
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <header className="sticky top-0 z-20 border-b border-line-subtle bg-surface-base/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between md:gap-6 lg:px-10">
                <div className="flex flex-col gap-3 md:min-w-0 md:flex-1 md:flex-row md:items-center md:gap-8">
                    <div className="flex items-center justify-between gap-4 md:min-w-[16rem] md:justify-start lg:min-w-[20rem]">
                        <Link
                            href="/"
                            className="text-xl font-semibold tracking-tight text-ink-strong"
                        >
                            {t("brand")}
                        </Link>
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
                                        {navItems.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className={`rounded-2xl px-4 py-3 transition hover:bg-brand-50 hover:text-ink-strong ${
                                                    pathname === item.href
                                                        ? "bg-brand-50 text-ink-strong"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                            >
                                                {t(item.labelKey)}
                                            </Link>
                                        ))}
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                    <nav className="hidden flex-wrap items-center gap-5 text-sm font-medium text-ink-body md:flex">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`transition hover:text-ink-strong ${
                                    pathname === item.href
                                        ? "text-ink-strong"
                                        : ""
                                }`}
                            >
                                {t(item.labelKey)}
                            </Link>
                        ))}
                    </nav>
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
        </header>
    );
}
