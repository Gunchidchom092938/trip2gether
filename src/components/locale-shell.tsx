"use client";

import { usePathname } from "@/i18n/navigation";

import { SiteNavbar } from "@/components/site-navbar";
import { PopupProvider } from "@/components/ui/popup-provider";
import { useStoredAuth } from "@/services/auth";

type LocaleShellProps = {
    children: React.ReactNode;
};

export function LocaleShell({ children }: LocaleShellProps) {
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const { isAuthenticated } = useStoredAuth();

    return (
        <PopupProvider>
            {isHomePage && !isAuthenticated ? null : <SiteNavbar />}
            {children}
        </PopupProvider>
    );
}
