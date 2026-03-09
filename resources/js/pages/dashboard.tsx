import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
];

export default function Dashboard() {
    const metrics = [
        {
            label: 'Active Survey Orders',
            value: '18',
            detail: '+4 this week',
        },
        {
            label: 'Pending Client Quotes',
            value: '7',
            detail: '2 awaiting review',
        },
        {
            label: 'Reports Due This Week',
            value: '11',
            detail: '3 high priority',
        },
    ];

    const milestones = [
        { phase: 'Milestone 1', title: 'System Foundation', progress: 100 },
        { phase: 'Milestone 2', title: 'Order Management', progress: 78 },
        { phase: 'Milestone 3', title: 'Quotes & Client Management', progress: 46 },
        { phase: 'Milestone 4', title: 'Reporting Module', progress: 12 },
        { phase: 'Milestone 5', title: 'UAT & Stabilization', progress: 0 },
    ];

    const priorities = [
        'Finalize QA/UAT environment checklist',
        'Review pending client quote approvals',
        'Prepare order progress summary for standup',
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="relative flex h-full flex-1 flex-col gap-6 overflow-x-auto p-4 md:p-6">
                <div className="pointer-events-none absolute top-4 right-4 size-52 rounded-full bg-[#bb6420]/10 blur-3xl" />
                <div className="pointer-events-none absolute bottom-8 left-8 size-64 rounded-full bg-[#186627]/10 blur-3xl" />

                <section className="relative overflow-hidden rounded-3xl border border-[#dfeadf] bg-white p-6 shadow-[0_24px_56px_-42px_rgba(24,102,39,0.65)] md:p-8">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-[#186627]/6" />
                    <div className="relative">
                        <span className="inline-flex rounded-full border border-[#186627]/20 bg-[#186627]/10 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-[#186627] uppercase">
                            First Choice Surveying Inc.
                        </span>
                        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#1f2e22] md:text-4xl">
                            Operations Dashboard
                        </h1>
                        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4f6b58] md:text-base">
                            Track survey work orders, client quote activity,
                            and milestone delivery in one view built for daily
                            execution.
                        </p>
                    </div>
                </section>

                <section className="grid gap-4 md:grid-cols-3">
                    {metrics.map((metric) => (
                        <article
                            key={metric.label}
                            className="rounded-2xl border border-[#dbe7de] bg-white p-5 shadow-[0_16px_30px_-24px_rgba(24,102,39,0.7)]"
                        >
                            <p className="text-xs font-semibold tracking-[0.12em] text-[#bb6420] uppercase">
                                {metric.label}
                            </p>
                            <p className="mt-3 text-4xl font-semibold text-[#1e3124]">
                                {metric.value}
                            </p>
                            <p className="mt-2 text-sm text-[#5a6f61]">
                                {metric.detail}
                            </p>
                        </article>
                    ))}
                </section>

                <section className="grid gap-4 xl:grid-cols-3">
                    <article
                        id="roadmap"
                        className="xl:col-span-2 rounded-2xl border border-[#dbe7de] bg-white p-6 shadow-[0_16px_30px_-24px_rgba(24,102,39,0.7)]"
                    >
                        <h2 className="text-lg font-semibold text-[#1f2e22]">
                            MVP Milestone Progress
                        </h2>
                        <p className="mt-1 text-sm text-[#56705e]">
                            Delivery tracking aligned with the current 5-phase
                            implementation plan.
                        </p>

                        <div className="mt-6 space-y-4">
                            {milestones.map((milestone) => (
                                <div key={milestone.phase} className="space-y-2">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-sm font-medium text-[#2a4636]">
                                            {milestone.phase}: {milestone.title}
                                        </p>
                                        <span className="text-xs font-semibold text-[#bb6420]">
                                            {milestone.progress}%
                                        </span>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-[#edf5ef]">
                                        <div
                                            className="h-full rounded-full bg-[#186627]"
                                            style={{
                                                width: `${milestone.progress}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="rounded-2xl border border-[#eadfce] bg-[#fff8f1] p-6 shadow-[0_16px_30px_-24px_rgba(187,100,32,0.65)]">
                        <h2 className="text-lg font-semibold text-[#4f2f17]">
                            Today&apos;s Priorities
                        </h2>
                        <ul className="mt-4 space-y-3 text-sm text-[#6f4b2d]">
                            {priorities.map((item) => (
                                <li key={item} className="flex gap-2">
                                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#bb6420]" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </article>
                </section>

                <section className="rounded-2xl border border-[#dbe7de] bg-white p-6 shadow-[0_16px_30px_-24px_rgba(24,102,39,0.7)]">
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-xl border border-[#dce8df] bg-[#f8fcf9] p-4">
                            <p className="text-xs font-semibold tracking-[0.12em] text-[#186627] uppercase">
                                Next Review
                            </p>
                            <p className="mt-2 text-lg font-semibold text-[#1f2e22]">
                                March 15, 2026
                            </p>
                            <p className="mt-1 text-sm text-[#577260]">
                                Internal sprint checkpoint
                            </p>
                        </div>
                        <div className="rounded-xl border border-[#eadfce] bg-[#fff8f1] p-4">
                            <p className="text-xs font-semibold tracking-[0.12em] text-[#bb6420] uppercase">
                                Budget Status
                            </p>
                            <p className="mt-2 text-lg font-semibold text-[#4f2f17]">
                                MVP: $7,200 USD
                            </p>
                            <p className="mt-1 text-sm text-[#775138]">
                                10% kickoff + 5 milestone payouts
                            </p>
                        </div>
                        <div className="rounded-xl border border-[#dce8df] bg-[#f8fcf9] p-4">
                            <p className="text-xs font-semibold tracking-[0.12em] text-[#186627] uppercase">
                                Current Focus
                            </p>
                            <p className="mt-2 text-lg font-semibold text-[#1f2e22]">
                                Authentication + Core Modules
                            </p>
                            <p className="mt-1 text-sm text-[#577260]">
                                Foundation for client/order workflows
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
