"use client";

import { useState } from "react";
import {
    Bell,
    ChevronDown,
    CircleHelp,
    LogOut,
    Menu,
    MessageCircleMore,
    Search,
    Settings,
    Sparkles,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { AuthModal, type AuthModalMode } from "@/components/auth/auth-modal";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { usePopup } from "@/components/ui/popup-provider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { useLogout, useStoredAuth } from "@/services/auth";

const navItems = [
    { href: "/#home", labelKey: "navHome" },
    { href: "/#suggest-trip", labelKey: "navTrip" },
    {
        href: "/#join_us_for_shear_your_trip",
        labelKey: "navShare",
    },
] as const;

const authenticatedNavItems = [
    { href: "/", labelKey: "navHome" },
    { href: "/my-trip", labelKey: "navMyTrips" },
    { href: "/friends", labelKey: "navFriends" },
] as const;

export function SiteNavbar() {
    const t = useTranslations("HomePage");
    const locale = useLocale() as AppLocale;
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [authModalMode, setAuthModalMode] = useState<AuthModalMode>("login");
    const [searchQuery, setSearchQuery] = useState("");
    const { pushPopup } = usePopup();
    const { auth, isAuthenticated, sync } = useStoredAuth();
    const { mutate: logout, isLoading: isLogoutLoading } = useLogout();
    const currentNavItems = isAuthenticated ? authenticatedNavItems : navItems;

    const handleLocaleChange = (nextLocale: AppLocale) => {
        router.replace(pathname, { locale: nextLocale });
    };

    const handleSearchSubmit = () => {
        const query = searchQuery.trim();

        if (!query) {
            router.push("/trips");
            return;
        }

        router.push(`/trips?q=${encodeURIComponent(query)}`);
    };

    const handleLogout = async () => {
        try {
            await logout();
            sync();
            pushPopup({
                variant: "info",
                title: t("logoutSuccessToastTitle"),
                description: t("logoutSuccessMessage"),
            });
        } catch {
            sync();
            pushPopup({
                variant: "error",
                title: t("logoutErrorToastTitle"),
                description: t("genericAuthError"),
            });
            return;
        }

        router.push("/");
    };

    return (
        <>
            <header className="sticky top-0 z-50 border-b border-line-subtle bg-surface-base/90 backdrop-blur">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-2 py-4 md:flex-row md:items-center md:justify-between md:gap-6">
                    <div className="flex flex-col gap-3 md:min-w-0 md:flex-1 md:flex-row md:items-center md:gap-8">
                        <div className="flex items-center justify-between gap-4 md:min-w-[16rem] md:justify-start lg:min-w-[20rem]">
                            <div className="flex min-w-0 items-center gap-3">
                                <Link
                                    href="/"
                                    className="shrink-0 text-xl font-semibold tracking-tight text-ink-strong"
                                >
                                    {t("brand")}
                                </Link>
                                {isAuthenticated ? (
                                    <form
                                        className="hidden items-center gap-2 rounded-full border border-line-subtle bg-surface-raised px-3 py-2 shadow-[0_10px_24px_rgba(36,24,21,0.05)] md:flex"
                                        onSubmit={(event) => {
                                            event.preventDefault();
                                            handleSearchSubmit();
                                        }}
                                    >
                                        <Search className="h-4 w-4 text-ink-body" />
                                        <input
                                            type="search"
                                            value={searchQuery}
                                            onChange={(event) =>
                                                setSearchQuery(
                                                    event.target.value,
                                                )
                                            }
                                            placeholder={t(
                                                "authSearchPlaceholder",
                                            )}
                                            className="w-44 bg-transparent text-sm text-ink-strong outline-none placeholder:text-ink-body/70 lg:w-60"
                                        />
                                    </form>
                                ) : null}
                            </div>
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
                                            {currentNavItems.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className={`rounded-2xl px-4 py-3 transition hover:bg-brand-50 hover:text-ink-strong ${
                                                        pathname === item.href
                                                            ? "bg-brand-50 text-ink-strong"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        setIsMobileMenuOpen(
                                                            false,
                                                        )
                                                    }
                                                >
                                                    {t(item.labelKey)}
                                                </Link>
                                            ))}
                                            <Button
                                                type="button"
                                                className="mt-3 min-w-full"
                                                onClick={() => {
                                                    setIsMobileMenuOpen(false);
                                                    if (isAuthenticated) {
                                                        void handleLogout();
                                                        return;
                                                    }

                                                    setAuthModalMode("login");
                                                    setIsLoginModalOpen(true);
                                                }}
                                            >
                                                {isAuthenticated
                                                    ? t("logout")
                                                    : t("signIn")}
                                            </Button>
                                        </nav>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                        <nav className="hidden flex-wrap items-center gap-5 text-sm font-medium text-ink-body md:flex">
                            {currentNavItems.map((item) => (
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

                    <div className="flex items-center gap-2 md:ml-auto md:gap-3">
                        {isAuthenticated ? (
                            <>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button
                                            type="button"
                                            className="hidden items-center gap-3 rounded-full border border-line-subtle bg-surface-raised px-2.5 py-1.5 shadow-[0_12px_28px_rgba(36,24,21,0.08)] transition hover:border-brand-300 hover:bg-brand-50 md:inline-flex"
                                        >
                                            <div className="text-right">
                                                <p className="text-sm font-semibold leading-5 text-ink-strong">
                                                    {auth?.user.displayName}
                                                </p>
                                                <p className="text-xs leading-4 text-ink-body">
                                                    @{auth?.user.username}
                                                </p>
                                            </div>
                                            <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#fff4dc,#dc9b1c_52%,#6f4513)] text-base font-semibold text-ink-strong">
                                                {auth?.user.displayName
                                                    ?.slice(0, 1)
                                                    .toUpperCase()}
                                            </div>
                                            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-surface-base text-ink-body">
                                                <ChevronDown className="h-4 w-4" />
                                            </div>
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        align="end"
                                        className="w-[22rem] rounded-[2rem] p-4"
                                    >
                                        <div className="rounded-[1.6rem] bg-[linear-gradient(135deg,#fff8ed,#ffffff)] p-4 shadow-[0_14px_35px_rgba(36,24,21,0.08)]">
                                            <Link
                                                href={`/${auth?.user.username ?? ""}`}
                                                className="flex items-center gap-3 rounded-[1.3rem] px-1 py-1"
                                            >
                                                <div className="inline-flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-[linear-gradient(135deg,#fff4dc,#dc9b1c_52%,#6f4513)] text-lg font-semibold text-ink-strong">
                                                    {auth?.user.displayName
                                                        ?.slice(0, 1)
                                                        .toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-base font-semibold text-ink-strong">
                                                        {auth?.user.displayName}
                                                    </p>
                                                    <p className="text-sm text-ink-body">
                                                        @{auth?.user.username}
                                                    </p>
                                                </div>
                                            </Link>
                                            <div className="mt-4 grid grid-cols-3 gap-2">
                                                {[
                                                    {
                                                        label: t(
                                                            "profileMenuQuickTrips",
                                                        ),
                                                        icon: Sparkles,
                                                    },
                                                    {
                                                        label: t(
                                                            "profileMenuQuickMessages",
                                                        ),
                                                        icon: MessageCircleMore,
                                                    },
                                                    {
                                                        label: t(
                                                            "profileMenuQuickAlerts",
                                                        ),
                                                        icon: Bell,
                                                    },
                                                ].map((item) => {
                                                    const Icon = item.icon;

                                                    return (
                                                        <div
                                                            key={item.label}
                                                            className="rounded-2xl bg-brand-50 px-3 py-3 text-center"
                                                        >
                                                            <div className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-700">
                                                                <Icon className="h-4 w-4" />
                                                            </div>
                                                            <p className="mt-2 text-xs font-semibold text-ink-strong">
                                                                {item.label}
                                                            </p>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className="mt-4 space-y-2">
                                            <button
                                                type="button"
                                                className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium text-ink-strong hover:bg-brand-50"
                                            >
                                                <span className="inline-flex items-center gap-3">
                                                    <Settings className="h-5 w-5 text-brand-700" />
                                                    {t("profileMenuSettings")}
                                                </span>
                                                <ChevronDown className="h-4 w-4 -rotate-90 text-ink-body" />
                                            </button>
                                            <button
                                                type="button"
                                                className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium text-ink-strong hover:bg-brand-50"
                                            >
                                                <span className="inline-flex items-center gap-3">
                                                    <CircleHelp className="h-5 w-5 text-brand-700" />
                                                    {t("profileMenuHelp")}
                                                </span>
                                                <ChevronDown className="h-4 w-4 -rotate-90 text-ink-body" />
                                            </button>
                                            <button
                                                type="button"
                                                className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium text-ink-strong hover:bg-brand-50"
                                            >
                                                <span className="inline-flex items-center gap-3">
                                                    <Sparkles className="h-5 w-5 text-brand-700" />
                                                    {t("profileMenuDisplay")}
                                                </span>
                                                <ChevronDown className="h-4 w-4 -rotate-90 text-ink-body" />
                                            </button>
                                            <button
                                                type="button"
                                                className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-ink-strong hover:bg-brand-50"
                                                onClick={() => void handleLogout()}
                                                disabled={isLogoutLoading}
                                            >
                                                <LogOut className="h-5 w-5 text-brand-700" />
                                                {t("logout")}
                                            </button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </>
                        ) : (
                            <Button
                                type="button"
                                variant="outline"
                                className="hidden w-full md:inline-flex md:w-auto"
                                onClick={() => {
                                    setAuthModalMode("login");
                                    setIsLoginModalOpen(true);
                                }}
                            >
                                {t("signIn")}
                            </Button>
                        )}
                        {isAuthenticated ? null : (
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
                        )}
                    </div>
                </div>
            </header>
            <AuthModal
                open={isLoginModalOpen}
                mode={authModalMode}
                onModeChange={setAuthModalMode}
                onAuthSuccess={() => sync()}
                onOpenChange={setIsLoginModalOpen}
            />
        </>
    );
}
