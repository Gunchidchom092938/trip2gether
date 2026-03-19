type ProfileCoverProps = {
    coverLabel: string;
    displayName: string;
};

export function ProfileCover({
    coverLabel,
    displayName,
}: Readonly<ProfileCoverProps>) {
    return (
        <div className="relative z-0 overflow-hidden rounded-t-[2.25rem] border border-line-subtle border-b-0 px-6 pb-7 pt-10 shadow-[0_28px_80px_rgba(36,24,21,0.18)]">
            <div className="absolute inset-0 z-0 bg-[linear-gradient(120deg,rgba(36,24,21,0.62),rgba(36,24,21,0.2)),url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center" />
            <div className="pointer-events-none absolute inset-0 z-2 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,244,220,0.14),transparent_24%)]" />
            <div className="relative z-20 flex min-h-[220px] items-start justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-inverse/70">
                    {coverLabel}
                </p>
                <div className="max-w-[70%] text-right">
                    <p className="text-[clamp(2rem,8vw,5rem)] font-semibold tracking-[-0.06em] text-[#ffcf5e] drop-shadow-[0_8px_24px_rgba(36,24,21,0.35)]">
                        {displayName.replace(/\s+/g, "_").toLowerCase()}
                    </p>
                </div>
            </div>
        </div>
    );
}
