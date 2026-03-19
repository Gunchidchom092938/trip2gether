export type ProfileStat = {
    label: string;
    value: string;
};

export type ProfileShortcut = {
    label: string;
    detail: string;
    icon: "map" | "bookmark" | "users" | "camera";
};

export type ProfileStory = {
    title: string;
    subtitle: string;
    badge: string;
    accentClassName: string;
};

export type ProfilePost = {
    author: string;
    handle: string;
    timestamp: string;
    title: string;
    summary: string;
    tags: string[];
    metrics: {
        likes: string;
        comments: string;
        shares: string;
    };
    imageClassName: string;
};

export type ProfileContact = {
    name: string;
    status: string;
};

export type ProfileHighlight = {
    label: string;
    value: string;
};
