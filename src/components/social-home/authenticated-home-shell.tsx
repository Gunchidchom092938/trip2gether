"use client";

import type { AppLocale } from "@/i18n/routing";
import type { StoredAuth } from "@/services/auth/storage";
import { ProfileShell } from "@/components/profile/profile-shell";
import type {
    ProfileContact,
    ProfileHighlight,
    ProfilePost,
    ProfileShortcut,
    ProfileStat,
    ProfileStory,
} from "@/components/profile/types";

type HomeFeedCopy = {
    pageTitle: string;
    pageDescription: string;
    createTripLabel: string;
    profileSummaryLabel: string;
    highlightsLabel: string;
    storiesTitle: string;
    viewTripLabel: string;
    sponsorLabel: string;
    sponsorTitle: string;
    sponsorDescription: string;
    contactsTitle: string;
    plannerTipTitle: string;
    plannerTipDescription: string;
    composerPrompt: string;
    composerSubPrompt: string;
    composerActions: string[];
    bio: string;
    stats: ProfileStat[];
    shortcuts: ProfileShortcut[];
    highlights: ProfileHighlight[];
    stories: ProfileStory[];
    posts: ProfilePost[];
    contacts: ProfileContact[];
};

const homeFeedByLocale: Record<AppLocale, HomeFeedCopy> = {
    en: {
        pageTitle: "Your travel feed is ready",
        pageDescription:
            "Track new public trips, save inspiration from friends, and jump back into your own draft plans from one feed.",
        createTripLabel: "Create a new trip",
        profileSummaryLabel: "Trip rhythm",
        highlightsLabel: "Quick highlights",
        storiesTitle: "Trip stories",
        viewTripLabel: "Open plan",
        sponsorLabel: "Featured",
        sponsorTitle: "Post a trip the way you post a story",
        sponsorDescription:
            "Build the route once, then turn it into a post people can react to, save, and copy into their own planner.",
        contactsTitle: "Travel circle",
        plannerTipTitle: "Planner tip",
        plannerTipDescription:
            "Trips that include mood, budget, and timing usually get copied faster because people can adapt them immediately.",
        composerPrompt: "What are you planning next?",
        composerSubPrompt:
            "Share a draft update, publish a polished plan, or save a route idea before it disappears.",
        composerActions: ["Start post", "Add stop", "Polish draft"],
        bio: "You are in your travel feed. Pick up where you left off, share something new, or browse trip ideas from people you follow.",
        stats: [
            { label: "Drafts", value: "5" },
            { label: "Saved", value: "34" },
            { label: "Reactions", value: "1.2k" },
        ],
        shortcuts: [
            {
                label: "Saved for later",
                detail: "Trips and route ideas you bookmarked from the community.",
                icon: "bookmark",
            },
            {
                label: "Recent maps",
                detail: "Open the routes you edited most recently.",
                icon: "map",
            },
            {
                label: "Travel friends",
                detail: "People who comment on your plans and share new ideas.",
                icon: "users",
            },
            {
                label: "Photo picks",
                detail: "Cover images and trip recap visuals ready to post.",
                icon: "camera",
            },
        ],
        highlights: [
            { label: "Most active topic", value: "Weekend city trips" },
            { label: "Pending comments", value: "8" },
            { label: "Saved this week", value: "12" },
        ],
        stories: [
            {
                title: "Night market run",
                subtitle: "Quick eats, photo corners, and a smooth walk route.",
                badge: "New",
                accentClassName:
                    "bg-[linear-gradient(160deg,#ffe5b8,#fff8ed_54%,#f6c6d1)]",
            },
            {
                title: "Beach reset",
                subtitle: "Light schedule and easy food stops near the shore.",
                badge: "Saved",
                accentClassName:
                    "bg-[linear-gradient(160deg,#fff8ed,#d7eef2_55%,#f6efe4)]",
            },
            {
                title: "Cafe district",
                subtitle: "A copy-ready route for a relaxed half-day city loop.",
                badge: "Hot",
                accentClassName:
                    "bg-[linear-gradient(160deg,#f6efe4,#f7e1b1_50%,#fff8ed)]",
            },
            {
                title: "Temple morning",
                subtitle: "Early start, soft pacing, and fewer crowds.",
                badge: "Draft",
                accentClassName:
                    "bg-[linear-gradient(160deg,#fff8ed,#f3d8df_52%,#f6efe4)]",
            },
        ],
        posts: [
            {
                author: "Trip2Gather",
                handle: "trip2gather",
                timestamp: "1h ago",
                title: "Bangkok riverside evening route that people keep saving",
                summary:
                    "A compact post-work plan with one ferry ride, two food stops, and a clean budget split for small groups.",
                tags: ["Bangkok", "evening", "saveable"],
                metrics: {
                    likes: "1.8k likes",
                    comments: "220 comments",
                    shares: "64 shares",
                },
                imageClassName:
                    "bg-[linear-gradient(135deg,rgba(220,155,28,0.22),rgba(255,255,255,0.16)),url('https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center",
            },
            {
                author: "CityMoods",
                handle: "citymoods",
                timestamp: "5h ago",
                title: "Tokyo coffee crawl with easy train transfers",
                summary:
                    "Four neighborhoods, six cafe stops, and a route map designed for people who want strong visuals without a rushed schedule.",
                tags: ["Tokyo", "coffee", "citytrip"],
                metrics: {
                    likes: "924 likes",
                    comments: "88 comments",
                    shares: "26 shares",
                },
                imageClassName:
                    "bg-[linear-gradient(135deg,rgba(75,46,18,0.16),rgba(255,255,255,0.14)),url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center",
            },
        ],
        contacts: [
            { name: "Mina Keita", status: "Shared a new Kyoto route" },
            { name: "Ploy Sarin", status: "Commented on your saved beach trip" },
            { name: "Theo Marsh", status: "Copied your Bangkok evening plan" },
        ],
    },
    th: {
        pageTitle: "ฟีดทริปของคุณพร้อมแล้ว",
        pageDescription:
            "ติดตามทริป public ใหม่ ๆ เก็บไอเดียจากเพื่อน และกลับไปทำ draft ของตัวเองต่อได้จากฟีดเดียว",
        createTripLabel: "สร้างทริปใหม่",
        profileSummaryLabel: "จังหวะการใช้งาน",
        highlightsLabel: "ไฮไลต์ด่วน",
        storiesTitle: "Trip stories",
        viewTripLabel: "เปิดแผน",
        sponsorLabel: "แนะนำ",
        sponsorTitle: "โพสต์ทริปได้เหมือนโพสต์สตอรี่",
        sponsorDescription:
            "จัด route ครั้งเดียว แล้วเปลี่ยนเป็นโพสต์ที่คนอื่นกด reaction, save และ copy เข้า planner ของตัวเองได้",
        contactsTitle: "วงเพื่อนเที่ยว",
        plannerTipTitle: "ทิปสำหรับโพสต์",
        plannerTipDescription:
            "ทริปที่บอก mood, budget และช่วงเวลาแบบชัดเจน มักถูกก๊อปไปใช้ต่อได้เร็วกว่า",
        composerPrompt: "ทริปถัดไปของคุณคืออะไร?",
        composerSubPrompt:
            "แชร์อัปเดตของ draft, ปล่อยแผนเที่ยวที่พร้อมโพสต์ หรือบันทึกไอเดีย route ไว้ก่อนจะลืม",
        composerActions: ["เริ่มโพสต์", "เพิ่มจุดแวะ", "เกลาร่างทริป"],
        bio: "นี่คือฟีดทริปของคุณ กลับมาทำต่อจากที่ค้างไว้ แชร์อะไรใหม่ ๆ หรือไล่ดูไอเดียทริปจากคนที่คุณติดตามได้เลย",
        stats: [
            { label: "แบบร่าง", value: "5" },
            { label: "บันทึก", value: "34" },
            { label: "รีแอ็กชัน", value: "1.2k" },
        ],
        shortcuts: [
            {
                label: "เก็บไว้อ่านทีหลัง",
                detail: "ทริปและ route ที่คุณ bookmark มาจากชุมชน",
                icon: "bookmark",
            },
            {
                label: "แผนที่ล่าสุด",
                detail: "เปิด route ที่คุณเพิ่งแก้ไขไปล่าสุด",
                icon: "map",
            },
            {
                label: "เพื่อนสายเที่ยว",
                detail: "คนที่คอมเมนต์ในแผนของคุณและชอบแชร์ไอเดียใหม่",
                icon: "users",
            },
            {
                label: "ภาพสำหรับโพสต์",
                detail: "รูป cover และภาพสรุปทริปที่พร้อมเอาไปใช้",
                icon: "camera",
            },
        ],
        highlights: [
            { label: "หัวข้อที่กำลังมา", value: "ทริปเมืองสุดสัปดาห์" },
            { label: "คอมเมนต์ที่รออ่าน", value: "8" },
            { label: "จำนวนที่เซฟสัปดาห์นี้", value: "12" },
        ],
        stories: [
            {
                title: "Night market run",
                subtitle: "ทริปกินไว เดินเพลิน และมีจุดถ่ายรูปพอดี",
                badge: "ใหม่",
                accentClassName:
                    "bg-[linear-gradient(160deg,#ffe5b8,#fff8ed_54%,#f6c6d1)]",
            },
            {
                title: "Beach reset",
                subtitle: "ตารางเบา ๆ และมีจุดกินใกล้ทะเลแบบไม่รีบ",
                badge: "บันทึก",
                accentClassName:
                    "bg-[linear-gradient(160deg,#fff8ed,#d7eef2_55%,#f6efe4)]",
            },
            {
                title: "Cafe district",
                subtitle: "เส้นที่ก๊อปไปใช้ต่อได้ง่ายสำหรับครึ่งวันในเมือง",
                badge: "มาแรง",
                accentClassName:
                    "bg-[linear-gradient(160deg,#f6efe4,#f7e1b1_50%,#fff8ed)]",
            },
            {
                title: "Temple morning",
                subtitle: "เริ่มเช้า เดินสบาย และคนไม่แน่นเกินไป",
                badge: "ร่าง",
                accentClassName:
                    "bg-[linear-gradient(160deg,#fff8ed,#f3d8df_52%,#f6efe4)]",
            },
        ],
        posts: [
            {
                author: "Trip2Gather",
                handle: "trip2gather",
                timestamp: "1 ชม.ก่อน",
                title: "เส้นริมแม่น้ำกรุงเทพช่วงเย็นที่คนชอบบันทึกไว้มาก",
                summary:
                    "แผนหลังเลิกงานแบบกระชับ มีนั่งเรือหนึ่งช่วง แวะกินสองร้าน และแบ่งงบสำหรับกลุ่มเล็กได้ชัดเจน",
                tags: ["Bangkok", "evening", "saveable"],
                metrics: {
                    likes: "1.8k ไลก์",
                    comments: "220 คอมเมนต์",
                    shares: "64 แชร์",
                },
                imageClassName:
                    "bg-[linear-gradient(135deg,rgba(220,155,28,0.22),rgba(255,255,255,0.16)),url('https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center",
            },
            {
                author: "CityMoods",
                handle: "citymoods",
                timestamp: "5 ชม.ก่อน",
                title: "Tokyo coffee crawl ที่ต่อรถไฟง่ายและดูภาพรวมสบาย",
                summary:
                    "4 ย่าน 6 คาเฟ่ และมี route map สำหรับคนที่อยากได้ทริปสวยแต่ไม่แน่นจนเกินไป",
                tags: ["Tokyo", "coffee", "citytrip"],
                metrics: {
                    likes: "924 ไลก์",
                    comments: "88 คอมเมนต์",
                    shares: "26 แชร์",
                },
                imageClassName:
                    "bg-[linear-gradient(135deg,rgba(75,46,18,0.16),rgba(255,255,255,0.14)),url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center",
            },
        ],
        contacts: [
            { name: "Mina Keita", status: "แชร์ route Kyoto ใหม่" },
            { name: "Ploy Sarin", status: "คอมเมนต์ในทริปทะเลที่คุณบันทึก" },
            { name: "Theo Marsh", status: "ก๊อปแผน Bangkok ตอนเย็นของคุณ" },
        ],
    },
};

type AuthenticatedHomeShellProps = {
    locale: AppLocale;
    auth: StoredAuth;
};

export function AuthenticatedHomeShell({
    locale,
    auth,
}: Readonly<AuthenticatedHomeShellProps>) {
    const copy = homeFeedByLocale[locale];

    return (
        <ProfileShell
            displayName={auth.user.displayName}
            username={auth.user.username}
            bio={copy.bio}
            pageTitle={copy.pageTitle}
            pageDescription={copy.pageDescription}
            createTripLabel={copy.createTripLabel}
            profileSummaryLabel={copy.profileSummaryLabel}
            highlightsLabel={copy.highlightsLabel}
            viewTripLabel={copy.viewTripLabel}
            sponsorLabel={copy.sponsorLabel}
            sponsorTitle={copy.sponsorTitle}
            sponsorDescription={copy.sponsorDescription}
            contactsTitle={copy.contactsTitle}
            plannerTipTitle={copy.plannerTipTitle}
            plannerTipDescription={copy.plannerTipDescription}
            composerPrompt={copy.composerPrompt}
            composerSubPrompt={copy.composerSubPrompt}
            composerActions={copy.composerActions}
            stats={copy.stats}
            shortcuts={copy.shortcuts}
            highlights={copy.highlights}
            posts={copy.posts}
            contacts={copy.contacts}
        />
    );
}
