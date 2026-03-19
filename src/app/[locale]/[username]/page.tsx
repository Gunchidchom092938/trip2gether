import { getTranslations } from "next-intl/server";

import type { ProfilePost } from "@/components/profile/types";
import { UserProfileShell } from "@/components/user-profile/user-profile-shell";

type PageProps = {
    params: Promise<{
        locale: string;
        username: string;
    }>;
};

function toDisplayName(username: string) {
    return username
        .split(/[-_.]+/)
        .filter(Boolean)
        .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
        .join(" ");
}

function getProfilePosts(locale: string): ProfilePost[] {
    if (locale === "th") {
        return [
            {
                author: "Trip2Gather",
                handle: "trip2gather",
                timestamp: "9 ชั่วโมงก่อน",
                title: "โตเกียวคาเฟ่เดย์ที่จัด route ไว้ก๊อปไปใช้ต่อได้ง่าย",
                summary:
                    "รวมย่านเดินง่าย คาเฟ่แสงสวย และช่วงเวลาแนะนำสำหรับคนที่อยากโพสต์ทริปเมืองแบบดูคลีนและใช้งานจริงได้",
                tags: ["Tokyo", "cafe", "citytrip"],
                metrics: {
                    likes: "1.1k ไลก์",
                    comments: "142 คอมเมนต์",
                    shares: "39 แชร์",
                },
                imageClassName:
                    "bg-[linear-gradient(135deg,rgba(220,155,28,0.22),rgba(255,255,255,0.16)),url('https://images.unsplash.com/photo-1526481280695-3c469d6a6e82?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center",
            },
            {
                author: "Trip2Gather",
                handle: "trip2gather",
                timestamp: "เมื่อวาน",
                title: "Route เที่ยวเย็นในกรุงเทพที่เหมาะกับการชวนเพื่อนไปทันที",
                summary:
                    "มีทั้งจุดกิน จุดชมวิว และช่วงเวลาเผื่อรถติดเล็กน้อย ทำให้เป็นโพสต์ที่เพื่อนสามารถเซฟหรือก๊อปไปใช้งานต่อได้ทันที",
                tags: ["Bangkok", "evening", "friends"],
                metrics: {
                    likes: "864 ไลก์",
                    comments: "74 คอมเมนต์",
                    shares: "22 แชร์",
                },
                imageClassName:
                    "bg-[linear-gradient(135deg,rgba(75,46,18,0.16),rgba(255,255,255,0.14)),url('https://images.unsplash.com/photo-1508002366005-75a695ee2d17?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center",
            },
        ];
    }

    return [
        {
            author: "Trip2Gather",
            handle: "trip2gather",
            timestamp: "9h ago",
            title: "Tokyo cafe day with a route people can copy instantly",
            summary:
                "A clean city plan with easy walking zones, bright cafes, and timing notes for people who want a polished post that still feels practical.",
            tags: ["Tokyo", "cafe", "citytrip"],
            metrics: {
                likes: "1.1k likes",
                comments: "142 comments",
                shares: "39 shares",
            },
            imageClassName:
                "bg-[linear-gradient(135deg,rgba(220,155,28,0.22),rgba(255,255,255,0.16)),url('https://images.unsplash.com/photo-1526481280695-3c469d6a6e82?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center",
        },
        {
            author: "Trip2Gather",
            handle: "trip2gather",
            timestamp: "Yesterday",
            title: "Bangkok evening route that is easy to send to friends",
            summary:
                "Food, viewpoints, and enough timing buffer for traffic make this the kind of post people can save or copy without much editing.",
            tags: ["Bangkok", "evening", "friends"],
            metrics: {
                likes: "864 likes",
                comments: "74 comments",
                shares: "22 shares",
            },
            imageClassName:
                "bg-[linear-gradient(135deg,rgba(75,46,18,0.16),rgba(255,255,255,0.14)),url('https://images.unsplash.com/photo-1508002366005-75a695ee2d17?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center",
        },
    ];
}

export default async function UsernamePage({ params }: Readonly<PageProps>) {
    const { locale, username } = await params;
    const t = await getTranslations("UserProfilePage");
    const displayName = toDisplayName(username);
    const posts = getProfilePosts(locale);

    return (
        <UserProfileShell
            displayName={displayName}
            username={username}
            coverLabel={t("coverLabel")}
            headline={t("headline")}
            location={t("location")}
            company={t("company")}
            university={t("university")}
            tabs={[
                t("tabs.posts"),
                t("tabs.about"),
                t("tabs.friends"),
                t("tabs.photos"),
                t("tabs.reels"),
            ]}
            activeTab={t("tabs.posts")}
            addStoryLabel={t("addStoryLabel")}
            editProfileLabel={t("editProfileLabel")}
            moreLabel={t("moreLabel")}
            aboutTitle={t("aboutTitle")}
            aboutItems={[
                { icon: "location", text: t("aboutItems.currentCity") },
                { icon: "home", text: t("aboutItems.hometown") },
                { icon: "birthday", text: t("aboutItems.birthday") },
            ]}
            workTitle={t("workTitle")}
            workDescription={t("workDescription")}
            educationTitle={t("educationTitle")}
            educationDescription={t("educationDescription")}
            composerPrompt={t("composerPrompt")}
            composerSubPrompt={t("composerSubPrompt")}
            composerActions={[
                t("composerActions.live"),
                t("composerActions.photo"),
                t("composerActions.status"),
            ]}
            postsTitle={t("postsTitle")}
            filterLabel={t("filterLabel")}
            manageLabel={t("manageLabel")}
            listViewLabel={t("listViewLabel")}
            gridViewLabel={t("gridViewLabel")}
            viewTripLabel={t("viewTripLabel")}
            posts={posts}
        />
    );
}
