import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    BarChart3,
    Bot,
    ClipboardList,
    FilePlus2,
    FileText,
    Gauge,
    PlugZap,
    UserSquare2,
    Users,
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
];

const kpiWidgets = [
    {
        label: 'Open Orders',
        value: '9',
        detail: 'Across Order List views',
        tone: 'text-[#186627] bg-[#edf5ef] border-[#dbe7de]',
    },
    {
        label: 'Quotes Pipeline',
        value: '7',
        detail: 'Open + Hold Estimate',
        tone: 'text-[#186627] bg-[#edf5ef] border-[#dbe7de]',
    },
    {
        label: 'Active Clients',
        value: '6',
        detail: 'Visible in current filters',
        tone: 'text-[#186627] bg-[#edf5ef] border-[#dbe7de]',
    },
    {
        label: 'Report Entries',
        value: '32',
        detail: 'Operational report menu',
        tone: 'text-[#8d4d1c] bg-[#fff7f0] border-[#eadfce]',
    },
    {
        label: 'Connected Apps',
        value: '4',
        detail: 'QuickBooks, Twilio, Stripe, Salesforce',
        tone: 'text-[#8d4d1c] bg-[#fff7f0] border-[#eadfce]',
    },
    {
        label: 'Employees Online',
        value: '4',
        detail: 'Out of 6 active team members',
        tone: 'text-[#186627] bg-[#edf5ef] border-[#dbe7de]',
    },
    {
        label: 'Bot Readiness',
        value: '82%',
        detail: 'Knowledge and channel config',
        tone: 'text-[#8d4d1c] bg-[#fff7f0] border-[#eadfce]',
    },
];

const moduleWidgets = [
    {
        title: 'Order List',
        description:
            'Track new, open, due today, completed, and cancelled survey orders.',
        href: '/orders',
        icon: ClipboardList,
    },
    {
        title: 'Place Order',
        description:
            'Capture property address, map location, intake details, and create quote handoff.',
        href: '/orders/place',
        icon: FilePlus2,
    },
    {
        title: 'Quotes',
        description:
            'Monitor quote statuses, follow-up dates, and amount totals.',
        href: '/quotes',
        icon: FileText,
    },
    {
        title: 'Clients',
        description:
            'Manage client records with basic and advanced filtering.',
        href: '/clients',
        icon: Users,
    },
    {
        title: 'Reports',
        description:
            'Access operations reports including due/overdue orders and delivery views.',
        href: '/reports',
        icon: BarChart3,
    },
    {
        title: 'Employees',
        description:
            'Track employee current tasks, online status, and contact actions.',
        href: '/employees',
        icon: UserSquare2,
    },
    {
        title: 'Chatbot Configuration',
        description:
            'Configure chatbot behavior, channels, escalation, and knowledge sources.',
        href: '/chatbot-configuration',
        icon: Bot,
    },
    {
        title: 'Integrations',
        description:
            'Review connected services and prepare additional system integrations.',
        href: '/integrations',
        icon: PlugZap,
    },
];

const queueWidgets = [
    {
        module: 'Orders',
        focus: 'Due Today / Overdue',
        count: 4,
        nextAction: 'Review queue and assign rush handling',
    },
    {
        module: 'Quotes',
        focus: 'Follow-ups overdue',
        count: 3,
        nextAction: 'Run quote callbacks before EOD',
    },
    {
        module: 'Clients',
        focus: 'Disabled/Deleted review',
        count: 2,
        nextAction: 'Validate archive candidates',
    },
    {
        module: 'Employees',
        focus: 'Offline coverage',
        count: 2,
        nextAction: 'Send SMS/email nudges for pending tasks',
    },
    {
        module: 'Chatbot',
        focus: 'Training sources',
        count: 6,
        nextAction: 'Review source freshness and escalation triggers',
    },
    {
        module: 'Integrations',
        focus: 'Connected platforms',
        count: 4,
        nextAction: 'Plan webhook + sync monitoring',
    },
];

const integrationStatus = [
    { name: 'QuickBooks', state: 'Connected' },
    { name: 'Twilio', state: 'Connected' },
    { name: 'Stripe', state: 'Connected' },
    { name: 'Salesforce', state: 'Connected' },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-5 p-4 md:p-6">
                <section className="rounded-2xl border border-[#dbe7de] bg-white p-5 shadow-[0_18px_32px_-26px_rgba(24,102,39,0.78)] md:p-6">
                    <p className="text-xs font-semibold tracking-[0.12em] text-[#186627] uppercase">
                        First Choice Surveying Inc.
                    </p>
                    <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#1f2e22]">
                        Operations Dashboard
                    </h1>
                    <p className="mt-2 max-w-3xl text-sm text-[#4f6b58] md:text-base">
                        Unified operational view for the currently implemented
                        modules: orders, quotes, clients, reporting, and
                        integrations.
                    </p>
                </section>

                <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-7">
                    {kpiWidgets.map((item) => (
                        <article
                            key={item.label}
                            className={`rounded-xl border p-4 shadow-[0_12px_24px_-24px_rgba(24,102,39,0.8)] ${item.tone}`}
                        >
                            <p className="text-xs font-semibold tracking-[0.08em] uppercase">
                                {item.label}
                            </p>
                            <p className="mt-2 text-3xl font-semibold text-[#1f2e22]">
                                {item.value}
                            </p>
                            <p className="mt-1 text-xs text-[#577260]">
                                {item.detail}
                            </p>
                        </article>
                    ))}
                </section>

                <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
                    <article className="rounded-2xl border border-[#dbe7de] bg-white p-5 shadow-[0_16px_30px_-24px_rgba(24,102,39,0.7)]">
                        <div className="flex items-center justify-between gap-3">
                            <h2 className="text-lg font-semibold text-[#1f2e22]">
                                Module Widgets
                            </h2>
                            <span className="rounded-full bg-[#edf5ef] px-2 py-1 text-xs font-semibold text-[#355744]">
                                {moduleWidgets.length} modules
                            </span>
                        </div>

                        <div className="mt-4 grid gap-3 md:grid-cols-2">
                            {moduleWidgets.map((widget) => {
                                const Icon = widget.icon;

                                return (
                                    <Link
                                        key={widget.title}
                                        href={widget.href}
                                        className="group rounded-xl border border-[#dce8df] bg-[#fcfffd] p-4 transition hover:border-[#c7d7cd] hover:bg-[#f7fbf8]"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="rounded-lg border border-[#dce8df] bg-white p-2">
                                                <Icon className="size-4 text-[#186627]" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-semibold text-[#1f2e22]">
                                                    {widget.title}
                                                </p>
                                                <p className="mt-1 text-sm text-[#577260]">
                                                    {widget.description}
                                                </p>
                                                <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#186627]">
                                                    Open module
                                                    <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </article>

                    <article className="rounded-2xl border border-[#eadfce] bg-[#fff8f1] p-5 shadow-[0_16px_30px_-24px_rgba(187,100,32,0.65)]">
                        <div className="flex items-center gap-2 text-[#4f2f17]">
                            <Gauge className="size-4" />
                            <h2 className="text-lg font-semibold">
                                Operational Health
                            </h2>
                        </div>

                        <div className="mt-4 space-y-3">
                            {queueWidgets.map((item) => (
                                <div
                                    key={item.module}
                                    className="rounded-lg border border-[#efdccc] bg-white/85 p-3"
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-sm font-semibold text-[#51311a]">
                                            {item.module}
                                        </p>
                                        <span className="rounded-full bg-[#fff1e3] px-2 py-0.5 text-xs font-semibold text-[#8d4d1c]">
                                            {item.count}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-[#775138]">
                                        {item.focus}
                                    </p>
                                    <p className="mt-1 text-xs text-[#8a6144]">
                                        {item.nextAction}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </article>
                </section>

                <section className="rounded-2xl border border-[#dbe7de] bg-white p-5 shadow-[0_16px_30px_-24px_rgba(24,102,39,0.7)]">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <h2 className="text-lg font-semibold text-[#1f2e22]">
                            Integrations Status
                        </h2>
                        <Link
                            href="/integrations"
                            className="inline-flex items-center gap-1 text-sm font-semibold text-[#186627] hover:text-[#145521]"
                        >
                            Manage integrations
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {integrationStatus.map((item) => (
                            <div
                                key={item.name}
                                className="rounded-xl border border-[#dce8df] bg-[#f8fcf9] p-4"
                            >
                                <p className="font-semibold text-[#1f2e22]">
                                    {item.name}
                                </p>
                                <span className="mt-2 inline-flex rounded-full bg-[#e8f4ea] px-2 py-1 text-xs font-semibold text-[#186627]">
                                    {item.state}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
