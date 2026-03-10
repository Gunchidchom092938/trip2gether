"use client";

import { usePathname } from "@/i18n/navigation";

import { SiteNavbar } from "@/components/site-navbar";

type LocaleShellProps = {
    children: React.ReactNode;
};

export function LocaleShell({ children }: LocaleShellProps) {
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    return (
        <>
            {isHomePage ? null : <SiteNavbar />}
            {children}
        </>
    );
}
