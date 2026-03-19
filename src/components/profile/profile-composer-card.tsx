import { Map, Sparkles, Wand2 } from "lucide-react";

type ProfileComposerCardProps = {
    prompt: string;
    subPrompt: string;
    actions: string[];
};

const actionIcons = [Wand2, Map, Sparkles] as const;

export function ProfileComposerCard({
    prompt,
    subPrompt,
    actions,
}: Readonly<ProfileComposerCardProps>) {
    return (
        <section className="rounded-[2rem] border border-line-subtle bg-surface-panel p-5 shadow-[0_24px_50px_rgba(36,24,21,0.08)]">
            <div className="flex gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#dc9b1c,#8b5a14)] text-lg font-semibold text-ink-inverse">
                    T
                </div>
                <div className="min-w-0 flex-1">
                    <div className="rounded-[1.6rem] border border-line-subtle bg-surface-raised px-5 py-4">
                        <p className="font-semibold text-ink-strong">
                            {prompt}
                        </p>
                        <p className="mt-1 text-sm text-ink-body">
                            {subPrompt}
                        </p>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        {actions.map((action, index) => {
                            const Icon = actionIcons[index] ?? Sparkles;

                            return (
                                <button
                                    key={action}
                                    type="button"
                                    className="flex items-center justify-center gap-2 rounded-2xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-100"
                                >
                                    <Icon className="h-4 w-4" />
                                    {action}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
