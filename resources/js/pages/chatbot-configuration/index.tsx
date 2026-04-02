import { Head } from '@inertiajs/react';
import {
    Bot,
    Database,
    Globe,
    Mail,
    MessageSquare,
    Save,
    Send,
    Shield,
    Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type ChannelItem = {
    id: 'web' | 'sms' | 'email';
    label: string;
    detail: string;
    connected: boolean;
    icon: typeof Globe;
};

type KnowledgeSource = {
    id: number;
    source: string;
    type: 'Module' | 'Document' | 'Policy';
    status: 'Active' | 'Pending Sync';
    lastSynced: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Chatbot Configuration',
        href: '/chatbot-configuration',
    },
];

const channels: ChannelItem[] = [
    {
        id: 'web',
        label: 'Web Chat Widget',
        detail: 'Website and internal portal chat surface',
        connected: true,
        icon: Globe,
    },
    {
        id: 'sms',
        label: 'SMS Channel (Twilio)',
        detail: 'Inbound and outbound SMS conversations',
        connected: true,
        icon: MessageSquare,
    },
    {
        id: 'email',
        label: 'Email Channel',
        detail: 'Email replies for non-urgent interactions',
        connected: false,
        icon: Mail,
    },
];

const sources: KnowledgeSource[] = [
    {
        id: 1,
        source: 'Order List Module',
        type: 'Module',
        status: 'Active',
        lastSynced: '2026-03-16 09:35 AM',
    },
    {
        id: 2,
        source: 'Quotes Module',
        type: 'Module',
        status: 'Active',
        lastSynced: '2026-03-16 09:31 AM',
    },
    {
        id: 3,
        source: 'Clients Module',
        type: 'Module',
        status: 'Active',
        lastSynced: '2026-03-16 09:30 AM',
    },
    {
        id: 4,
        source: 'Operations Reporting Definitions',
        type: 'Document',
        status: 'Pending Sync',
        lastSynced: '2026-03-14 04:20 PM',
    },
    {
        id: 5,
        source: 'Escalation Rules v1',
        type: 'Policy',
        status: 'Active',
        lastSynced: '2026-03-16 09:10 AM',
    },
];

export default function ChatbotConfigurationIndex() {
    const [enabledChannels, setEnabledChannels] = useState({
        web: true,
        sms: true,
        email: false,
    });
    const [confidenceThreshold, setConfidenceThreshold] = useState(72);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Chatbot Configuration" />

            <div className="flex h-full flex-1 flex-col gap-5 p-4 md:p-6">
                <section className="overflow-hidden rounded-2xl border border-[#dbe7de] bg-white shadow-[0_18px_32px_-26px_rgba(24,102,39,0.78)]">
                    <div className="flex flex-wrap items-center gap-3 border-b border-[#e3ebe5] bg-[linear-gradient(165deg,#ffffff_0%,#f8fcf9_70%,#fff7f0_100%)] p-4">
                        <div>
                            <p className="text-xs font-semibold tracking-[0.12em] text-[#186627] uppercase">
                                AI Assistant Module
                            </p>
                            <h1 className="text-xl font-semibold text-[#1f2e22]">
                                Chatbot Configuration
                            </h1>
                            <p className="mt-1 text-sm text-[#607669]">
                                Control bot behavior, channels, escalation, and
                                training sources.
                            </p>
                        </div>
                        <div className="ml-auto flex flex-wrap items-center gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                className="h-10 border-[#cad7ce] text-[#355744]"
                            >
                                <Sparkles className="size-4" />
                                Preview Bot
                            </Button>
                            <Button className="h-10 bg-[#186627] px-4 text-white hover:bg-[#145521]">
                                <Save className="size-4" />
                                Save Configuration
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-4 p-4 xl:grid-cols-[minmax(0,1fr)_360px]">
                        <div className="space-y-4">
                            <article className="rounded-xl border border-[#dce8df] bg-[#fcfffd] p-4">
                                <div className="flex items-center gap-2">
                                    <Bot className="size-4 text-[#186627]" />
                                    <h2 className="text-sm font-semibold text-[#1f2e22]">
                                        Assistant Profile
                                    </h2>
                                </div>

                                <div className="mt-3 grid gap-3 md:grid-cols-2">
                                    <label className="grid gap-1 text-sm text-[#355744]">
                                        Bot Name
                                        <Input value="FCS Operations Assistant" />
                                    </label>
                                    <label className="grid gap-1 text-sm text-[#355744]">
                                        Default Tone
                                        <select className="h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:border-[#186627] focus:ring-2 focus:ring-[#186627]/20">
                                            <option>Professional</option>
                                            <option>Friendly</option>
                                            <option>Concise</option>
                                        </select>
                                    </label>
                                    <label className="grid gap-1 text-sm text-[#355744] md:col-span-2">
                                        Welcome Message
                                        <textarea
                                            rows={3}
                                            className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm outline-none focus:border-[#186627] focus:ring-2 focus:ring-[#186627]/20"
                                            defaultValue="Hi, I can help with orders, quotes, client records, and report navigation."
                                        />
                                    </label>
                                    <label className="grid gap-1 text-sm text-[#355744] md:col-span-2">
                                        Fallback Message
                                        <textarea
                                            rows={2}
                                            className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm outline-none focus:border-[#186627] focus:ring-2 focus:ring-[#186627]/20"
                                            defaultValue="I can route this to a team member. Would you like me to notify Operations now?"
                                        />
                                    </label>
                                </div>
                            </article>

                            <article className="rounded-xl border border-[#dce8df] bg-[#fcfffd] p-4">
                                <div className="flex items-center gap-2">
                                    <Shield className="size-4 text-[#186627]" />
                                    <h2 className="text-sm font-semibold text-[#1f2e22]">
                                        Response Rules
                                    </h2>
                                </div>

                                <div className="mt-3 grid gap-3">
                                    <label className="text-sm text-[#355744]">
                                        Confidence Threshold: {confidenceThreshold}%
                                        <input
                                            type="range"
                                            min={50}
                                            max={95}
                                            value={confidenceThreshold}
                                            onChange={(event) =>
                                                setConfidenceThreshold(
                                                    Number(event.target.value),
                                                )
                                            }
                                            className="mt-2 w-full accent-[#186627]"
                                        />
                                    </label>

                                    <div className="grid gap-2 text-sm text-[#355744] md:grid-cols-2">
                                        <label className="inline-flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                defaultChecked
                                                className="h-4 w-4 rounded border-[#bfd0c3] text-[#186627] focus:ring-[#186627]/25"
                                            />
                                            Ask clarifying question when unsure
                                        </label>
                                        <label className="inline-flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                defaultChecked
                                                className="h-4 w-4 rounded border-[#bfd0c3] text-[#186627] focus:ring-[#186627]/25"
                                            />
                                            Include source module in reply
                                        </label>
                                        <label className="inline-flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                defaultChecked
                                                className="h-4 w-4 rounded border-[#bfd0c3] text-[#186627] focus:ring-[#186627]/25"
                                            />
                                            Escalate billing/payment requests
                                        </label>
                                        <label className="inline-flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                defaultChecked
                                                className="h-4 w-4 rounded border-[#bfd0c3] text-[#186627] focus:ring-[#186627]/25"
                                            />
                                            Block sensitive personal data output
                                        </label>
                                    </div>
                                </div>
                            </article>

                            <article className="rounded-xl border border-[#dce8df] bg-[#fcfffd] p-4">
                                <div className="flex items-center gap-2">
                                    <Database className="size-4 text-[#186627]" />
                                    <h2 className="text-sm font-semibold text-[#1f2e22]">
                                        Knowledge Sources
                                    </h2>
                                </div>

                                <div className="mt-3 overflow-x-auto rounded-lg border border-[#e2ebe4]">
                                    <table className="min-w-[720px] text-sm">
                                        <thead className="bg-[#edf3ef] text-left text-xs font-semibold tracking-wide text-[#2f4c3d] uppercase">
                                            <tr>
                                                <th className="px-3 py-2">Source</th>
                                                <th className="px-3 py-2">Type</th>
                                                <th className="px-3 py-2">Status</th>
                                                <th className="px-3 py-2">Last Synced</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sources.map((source) => (
                                                <tr
                                                    key={source.id}
                                                    className="border-t border-[#e2ebe4]"
                                                >
                                                    <td className="px-3 py-2 font-medium text-[#1f2e22]">
                                                        {source.source}
                                                    </td>
                                                    <td className="px-3 py-2 text-[#355744]">
                                                        {source.type}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        <span
                                                            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                                source.status ===
                                                                'Active'
                                                                    ? 'bg-[#e8f4ea] text-[#186627]'
                                                                    : 'bg-[#fff5e8] text-[#8d5a19]'
                                                            }`}
                                                        >
                                                            {source.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 py-2 text-[#5f7768]">
                                                        {source.lastSynced}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </article>
                        </div>

                        <div className="space-y-4">
                            <article className="rounded-xl border border-[#dce8df] bg-[#fcfffd] p-4">
                                <h2 className="text-sm font-semibold text-[#1f2e22]">
                                    Channels & Delivery
                                </h2>
                                <div className="mt-3 space-y-3">
                                    {channels.map((channel) => {
                                        const Icon = channel.icon;

                                        return (
                                            <div
                                                key={channel.id}
                                                className="rounded-lg border border-[#e2ebe4] bg-white p-3"
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex items-start gap-2">
                                                        <Icon className="mt-0.5 size-4 text-[#186627]" />
                                                        <div>
                                                            <p className="text-sm font-semibold text-[#1f2e22]">
                                                                {channel.label}
                                                            </p>
                                                            <p className="text-xs text-[#5f7768]">
                                                                {channel.detail}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <label className="inline-flex items-center gap-2 text-xs font-medium text-[#355744]">
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                enabledChannels[
                                                                    channel.id
                                                                ]
                                                            }
                                                            onChange={(
                                                                event,
                                                            ) =>
                                                                setEnabledChannels(
                                                                    (previous) => ({
                                                                        ...previous,
                                                                        [channel.id]:
                                                                            event
                                                                                .target
                                                                                .checked,
                                                                    }),
                                                                )
                                                            }
                                                            className="h-4 w-4 rounded border-[#bfd0c3] text-[#186627] focus:ring-[#186627]/25"
                                                        />
                                                        Enabled
                                                    </label>
                                                </div>

                                                <div className="mt-2 flex items-center justify-between">
                                                    <span
                                                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                            channel.connected
                                                                ? 'bg-[#e8f4ea] text-[#186627]'
                                                                : 'bg-[#fdeeee] text-[#a4372a]'
                                                        }`}
                                                    >
                                                        {channel.connected
                                                            ? 'Connected'
                                                            : 'Not Connected'}
                                                    </span>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-8 border-[#cad7ce] text-[#355744]"
                                                    >
                                                        Configure
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </article>

                            <article className="rounded-xl border border-[#dce8df] bg-[#fcfffd] p-4">
                                <h2 className="text-sm font-semibold text-[#1f2e22]">
                                    Escalation & Handoff
                                </h2>
                                <div className="mt-3 grid gap-3 text-sm">
                                    <label className="grid gap-1 text-[#355744]">
                                        Escalation Queue
                                        <select className="h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:border-[#186627] focus:ring-2 focus:ring-[#186627]/20">
                                            <option>Operations Desk</option>
                                            <option>Quote Team</option>
                                            <option>Client Support</option>
                                        </select>
                                    </label>
                                    <label className="grid gap-1 text-[#355744]">
                                        Human Handoff Trigger
                                        <select className="h-10 rounded-md border border-input bg-white px-3 text-sm outline-none focus:border-[#186627] focus:ring-2 focus:ring-[#186627]/20">
                                            <option>3 unresolved turns</option>
                                            <option>2 unresolved turns</option>
                                            <option>Immediately on low confidence</option>
                                        </select>
                                    </label>
                                    <label className="inline-flex items-center gap-2 text-[#355744]">
                                        <input
                                            type="checkbox"
                                            defaultChecked
                                            className="h-4 w-4 rounded border-[#bfd0c3] text-[#186627] focus:ring-[#186627]/25"
                                        />
                                        Send SMS alert to assigned employee
                                    </label>
                                    <label className="inline-flex items-center gap-2 text-[#355744]">
                                        <input
                                            type="checkbox"
                                            defaultChecked
                                            className="h-4 w-4 rounded border-[#bfd0c3] text-[#186627] focus:ring-[#186627]/25"
                                        />
                                        Send email summary after handoff
                                    </label>
                                </div>
                            </article>

                            <article className="rounded-xl border border-[#dce8df] bg-[#f7fbf8] p-4">
                                <h2 className="text-sm font-semibold text-[#1f2e22]">
                                    Test Conversation
                                </h2>
                                <div className="mt-3 space-y-2 text-sm">
                                    <div className="rounded-lg border border-[#e2ebe4] bg-white p-3 text-[#355744]">
                                        Customer: I need an update on my boundary survey order.
                                    </div>
                                    <div className="rounded-lg border border-[#dce8df] bg-[#edf5ef] p-3 text-[#1f2e22]">
                                        Bot: I can help. Please share your order number so I can check the current job status.
                                    </div>
                                    <Button className="h-9 w-full bg-[#186627] text-white hover:bg-[#145521]">
                                        <Send className="size-4" />
                                        Run Test Prompt
                                    </Button>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
